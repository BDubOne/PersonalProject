import json

# Read data from the existing JSON file
with open('/Users/bryanbartell/Desktop/PersonalProject/back-end/global_dict_app/data/modified_data_1.json', 'r', encoding='utf-8') as existing_file:
    data = json.load(existing_file)

# Iterate over each entry and make the necessary changes
for entry in data:
    if 'key-words' in entry:
        keywords = entry['key-words']
        unique_keywords = list(set(keywords))
        
        entry['related_entries'] = unique_keywords
        entry['key_words'] = []

# Write the modified data to a new JSON file
with open('modified_data_2.json', 'w', encoding='utf-8') as modified_file:
    json.dump(data, modified_file, ensure_ascii=False, indent=4)
