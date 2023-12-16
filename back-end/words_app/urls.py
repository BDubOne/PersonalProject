from django.urls import path
from .views import DictApi


urlpatterns = [
    path('<str:word>/', DictApi.as_view(), name="dictionary_api"),

    
]