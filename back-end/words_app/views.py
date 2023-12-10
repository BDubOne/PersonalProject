import requests
from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response


class DictApi(APIView):
    def get(self, request, word):
        endpoint = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
        response = requests.get(endpoint)

        if response.status_code != 200:
            # Handle error (e.g., word not found or API issue)
            return Response({"error": "Word not found or API issue"}, status=response.status_code)

        response_json = response.json()

        # Initialize data structure to send
        data_to_send = {
            "word": word,
            "phonetic": "",
            "meanings": []
        }

        for item in response_json:
            if 'phonetic' in item:
                data_to_send["phonetic"] = item['phonetic']

            for meaning in item.get('meanings', []):
                meaning_data = {
                    "partOfSpeech": meaning['partOfSpeech'],
                    "definitions": [],
                    "synonyms": meaning.get('synonyms', []),
                    "antonyms": meaning.get('antonyms', [])
                }

                for definition in meaning.get('definitions', []):
                    definition_data = {
                        "definition": definition['definition'],
                        "examples": definition.get('example', [])
                    }
                    meaning_data["definitions"].append(definition_data)

                data_to_send["meanings"].append(meaning_data)
        
        return Response(data_to_send)

