from django.db import models
from django.core.validators import FileExtensionValidator


# Saglabā jaunumu kategoriju, ko var piesaistīt vairākiem rakstiem.
class Tag(models.Model):
    name = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ("name",)

    # Atgriež kategorijas nosaukumu Django administrācijas saskarnē.
    def __str__(self):
        return self.name


# Saglabā mājaslapā publicējamu jaunumu ar tekstu, kategorijām un datumu.
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)

    # Atgriež jaunuma virsrakstu Django administrācijas saskarnē.
    def __str__(self):
        return self.title


# Saglabā jaunuma galerijas attēlu un tā attēlošanas secību.
class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="posts/")
    alt_text = models.CharField(max_length=200, blank=True)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("position", "id")

    # Atgriež jaunuma virsrakstu un attēla secības numuru Django administrācijas saskarnē.
    def __str__(self):
        return f"{self.post.title} image {self.position}"

# Saglabā asociācijas biedra pamatinformāciju, saiti, logotipu un pakalpojumu kategorijas.
class Member(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(blank=True, null=True)
    logo = models.FileField(
        upload_to="members/logos/",
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=["avif", "gif", "jpeg", "jpg", "png", "svg", "webp"])],
    )
    tags = models.ManyToManyField("MemberTag", blank=True, related_name="members")

    class Meta:
        ordering = ("name",)

    # Atgriež biedra nosaukumu Django administrācijas saskarnē.
    def __str__(self):
        return self.name


# Saglabā asociācijas goda biedra vārdu un uzvārdu.
class HonorableMember(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ("name",)

    # Atgriež goda biedra vārdu Django administrācijas saskarnē.
    def __str__(self):
        return self.name


# Saglabā biedru pakalpojumu vai darbības kategoriju.
class MemberTag(models.Model):
    name = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ("name",)

    # Atgriež biedru kategorijas nosaukumu Django administrācijas saskarnē.
    def __str__(self):
        return self.name