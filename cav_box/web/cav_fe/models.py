from django.db import models
from datetime import datetime

# Create your models here.
from django.db import models
class incomming_dsrc_message(models.Model):
    messageId=models.CharField(max_length=255)
    value=models.TextField(default="")
    timestamp=models.DateTimeField(default=datetime.now,blank=True)
    payload=models.TextField(default="")
