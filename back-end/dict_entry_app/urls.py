from django.urls import path
from .views import DictionaryEntryDetail

urlpatterns = [
    path('entry/<int:number>/', DictionaryEntryDetail.as_view(), name='dictionary-entry'),
]