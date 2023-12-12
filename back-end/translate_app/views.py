import requests
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from django.http import JsonResponse
from googletrans import Translator
from pprint import pprint

class TranslateView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        original_text = data.get("text", "en")
        target_language = data.get("target_language", "en")  # Default to English
        try:

      
            translator = Translator()
            translation = translator.translate(original_text, dest=target_language)
            return JsonResponse({
                "original_text": original_text,
                "translated_text": translation.text,
                "target_language": target_language
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)},status=status.HTTP_400_BAD_REQUEST)