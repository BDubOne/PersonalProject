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
    related_entries = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    related_entries_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = DictionaryEntry
        fields = ['id', 'number', 'description', 'key_words', 'related_entries', 'related_entries_display']

    def get_related_entries_display(self, obj):
        from_related_numbers = list(RelatedEntry.objects.filter(
            from_entry=obj
        ).values_list('to_entry__number', flat=True))

        to_related_numbers = list(RelatedEntry.objects.filter(
            to_entry=obj
        ).values_list('from_entry__number', flat=True))

        # Combine and deduplicate the numbers, excluding the current object's number
        related_numbers = set(from_related_numbers + to_related_numbers)
        related_numbers.discard(obj.number)
        return list(related_numbers)

    def create(self, validated_data):
        related_entries_data = validated_data.pop('related_entries', [])
        dictionary_entry = DictionaryEntry.objects.create(**validated_data)

        for number in related_entries_data:
            to_entry, _ = DictionaryEntry.objects.get_or_create(number=number)
            RelatedEntry.objects.get_or_create(from_entry=dictionary_entry, to_entry=to_entry)
        
        return dictionary_entry

    def update(self, instance, validated_data):
        if 'related_entries' in validated_data:
            new_related_entries = validated_data.pop('related_entries', [])
            existing_related_entries = set(RelatedEntry.objects.filter(from_entry=instance).values_list('to_entry__number', flat=True))

            for number in new_related_entries:
                if number in existing_related_entries:
                    # Remove the entry
                    to_entry = DictionaryEntry.objects.filter(number=number).first()
                    if to_entry:
                        RelatedEntry.objects.filter(from_entry=instance, to_entry=to_entry).delete()
                else:
                    # Add the entry
                    to_entry, _ = DictionaryEntry.objects.get_or_create(number=number)
                    RelatedEntry.objects.get_or_create(from_entry=instance, to_entry=to_entry)
        # Custom handling for 'description' field
        if 'description' in validated_data:
            if isinstance(instance.description, str):
                instance.description = [instance.description]
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
            if isinstance(instance.key_words, str):
                instance.key_words = [instance.key_words]
            new_key_words = validated_data['key_words']
            if isinstance(new_key_words, list):
                for new_keyword in new_key_words:
                    if new_keyword in instance.key_words:
                        instance.key_words.remove(new_keyword)
                    else:
                        instance.key_words.append(new_keyword)
            validated_data.pop('key_words', None)
        
        

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
    personal_related_entries = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    personal_related_entries_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PersonalDictionaryEntry
        fields = ['id', 'global_entry', 'global_number', 'global_description', 'global_key_words',
                  'number', 'personal_description', 'personal_key_words', 'personal_related_entries', 'personal_related_entries_display']
        extra_kwargs = {'global_entry': {'write_only': True}}

    def get_personal_related_entries_display(self, obj):
        # Fetch related entries and return their numbers
        related_entries = PersonalRelatedEntry.objects.filter(from_personal_entry=obj)
        return [entry.to_personal_entry.number for entry in related_entries]

    def create(self, validated_data):
        personal_related_entries_numbers = validated_data.pop('personal_related_entries', [])
        personal_entry = PersonalDictionaryEntry.objects.create(**validated_data)

        for number in personal_related_entries_numbers:
            to_entry, _ = PersonalDictionaryEntry.objects.get_or_create(student=personal_entry.student, number=number)
            PersonalRelatedEntry.objects.get_or_create(from_personal_entry=personal_entry, to_personal_entry=to_entry)
        
        return personal_entry
        

       

    def update(self, instance, validated_data):
        # Handling 'personal_description' field
      
        # Handling 'personal_description' field
        if 'personal_description' in validated_data:
            if isinstance(instance.personal_description, str):
                instance.personal_description = [instance.personal_description]

            new_descriptions = validated_data.pop('personal_description', [])
            # Ensure it's a list
            new_descriptions = [new_descriptions] if not isinstance(new_descriptions, list) else new_descriptions
            for new_desc in new_descriptions:
                if new_desc in instance.personal_description:
                    instance.personal_description.remove(new_desc)
                else:
                    instance.personal_description.append(new_desc)

        # Handling 'personal_key_words' field
        if 'personal_key_words' in validated_data:
            if isinstance(instance.personal_key_words, str):
                instance.personal_key_words = [instance.personal_key_words]
            new_key_words = validated_data.pop('personal_key_words', [])
            # Ensure it's a list
            new_key_words = [new_key_words] if not isinstance(new_key_words, list) else new_key_words
            for new_keyword in new_key_words:
                if new_keyword in instance.personal_key_words:
                    instance.personal_key_words.remove(new_keyword)
                else:
                    instance.personal_key_words.append(new_keyword)

        # Handling 'personal_related_entries' field
        if 'personal_related_entries' in validated_data:
            new_related_entries = validated_data.pop('personal_related_entries', [])
            
            # Get existing related entries directly from the PersonalRelatedEntry model
            existing_related_entries = set(PersonalRelatedEntry.objects.filter(from_personal_entry=instance).values_list('to_personal_entry__number', flat=True))

        
            for number in new_related_entries:
                if number in existing_related_entries:
                    # Remove the entry if it exists
                    to_entry = PersonalDictionaryEntry.objects.filter(student=instance.student, number=number).first()
                    if to_entry:
                        PersonalRelatedEntry.objects.filter(from_personal_entry=instance, to_personal_entry=to_entry).delete()
                else:
                    # Add the entry if it doesn't exist
                    to_entry, _ = PersonalDictionaryEntry.objects.get_or_create(student=instance.student, number=number)
                    PersonalRelatedEntry.objects.get_or_create(from_personal_entry=instance, to_personal_entry=to_entry)
    

        # Update other fields as usual
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    
    



