from django.conf import settings
from django.core.checks import Error, Tags, register
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


@register(Tags.security, deploy=True)
def check_production_email_addresses(app_configs, **kwargs):
    errors = []

    for setting_name in (
        "DEFAULT_FROM_EMAIL",
        "MEMBERSHIP_FORM_RECIPIENT",
        "CONTACT_FORM_RECIPIENT",
        "REGISTRATION_FORM_RECIPIENT",
    ):
        value = getattr(settings, setting_name, "")
        if not value:
            errors.append(
                Error(
                    f"{setting_name} must be set explicitly for production.",
                    id="blogs.E001",
                )
            )
            continue

        try:
            validate_email(value)
        except ValidationError:
            errors.append(
                Error(
                    f"{setting_name} must contain a valid email address.",
                    id="blogs.E002",
                )
            )

    return errors