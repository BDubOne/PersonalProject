import json
def remove_duplicates_from_dictionary_entries(dictionary_entries_file):
    with open(dictionary_entries_file, 'r') as file:
        dictionary_entries = json.load(file)

    # Using a set to store unique numbers
    unique_numbers = set()

    # Filtering out duplicate entries based on the 'number' field
    filtered_entries = []
    for entry in dictionary_entries:
        number = entry['fields']['number']
        if number not in unique_numbers:
            unique_numbers.add(number)
            filtered_entries.append(entry)

    # Write the filtered data back to the fixture file
    with open(dictionary_entries_file, 'w') as file:
        json.dump(filtered_entries, file, indent=4)

# Replace with the actual file path
remove_duplicates_from_dictionary_entries('/Users/bryanbartell/Desktop/PersonalProject/back-end/dictionary_entries_fixture.json')
