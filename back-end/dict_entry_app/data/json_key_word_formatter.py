import json

# Read data from the existing JSON file
with open('/Users/bryanbartell/Desktop/PersonalProject/back-end/global_dict_app/data/processed_data_run_1.json', 'r', encoding='utf-8') as existing_file:
    data = json.load(existing_file)

# Iterate over each entry and flatten the 'key-words' lists
for entry in data:
    if 'key-words' in entry:
        keywords = entry['key-words']
        flat_keywords = [keyword for sublist in keywords for keyword in sublist if keyword != ""]
        flat_keywords = [int(keyword) for keyword in flat_keywords]
        entry['key-words'] = flat_keywords

# Write the modified data to a new JSON file
with open('modified_data.json', 'w', encoding='utf-8') as modified_file:
    json.dump(data, modified_file, ensure_ascii=False, indent=4)
