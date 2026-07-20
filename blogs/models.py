from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="posts/")
    alt_text = models.CharField(max_length=200, blank=True)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("position", "id")

    def __str__(self):
        return f"{self.post.title} image {self.position}"
    
class Member(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to="members/logos/", blank=True, null=True)
    tags = models.ManyToManyField("MemberTag", blank=True, related_name="members")

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name

class MemberTag(models.Model):
    name = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name