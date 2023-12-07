from rest_framework import serializers
from .models import DictionaryEntry

class DictionaryEntrySerializer(serializers.ModelSerializer):
    related_entries = serializers.SerializerMethodField()

    class Meta:
        model = DictionaryEntry
        fields = '__all__'

    def get_related_entries(self, obj):
        return [entry.number for entry in obj.related_entries.all()]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['related_entries'] = self.get_related_entries(instance)
        return ret
    
    def to_internal_value(self, data):
        related_entries = data.get('related_entries')
        if related_entries is not None and isinstance(related_entries, list):
            entries = DictionaryEntry.objects.filter(number__in=related_entries)
            data['related_entries'] = [entry.id for entry in entries]
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        related_entries_data = validated_data.pop('related_entries', [])
        dictionary_entry = DictionaryEntry.objects.create(**validated_data)
        for entry_id in related_entries_data:
            entry = DictionaryEntry.objects.get(id=entry_id)
            dictionary_entry.related_entries.add(entry)
        return dictionary_entry
    def update(self, instance, validated_data):
        related_entries_data= validated_data.pop('related_entries', None)

        if related_entries_data is not None:
            instance.related_entries.clear()
            for entry_id in related_entries_data:
                entry = DictionaryEntry.objects.get(id=entry_id)
                instance.related_entries.add(entry)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
