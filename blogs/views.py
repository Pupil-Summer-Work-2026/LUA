import logging
from uuid import uuid4

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Member, MemberTag, Post, Tag
from .serializers import MemberSerializer, MemberTagSerializer, MembershipApplicationSerializer, PostSerializer, TagSerializer, MessageApplicationSerializer, RegistrationApplicationSerializer
from .emailing import send_traced_email
from .ratelimit import check_form_rate_limit
from .turnstile import verify_turnstile

logger = logging.getLogger(__name__)


def turnstile_failure_response(request, correlation_id):
    token = request.POST.get("cf-turnstile-response", "")
    remote_ip = request.META.get("REMOTE_ADDR", "")

    if verify_turnstile(token, remote_ip):
        return None

    logger.warning("Turnstile verification failed correlation_id=%s", correlation_id)
    return JsonResponse(
        {
            "success": False,
            "message": "Captcha verification failed.",
            "errors": {"turnstile": ["Captcha verification failed."]},
            "correlationId": correlation_id,
        },
        status=400,
    )


def rate_limit_failure_response(request, correlation_id, endpoint):
    result = check_form_rate_limit(request, endpoint)
    if result.allowed:
        return None

    logger.warning(
        "Form rate limit exceeded endpoint=%s scope=%s client_ip=%s correlation_id=%s",
        endpoint,
        result.scope,
        result.client_ip,
        correlation_id,
    )
    response = JsonResponse(
        {
            "success": False,
            "message": "Too many form submissions. Please try again later.",
            "errors": {"rateLimit": ["Too many form submissions. Please try again later."]},
            "correlationId": correlation_id,
        },
        status=429,
    )
    response["Retry-After"] = str(result.retry_after)
    return response


@csrf_exempt
@require_POST
def registrs(request):
    correlation_id = str(uuid4())
    turnstile_failure = turnstile_failure_response(request, correlation_id)
    if turnstile_failure:
        return turnstile_failure

    serializer = RegistrationApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors, "correlationId": correlation_id},
            status=400,
        )

    rate_limit_failure = rate_limit_failure_response(request, correlation_id, "registrs")
    if rate_limit_failure:
        return rate_limit_failure

    full_name = serializer.validated_data["fullName"]
    email = serializer.validated_data["email"]
    company_name = serializer.validated_data["companyName"]

    logger.info("Membership form received for %s", email or full_name)

    message = "\n".join(
        [
            "Jauns lietotaja pieteikums",

            f"Vārds un uzvārds: {full_name}",
            f"E-pasts: {email}",
            f"Uzņēmuma nosaukums: {company_name}",
            "",
            "Jauns lietotaja pieteikums:",
        ]
    )

    try:
        send_mail(
            subject="jauna biedra pieteikums",
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.MEMBERSHIP_FORM_RECIPIENT],
            fail_silently=False,
        )
        logger.info("Membership form email sent successfully")
    except Exception:
        logger.exception("Membership form email failed")
        return JsonResponse(
            {
                "success": False,
                "message": "Pieteikuma nosūtīšana neizdevās.",
                "correlationId": correlation_id,
            },
            status=500,
        )

    return JsonResponse(
        {"success": True, "message": "Pieteikums saņemts", "correlationId": correlation_id}
    )


@csrf_exempt
@require_POST
def kontakti(request):
    correlation_id = str(uuid4())
    turnstile_failure = turnstile_failure_response(request, correlation_id)
    if turnstile_failure:
        return turnstile_failure

    serializer = MessageApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors, "correlationId": correlation_id},
            status=400,
        )

    rate_limit_failure = rate_limit_failure_response(request, correlation_id, "kontakti")
    if rate_limit_failure:
        return rate_limit_failure

    name = serializer.validated_data["name"]
    email = serializer.validated_data["email"]
    message_content = serializer.validated_data["message"]

    logger.info("Contact form received correlation_id=%s", correlation_id)

    message = "\n".join(
        [
            "Jauns kontaktu pieteikums",
            f"Vārds un uzvārds: {name}",
            f"E-pasts: {email}",
            "",
            "Ziņa:",
            message_content,
        ]
    )

    try:
        send_traced_email(
            subject=f"Jauns LUA lietotāja ziņojums: {name}",
            body=message,
            recipient=settings.CONTACT_FORM_RECIPIENT,
            correlation_id=correlation_id,
            role="association",
        )
    except Exception:
        logger.warning("Contact form email failed correlation_id=%s", correlation_id)
        return JsonResponse(
            {
                "success": False,
                "message": "Ziņas nosūtīšana neizdevās.",
                "correlationId": correlation_id,
            },
            status=500,
        )

    logger.info("Contact form completed correlation_id=%s", correlation_id)
    return JsonResponse(
        {"success": True, "message": "Ziņa saņemta", "correlationId": correlation_id}
    )


@csrf_exempt
@require_POST
def ktparbiedru(request):
    correlation_id = str(uuid4())
    turnstile_failure = turnstile_failure_response(request, correlation_id)
    if turnstile_failure:
        return turnstile_failure

    serializer = MembershipApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors, "correlationId": correlation_id},
            status=400,
        )

    rate_limit_failure = rate_limit_failure_response(request, correlation_id, "ktparbiedru")
    if rate_limit_failure:
        return rate_limit_failure

    company_name = serializer.validated_data["companyName"]
    position = serializer.validated_data["position"]
    full_name = serializer.validated_data["fullName"]
    email = serializer.validated_data["email"]
    phone = serializer.validated_data["phone"]
    company_description = serializer.validated_data["companyDescription"]

    logger.info("Membership form received correlation_id=%s", correlation_id)

    message = "\n".join(
        [
            "Jauns biedra pieteikums",
            f"Uzņēmuma nosaukums: {company_name}",
            f"Amats uzņēmumā: {position}",
            f"Vārds un uzvārds: {full_name}",
            f"E-pasts: {email}",
            f"Tālrunis: {phone}",
            "",
            "Īss uzņēmuma apraksts:",
            company_description,
        ]
    )

    try:
        send_traced_email(
            subject=f"Jauns biedra pieteikums: {company_name}",
            body=message,
            recipient=settings.MEMBERSHIP_FORM_RECIPIENT,
            correlation_id=correlation_id,
            role="association",
        )
    except Exception:
        logger.warning("Membership form email failed correlation_id=%s", correlation_id)
        return JsonResponse(
            {
                "success": False,
                "message": "Pieteikuma nosūtīšana neizdevās.",
                "correlationId": correlation_id,
            },
            status=500,
        )

    logger.info("Membership form completed correlation_id=%s", correlation_id)
    return JsonResponse(
        {"success": True, "message": "Pieteikums saņemts", "correlationId": correlation_id}
    )


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.prefetch_related("tags", "images").order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Member.objects.prefetch_related("tags")
    serializer_class = MemberSerializer


class MemberTagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MemberTag.objects.all()
    serializer_class = MemberTagSerializer
