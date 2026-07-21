import json
import logging
from urllib.error import URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings


logger = logging.getLogger(__name__)
VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


def verify_turnstile(token, remote_ip):
    if not token:
        return False

    if not settings.TURNSTILE_SECRET_KEY:
        logger.error("TURNSTILE_SECRET_KEY is not configured")
        return False

    payload = urlencode(
        {
            "secret": settings.TURNSTILE_SECRET_KEY,
            "response": token,
            "remoteip": remote_ip,
        }
    ).encode("utf-8")
    request = Request(VERIFY_URL, data=payload, method="POST")

    try:
        with urlopen(request, timeout=settings.TURNSTILE_VERIFY_TIMEOUT_SECONDS) as response:
            result = json.loads(response.read().decode("utf-8"))
    except (OSError, URLError, json.JSONDecodeError):
        logger.warning("Turnstile verification request failed")
        return False

    return result.get("success") is True