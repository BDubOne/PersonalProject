import requests
import pprint
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response


class NumberMathApi(APIView):
    def get(self, request, number):
        unique_responses = set()
        responses = []
        max_calls = 10
        call_count = 0
        endpoint = f"http://numbersapi.com/{number}/math"
        while len(responses) < 6 and call_count < max_calls:
            call_count += 1
            response = requests.get(endpoint)
            response_text = response.text

            if response_text not in unique_responses:
                unique_responses.add(response_text)
                responses.append(response_text)
        return Response({"data": responses})
    
class NumberTriviaApi(APIView):
    def get(self, request, number):
        unique_responses = set()
        responses = []
        max_calls = 10
        call_count = 0
        endpoint = f"http://numbersapi.com/{number}/trivia"
        while len(responses) < 6 and call_count < max_calls:
            call_count += 1
            response = requests.get(endpoint)
            response_text = response.text

            if response_text not in unique_responses:
                unique_responses.add(response_text)
                responses.append(response_text)
        return Response({"data": responses})
    
class NumberDateApi(APIView):
    def get(self, request, number):
        unique_responses = set()
        responses = []
        max_calls = 10
        call_count = 0      
  
        endpoint = f"http://numbersapi.com/{number}/date"
        while len(responses) < 6 and call_count < max_calls:
            call_count += 1
            response = requests.get(endpoint)
            response_text = response.text

            if response_text not in unique_responses:
                unique_responses.add(response_text)
                responses.append(response_text)
        return Response({"data": responses})