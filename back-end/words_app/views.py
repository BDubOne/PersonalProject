import requests
import pprint
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response


class DictApi(APIView):
    def get(self, request, word):
  
        endpoint = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"

        response = requests.get(endpoint)
        response_json = response.json()
        return Response({"image": response_json})

