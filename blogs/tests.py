import tempfile
from datetime import timedelta
from unittest.mock import call, patch
from uuid import UUID

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client, override_settings
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Member, Post, PostImage, Tag


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


class MemberApiTests(APITestCase):
	def test_member_list_returns_member_details(self):
		member = Member.objects.create(name="Acme", url="https://example.com")

		response = self.client.get(reverse("member-list"))

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, [{"id": member.id, "name": "Acme", "url": "https://example.com", "logo": None}])


class MembershipFormTests(APITestCase):
	def valid_payload(self):
		return {
			"companyName": "Acme",
			"position": "CTO",
			"fullName": "Jane Doe",
			"email": "jane@example.com",
			"phone": "+37112345678",
			"companyDescription": "We provide fire safety services.",
		}

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_accepts_post_without_csrf_token(self, mock_email_message):
		csrf_client = Client(enforce_csrf_checks=True)
		mock_email_message.return_value.send.return_value = 1

		response = csrf_client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(response.json()["success"])
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.call_count, 2)

	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_rejects_empty_request(self, mock_email_message):
		response = self.client.post(reverse("ktparbiedru"), {})

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertFalse(response.json()["success"])
		self.assertIn("companyName", response.json()["errors"])
		UUID(response.json()["correlationId"])
		mock_email_message.assert_not_called()

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_returns_success_with_traceable_messages(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(response.json()["success"])
		correlation_id = response.json()["correlationId"]
		UUID(correlation_id)
		self.assertEqual(mock_email_message.call_count, 2)
		self.assertEqual(mock_email_message.call_args_list[0].kwargs["to"], ["membership@example.com"])
		self.assertEqual(mock_email_message.call_args_list[1].kwargs["to"], ["jane@example.com"])
		message_ids = [
			email_call.kwargs["headers"]["Message-ID"]
			for email_call in mock_email_message.call_args_list
		]
		self.assertNotEqual(message_ids[0], message_ids[1])
		self.assertTrue(all(correlation_id in message_id for message_id in message_ids))
		mock_email_message.return_value.send.assert_has_calls(
			[call(fail_silently=False), call(fail_silently=False)]
		)

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_rejects_zero_send_count(self, mock_email_message):
		mock_email_message.return_value.send.side_effect = [1, 0]

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
		self.assertFalse(response.json()["success"])
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.return_value.send.call_count, 2)

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_rejects_association_send_exception(self, mock_email_message):
		mock_email_message.return_value.send.side_effect = RuntimeError("SMTP unavailable")

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
		self.assertFalse(response.json()["success"])
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.return_value.send.call_count, 1)

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_rejects_applicant_send_exception(self, mock_email_message):
		mock_email_message.return_value.send.side_effect = [1, RuntimeError("SMTP unavailable")]

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
		self.assertFalse(response.json()["success"])
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.return_value.send.call_count, 2)


class ContactFormTests(APITestCase):
	@override_settings(CONTACT_FORM_RECIPIENT="contact@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_contact_form_sends_traceable_messages_to_configured_recipients(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		response = self.client.post(
			reverse("kontakti"),
			{
				"name": "Jane Doe",
				"email": "jane@example.com",
				"message": "Labdien!",
			},
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(response.json()["success"])
		correlation_id = response.json()["correlationId"]
		UUID(correlation_id)
		self.assertEqual(mock_email_message.call_count, 2)
		self.assertEqual(mock_email_message.call_args_list[0].kwargs["to"], ["contact@example.com"])
		self.assertEqual(mock_email_message.call_args_list[1].kwargs["to"], ["jane@example.com"])
		self.assertTrue(
			all(
				correlation_id in email_call.kwargs["headers"]["Message-ID"]
				for email_call in mock_email_message.call_args_list
			)
		)
