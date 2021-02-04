from django.db import models

# Create your models here.
from django.db import models
class incomming_dsrc_message(models.Model):
    messageId=models.CharField(max_length=100)
    value=models.CharField(max_length=150)
    timestamp=models.CharField(max_length=100)
    payload=models.CharField(max_length=1000)
