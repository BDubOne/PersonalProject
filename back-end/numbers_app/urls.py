from django.urls import path
from .views import NumberMathApi, NumberTriviaApi, NumberDateApi


urlpatterns = [
    path('<int:number>/math/', NumberMathApi.as_view(), name="number_math_api"),
    path('<int:number>/trivia/', NumberTriviaApi.as_view(), name="number_trivia_api"),
    path('<int:number>/date/', NumberDateApi.as_view(), name="number_date_api"),
    
]
    