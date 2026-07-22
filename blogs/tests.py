import tempfile
from datetime import timedelta
from unittest.mock import call, patch
from uuid import UUID

from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.cache import cache
from django.test import Client, override_settings
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Member, MemberTag, Post, PostImage, Tag


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
	def test_member_logo_allows_common_web_image_extensions(self):
		for extension in ("avif", "gif", "jpeg", "jpg", "png", "svg", "webp"):
			member = Member(name="Acme", logo=SimpleUploadedFile(f"logo.{extension}", b"image"))

			member.full_clean()

	def test_member_list_returns_member_details_with_tags(self):
		member = Member.objects.create(name="Acme", url="https://example.com")
		member_tag = MemberTag.objects.create(name="Ražotājs")
		member.tags.add(member_tag)

		response = self.client.get(reverse("member-list"))

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(
			response.data,
			[
				{
					"id": member.id,
					"name": "Acme",
					"url": "https://example.com",
					"logo": None,
					"tags": [{"id": member_tag.id, "name": member_tag.name}],
				}
			],
		)

	def test_member_tag_list_returns_reusable_member_tags(self):
		member_tag = MemberTag.objects.create(name="Pakalpojumu sniedzējs")
		response = self.client.get(reverse("membertag-list"))
		self.assertIn(
			{"id": member_tag.id, "name": member_tag.name},
			response.data,
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)


class MembershipFormTests(APITestCase):
	def setUp(self):
		cache.clear()
		self.turnstile_patcher = patch("blogs.views.verify_turnstile", return_value=True)
		self.turnstile_patcher.start()
		self.addCleanup(self.turnstile_patcher.stop)

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
		self.assertEqual(mock_email_message.call_count, 1)

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
	def test_membership_form_sends_only_to_configured_recipient(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(response.json()["success"])
		correlation_id = response.json()["correlationId"]
		UUID(correlation_id)
		self.assertEqual(mock_email_message.call_count, 1)
		email_call = mock_email_message.call_args
		self.assertEqual(email_call.kwargs["to"], ["membership@example.com"])
		self.assertNotEqual(email_call.kwargs["to"], ["jane@example.com"])
		self.assertIn(correlation_id, email_call.kwargs["headers"]["Message-ID"])
		mock_email_message.return_value.send.assert_called_once_with(fail_silently=False)

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_rejects_zero_send_count(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 0

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
		self.assertFalse(response.json()["success"])
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.return_value.send.call_count, 1)

	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_form_rejects_association_send_exception(self, mock_email_message):
		mock_email_message.return_value.send.side_effect = RuntimeError("SMTP unavailable")

		response = self.client.post(reverse("ktparbiedru"), self.valid_payload())

		self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
		self.assertFalse(response.json()["success"])
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.return_value.send.call_count, 1)

