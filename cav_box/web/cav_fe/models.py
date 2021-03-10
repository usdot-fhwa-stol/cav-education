from django.db import models
from datetime import datetime

# Create your models here.
from django.db import models
class incomming_dsrc_message(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.CharField(max_length=100)
    message_type = models.CharField(max_length=10, default="")
    payload = models.CharField(max_length=4000)
    original_message = models.CharField(max_length=4000, default="")
