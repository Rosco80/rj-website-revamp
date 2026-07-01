import os
import sys
import argparse
import urllib.request
import urllib.error
from config import AUTOMATION_WEBHOOK_URL
from db import initialize_db, export_leads_to_json
from ingestion import ingest_csv, ingest_mock_api
from filtering import filter_leads
from normalization import normalize_and_store

def trigger_automation_webhook(filepath):
    """Sends the output JSON to an automation webhook (Make.com, n8n) if configured."""
    if not AUTOMATION_WEBHOOK_URL:
        return
        
    try:
        with open(filepath, 'rb') as f:
            data = f.read()
            
        req = urllib.request.Request(
            AUTOMATION_WEBHOOK_URL, 
            data=data, 
            headers={'Content-Type': 'application/json'}, 
            method='POST'
        )
        urllib.request.urlopen(req)
        print(f"Successfully triggered automation webhook at {AUTOMATION_WEBHOOK_URL}")
    except Exception as e:
        print(f"Failed to trigger automation webhook: {e}")

def main():
    parser = argparse.ArgumentParser(description="Global Wood Buyer Sourcing Engine")
    parser.add_argument(
        "input_csv", 
        nargs="?", 
        default="mock_data.csv", 
        help="Path to the customs data CSV file to process"
    )
    args = parser.parse_args()

    # 1. Initialize SQLite Database
    initialize_db()
    
    # 2. Ingest data
    csv_path = args.input_csv
    
    print(f"Ingesting raw data from {csv_path}...")
    raw_data = ingest_csv(csv_path)
    print(f"Found {len(raw_data)} raw records.")
    
    # 3. Filter data
    valid_leads = filter_leads(raw_data)
    print(f"Filtered down to {len(valid_leads)} valid leads.")
    
    # 4. Normalize and store
    normalize_and_store(valid_leads)
    
    # 5. Export to JSON for n8n consumption
    output_path = 'output.json'
    export_leads_to_json(output_path)
    print(f"Exported valid, deduplicated leads to {output_path}")
    
    # 6. Optional: Trigger Automation Webhook (Make.com / n8n)
    trigger_automation_webhook(output_path)

if __name__ == '__main__':
    main()
