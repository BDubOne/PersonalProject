import json

def split_fixture_data(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

    dictionary_entries = []
    related_entries = []

    for entry in data:
        if "fields" in entry and "related_entries" in entry["fields"]:
            # Extract related entries
            number = entry["fields"]["number"]
            for related_number in entry["fields"]["related_entries"]:
                related_entries.append({
                    "model": "dict_entry_app.relatedentry",
                    "fields": {
                        "from_entry": number,
                        "to_entry": related_number
                    }
                })
            # Remove related entries from the dictionary entry
            entry["fields"].pop("related_entries", None)

        dictionary_entries.append(entry)

    # Write the split data to new fixture files
    with open('dictionary_entries_fixture.json', 'w') as file:
        json.dump(dictionary_entries, file, indent=4)

    with open('related_entries_fixture.json', 'w') as file:
        json.dump(related_entries, file, indent=4)


split_fixture_data('/Users/bryanbartell/Desktop/PersonalProject/back-end/dict_entry_app/data/transformed_fixture_after_modified.json')
