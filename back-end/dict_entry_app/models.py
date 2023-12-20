from django.db import models
from django.db.models import JSONField

from student_app.models import Student

class DictionaryEntry(models.Model):
    number = models.IntegerField(unique=True)
    description = JSONField(default=list)
    key_words = JSONField(default=list)
    class Meta:
        ordering = ['number']

    def __str__(self):
        return f"Entry for Number {self.number}"
    
    def add_description(self, new_description):
        self.description.extend(new_description)
        self.description = list(set(self.description))  # Ensure unique descriptions

    def add_related_entry(self, number):
        print(f"Adding related entry with number: {number}")
        to_entry, created = DictionaryEntry.objects.get_or_create(number=number)
        if not created:  # Ensure the entry exists before creating a related entry
            RelatedEntry.objects.get_or_create(from_entry=self, to_entry=to_entry)

    def remove_related_entry(self, number):
        print(f"Removing related entry with number: {number}")
        to_entry = DictionaryEntry.objects.filter(number=number).first()
        if to_entry:
            RelatedEntry.objects.filter(from_entry=self, to_entry=to_entry).delete()

class RelatedEntry(models.Model):
    from_entry = models.ForeignKey(DictionaryEntry, on_delete=models.CASCADE, related_name='related_from')
    to_entry = models.ForeignKey(DictionaryEntry, on_delete=models.CASCADE, related_name='related_to')

    def __str__(self):
        return f"Related Entry from {self.from_entry.number} to {self.to_entry.number}"

    class Meta:
        unique_together = ('from_entry', 'to_entry')

    def has_related_entry(self, number):
        return self.related_from.filter(to_entry__number=number).exists() or \
               self.related_to.filter(from_entry__number=number).exists()

    def add_related_entry(self, number):
        print(f"Adding related entry with number: {number}")
        to_entry, created =DictionaryEntry.objects.get_or_create(number=number)
        RelatedEntry.objects.get_or_create(from_entry=self, to_entry=to_entry)

    def remove_related_entry(self, number):
        print(f"Removing related entry with number: {number}")
        RelatedEntry.objects.filter(
            from_entry=self, 
            to_entry__number=number
        ).delete()
        RelatedEntry.objects.filter(
            from_entry__number=number,
            to_entry=self
        ).delete()


class PersonalDictionaryEntry(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='personal_entries')
    global_entry = models.ForeignKey(DictionaryEntry, on_delete=models.SET_NULL, null=True, blank=True)
    number = models.IntegerField()
    personal_description = JSONField(default=list)
    personal_key_words = JSONField(default=list)

    class Meta:
        unique_together = ('student', 'number')
        ordering = ['number']
    def __str__(self):
        return f'Personal entry for {self.student.email} Number {self.number}'

    def add_personal_description(self, new_descriptions):
        self.personal_description.extend(new_descriptions)
        self.personal_description = list(set(self.personal_description))

    def add_personal_key_words(self, new_key_words):
        self.personal_key_words.extend(new_key_words)
        self.personal_key_words = list(set(self.personal_key_words))

class PersonalRelatedEntry(models.Model):
    from_personal_entry = models.ForeignKey(PersonalDictionaryEntry, on_delete=models.CASCADE, related_name='related_from')
    to_personal_entry = models.ForeignKey(PersonalDictionaryEntry, on_delete=models.CASCADE, related_name='related_to')

    def __str__(self):
        return f"Personal Related Entry from {self.from_personal_entry.number} to {self.to_personal_entry.number}"

    class Meta:
        unique_together = ('from_personal_entry', 'to_personal_entry')

    def has_personal_related_entry(self, number):
        return self.related_from.filter(to_personal_entry__number=number).exists() or \
               self.related_to.filter(from_personal_entry__number=number).exists()

    def add_personal_related_entry(self, number):
        print(f"Adding personal related entry with number: {number}")
        to_entry, created = PersonalDictionaryEntry.objects.get_or_create(student=self.student, number=number)
        PersonalRelatedEntry.objects.get_or_create(from_personal_entry=self, to_personal_entry=to_entry)

    def remove_personal_related_entry(self, number):
        print(f"Removing personal related entry with number: {number}")
        PersonalRelatedEntry.objects.filter(
            from_personal_entry=self, 
            to_personal_entry__number=number
        ).delete()
        PersonalRelatedEntry.objects.filter(
            from_personal_entry__number=number,
            to_personal_entry=self
        ).delete()
