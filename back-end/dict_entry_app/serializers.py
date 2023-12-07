from rest_framework import serializers
from .models import DictionaryEntry, PersonalDictionaryEntry

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
            entry_map = {e.number: e for e in DictionaryEntry.objects.filter(number__in=related_entries)}
            data['related_entries'] = [entry_map[number].id for number in related_entries if number in entry_map]
        return super().to_internal_value(data)
    
    def create(self, validated_data):
        related_entries_data = validated_data.pop('related_entries', [])
        dictionary_entry = DictionaryEntry.objects.create(**validated_data)
        self.update_related_entries(dictionary_entry, related_entries_data)
        return dictionary_entry
    
    def update(self, instance, validated_data):
        related_entries_data= validated_data.pop('related_entries', None)
        self.update_related_entries(instance, related_entries_data)
    
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
    
        instance.save()
        return instance
    
    def update_related_entries(self, instance, related_entries_data):
        if related_entries_data is not None:
        # Clear existing related entries
            instance.related_entries.clear()
            for number in related_entries_data:
                try:
                    entry = DictionaryEntry.objects.get(number=number)
                    instance.related_entries.add(entry)
                except DictionaryEntry.DoesNotExist:
                    raise serializers.ValidationError({'related_entries': f'DictionaryEntry with number {number} does not exist.'})
                
class PersonalDictionaryEntrySerializer(serializers.ModelSerializer):
    global_number = serializers.IntegerField(source='global_entry.number', read_only=True)
    global_descriptions = serializers.ReadOnlyField(source='global_entry.descriptions')
    global_key_words = serializers.ReadOnlyField(source='global_entry.key_words')

    personal_related_entries = serializers.SerializerMethodField()

    class Meta:
        model = PersonalDictionaryEntry
        fields = ['id', 'global_entry', 'global_number', 'global_descriptions', 'global_key_words', 'number', 'personal_descriptions', 'personal_key_words', 'personal_related_entries']
        extra_kwargs = {'global_entry': {'write_only': True}}

    def get_personal_related_entries(self, obj):
        return [entry.number for entry in obj.personal_related_entries.all()]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['personal_related_entries'] = self.get_personal_related_entries(instance)
        return ret
    
    
    def create(self, validated_data):
        personal_related_entries_data = validated_data.pop('personal_related_entries', [])
        personal_dictionary_entry = PersonalDictionaryEntry.objects.create(**validated_data)
        self.update_personal_related_entries(personal_dictionary_entry, personal_related_entries_data)
        return personal_dictionary_entry
    
    def update(self, instance, validated_data):
        personal_related_entries_data = validated_data.pop('personal_related_entries', None)
        self.update_personal_related_entries(instance, personal_related_entries_data)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    
    def update_personal_related_entries(self, instance, related_entries_data):
        if related_entries_data is not None:
            instance.personal_related_entries.clear()
            for number in related_entries_data:
                try:
                    entry = PersonalDictionaryEntry.objects.get(number=number, student=instance.student)
                    instance.personal_related_entries.add(entry)
                except PersonalDictionaryEntry.DoesNotExist:
                    raise serializers.ValidationError({'personal_related_entries': f'PersonalDictionaryEntry with number {number} does not exist.'})



