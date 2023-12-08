from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import DictionaryEntry, PersonalDictionaryEntry
from .serializers import DictionaryEntrySerializer, RelatedEntry, PersonalRelatedEntry, PersonalDictionaryEntrySerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

class GlobalDictionaryList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset=DictionaryEntry.objects.all()
    serializer_class = DictionaryEntrySerializer

class GlobalDictionaryDetail(generics.RetrieveUpdateAPIView):
    queryset = DictionaryEntry.objects.all()
    serializer_class = DictionaryEntrySerializer
    lookup_field = 'number'
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        number = self.kwargs.get('number')
        entries = DictionaryEntry.objects.filter(number=number)

        # If there's more than one entry, handle accordingly
        if entries.count() > 1:
            serializer = self.get_serializer(entries, many=True)
            return Response(serializer.data)
        elif entries.exists():
            # If only one entry is found, behave as usual
            serializer = self.get_serializer(entries.first())
            return Response(serializer.data)
        else:
            # No entries found
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        # Ensure that only superusers can delete entries
        if request.user.is_superuser:
            return self.destroy(request, *args, **kwargs)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
class GlobalDictionaryQuery(generics.ListAPIView):
    serializer_class = DictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.kwargs.get('query')
        queryset = DictionaryEntry.objects.all()

        if query.isdigit():
            related_entries = RelatedEntry.objects.filter(to_entry__number=int(query)).values_list('from_entry__number', flat=True)
            queryset = queryset.filter(number__in=related_entries)
        else:
            # Query is a string, filter by keyword
            queryset = queryset.filter(key_words__contains=[query])
        
        return queryset
        
class PersonalDictionaryList(generics.ListCreateAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        return PersonalDictionaryEntry.objects.filter(student=self.request.user)
    
class PersonalDictionaryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PersonalDictionaryEntry.objects.filter(student=self.request.user)
    
    def perform_create(self, serializer):
        global_entry = get_object_or_404(DictionaryEntry, number=self.kwargs.get('number'))
        serializer.save(student=self.request.user, global_entry = global_entry)


class PersonalDictionaryQuery(generics.ListAPIView):
    serializer_class = PersonalDictionaryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

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




