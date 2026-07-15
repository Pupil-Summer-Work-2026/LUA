@echo off
echo This is a batch file to set up a development environment. Do NOT use this in production.
echo Please ensure that you have Python 3.12 or higher installed and added to your PATH.
if not exist "venv\Scripts\python.exe" (
	python -m venv venv
	if errorlevel 1 exit /b 1
)
start "" cmd /k "venv\Scripts\python.exe -m pip install --upgrade pip && venv\Scripts\python.exe -m pip install -r requirements.txt && venv\Scripts\python.exe manage.py migrate && venv\Scripts\python.exe manage.py runserver"
start "" cmd /k "npm.cmd install && npm.cmd run dev"