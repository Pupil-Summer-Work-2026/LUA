from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Post, Tag
from .serializers import PostSerializer, TagSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.prefetch_related("tags", "images").order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
