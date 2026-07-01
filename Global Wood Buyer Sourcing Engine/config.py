ALLOWED_ORIGIN_COUNTRIES = {"Malaysia", "MY", "MY KLA"}
ALLOWED_HS_CODES = {"4407", "4409"}
EXCLUDED_KEYWORDS = {"log", "rough logs", "unprocessed timber"}
EXCLUDED_HS_CODES = {"4403"}

# SQLite configuration
DB_PATH = "sourcing_engine.db"

# Column Mapper to handle varied customs data formats
COLUMN_MAPPER = {
    "buyer_name": ["buyer_name", "consignee_name", "importer_name", "importer"],
    "origin_country": ["origin_country", "country_of_origin", "origin"],
    "destination_country": ["destination_country", "country_of_destination", "destination"],
    "hs_code": ["hs_code", "harmonized_code", "tariff_code"],
    "product_desc": ["product_desc", "goods_description", "description", "item_description"],
    "weight_kg": ["weight_kg", "net_weight", "weight", "total_weight_kg"],
    "arrival_date": ["arrival_date", "date_of_arrival", "date"]
}

# Automation Webhook trigger URL (Supports n8n, Make.com, Zapier, etc.)
AUTOMATION_WEBHOOK_URL = "https://hook.us2.make.com/iejmpviauq3s7my53f7kvc1lr8qrvnf5"
