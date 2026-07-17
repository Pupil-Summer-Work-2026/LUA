import logging

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Post, Tag
from .serializers import MembershipApplicationSerializer, PostSerializer, TagSerializer

logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def ktparbiedru(request):
    serializer = MembershipApplicationSerializer(data=request.POST)
    if not serializer.is_valid():
        return JsonResponse(
            {"success": False, "errors": serializer.errors},
            status=400,
        )

    company_name = serializer.validated_data["companyName"]
    position = serializer.validated_data["position"]
    full_name = serializer.validated_data["fullName"]
    email = serializer.validated_data["email"]
    phone = serializer.validated_data["phone"]
    company_description = serializer.validated_data["companyDescription"]

    logger.info("Membership form received for %s", email or full_name)

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


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.prefetch_related("tags", "images").order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
