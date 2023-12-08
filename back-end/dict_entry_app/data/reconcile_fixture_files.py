import json
def create_related_entries_fixture(dictionary_entries_file, related_entries_file, output_file):
    with open(dictionary_entries_file, 'r') as file:
        dictionary_entries = json.load(file)

    number_to_pk = {entry['fields']['number']: entry['pk'] for entry in dictionary_entries}

    with open(related_entries_file, 'r') as file:
        related_entries = json.load(file)

    for entry in related_entries:
        entry['fields']['from_entry'] = number_to_pk.get(entry['fields']['from_entry'], None)
        entry['fields']['to_entry'] = number_to_pk.get(entry['fields']['to_entry'], None)

    # Filter out any entries where from_entry or to_entry couldn't be mapped
    filtered_related_entries = [entry for entry in related_entries if entry['fields']['from_entry'] is not None and entry['fields']['to_entry'] is not None]

    with open(output_file, 'w') as file:
        json.dump(filtered_related_entries, file, indent=4)

# Replace with the actual file paths
create_related_entries_fixture('/Users/bryanbartell/Desktop/PersonalProject/back-end/dict_entry_app/fixtures/dictionary_entries_fixture.json', '/Users/bryanbartell/Desktop/PersonalProject/back-end/dict_entry_app/fixtures/related_entries_fixture.json', 'updated_related_entries_fixture.json')
