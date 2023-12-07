from django.urls import path
from .views import NumberMathApi, NumberTriviaApi, NumberDateApi


urlpatterns = [
    path('<int:number>/', NumberMathApi.as_view(), name="number_math_api"),
    path('<int:number>/', NumberTriviaApi.as_view(), name="number_trivia_api"),
    path('<int:number>/', NumberDateApi.as_view(), name="number_date_api"),
    
]
    