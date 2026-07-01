from db import upsert_lead
from datetime import datetime

def parse_date(date_str):
    if not date_str:
        return "1970-01-01"
    # Standardize separator
    date_str = date_str.replace("/", "-").replace(".", "-").strip()
    
    formats = ["%Y-%m-%d", "%d-%m-%Y", "%m-%d-%Y", "%d-%b-%Y"]
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return "1970-01-01" # Fallback if we cannot parse

def normalize_and_store(valid_leads):
    """
    Maps raw fields to the normalized schema and stores/deduplicates them in SQLite.
    Expected raw keys: buyer_name, destination_country, hs_code, product_desc, weight_kg, arrival_date
    """
    for record in valid_leads:
        try:
            # Safely handle weight conversion to tons
            weight_kg = record.get('weight_kg', 0)
            if weight_kg == '':
                weight_kg = 0
            volume_tons = float(weight_kg) / 1000.0
            
            lead_data = {
                'buyer_company': record.get('buyer_name', '').strip(),
                'buyer_country': record.get('destination_country', '').strip(),
                'hs_code': str(record.get('hs_code', '')).strip(),
                'product_description': record.get('product_desc', '').strip(),
                'estimated_volume_tons': volume_tons,
                'arrival_date': parse_date(record.get('arrival_date', ''))
            }
            
            # Basic validation before insert
            if lead_data['buyer_company']:
                upsert_lead(lead_data)
        except Exception as e:
            print(f"Error normalizing record {record}: {e}")
