from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import DictionaryEntry, PersonalDictionaryEntry
from .serializers import DictionaryEntrySerializer, RelatedEntry, PersonalRelatedEntry, PersonalDictionaryEntrySerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django_ratelimit.decorators import ratelimit
from django_ratelimit.core import get_usage, is_ratelimited


def user_or_admin_key(group, request):
    if request.user.is_staff:
        return "admin"
    return request.user.username


class GlobalDictionaryList(generics.ListCreateAPIView):  
    queryset = DictionaryEntry.objects.all().order_by('number')
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]    
    
    def create(self, request, *args, **kwargs):
        try:
            return super(GlobalDictionaryList, self).create(request, *args, **kwargs)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

class GlobalDictionaryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DictionaryEntry.objects.all()
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] 
    lookup_field = 'number'

    # @ratelimit(key=user_or_admin_key, rate='30/h', method="GET", block=True)
    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]


class GlobalDictionaryQuery(generics.ListAPIView):   
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # @ratelimit(key=user_or_admin_key, rate='30/h', method="GET", block=True)
    def list(self, request, *args, **kwargs):
        query = self.kwargs.get('query')

        if not query:
            return Response({"detail": "Query parameter is missing."}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset(query)
        if queryset.exists():
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "No matching entries found."}, status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self, query):
        queryset = DictionaryEntry.objects.all().order_by('number')

        if query.isdigit():
            related_entries = RelatedEntry.objects.filter(to_entry__number=int(query)).values_list('from_entry__number', flat=True)
            queryset = queryset.filter(number__in=related_entries)
        else:
            queryset = queryset.filter(key_words__contains=[query])

        return queryset
        
class PersonalDictionaryListCreate(generics.ListCreateAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PersonalDictionaryEntry.objects.filter(student=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
    def perform_create(self, serializer):
    
        serializer.save(student=self.request.user)

# For retrieving, updating, and destroying individual entries
class PersonalDictionaryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "number"
   
    # @ratelimit(key=user_or_admin_key, rate='30/h', method="GET", block=True)
    # @ratelimit(key=user_or_admin_key, rate='5/d', method="GET", block=True)
    def get_queryset(self):
        return PersonalDictionaryEntry.objects.filter(student=self.request.user)

    

class PersonalDictionaryQuery(generics.ListAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # @ratelimit(key=user_or_admin_key, rate='30/h', method="GET", block=True)
    def get_queryset(self):
        query = self.kwargs.get('query')
        queryset = PersonalDictionaryEntry.objects.filter(student=self.request.user)

        if query.isdigit():
            # Query is a number, filter by personal related entry number
            related_entries = PersonalRelatedEntry.objects.filter(to_personal_entry__number=int(query), from_personal_entry__student=self.request.user).values_list('from_personal_entry__number', flat=True)
            queryset = queryset.filter(number__in=related_entries)
        else:
            # Query is a string, filter by personal keyword
            queryset = queryset.filter(personal_key_words__contains=[query])
        
        return queryset




