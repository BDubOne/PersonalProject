import requests
import pprint
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response


class NumberMathApi(APIView):
    def get(self, request, number):
  
        endpoint = f"http://numbersapi.com/{number}/math"

        response = requests.get(endpoint)
        response_json = response.json()
        return Response({"image": response_json})
    
class NumberTriviaApi(APIView):
    def get(self, request, number):
  
        endpoint = f"https://numbersapi.com/{number}/trivia"

        response = requests.get(endpoint)
        response_json = response.json()
        return Response({"image": response_json})
    
class NumberDateApi(APIView):
    def get(self, request, number):
  
        endpoint = f"https://numbersapi.com/{number}/date"

        response = requests.get(endpoint)
        response_json = response.json()
        return Response({"image": response_json})