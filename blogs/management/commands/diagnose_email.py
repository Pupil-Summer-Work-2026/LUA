from hashlib import sha256
from uuid import uuid4

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from blogs.emailing import mask_email, send_traced_email


# Izveido īsu vērtības nospiedumu, neatklājot pašu vērtību.
def _fingerprint(value):
    if not value:
        return "empty"
    return sha256(str(value).encode("utf-8")).hexdigest()[:12]


# Izveido e-pasta adreses kopsavilkumu ar maskētu adresi un nospiedumu.
def _address_summary(address):
    return f"{mask_email(address)} fingerprint={_fingerprint(address)}"


# Piedāvā komandu e-pasta iestatījumu pārbaudei un diagnostikas ziņojumu nosūtīšanai.
class Command(BaseCommand):
    help = "Show redacted effective email settings and optionally send traceable probes."

    # Pievieno komandas parametrus iestatījumu rādīšanai un testa e-pastu sūtīšanai.
    def add_arguments(self, parser):
        parser.add_argument(
            "--send",
            action="store_true",
            help="Send diagnostic messages after printing the effective settings.",
        )
        parser.add_argument(
            "--recipient",
            action="append",
            default=[],
            help="Recipient for a diagnostic message. May be supplied more than once.",
        )
        parser.add_argument(
            "--form-recipients",
            action="store_true",
            help="Include the configured membership and contact form recipients.",
        )

    # Izvada maskētus e-pasta iestatījumus un pēc izvēles nosūta diagnostikas ziņojumus.
    def handle(self, *args, **options):
        self.stdout.write("Effective email configuration")
        self.stdout.write(f"backend={settings.EMAIL_BACKEND}")
        self.stdout.write(f"host={settings.EMAIL_HOST}")
        self.stdout.write(f"port={settings.EMAIL_PORT}")
        self.stdout.write(f"use_ssl={settings.EMAIL_USE_SSL}")
        self.stdout.write(f"use_tls={getattr(settings, 'EMAIL_USE_TLS', False)}")
        self.stdout.write(f"username={_address_summary(settings.EMAIL_HOST_USER)}")
        self.stdout.write(f"password_configured={bool(settings.EMAIL_HOST_PASSWORD)}")
        self.stdout.write(f"from={_address_summary(settings.DEFAULT_FROM_EMAIL)}")
        self.stdout.write(
            f"membership_recipient={_address_summary(settings.MEMBERSHIP_FORM_RECIPIENT)}"
        )
        self.stdout.write(
            f"contact_recipient={_address_summary(settings.CONTACT_FORM_RECIPIENT)}"
        )

        recipients = list(options["recipient"])
        if options["form_recipients"]:
            recipients.extend(
                [settings.MEMBERSHIP_FORM_RECIPIENT, settings.CONTACT_FORM_RECIPIENT]
            )
        recipients = list(dict.fromkeys(recipients))

        if not options["send"]:
            if recipients:
                raise CommandError("Use --send to allow diagnostic email delivery.")
            return
        if not recipients:
            raise CommandError(
                "--send requires --recipient or --form-recipients."
            )

        correlation_id = str(uuid4())
        self.stdout.write(f"probe_correlation_id={correlation_id}")
        for index, recipient in enumerate(recipients, start=1):
            message_id = send_traced_email(
                subject=f"LUA email diagnostic: {correlation_id}",
                body=(
                    "This is a diagnostic message from the LUA Django runtime.\n"
                    f"Correlation ID: {correlation_id}\n"
                    f"Probe: {index}"
                ),
                recipient=recipient,
                correlation_id=correlation_id,
                role=f"probe-{index}",
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f"handoff_accepted recipient={mask_email(recipient)} message_id={message_id}"
                )
            )