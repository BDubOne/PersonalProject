import pdfplumber
import json
import re

class PDFStripper:
    pdf_file = "/Users/bryanbartell/Desktop/PersonalProject/raw-data/gematria-notebooks-of-paul-foster-case-pdf-free.pdf"
    json_file = '/Users/bryanbartell/Desktop/PersonalProject/back-end/global_dict_app/data/pfc_gematria.json'

    @classmethod
    def extract_pdf_to_json(cls, pdf_file, json_file):
        data = []
        current_number = "Introduction"  # Initialize with a default value

        def process_page(page):
            return {
                "page_number": page.page_number,
                "text": page.extract_text()
            }

        def extract_entries(pdf_text):
            entries = []
            current_entry = None

            # Split the text by lines and remove empty lines
            lines = [line.strip() for line in pdf_text.split('\n') if line.strip()]

            for line in lines:
                # Check for lines starting with "<number> (<either prime status or factors>)"
                number_match = re.match(r'^(\d+)\s*\((.*?)\)', line)
                if number_match:
                    if current_entry:
                        entries.append(current_entry)
                    number, prime_or_factors = number_match.groups()
                    current_number = f"{number} ({prime_or_factors})"
                    current_entry = {
                        'number': number,
                        'name': "",  # You can extract the name if needed
                        'description': []
                    }
                    continue

                if current_entry is not None:
                    current_entry['description'].append(line)

            if current_entry:
                entries.append(current_entry)

            return entries

        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                result = process_page(page)
                page_entries = extract_entries(result["text"])
                data.extend(page_entries)

        with open(json_file, "w", encoding="utf-8") as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)

# Usage
PDFStripper.extract_pdf_to_json(PDFStripper.pdf_file, PDFStripper.json_file)









