from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import DictionaryEntry, PersonalDictionaryEntry
from .serializers import DictionaryEntrySerializer, PersonalDictionaryEntrySerializer
from django.shortcuts import get_object_or_404

class GlobalDictionaryList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset=DictionaryEntry.objects.all()
    serializer_class = DictionaryEntrySerializer

class GlobalDictionaryDetail(generics.RetrieveUpdateAPIView):
    queryset = DictionaryEntry.objects.all()
    serializer_class = DictionaryEntrySerializer
    lookup_field = 'number'  # Configure the view to use 'number' instead of 'pk'
    permission_classes = [permissions.IsAuthenticated]  # Requires users to be authenticated

    def get_object(self):
        # Override get_object to retrieve by number
        number = self.kwargs.get('number')
        return get_object_or_404(DictionaryEntry, number=number)

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
            # Query is a number, filter by related entry number
            queryset = queryset.filter(related_entries__number=int(query))
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
            personal_related_entry = PersonalDictionaryEntry.objects.filter(number=int(query), student=self.request.user).first()
            if personal_related_entry:
                queryset = queryset.filter(personal_related_entries=personal_related_entry)
        else:
            # Query is a string, filter by personal keyword
            queryset = queryset.filter(personal_key_words__contains=[query])
        
        return queryset




