from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import PostViewSet, TagViewSet, ktparbiedru

router = DefaultRouter()
router.register("posts", PostViewSet)
router.register("tags", TagViewSet)

urlpatterns = [
    path("ktparbiedru/", ktparbiedru, name="ktparbiedru"),
] + router.urls