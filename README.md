# LUA

## Development

This project combines a Django API and admin with a Vite/React website. Install Python 3.12 or later and Node.js 18 or later.

The quickest local setup is:

```powershell
.\run.bat
```

It creates the virtual environment if needed, installs the Python and Node dependencies, applies migrations, and starts Django at `http://127.0.0.1:8000` and Vite at the URL printed by Vite.

To start each service manually:

```powershell
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py runserver
npm.cmd install
npm.cmd run dev
```

## Production deployment

The production stack runs the Vite frontend, Django API/admin, PostgreSQL, and Caddy on one Linux VPS:

```text
Browser -> Caddy -> React frontend / Django Gunicorn -> PostgreSQL
```

Caddy is the only public container. It manages HTTPS certificates, serves the compiled React application, `/static/`, and `/media/`, and proxies `/api/` and `/admin/` to Gunicorn. PostgreSQL and Gunicorn stay on Docker's internal network.

### First deployment

Install Docker Engine with the Compose plugin on the VPS, clone the repository, and create the deployment environment file:

```bash
cp .env.example .env
chmod 600 .env
```

Set the required values in `.env` before starting the stack. At minimum configure `DOMAIN`, `SECRET_KEY`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, the three `POSTGRES_*` credentials, and the email settings. `VITE_TURNSTILE_SITE_KEY` is a frontend build-time value; `TURNSTILE_SECRET_KEY` is server-only.

Point the domain's DNS records to the VPS. When using Cloudflare, enable the proxy and set **SSL/TLS encryption mode** to **Full (strict)**. Do not use Flexible mode.

The default HSTS lifetime is 30 days. Leave `SECURE_HSTS_INCLUDE_SUBDOMAINS` and `SECURE_HSTS_PRELOAD` disabled until every current and future subdomain is guaranteed to serve HTTPS.

Build and start the services:

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f web
```

Create the first editorial user after the stack is healthy:

```bash
docker compose exec web python manage.py createsuperuser
```

### Updating

Pull the changed code and rebuild the stack:

```bash
git pull
docker compose up --build -d
```

The backend entrypoint applies migrations and runs `collectstatic` before Gunicorn starts. This is appropriate for the initial single `web` service. Move migrations to a dedicated deployment job before running multiple backend replicas.

### Persistent data and backups

Compose keeps PostgreSQL, uploaded files, Django static files, and Caddy certificate state in named volumes. Rebuilding or restarting containers does not remove these volumes.

Do not run the following command in production unless intentionally destroying all persistent database and upload data:

```bash
docker compose down -v
```

Take off-VPS backups of both PostgreSQL and media files. A database dump can be created with:

```bash
docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > lua-db-backup.sql
```

Use `docker volume ls` to find the Compose media volume, archive it regularly, and copy both backup artifacts to storage outside the VPS. Test restoring a database dump and media archive before launch.

### Operations checks

```bash
docker compose ps
docker compose logs --tail=100 web
docker compose logs --tail=100 caddy
docker compose exec web python manage.py check --deploy
```

Verify the deployed domain, a direct client-side route such as `/kontakti`, `/api/posts/`, `/admin/`, an uploaded image under `/media/`, and the public form submissions after each initial deployment.

## Turnstile

Protecting the contact, membership, and registry forms requires these variables in `.env` and in the deployed frontend/backend environments:

```dotenv
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
```

`VITE_TURNSTILE_SITE_KEY` is intentionally exposed to the browser so the widget can render. Keep `TURNSTILE_SECRET_KEY` on the Django server only; it is used to validate each `cf-turnstile-response` with Cloudflare before a form is processed. Restart both Vite and Django after changing either value.

For compatibility, the existing `VITE_TURNSTILE_API_KEY` and `TURNSTILE_SITE_KEY` variable names are also accepted. Prefer the names above for new deployments.

## Form rate limits

After Turnstile succeeds, Django rate-limits email-sending form submissions by client IP to limit spam and email abuse. The defaults are five total form submissions per hour, with additional per-form limits of three contact submissions per hour, two membership submissions per day, and three registry submissions per day. Exceeding a limit returns JSON `429 Too Many Requests` with a `Retry-After` header; no email is sent.

The limits can be adjusted with these server-only environment variables:

```dotenv
FORM_RATE_LIMIT_SHARED_LIMIT=5
FORM_RATE_LIMIT_SHARED_WINDOW_SECONDS=3600
FORM_RATE_LIMIT_CONTACT_LIMIT=3
FORM_RATE_LIMIT_CONTACT_WINDOW_SECONDS=3600
FORM_RATE_LIMIT_MEMBERSHIP_LIMIT=2
FORM_RATE_LIMIT_MEMBERSHIP_WINDOW_SECONDS=86400
FORM_RATE_LIMIT_REGISTRY_LIMIT=3
FORM_RATE_LIMIT_REGISTRY_WINDOW_SECONDS=86400
```

The default Django local-memory cache makes these limits effective for one Django process. Configure `FORM_RATE_LIMIT_CACHE_ALIAS` to use a shared Django cache alias before running multiple backend workers or replicas. Keep `FORM_RATE_LIMIT_TRUST_X_FORWARDED_FOR=False` unless a trusted reverse proxy removes client-supplied forwarding headers and sets its own.

## Blog publishing

Create the first editorial account with:

```powershell (Windows)
python manage.py createsuperuser
```
```Bash (Linux/MacOS)
python3 manage.py createsuperuser
```

Open `http://127.0.0.1:8000/admin/` to manage reusable tags and publish posts. Each post can have any number of tags and an ordered set of images. The image with the lowest position becomes the cover shown on the news list; all post images appear in the article gallery. Add useful alt text for every image.

The public read-only API is available at:

- `GET /api/posts/`
- `GET /api/posts/<id>/`
- `GET /api/tags/`
- `GET /api/members/`
- `GET /api/members/<id>/`
- `GET /api/honorable-members/`
- `GET /api/honorable-members/<id>/`
- `GET /api/member-tags/`

The Vite development server proxies `/api` and `/media` to Django. Uploaded files are stored locally in `media/` and served by Django only while `DEBUG=True`; this directory is intentionally not committed. Production deployment needs persistent media storage and web-server or object-storage configuration.

## Email diagnostics

Restart Django after changing any `.env` mail setting. The development autoreloader can inherit values that `python-dotenv` loaded when the parent process first started, so editing `.env` alone may leave the running server on an older backend or recipient configuration.

Print the effective Django email configuration without exposing the SMTP password or sending mail:

```powershell
.\venv\Scripts\python.exe manage.py diagnose_email
```

The command masks addresses and includes short fingerprints so values can be compared between local and deployed runtimes. To explicitly send uniquely traceable probes to the configured association recipients:

```powershell
.\venv\Scripts\python.exe manage.py diagnose_email --send --form-recipients
```

Use a separate Gmail or control mailbox for comparison by repeating `--recipient` as needed:

```powershell
.\venv\Scripts\python.exe manage.py diagnose_email --send --recipient test@example.com --recipient control@example.net
```

Each probe and form submission logs a correlation ID, Message-ID, masked recipient, backend send count, and duration. The frontend also writes the correlation ID to the browser console. A send count of `1` confirms that the configured backend accepted the handoff; use the Message-ID to search Gmail with `rfc822msgid:<Message-ID>` when checking downstream delivery.

## Verification

```powershell
.\venv\Scripts\python.exe manage.py test blogs
npm.cmd run build
```
