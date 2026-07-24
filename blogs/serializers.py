from rest_framework import serializers
from .models import HonorableMember, Member, MemberTag, Post, PostImage, Tag

# Pārbauda kontaktformas ievadītos datus pirms to apstrādes.
class MessageApplicationSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    message = serializers.CharField()


# Pārveido jaunumu kategoriju par API atbildes datiem.
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name")


    # Pārveido biedru kategoriju par API atbildes datiem.
class MemberTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberTag
        fields = ("id", "name")


    # Pārveido jaunuma galerijas attēlu par API atbildes datiem.
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ("id", "image", "alt_text", "position")


    # Pārveido jaunumu ar kategorijām un attēliem par API atbildes datiem.
class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    images = PostImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "content", "tags", "images", "created_at")


    # Pārbauda biedra pieteikuma formas ievadītos datus.
class MembershipApplicationSerializer(serializers.Serializer):
    companyName = serializers.CharField()
    position = serializers.CharField()
    fullName = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    companyDescription = serializers.CharField()

# Pārveido biedra pamatinformāciju un kategorijas par API atbildes datiem.
class MemberSerializer(serializers.ModelSerializer):
    tags = MemberTagSerializer(many=True, read_only=True)

    class Meta:
        model = Member
        fields = ("id", "name", "url", "logo", "tags")


    # Pārveido goda biedra pamatinformāciju par API atbildes datiem.
class HonorableMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = HonorableMember
        fields = ("id", "name")


    # Pārbauda asociācijas reģistra formas ievadītos datus.
class RegistrationApplicationSerializer(serializers.Serializer):
    fullName = serializers.CharField()
    email = serializers.EmailField()
    companyName = serializers.CharField()
