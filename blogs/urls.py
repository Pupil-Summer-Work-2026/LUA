from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import HonorableMemberViewSet, MemberTagViewSet, MemberViewSet, PostViewSet, TagViewSet, ktparbiedru
from .views import kontakti, registrs

router = DefaultRouter()
router.register("posts", PostViewSet)
router.register("tags", TagViewSet)
router.register("members", MemberViewSet)
router.register("honorable-members", HonorableMemberViewSet)
router.register("member-tags", MemberTagViewSet)

urlpatterns = [
    path("ktparbiedru/", ktparbiedru, name="ktparbiedru"),
    path("kontakti/", kontakti, name="kontakti"),
    path("registrs/", registrs, name="registrs"),
] + router.urls