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

## Blog publishing

Create the first editorial account with:

```powershell
.\venv\Scripts\python.exe manage.py createsuperuser
```

Open `http://127.0.0.1:8000/admin/` to manage reusable tags and publish posts. Each post can have any number of tags and an ordered set of images. The image with the lowest position becomes the cover shown on the news list; all post images appear in the article gallery. Add useful alt text for every image.

The public read-only API is available at:

- `GET /api/posts/`
- `GET /api/posts/<id>/`
- `GET /api/tags/`

The Vite development server proxies `/api` and `/media` to Django. Uploaded files are stored locally in `media/` and served by Django only while `DEBUG=True`; this directory is intentionally not committed. Production deployment needs persistent media storage and web-server or object-storage configuration.

## Verification

```powershell
.\venv\Scripts\python.exe manage.py test blogs
npm.cmd run build
```