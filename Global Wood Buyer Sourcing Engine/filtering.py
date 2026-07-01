from config import ALLOWED_ORIGIN_COUNTRIES, ALLOWED_HS_CODES, EXCLUDED_KEYWORDS, EXCLUDED_HS_CODES

def is_valid_lead(record):
    """
    Checks a single record against the regulatory and business constraints.
    Returns True if valid, False otherwise.
    """
    origin = record.get('origin_country', '').strip()
    hs_code = str(record.get('hs_code', '')).strip()
    desc = record.get('product_desc', '').strip().lower()
    
    # Check origin
    if origin not in ALLOWED_ORIGIN_COUNTRIES:
        return False
        
    # Check HS code explicitly excluded
    if hs_code in EXCLUDED_HS_CODES:
        return False
        
    # Check HS code allowed (must be one of these)
    if hs_code not in ALLOWED_HS_CODES:
        return False
        
    # Check keywords in description
    for keyword in EXCLUDED_KEYWORDS:
        if keyword in desc:
            return False
            
    return True

def filter_leads(raw_data):
    """
    Takes a list of raw manifest records and returns only the valid ones.
    """
    valid_leads = []
    for record in raw_data:
        if is_valid_lead(record):
            valid_leads.append(record)
    return valid_leads
