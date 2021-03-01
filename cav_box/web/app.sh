python manage.py inspectdb > cav_fe/models.py
python manage.py migrate
python manage.py createsuperuser --username admin --password admin
python manage.py runserver 0.0.0.0:8000