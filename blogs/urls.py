from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import MemberViewSet, PostViewSet, TagViewSet, ktparbiedru
from .views import kontakti

router = DefaultRouter()
router.register("posts", PostViewSet)
router.register("tags", TagViewSet)
router.register("members", MemberViewSet)

urlpatterns = [
    path("ktparbiedru/", ktparbiedru, name="ktparbiedru"),
    path("kontakti/", kontakti, name="kontakti"),
] + router.urls