from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    context = {'user_id': 0}
    return render(request, 'cav_fe/index.html', context)

def detail(request,question_id):
    context = {'user_id': user_id}
    return render(request, 'cav_fe/index.html', context)