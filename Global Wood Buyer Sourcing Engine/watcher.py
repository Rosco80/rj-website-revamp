import os
import time
import shutil
import subprocess

INPUT_DIR = 'input_csvs'
PROCESSED_DIR = 'processed_csvs'

def watch_folder():
    print(f"Starting to watch '{INPUT_DIR}' directory for new CSV files...")
    
    # Ensure directories exist
    os.makedirs(INPUT_DIR, exist_ok=True)
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    
    while True:
        try:
            for filename in os.listdir(INPUT_DIR):
                if filename.lower().endswith('.csv'):
                    filepath = os.path.join(INPUT_DIR, filename)
                    print(f"\n[Watcher] Detected new file: {filename}")
                    
                    # 1. Run main.py with the file
                    print(f"[Watcher] Processing {filename} with main.py...")
                    result = subprocess.run(['python', 'main.py', filepath], capture_output=True, text=True)
                    
                    if result.returncode == 0:
                        print(f"[Watcher] Successfully processed {filename}.")
                        print(result.stdout)
                        
                        # 2. Move to processed_csvs
                        dest_path = os.path.join(PROCESSED_DIR, filename)
                        
                        # Handle case where file already exists in processed_csvs
                        if os.path.exists(dest_path):
                            base, ext = os.path.splitext(filename)
                            timestamp = int(time.time())
                            dest_path = os.path.join(PROCESSED_DIR, f"{base}_{timestamp}{ext}")
                            
                        shutil.move(filepath, dest_path)
                        print(f"[Watcher] Moved {filename} to {dest_path}")
                    else:
                        print(f"[Watcher] Error processing {filename}.")
                        print(result.stderr)
            
            # Wait 5 seconds before checking again
            time.sleep(5)
            
        except KeyboardInterrupt:
            print("\n[Watcher] Stopping folder watch.")
            break
        except Exception as e:
            print(f"[Watcher] Error: {e}")
            time.sleep(5)

if __name__ == '__main__':
    watch_folder()
