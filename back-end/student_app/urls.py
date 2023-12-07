
from django.urls import path
from .views import SignUp, LogIn, LogOut, Info, MasterSignUp
from dict_entry_app.views import PersonalDictionaryList, PersonalDictionaryDetail

urlpatterns = [
    path("info/", Info.as_view(), name="info"),
    path("master/", MasterSignUp.as_view(), name='master'),
    path("signup/", SignUp.as_view(), name='signup'),
    path("login/", LogIn.as_view(), name="login"),
    path("logout/", LogOut.as_view(), name='logout'),
    path("dictionary/", PersonalDictionaryList.as_view(), name='personal_dictionary'),
    path('dictionary/<int:number>', PersonalDictionaryDetail.as_view(), name='personal-dictionary-detail')
    
]

    