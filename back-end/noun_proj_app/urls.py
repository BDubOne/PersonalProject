from django.urls import path
from .views import NounProject


urlpatterns = [
    path('<str:word>/', NounProject.as_view(), name="noun_project")
    
]