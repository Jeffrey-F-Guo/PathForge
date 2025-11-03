from supabase import create_client, Client
import os
import json
from typing import Dict
from dotenv import load_dotenv

load_dotenv()

def get_supabase_client() -> Client:
    """
    Creates and returns a Supabase client.
    """
    supabase_url: str = os.getenv("SUPABASE_URL")
    service_key: str = os.getenv("SERVICE_ROLE_KEY")
    
    if not supabase_url or not service_key:
        raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")
    
    client = create_client(supabase_url, service_key)
    return client


def save_to_storage(data: list[Dict], bucket_name:str, file_path:str):
    supabase = get_supabase_client()
    json_bytes = json.dumps(data).encode('utf-8')

    try:
        response = supabase.storage.from_(bucket_name).upload(
            path=file_path,
            file=json_bytes,
            file_options={"upsert":"True", "content-type":"application/json"}
        )
    except Exception as e:
        print(f"Error uploading file: {e}")

if __name__ == "__main__":
    data = [{
      "name": "Hsiang-Jen Hong",
      "website": "",
      "research_interest": [
        "cybersecurity",
        "blockchain technology",
        "computer networks",
        "algorithmic techniques",
        "combinatorial optimization",
        "game theory",
        "Multi-Party Computation (MPC)",
        "Zero-Knowledge Proofs (ZKPs)"
      ],
      "src_url": "https://cs.wwu.edu/hongh6"
    },]
    save_to_storage(data, 'research_scrapes', 'test.json')