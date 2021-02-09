from django.http import HttpResponse
from django.shortcuts import render
from .models import incomming_dsrc_message

def index(request):
    messageDict = {'messages': incomming_dsrc_message.objects.all}
    return render(request, 'cav_fe/index.html', messageDict)

def detail(request,question_id):
    context = {'user_id': user_id}
    return render(request, 'cav_fe/index.html', context)