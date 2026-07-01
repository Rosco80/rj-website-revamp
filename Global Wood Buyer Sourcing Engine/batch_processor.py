import os
import shutil
import subprocess
from datetime import datetime

INPUT_DIR = "input_csvs"
PROCESSED_DIR = "processed_csvs"

def run_batch():
    # Ensure directories exist
    os.makedirs(INPUT_DIR, exist_ok=True)
    os.makedirs(PROCESSED_DIR, exist_ok=True)

    # Find all CSV files in input directory
    csv_files = [f for f in os.listdir(INPUT_DIR) if f.endswith('.csv')]
    
    if not csv_files:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] No new CSV files found in {INPUT_DIR}.")
        return

    for filename in csv_files:
        filepath = os.path.join(INPUT_DIR, filename)
        print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting processing for file: {filepath}")
        
        # Call the existing main.py script, passing the CSV path
        result = subprocess.run(["python", "main.py", filepath])
        
        if result.returncode == 0:
            # Move file to processed directory with a timestamp to avoid overwrites
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            new_filename = f"{filename.replace('.csv', '')}_{timestamp}.csv"
            dest_path = os.path.join(PROCESSED_DIR, new_filename)
            
            shutil.move(filepath, dest_path)
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Successfully processed and moved to {dest_path}")
        else:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Error processing {filepath}. File left in {INPUT_DIR}.")

if __name__ == "__main__":
    run_batch()
