import sqlite3
import json
from config import DB_PATH

def get_connection():
    return sqlite3.connect(DB_PATH)

def initialize_db():
    conn = get_connection()
    cursor = conn.cursor()
    # Table to hold validated and normalized leads.
    # We use buyer_company as a unique constraint to deduplicate.
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS normalized_leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            buyer_company TEXT UNIQUE,
            buyer_country TEXT,
            hs_code TEXT,
            product_description TEXT,
            estimated_volume_tons REAL,
            arrival_date TEXT
        )
    ''')
    conn.commit()
    conn.close()

def upsert_lead(lead_data):
    """
    Upserts a lead into the normalized_leads table.
    If the buyer_company already exists, it updates the volume by adding the new volume
    and potentially updates the latest arrival_date.
    lead_data: dict with keys matching the table columns
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # Check if lead exists
    cursor.execute('SELECT estimated_volume_tons FROM normalized_leads WHERE buyer_company = ?', (lead_data['buyer_company'],))
    row = cursor.fetchone()
    
    if row:
        # Update existing record
        new_volume = row[0] + lead_data['estimated_volume_tons']
        cursor.execute('''
            UPDATE normalized_leads 
            SET estimated_volume_tons = ?,
                arrival_date = max(arrival_date, ?)
            WHERE buyer_company = ?
        ''', (new_volume, lead_data['arrival_date'], lead_data['buyer_company']))
    else:
        # Insert new record
        cursor.execute('''
            INSERT INTO normalized_leads 
            (buyer_company, buyer_country, hs_code, product_description, estimated_volume_tons, arrival_date)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            lead_data['buyer_company'], 
            lead_data['buyer_country'], 
            lead_data['hs_code'], 
            lead_data['product_description'], 
            lead_data['estimated_volume_tons'], 
            lead_data['arrival_date']
        ))
        
    conn.commit()
    conn.close()

def get_all_leads():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM normalized_leads')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
    
def export_leads_to_json(filepath):
    leads = get_all_leads()
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(leads, f, indent=4)
