import json

def update_fixture_and_add_dummy_entry(dictionary_entries_file):
    # Load dictionary entries fixture
    with open(dictionary_entries_file, 'r') as file:
        dictionary_entries = json.load(file)

    # Add dummy entry for number 0
    dummy_entry = {
        "model": "dict_entry_app.dictionaryentry",
        "fields": {
            "number": 0,
            "description": ["Dummy description for entry 0"],
            "key_words": ["dummy", "entry0"]
        }
    }
    dictionary_entries.insert(0, dummy_entry)  # Add to the beginning of the list

    # Update primary keys in dictionary entries
    for i, entry in enumerate(dictionary_entries, start=1):
        entry['pk'] = i

    # Load related entries fixture and update primary keys
    

    # Write updated data back to fixture files
    with open(dictionary_entries_file, 'w') as file:
        json.dump(dictionary_entries, file, indent=4)



# Replace with the actual file paths
update_fixture_and_add_dummy_entry('/Users/bryanbartell/Desktop/PersonalProject/back-end/dictionary_entries_fixture.json')
