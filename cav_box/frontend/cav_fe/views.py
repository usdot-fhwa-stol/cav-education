from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    context = {'question_id': 12}
    return render(request, 'cav_fe/index.html', context)

def detail(request,question_id):
    context = {'question_id': question_id}
    return render(request, 'cav_fe/index.html', context)