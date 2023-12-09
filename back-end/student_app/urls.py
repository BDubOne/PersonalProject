
from django.urls import path
from .views import SignUp, LogIn, LogOut, Info, MasterSignUp


urlpatterns = [
    path("info/", Info.as_view(), name="info"),
    path("master/", MasterSignUp.as_view(), name='master'),
    path("signup/", SignUp.as_view(), name='signup'),
    path("login/", LogIn.as_view(), name="login"),
    path("logout/", LogOut.as_view(), name='logout'),
   
    
]

    