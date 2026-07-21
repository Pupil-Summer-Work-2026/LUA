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

## Turnstile

Protecting the contact, membership, and registry forms requires these variables in `.env` and in the deployed frontend/backend environments:

```dotenv
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
```

`VITE_TURNSTILE_SITE_KEY` is intentionally exposed to the browser so the widget can render. Keep `TURNSTILE_SECRET_KEY` on the Django server only; it is used to validate each `cf-turnstile-response` with Cloudflare before a form is processed. Restart both Vite and Django after changing either value.

For compatibility, the existing `VITE_TURNSTILE_API_KEY` and `TURNSTILE_SITE_KEY` variable names are also accepted. Prefer the names above for new deployments.

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
