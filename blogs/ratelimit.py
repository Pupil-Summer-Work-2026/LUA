import hashlib
import time
from dataclasses import dataclass

from django.conf import settings
from django.core.cache import caches


@dataclass(frozen=True)
class RateLimitResult:
    allowed: bool
    client_ip: str
    retry_after: int = 0
    scope: str = ""


def get_client_ip(request):
    if settings.FORM_RATE_LIMIT_TRUST_X_FORWARDED_FOR:
        forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR", "")
        if forwarded_for:
            return forwarded_for.split(",", 1)[0].strip()

    return request.META.get("REMOTE_ADDR", "") or "unknown"


def check_form_rate_limit(request, endpoint):
    client_ip = get_client_ip(request)
    cache = caches[settings.FORM_RATE_LIMIT_CACHE_ALIAS]
    limits = {
        "shared": settings.FORM_SUBMISSION_RATE_LIMITS["shared"],
        endpoint: settings.FORM_SUBMISSION_RATE_LIMITS[endpoint],
    }
    now = time.time()
    counters = []

    for scope, limit_config in limits.items():
        window_seconds = limit_config["window_seconds"]
        window = int(now // window_seconds)
        retry_after = max(1, int(window_seconds - (now % window_seconds)))
        cache_key = _cache_key(scope, client_ip, window)
        current_count = cache.get(cache_key, 0)

        if current_count >= limit_config["limit"]:
            return RateLimitResult(False, client_ip, retry_after, scope)

        counters.append((cache_key, retry_after))

    for cache_key, timeout in counters:
        if not cache.add(cache_key, 1, timeout=timeout):
            cache.incr(cache_key)

    return RateLimitResult(True, client_ip)


def _cache_key(scope, client_ip, window):
    key_material = f"form-submission:{scope}:{client_ip}:{window}".encode("utf-8")
    return f"form-submission:{hashlib.sha256(key_material).hexdigest()}"