class ContactFormTests(APITestCase):
	def setUp(self):
		cache.clear()
		self.turnstile_patcher = patch("blogs.views.verify_turnstile", return_value=True)
		self.turnstile_patcher.start()
		self.addCleanup(self.turnstile_patcher.stop)

	@override_settings(CONTACT_FORM_RECIPIENT="contact@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_contact_form_sends_only_to_configured_recipient(self, mock_email_message):
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
		self.assertEqual(mock_email_message.call_count, 1)
		email_call = mock_email_message.call_args
		self.assertEqual(email_call.kwargs["to"], ["contact@example.com"])
		self.assertNotEqual(email_call.kwargs["to"], ["jane@example.com"])
		self.assertIn(correlation_id, email_call.kwargs["headers"]["Message-ID"])
		mock_email_message.return_value.send.assert_called_once_with(fail_silently=False)


class TurnstileFormVerificationTests(APITestCase):
	def setUp(self):
		cache.clear()

	def test_all_form_endpoints_reject_failed_turnstile_verification(self):
		endpoints = ["registrs", "kontakti", "ktparbiedru"]

		with patch("blogs.views.verify_turnstile", return_value=False):
			for endpoint in endpoints:
				response = self.client.post(reverse(endpoint), {"cf-turnstile-response": "invalid"})

				self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
				self.assertFalse(response.json()["success"])
				self.assertIn("turnstile", response.json()["errors"])
				UUID(response.json()["correlationId"])


class FormRateLimitTests(APITestCase):
	def setUp(self):
		cache.clear()
		self.turnstile_patcher = patch("blogs.views.verify_turnstile", return_value=True)
		self.turnstile_patcher.start()
		self.addCleanup(self.turnstile_patcher.stop)

	def membership_payload(self):
		return {
			"companyName": "Acme",
			"position": "CTO",
			"fullName": "Jane Doe",
			"email": "jane@example.com",
			"phone": "+37112345678",
			"companyDescription": "We provide fire safety services.",
		}

	def contact_payload(self):
		return {
			"name": "Jane Doe",
			"email": "jane@example.com",
			"message": "Labdien!",
		}

	@override_settings(
		FORM_SUBMISSION_RATE_LIMITS={
			"shared": {"limit": 10, "window_seconds": 3600},
			"kontakti": {"limit": 2, "window_seconds": 3600},
			"ktparbiedru": {"limit": 10, "window_seconds": 3600},
			"registrs": {"limit": 10, "window_seconds": 3600},
		}
	)
	@override_settings(CONTACT_FORM_RECIPIENT="contact@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_contact_limit_rejects_following_submission_without_sending_email(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		for _ in range(2):
			response = self.client.post(reverse("kontakti"), self.contact_payload(), REMOTE_ADDR="203.0.113.10")
			self.assertEqual(response.status_code, status.HTTP_200_OK)

		response = self.client.post(reverse("kontakti"), self.contact_payload(), REMOTE_ADDR="203.0.113.10")

		self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
		self.assertFalse(response.json()["success"])
		self.assertIn("rateLimit", response.json()["errors"])
		self.assertGreater(int(response["Retry-After"]), 0)
		self.assertEqual(mock_email_message.call_count, 2)

	@override_settings(
		FORM_SUBMISSION_RATE_LIMITS={
			"shared": {"limit": 2, "window_seconds": 3600},
			"kontakti": {"limit": 10, "window_seconds": 3600},
			"ktparbiedru": {"limit": 10, "window_seconds": 3600},
			"registrs": {"limit": 10, "window_seconds": 3600},
		}
	)
	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_shared_limit_rejects_following_submission_without_sending_email(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		for _ in range(2):
			response = self.client.post(reverse("ktparbiedru"), self.membership_payload(), REMOTE_ADDR="203.0.113.10")
			self.assertEqual(response.status_code, status.HTTP_200_OK)

		response = self.client.post(reverse("ktparbiedru"), self.membership_payload(), REMOTE_ADDR="203.0.113.10")

		self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
		self.assertFalse(response.json()["success"])
		self.assertIn("rateLimit", response.json()["errors"])
		self.assertGreater(int(response["Retry-After"]), 0)
		UUID(response.json()["correlationId"])
		self.assertEqual(mock_email_message.call_count, 2)

	@override_settings(
		FORM_SUBMISSION_RATE_LIMITS={
			"shared": {"limit": 10, "window_seconds": 3600},
			"kontakti": {"limit": 10, "window_seconds": 3600},
			"ktparbiedru": {"limit": 2, "window_seconds": 86400},
			"registrs": {"limit": 10, "window_seconds": 86400},
		}
	)
	@override_settings(MEMBERSHIP_FORM_RECIPIENT="membership@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_membership_limit_isolated_by_client_ip(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		for _ in range(2):
			response = self.client.post(reverse("ktparbiedru"), self.membership_payload(), REMOTE_ADDR="203.0.113.10")
			self.assertEqual(response.status_code, status.HTTP_200_OK)

		limited_response = self.client.post(reverse("ktparbiedru"), self.membership_payload(), REMOTE_ADDR="203.0.113.10")
		allowed_response = self.client.post(reverse("ktparbiedru"), self.membership_payload(), REMOTE_ADDR="203.0.113.11")

		self.assertEqual(limited_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
		self.assertEqual(allowed_response.status_code, status.HTTP_200_OK)

	@override_settings(
		FORM_SUBMISSION_RATE_LIMITS={
			"shared": {"limit": 10, "window_seconds": 60},
			"kontakti": {"limit": 1, "window_seconds": 60},
			"ktparbiedru": {"limit": 10, "window_seconds": 60},
			"registrs": {"limit": 10, "window_seconds": 60},
		}
	)
	@override_settings(CONTACT_FORM_RECIPIENT="contact@example.com")
	@patch("blogs.emailing.EmailMessage")
	def test_contact_limit_uses_rolling_window_across_clock_boundary(self, mock_email_message):
		mock_email_message.return_value.send.return_value = 1

		with patch("blogs.ratelimit.time.time", return_value=59.9):
			first_response = self.client.post(
				reverse("kontakti"),
				self.contact_payload(),
				REMOTE_ADDR="203.0.113.10",
			)

		with patch("blogs.ratelimit.time.time", return_value=60.1):
			limited_response = self.client.post(
				reverse("kontakti"),
				self.contact_payload(),
				REMOTE_ADDR="203.0.113.10",
			)

		self.assertEqual(first_response.status_code, status.HTTP_200_OK)
		self.assertEqual(limited_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
		self.assertEqual(int(limited_response["Retry-After"]), 60)

	@override_settings(
		FORM_SUBMISSION_RATE_LIMITS={
			"shared": {"limit": 10, "window_seconds": 3600},
			"kontakti": {"limit": 1, "window_seconds": 3600},
			"ktparbiedru": {"limit": 1, "window_seconds": 3600},
			"registrs": {"limit": 1, "window_seconds": 3600},
		}
	)
	@patch("blogs.views.send_mail")
	@patch("blogs.emailing.EmailMessage")
	def test_invalid_submissions_do_not_consume_rate_limit(self, mock_email_message, mock_send_mail):
		mock_email_message.return_value.send.return_value = 1

		for endpoint, payload in [
			("kontakti", self.contact_payload()),
			("ktparbiedru", self.membership_payload()),
			(
				"registrs",
				{
					"fullName": "Jane Doe",
					"email": "jane@example.com",
					"companyName": "Acme",
				},
			),
		]:
			invalid_response = self.client.post(reverse(endpoint), {}, REMOTE_ADDR="203.0.113.10")
			valid_response = self.client.post(reverse(endpoint), payload, REMOTE_ADDR="203.0.113.10")

			self.assertEqual(invalid_response.status_code, status.HTTP_400_BAD_REQUEST)
			self.assertEqual(valid_response.status_code, status.HTTP_200_OK)

		self.assertEqual(mock_email_message.call_count, 2)
		mock_send_mail.assert_called_once()
