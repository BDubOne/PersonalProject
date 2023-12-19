from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import DictionaryEntry, PersonalDictionaryEntry
from .serializers import DictionaryEntrySerializer, RelatedEntry, PersonalRelatedEntry, PersonalDictionaryEntrySerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, Http404

from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)


class GlobalDictionaryList(generics.ListCreateAPIView):  
    queryset = DictionaryEntry.objects.all().order_by('number')
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]    
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            # Handle validation errors
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class GlobalDictionaryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DictionaryEntry.objects.all()
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] 
    lookup_field = 'number'

    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super(GlobalDictionaryDetail, self).get_permissions()



class GlobalDictionaryQuery(generics.ListAPIView):   
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    

    def get_queryset(self):
        query = self.kwargs.get('query')
        queryset = DictionaryEntry.objects.all().order_by('number')
        try:
            if query.isdigit():
                related_entries = RelatedEntry.objects.filter(to_entry__number=int(query)).values_list('from_entry__number', flat=True)
                queryset = queryset.filter(number__in=related_entries)

                # Create a set of unique numbers including the query number
                numbers = set(related_entries) | {int(query)}

                # Filter queryset by the set of numbers
                queryset = queryset.filter(number__in=numbers)
            else:
                queryset = queryset.filter(key_words__contains=[query])
            
            return queryset
        except DictionaryEntry.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)
        
class PersonalDictionaryListCreate(generics.ListCreateAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        return PersonalDictionaryEntry.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(student=self.request.user)
        else:
            # Handle validation errors
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

# For retrieving, updating, and destroying individual entries
class PersonalDictionaryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "number"
   

    def get_queryset(self):
        try:

            return PersonalDictionaryEntry.objects.filter(student=self.request.user)
        except PersonalDictionaryEntry.DoesNotExist:
            raise Http404("Personal dictionary entry not found")

    

class PersonalDictionaryQuery(generics.ListAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # @ratelimit(key=user_or_admin_key, rate='30/h', method="GET", block=True)
    def get_queryset(self):
        query = self.kwargs.get('query')
        queryset = PersonalDictionaryEntry.objects.filter(student=self.request.user)

        try:

            if query.isdigit():
                # Query is a number, filter by personal related entry number
                related_entries = PersonalRelatedEntry.objects.filter(to_personal_entry__number=int(query), from_personal_entry__student=self.request.user).values_list('from_personal_entry__number', flat=True)
                # Create a set of unique numbers including the query number
                numbers = set(related_entries) | {int(query)}

                # Filter queryset by the set of numbers
                queryset = queryset.filter(number__in=numbers)
            else:
                # Query is a string, filter by personal keyword
                queryset = queryset.filter(personal_key_words__contains=[query])
            
            return queryset
        
        except Exception as e:
            raise Http404("error occured while processing query")




