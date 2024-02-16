import os
from dotenv import load_dotenv
import pandas as pd
from pymongo import MongoClient
import json

load_dotenv()

def get_database():
    connection_string = os.getenv('CONNECTION_STRING')
    client = MongoClient(connection_string)

def csv_to_json(csv_file):
    df = pd.read_csv(csv_file, usecols=['fname', 'email', 'password'])
    json_data = df.to_json(orient='records')
    return json.loads(json_data)

def insert_into_mongo(json_data, collection):
    db = client[os.getenv('DATABASE_NAME')]
    col = db[collection]
    col.insert_many(json_data)

script_dir = os.path.dirname(__file__)
csv_folder_path = os.path.join(script_dir, 'user_data')
collection_name = 'Users'

for filename in os.listdir(csv_folder_path):
    if filename.endswith(".csv"):
        csv_file_path = os.path.join(csv_folder_path, filename)
        json_data = csv_to_json(csv_file_path)
        insert_into_mongo(json_data, collection_name)

# Close the MongoDB connection
client.close()

print("Data from all CSV files successfully imported into MongoDB.")
