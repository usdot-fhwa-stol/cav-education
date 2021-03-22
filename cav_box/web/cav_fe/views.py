from django.http import HttpResponse
from django.db.models import Q
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
    context = {'question_id': question_id}
    return render(request, 'cav_fe/index.html', context)

def postMessageFilters(request):
    datetimepicker_end_datetime_str = request.POST.get('datetimepicker_end_datetime_str')
    if len(datetimepicker_end_datetime_str) > 0:
        end_date = datetime.datetime.strptime(datetimepicker_end_datetime_str, '%m/%d/%Y %I:%M %p')

    datetimepicker_start_datetime_str = request.POST.get('datetimepicker_start_datetime_str')

    if len(datetimepicker_start_datetime_str) > 0:
        start_date = datetime.datetime.strptime(datetimepicker_start_datetime_str, '%m/%d/%Y %I:%M %p')

    filter_msg_type = request.POST.get('filter_msg_type')

    resultSet = incomming_dsrc_message.objects.all()

    # filter_msg_type is a string containing commas
    if len(filter_msg_type) > 0:
        filter_msg_type_array = filter_msg_type.strip(',').split(',')
        resultSet = resultSet.filter(Q(message_type__in=filter_msg_type_array) | Q(message_type=filter_msg_type))
        print(filter_msg_type_array)

    if len(datetimepicker_start_datetime_str) > 0:
        print(len(datetimepicker_start_datetime_str))
        print(start_date)
        resultSet = resultSet.filter(timestamp__gte=start_date)

    if len(datetimepicker_start_datetime_str) > 0:
        print(len(datetimepicker_start_datetime_str))
        print(end_date)
        resultSet = resultSet.filter(timestamp__lte=end_date)

    print(resultSet)
    data = serializers.serialize('json',resultSet,fields=('message_type','timestamp','payload','original_message'))
    return HttpResponse(data, content_type="application/json")