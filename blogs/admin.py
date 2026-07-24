from django.contrib import admin
from .models import HonorableMember, Member, Post, PostImage, Tag, MemberTag


@admin.register(Tag)
# Pielāgo jaunumu kategoriju pārvaldību Django administrācijas saskarnē.
class TagAdmin(admin.ModelAdmin):
	search_fields = ("name",)


# Attēlo jaunuma attēlus rediģēšanai tieši jaunuma administrācijas skatā.
class PostImageInline(admin.TabularInline):
	model = PostImage
	extra = 1
	fields = ("image", "alt_text", "position")
	ordering = ("position", "id")


@admin.register(Post)
# Pielāgo jaunumu pārvaldību Django administrācijas saskarnē.
class PostAdmin(admin.ModelAdmin):
	list_display = ("title", "created_at")
	search_fields = ("title", "content")
	filter_horizontal = ("tags",)
	inlines = (PostImageInline,)

@admin.register(Member)
# Pielāgo biedru pārvaldību Django administrācijas saskarnē.
class MemberAdmin(admin.ModelAdmin):
	search_fields = ("name",)
	filter_horizontal = ("tags",)


@admin.register(HonorableMember)
# Pielāgo goda biedru pārvaldību Django administrācijas saskarnē.
class HonorableMemberAdmin(admin.ModelAdmin):
	search_fields = ("name",)


@admin.register(MemberTag)
# Pielāgo biedru kategoriju pārvaldību Django administrācijas saskarnē.
class MemberTagAdmin(admin.ModelAdmin):
	search_fields = ("name",)