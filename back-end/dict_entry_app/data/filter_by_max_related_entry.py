import json 

def filter_and_save_related_entries(related_entries_file, output_file):
    with open(related_entries_file, 'r') as file:
        related_entries = json.load(file)

    # Filter out entries where to_entry or from_entry is above 1000
    filtered_entries = [
        entry for entry in related_entries
        if entry['fields']['from_entry'] <= 1000 and entry['fields']['to_entry'] <= 1000
    ]

    # Write the filtered data to a new fixture file
    with open(output_file, 'w') as file:
        json.dump(filtered_entries, file, indent=4)

# Replace with the actual file paths
filter_and_save_related_entries('/Users/bryanbartell/Desktop/PersonalProject/back-end/dict_entry_app/fixtures/related_entries_fixture.json', 'filtered_related_entries_fixture.json')