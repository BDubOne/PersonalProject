import json
import re

# Function to extract related entries
def extract_related_entries(description):
    related_entries = []
    pattern = r"(?:see (\d+)|\b(\d+)\b|, (\d+))"

    
    for line in description:
        matches = re.findall(pattern, line)
        related_entries.extend(matches)
    
    return related_entries

# Load existing data from a JSON file
input_file = '/Users/bryanbartell/Desktop/PersonalProject/back-end/global_dict_app/data/pfc_gematria.json'

with open(input_file, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Process and update the data
processed_data = []
for entry in data:
    number = int(entry["number"])
    description = entry["description"]
    related_entries = extract_related_entries(description)
    
    # Create a new dictionary entry
    dict_entry = {
        "number": number,
        "description": description,  # Include the description field
        "key-words": related_entries
    }
    
    processed_data.append(dict_entry)

# Save the processed data to a new JSON file
output_file = 'processed_data.json'

with open(output_file, "w", encoding="utf-8") as json_file:
    json.dump(processed_data, json_file, ensure_ascii=False, indent=4)

print(f"Processed data saved to {output_file}")

