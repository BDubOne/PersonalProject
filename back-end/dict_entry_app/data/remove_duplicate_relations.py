import json

def remove_duplicates_from_related_entries(related_entries_file):
    with open(related_entries_file, 'r') as file:
        related_entries = json.load(file)

    # Using a set to store unique pairs of from_entry and to_entry
    unique_entries = set()

    # Filtering out duplicate entries
    filtered_entries = []
    for entry in related_entries:
        from_entry = entry['fields']['from_entry']
        to_entry = entry['fields']['to_entry']
        entry_pair = (from_entry, to_entry)

        if entry_pair not in unique_entries:
            unique_entries.add(entry_pair)
            filtered_entries.append(entry)

    # Write the filtered data back to the fixture file
    with open(related_entries_file, 'w') as file:
        json.dump(filtered_entries, file, indent=4)

# Replace with the actual file path
remove_duplicates_from_related_entries('/Users/bryanbartell/Desktop/PersonalProject/back-end/related_entries_fixture.json')
