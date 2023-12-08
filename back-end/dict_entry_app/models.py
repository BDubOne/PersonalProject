from django.db import models
from django.db.models import JSONField

from student_app.models import Student

class DictionaryEntry(models.Model):
    number = models.IntegerField()
    description = JSONField(default=list)
    key_words = JSONField(default=list)

    def __str__(self):
        return f"Entry for Number {self.number}"
    
    def add_description(self, new_description):
        self.description.extend(new_description)
        self.description = list(set(self.description))  # Ensure unique descriptions

    # Removed the add_related_entries method as it will be handled differently
class RelatedEntry(models.Model):
    from_entry = models.ForeignKey(DictionaryEntry, on_delete=models.CASCADE, related_name='related_from')
    to_entry = models.ForeignKey(DictionaryEntry, on_delete=models.CASCADE, related_name='related_to')

    def __str__(self):
        return f"Related Entry from {self.from_entry.number} to {self.to_entry.number}"

    class Meta:
        unique_together = ('from_entry', 'to_entry')


class PersonalDictionaryEntry(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='personal_entries')
    global_entry = models.ForeignKey(DictionaryEntry, on_delete=models.SET_NULL, null=True, blank=True)
    number = models.IntegerField()
    personal_description = JSONField(default=list)
    personal_key_words = JSONField(default=list)

    class Meta:
        unique_together = ('student', 'number')

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

