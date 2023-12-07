import requests
import pprint
from django.shortcuts import render
from gematria_proj.settings import env

from rest_framework.views import APIView
from rest_framework.response import Response
from requests_oauthlib import OAuth1

class NounProject(APIView):
    def get(self, request, word):
        noun_project_api_key = env.get("NOUN_PROJECT_API_KEY")
        noun_project_secret_key=env.get("NOUN_PROJECT_SECRET_KEY")

        auth = OAuth1(noun_project_api_key,noun_project_secret_key)
        endpoint = f"https://api.thenounproject.com/v2/icon?query={word}"

        response = requests.get(endpoint, auth=auth)
        response_json = response.json()["icons"][0]["thumbnail_url"]
        return Response({"image": response_json})
