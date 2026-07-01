import csv
import json

from config import COLUMN_MAPPER

def standardize_record(row):
    """Maps varied raw column names to our standard internal schema."""
    standardized = {}
    # Lowercase keys and strip whitespace
    row_lower_keys = {str(k).strip().lower(): v for k, v in row.items() if k}
    
    for standard_key, alternatives in COLUMN_MAPPER.items():
        standardized[standard_key] = ""
        for alt in alternatives:
            if alt in row_lower_keys:
                standardized[standard_key] = row_lower_keys[alt]
                break
    return standardized

def ingest_csv(filepath):
    """
    Reads a CSV file containing shipping manifests.
    Handles potential encoding issues by trying utf-8 then latin-1.
    """
    encodings_to_try = ['utf-8', 'latin-1', 'windows-1252']
    data = []
    
    for encoding in encodings_to_try:
        try:
            with open(filepath, mode='r', encoding=encoding) as f:
                reader = csv.DictReader(f)
                for row in reader:
                    data.append(standardize_record(row))
            # If successful, break out of encoding loop
            break
        except UnicodeDecodeError:
            continue
        except FileNotFoundError:
            print(f"Error: File not found at {filepath}")
            return []
            
    return data

def ingest_mock_api(json_payload):
    """
    Ingests a JSON string representing a mock API response.
    """
    try:
        return json.loads(json_payload)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return []
