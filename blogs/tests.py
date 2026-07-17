import tempfile
from datetime import timedelta
from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Post, PostImage, Tag


class PostApiTests(APITestCase):
	def setUp(self):
		self.media_directory = tempfile.TemporaryDirectory()
		self.media_settings = override_settings(MEDIA_ROOT=self.media_directory.name)
		self.media_settings.enable()
		self.addCleanup(self.media_settings.disable)
		self.addCleanup(self.media_directory.cleanup)

		self.tag = Tag.objects.create(name="Pasākumi")
		self.older_post = Post.objects.create(title="Iepriekšējais jaunums", content="Vecāks saturs")
		Post.objects.filter(pk=self.older_post.pk).update(created_at=timezone.now() - timedelta(days=1))

		self.post = Post.objects.create(title="Jaunākais jaunums", content="Pirmā rindkopa.\n\nOtrā rindkopa.")
		self.post.tags.add(self.tag)
		PostImage.objects.create(post=self.post, image=self.image_upload("second.gif"), alt_text="Otrais attēls", position=2)
		PostImage.objects.create(post=self.post, image=self.image_upload("first.gif"), alt_text="Pirmais attēls", position=1)

	def image_upload(self, name):
		image_bytes = (
			b"GIF87a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff"
			b"!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00"
			b"\x00\x02\x02D\x01\x00;"
		)
		return SimpleUploadedFile(name, image_bytes, content_type="image/gif")

	def test_post_list_returns_newest_post_with_nested_tags_and_images(self):
		response = self.client.get(reverse("post-list"))

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data[0]["id"], self.post.id)
		self.assertEqual(response.data[0]["tags"], [{"id": self.tag.id, "name": self.tag.name}])
		self.assertEqual([image["position"] for image in response.data[0]["images"]], [1, 2])
		self.assertTrue(response.data[0]["images"][0]["image"].endswith("posts/first.gif"))

	def test_post_detail_returns_ordered_gallery(self):
		response = self.client.get(reverse("post-detail", args=[self.post.id]))

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual([image["alt_text"] for image in response.data["images"]], ["Pirmais attēls", "Otrais attēls"])

	def test_tag_list_returns_reusable_tags(self):
		response = self.client.get(reverse("tag-list"))

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, [{"id": self.tag.id, "name": self.tag.name}])

	def test_anonymous_users_cannot_create_posts(self):
		response = self.client.post(reverse("post-list"), {"title": "Nedrīkst publicēt", "content": "Saturs"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
		self.assertEqual(Post.objects.filter(title="Nedrīkst publicēt").count(), 0)


class MembershipFormTests(APITestCase):
	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.views.send_mail")
	def test_membership_form_returns_success(self, mock_send_mail):
		response = self.client.post(
			reverse("ktparbiedru"),
			{
				"companyName": "Acme",
				"position": "CTO",
				"fullName": "Jane Doe",
				"email": "jane@example.com",
				"phone": "+37112345678",
				"companyDescription": "We provide fire safety services.",
			},
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(response.json()["success"])
		mock_send_mail.assert_called_once()
		self.assertEqual(mock_send_mail.call_args.kwargs["recipient_list"], ["membership@example.com"])
