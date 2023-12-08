import json

# Read data from the modified JSON file
with open('/Users/bryanbartell/Desktop/PersonalProject/back-end/global_dict_app/data/modified_data_2.json', 'r', encoding='utf-8') as modified_file:
    data = json.load(modified_file)

# Iterate over each entry and make the necessary changes
for entry in data:
    if 'key-words' in entry:
        del entry['key-words']
    
    if 'related_entries' in entry:
        entry['related_entries'] = sorted(entry['related_entries'])

# Write the modified data to a new JSON file
with open('final_data.json', 'w', encoding='utf-8') as final_file:
    json.dump(data, final_file, ensure_ascii=False, indent=4)
