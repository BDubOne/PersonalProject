from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import DictionaryEntry, PersonalDictionaryEntry, RelatedEntry, PersonalRelatedEntry


class RelatedEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = RelatedEntry
        fields = ['from_entry', 'to_entry']  # Assuming these are the field names in RelatedEntry model

    # Optional: Add validation to ensure 'to_entry' exists
    def validate_to_entry(self, value):
        if not DictionaryEntry.objects.filter(number=value).exists():
            raise serializers.ValidationError("DictionaryEntry with the provided number does not exist.")
        return value

class DictionaryEntrySerializer(serializers.ModelSerializer):
    related_entries = serializers.SerializerMethodField()

    class Meta:
        model = DictionaryEntry
        fields = ['id', 'number', 'description', 'key_words', 'related_entries']

    def get_related_entries(self, obj):
        # Get related entries where current object is 'from_entry'
        from_related_numbers = RelatedEntry.objects.filter(
            from_entry=obj
        ).values_list('to_entry__number', flat=True)

        # Get related entries where current object is 'to_entry'
        to_related_numbers = RelatedEntry.objects.filter(
            to_entry=obj
        ).values_list('from_entry__number', flat=True)

        # Combine and deduplicate the numbers, excluding the current object's number
        related_numbers = set(list(from_related_numbers) + list(to_related_numbers))
        related_numbers.discard(obj.number)

        return list(related_numbers)

    def create(self, validated_data):
        # Normal creation of DictionaryEntry
        dictionary_entry = DictionaryEntry.objects.create(**validated_data)

        # Handle related entries, if provided
        related_entries_data = self.initial_data.get('related_entries', [])
        for rel_entry in related_entries_data:
            to_entry_number = rel_entry.get('to_entry')
            to_entry = DictionaryEntry.objects.filter(number=to_entry_number).first()
            if to_entry:
                RelatedEntry.objects.create(from_entry=dictionary_entry, to_entry=to_entry)

        return dictionary_entry

    def update(self, instance, validated_data):
        # Custom handling for 'description' field
        if 'description' in validated_data:
            new_descriptions = validated_data['description']
            if isinstance(new_descriptions, list):
                for new_desc in new_descriptions:
                    if new_desc in instance.description:
                        instance.description.remove(new_desc)
                    else:
                        instance.description.append(new_desc)
            validated_data.pop('description', None)

        # Custom handling for 'key_words' field
        if 'key_words' in validated_data:
            new_key_words = validated_data['key_words']
            if isinstance(new_key_words, list):
                for new_keyword in new_key_words:
                    if new_keyword in instance.key_words:
                        instance.key_words.remove(new_keyword)
                    else:
                        instance.key_words.append(new_keyword)
            validated_data.pop('key_words', None)
        
        if 'related_entries' in validated_data:
            new_related_entries = validated_data.pop('related_entries', [])
            if not isinstance(new_related_entries, list):
                new_related_entries = [new_related_entries]

            for related_entry_number in new_related_entries:
                if instance.has_related_entry(related_entry_number):
                    instance.remove_related_entry(related_entry_number)
                else:
                    instance.add_related_entry(related_entry_number)

        # Update other fields as usual
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

        # Update other fields as usual
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    
class PersonalRelatedEntrySerializer(serializers.ModelSerializer):
    to_entry_number = serializers.IntegerField(source='to_personal_entry.number')

    class Meta:
        model = PersonalRelatedEntry
        fields = ['from_personal_entry', 'to_entry_number']

    def validate_to_entry_number(self, value):
        if not PersonalDictionaryEntry.objects.filter(number=value).exists():
            raise serializers.ValidationError("PersonalDictionaryEntry with the provided number does not exist.")
        return value
                
class PersonalDictionaryEntrySerializer(serializers.ModelSerializer):
    global_number = serializers.IntegerField(source='global_entry.number', read_only=True)
    global_description = serializers.ReadOnlyField(source='global_entry.description')
    global_key_words = serializers.ReadOnlyField(source='global_entry.key_words')
    personal_related_entries = serializers.SerializerMethodField()

    class Meta:
        model = PersonalDictionaryEntry
        fields = ['id', 'global_entry', 'global_number', 'global_description', 'global_key_words', 
                  'number', 'personal_description', 'personal_key_words', 'personal_related_entries']
        extra_kwargs = {'global_entry': {'write_only': True}}

    def get_personal_related_entries(self, obj):
    # Get numbers where the current object is 'from_personal_entry'
        from_related_numbers = PersonalRelatedEntry.objects.filter(
            from_personal_entry=obj
        ).values_list('to_personal_entry__number', flat=True)

    # Get numbers where the current object is 'to_personal_entry'
        to_related_numbers = PersonalRelatedEntry.objects.filter(
            to_personal_entry=obj
        ).values_list('from_personal_entry__number', flat=True)

    # Combine and deduplicate the numbers, excluding the current object's number
        related_numbers = set(list(from_related_numbers) + list(to_related_numbers))
        related_numbers.discard(obj.number)

        return list(related_numbers)

    def create(self, validated_data):
        personal_related_entries_data = self.initial_data.get('personal_related_entries', [])
        personal_entry = PersonalDictionaryEntry.objects.create(**validated_data)
        
        for rel_entry in personal_related_entries_data:
            to_entry_number = rel_entry.get('to_entry_number')
            to_entry = PersonalDictionaryEntry.objects.filter(number=to_entry_number).first()
            if to_entry:
                PersonalRelatedEntry.objects.create(from_personal_entry=personal_entry, to_personal_entry=to_entry)

        return personal_entry

    def update(self, instance, validated_data):
        # Handling 'personal_description' field
        if 'personal_description' in validated_data:
            new_descriptions = validated_data.pop('personal_description', [])
            if not isinstance(new_descriptions, list):
                new_descriptions = [new_descriptions]
            for new_desc in new_descriptions:
                if new_desc in instance.personal_description:
                    instance.personal_description.remove(new_desc)
                else:
                    instance.personal_description.append(new_desc)

        # Handling 'personal_key_words' field
        if 'personal_key_words' in validated_data:
            new_key_words = validated_data.pop('personal_key_words', [])
            if not isinstance(new_key_words, list):
                new_key_words = [new_key_words]
            for new_keyword in new_key_words:
                if new_keyword in instance.personal_key_words:
                    instance.personal_key_words.remove(new_keyword)
                else:
                    instance.personal_key_words.append(new_keyword)

        # Handling 'personal_related_entries' field
        if 'personal_related_entries' in validated_data:
            new_related_entries = validated_data.pop('personal_related_entries', [])
            if not isinstance(new_related_entries, list):
                new_related_entries = [new_related_entries]
            for related_entry_number in new_related_entries:
                if instance.has_personal_related_entry(related_entry_number):
                    instance.remove_personal_related_entry(related_entry_number)
                else:
                    instance.add_personal_related_entry(related_entry_number)

        # Update other fields as usual
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance



