import logging
from uuid import uuid4

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Member, Post, Tag
from .serializers import MembershipApplicationSerializer, PostSerializer, TagSerializer, MessageApplicationSerializer, RegistrationApplicationSerializer, MemberSerializer
from .emailing import send_traced_email

logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def registrs(request):
    serializer = RegistrationApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors},
            status=400,
        )
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
            {"success": False, "message": "Pieteikuma nosūtīšana neizdevās."},
            status=500,
        )

    return JsonResponse({"success": True, "message": "Pieteikums saņemts"})
@csrf_exempt
@require_POST
def kontakti(request):
    correlation_id = str(uuid4())
    serializer = MessageApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors, "correlationId": correlation_id},
            status=400,
        )
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
            {"success": False, "message": "Pieteikuma nosūtīšana neizdevās."},
            status=500,
        )

    return JsonResponse({"success": True, "message": "Pieteikums saņemts"})
@csrf_exempt
@require_POST
def kontakti(request):
    correlation_id = str(uuid4())
    serializer = MessageApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors, "correlationId": correlation_id},
            status=400,
        )

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
        send_traced_email(
            subject=f"Jūsu ziņa ir saņemta: {name}",
            body="Paldies par ziņu Latvijas Ugunsdrošības asociācijai. Mēs ar jums sazināsimies iespējami drīz.",
            recipient=email,
            correlation_id=correlation_id,
            role="applicant",
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

@csrf_exempt
@require_POST
def ktparbiedru(request):
    correlation_id = str(uuid4())
    serializer = MembershipApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors, "correlationId": correlation_id},
            status=400,
        )

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
        send_traced_email(
            subject=f"Jūsu biedra pieteikums ir saņemts: {company_name}",
            body="Paldies par biedra pieteikumu Latvijas Ugunsdrošības asociācijai. Mēs to izvērtēsim un sazināsimies ar jums iespējami drīz.",
            recipient=email,
            correlation_id=correlation_id,
            role="applicant",
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
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
