from rest_framework import serializers
from .models import Post, PostImage, Tag

class MessageApplicationSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    message = serializers.CharField()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name")


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ("id", "image", "alt_text", "position")


class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    images = PostImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "content", "tags", "images", "created_at")


class MembershipApplicationSerializer(serializers.Serializer):
    companyName = serializers.CharField()
    position = serializers.CharField()
    fullName = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    companyDescription = serializers.CharField()