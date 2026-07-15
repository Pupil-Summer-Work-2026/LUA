echo This is a batch file to setup a development environment. Do NOT use this in production.
echo Please ensure that you have Python 3.8 or higher installed and added to your PATH.
start "" cmd /k "python -m venv venv && venv\Scripts\activate && pip install --upgrade pip && pip install -r requirements.txt && python manage.py migrate && python manage.py runserver"