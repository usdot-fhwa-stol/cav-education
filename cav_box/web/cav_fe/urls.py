from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:user_id>/', views.detail, name='detail'),
    path('post/ajax/message_filters', views.postMessageFilters, name = "post_message_filters")
]