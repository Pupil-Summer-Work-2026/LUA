@echo off
echo This is a batch file to set up a development environment. Do NOT use this in production.
echo Please ensure that you have Python 3.12 or higher installed and added to your PATH.
if not exist "venv\Scripts\python.exe" (
    python -m venv venv
    if errorlevel 1 exit /b 1
    venv\Scripts\python.exe -m pip install --upgrade pip
)

venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 exit /b 1

if not exist ".env" (
    venv\Scripts\python.exe -c "from pathlib import Path; from django.core.management.utils import get_random_secret_key; Path('.env').write_text('SECRET_KEY=' + get_random_secret_key() + '\nEMAIL_BACKEND=django.core.mail.backends.console.EmailBackend\nEMAIL_HOST_USER=\nEMAIL_HOST_PASSWORD=\n', encoding='utf-8')"
    if errorlevel 1 exit /b 1
)

npm.cmd install
if errorlevel 1 exit /b 1

start "" cmd /k "venv\Scripts\python.exe manage.py migrate && venv\Scripts\python.exe manage.py runserver"
start "" cmd /k "npm.cmd run dev"