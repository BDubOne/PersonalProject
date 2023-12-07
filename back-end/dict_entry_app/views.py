from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import DictionaryEntry
from .serializers import DictionaryEntrySerializer
from django.shortcuts import get_object_or_404

class DictionaryEntryDetail(generics.RetrieveUpdateAPIView):
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



