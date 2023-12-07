from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField

class DictionaryEntry(models.Model):
    number = models. IntegerField()
    descriptions = JSONField(default=list)
    key_words = JSONField(default=list)

    related_entries = models.ManyToManyField('self', symmetrical=False, blank=True)

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
            existing_entry.add_descriptions(self.descriptions)
            existing_entry.key_words.extend(self.key_words)

            existing_entry.key_words = list(set(existing_entry.key_words))
            existing_entry.save()

            self.add_related_entries(existing_entry.related_entries.all())
        
        else:
            super(DictionaryEntry, self).save(*args, **kwargs)
