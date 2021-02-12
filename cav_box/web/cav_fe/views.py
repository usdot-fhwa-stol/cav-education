from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers

from django.shortcuts import render
import datetime
import sys
import string
from collections import defaultdict
from .models import incomming_dsrc_message

def index(request):
    messageDict = {'messages': incomming_dsrc_message.objects.all}
    return render(request, 'cav_fe/index.html', messageDict)

def detail(request,question_id):
    context = {'user_id': user_id}
    return render(request, 'cav_fe/index.html', context)

def postMessageFilters(request):
    datetimepicker_end_datetime_str = request.POST.get('datetimepicker_end_datetime_str')
    end_date = datetime.datetime.strptime(datetimepicker_end_datetime_str, '%m/%d/%Y %H:%M %p')
   
    datetimepicker_start_datetime_str = request.POST.get('datetimepicker_start_datetime_str')
    start_date = datetime.datetime.strptime(datetimepicker_end_datetime_str, '%m/%d/%Y %H:%M %p')
    
    filter_msg_type = request.POST.get('filter_msg_type')
    
    resultSet = incomming_dsrc_message.objects.all()

    if len(filter_msg_type) > 0:
        print(len(filter_msg_type))
        resultSet = resultSet.filter(value=filter_msg_type)

    if len(datetimepicker_start_datetime_str) > 0 :
        print(len(datetimepicker_start_datetime_str))
       # resultSet = resultSet.filter(timestamp__gte=start_date)

    if len(datetimepicker_start_datetime_str) > 0:
        print(len(datetimepicker_start_datetime_str))
      #  resultSet = resultSet.filter(timestamp__gte=end_date)
        
    print(request.POST)
    data = serializers.serialize('json',resultSet,fields=('messageId','value','timestamp','payload'))
    return HttpResponse(data, content_type="application/json")
