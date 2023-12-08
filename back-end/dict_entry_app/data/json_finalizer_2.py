import json

# Load the original fixture file
with open('/Users/bryanbartell/Desktop/PersonalProject/back-end/dict_entry_app/data/entries_data_1.json', 'r') as file:
    data = json.load(file)

# Transform the data
transformed_data = []
for pk, entry in enumerate(data, start=1):
    transformed_entry = {
        "model": "dict_entry_app.dictionaryentry",
        "pk": pk,
        "fields": entry
    }
    transformed_data.append(transformed_entry)

# Save the transformed data to a new fixture file
with open('transformed_fixture.json', 'w') as file:
    json.dump(transformed_data, file, indent=4)
