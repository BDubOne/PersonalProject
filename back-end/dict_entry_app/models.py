from django.db import models
from django.db.models import JSONField

from student_app.models import Student

class DictionaryEntry(models.Model):
    number = models. IntegerField()
    descriptions = JSONField(default=list)
    related_entries = models.ManyToManyField('self', symmetrical=False, blank=True)
    key_words = JSONField(default=list)

    

    def __str__(self):
        return f"Entry for Number {self.number}"
    
    def add_description(self, new_descriptions):

        self.descriptions.extend(new_descriptions)

        self.descriptions = list(set(self.descriptions))

    def add_related_entries(self, entries):
        for entry in entries:
            self.related_entries.add(entry)

    def save(self, *args, **kwargs):
        existing_entry = DictionaryEntry.objects.filter(number=self.number).first()
        if existing_entry and existing_entry != self:
            existing_entry.add_description(self.descriptions)
            existing_entry.key_words.extend(self.key_words)

            existing_entry.key_words = list(set(existing_entry.key_words))
            existing_entry.save()

            self.add_related_entries(existing_entry.related_entries.all())
        
        else:
            super(DictionaryEntry, self).save(*args, **kwargs)


class PersonalDictionaryEntry(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='personal_entries')
    global_entry = models.ForeignKey(DictionaryEntry, on_delete=models.SET_NULL, null=True, blank=True)
    number = models.IntegerField()
    personal_descriptions= JSONField(default=list)
    personal_related_entries= models.ManyToManyField('self', symmetrical=False, blank=True)
    personal_key_words = JSONField(default=list)

   

    class Meta:
        unique_together = ('student', 'number')
    
    def __str__(self):
        return f'Personal entry fro {self.student.email} Number {self.number}'
    
    def add_personal_description(self, new_descriptions):
        self.personal_descriptions.extend(new_descriptions)
        # Ensuring unique descriptions if needed
        self.personal_descriptions = list(set(self.personal_descriptions))

    def add_personal_key_words(self, new_key_words):
        self.personal_key_words.extend(new_key_words)
        # Ensuring unique key words if needed
        self.personal_key_words = list(set(self.personal_key_words))

    def add_personal_related_entries(self, entries):
        for entry in entries:
            self.personal_related_entries.add(entry)

