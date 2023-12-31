from django.urls import path
from .views import GlobalDictionaryDetail, GlobalDictionaryList, GlobalDictionaryQuery, PersonalDictionaryListCreate, PersonalDictionaryDetail, PersonalDictionaryQuery

urlpatterns = [
    path('', GlobalDictionaryList.as_view(), name='global-dictionary'),
    path('<int:number>/', GlobalDictionaryDetail.as_view(), name='dictionary-entry'),
    path('query/<str:query>/', GlobalDictionaryQuery.as_view(), name='global-dictionary-query'),
    path('personal/', PersonalDictionaryListCreate.as_view(), name='personal-dictionary'),
    path('personal/query/<str:query>/', PersonalDictionaryQuery.as_view(), name='personal-dictionary-query'),
    path('personal/<int:number>/', PersonalDictionaryDetail.as_view(), name='personal-dictionary-entry'),
]