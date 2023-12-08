# Generated by Django 5.0 on 2023-12-08 07:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dict_entry_app', '0002_rename_descriptions_dictionaryentry_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dictionaryentry',
            name='related_entries',
        ),
        migrations.RemoveField(
            model_name='personaldictionaryentry',
            name='personal_related_entries',
        ),
        migrations.AlterField(
            model_name='dictionaryentry',
            name='number',
            field=models.IntegerField(unique=True),
        ),
        migrations.CreateModel(
            name='PersonalRelatedEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_personal_entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_from', to='dict_entry_app.personaldictionaryentry')),
                ('to_personal_entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_to', to='dict_entry_app.personaldictionaryentry')),
            ],
            options={
                'unique_together': {('from_personal_entry', 'to_personal_entry')},
            },
        ),
        migrations.CreateModel(
            name='RelatedEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_from', to='dict_entry_app.dictionaryentry')),
                ('to_entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_to', to='dict_entry_app.dictionaryentry')),
            ],
            options={
                'unique_together': {('from_entry', 'to_entry')},
            },
        ),
    ]
