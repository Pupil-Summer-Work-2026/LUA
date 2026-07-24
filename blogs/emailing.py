import logging
from email.utils import make_msgid, parseaddr
from time import perf_counter

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger(__name__)


# Norāda, ka e-pasta serveris ziņojumu nav pieņēmis nosūtīšanai.
class EmailHandoffError(Exception):
    pass


# Aizstāj lielāko e-pasta adreses daļu ar zvaigznītēm žurnāla ierakstiem.
def mask_email(address):
    parsed_address = parseaddr(address)[1]
    local_part, separator, domain = parsed_address.partition("@")
    if not separator:
        return "***"
    return f"{local_part[:1]}***@{domain}"


# Nosūta e-pastu ar izsekojamu ziņojuma identifikatoru un reģistrē rezultātu žurnālā.
def send_traced_email(*, subject, body, recipient, correlation_id, role):
    sender_address = parseaddr(settings.DEFAULT_FROM_EMAIL)[1]
    message_domain = sender_address.rpartition("@")[2] or None
    message_id = make_msgid(
        idstring=f"{correlation_id}.{role}",
        domain=message_domain,
    )
    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[recipient],
        headers={"Message-ID": message_id},
    )
    started_at = perf_counter()

    try:
        sent_count = email.send(fail_silently=False)
    except Exception as error:
        logger.exception(
            "Email handoff failed correlation_id=%s role=%s message_id=%s recipient=%s backend=%s duration_ms=%.1f error=%s",
            correlation_id,
            role,
            message_id,
            mask_email(recipient),
            settings.EMAIL_BACKEND,
            (perf_counter() - started_at) * 1000,
            type(error).__name__,
        )
        raise

    duration_ms = (perf_counter() - started_at) * 1000
    if sent_count != 1:
        logger.warning(
            "Email handoff rejected correlation_id=%s role=%s message_id=%s recipient=%s backend=%s sent_count=%s duration_ms=%.1f",
            correlation_id,
            role,
            message_id,
            mask_email(recipient),
            settings.EMAIL_BACKEND,
            sent_count,
            duration_ms,
        )
        raise EmailHandoffError(f"Email backend returned sent_count={sent_count}")

    logger.info(
        "Email handoff completed correlation_id=%s role=%s message_id=%s recipient=%s backend=%s sent_count=%s duration_ms=%.1f",
        correlation_id,
        role,
        message_id,
        mask_email(recipient),
        settings.EMAIL_BACKEND,
        sent_count,
        duration_ms,
    )
    return message_id