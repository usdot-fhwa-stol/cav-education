# python manage.py inspectdb > cav_fe/models.py
python manage.py makemigrations
python manage.py migrate
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'cav@cav.com', 'admin')"
python manage.py runserver 0.0.0.0:8000