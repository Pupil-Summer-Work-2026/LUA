from rest_framework import serializers
from .models import HonorableMember, Member, MemberTag, Post, PostImage, Tag

class MessageApplicationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=254)
    message = serializers.CharField(max_length=5000)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name")


class MemberTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberTag
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
    companyName = serializers.CharField(max_length=200)
    position = serializers.CharField(max_length=120)
    fullName = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=254)
    phone = serializers.CharField(max_length=50)
    companyDescription = serializers.CharField(max_length=5000)
    dutiesAccepted = serializers.BooleanField()

    def validate_dutiesAccepted(self, value):
        if not value:
            raise serializers.ValidationError("Membership duties must be accepted.")
        return value

class MemberSerializer(serializers.ModelSerializer):
    tags = MemberTagSerializer(many=True, read_only=True)

    class Meta:
        model = Member
        fields = ("id", "name", "url", "logo", "tags")


class HonorableMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = HonorableMember
        fields = ("id", "name")


class RegistrationApplicationSerializer(serializers.Serializer):
    fullName = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=254)
    companyName = serializers.CharField(max_length=200)
