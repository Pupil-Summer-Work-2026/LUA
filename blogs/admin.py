from django.contrib import admin
from .models import Member, Post, PostImage, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
	search_fields = ("name",)


class PostImageInline(admin.TabularInline):
	model = PostImage
	extra = 1
	fields = ("image", "alt_text", "position")
	ordering = ("position", "id")


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	list_display = ("title", "created_at")
	search_fields = ("title", "content")
	filter_horizontal = ("tags",)
	inlines = (PostImageInline,)

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    search_fields = ("name",)