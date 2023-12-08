import json
def decrease_related_entries(related_entries_file):
    with open(related_entries_file, 'r') as file:
        related_entries = json.load(file)

    # Decrease every to_entry and from_entry by 1
    for entry in related_entries:
        entry['fields']['from_entry'] += 1
        entry['fields']['to_entry'] += 1

    # Write the updated data back to the fixture file
    with open(related_entries_file, 'w') as file:
        json.dump(related_entries, file, indent=4)

# Replace with the actual file path
decrease_related_entries('/Users/bryanbartell/Desktop/PersonalProject/back-end/dict_entry_app/fixtures/related_entries_fixture.json')
