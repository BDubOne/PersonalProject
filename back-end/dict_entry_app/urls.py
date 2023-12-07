from django.urls import path
from .views import GlobalDictionaryDetail, GlobalDictionaryList, GlobalDictionaryQuery, PersonalDictionaryList, PersonalDictionaryDetail, PersonalDictionaryQuery

urlpatterns = [
    path('', GlobalDictionaryList.as_view(), name='global-dictionary'),
    path('<int:number>/', GlobalDictionaryDetail.as_view(), name='dictionary-entry'),
    path('global-dictionary/query/<str:query>/', GlobalDictionaryQuery.as_view(), name='global-dictionary-query'),
    path('personal/', PersonalDictionaryList.as_view(), name='personal-dictionary'),
    path('personal/query/<str:query>/', PersonalDictionaryQuery.as_view(), name='personal-dictionary-query'),
    path('personal/<int:number>/', PersonalDictionaryDetail.as_view(), name='personal-dictionary-entry'),
]