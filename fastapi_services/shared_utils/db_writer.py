import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_supabase_client() -> Client:
    """
    Creates and returns a Supabase client.
    """
    supabase_url: str = os.getenv("SUPABASE_URL")
    supabase_key: str = os.getenv("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")
    
    client = create_client(supabase_url, supabase_key)
    return client

def read_from_db(table_name: str = "research", limit: int = 10):
    """
    Read data from Supabase table.
    
    Args:
        table_name: Name of the table to read from
        limit: Maximum number of records to return
    
    Returns:
        List of records from the table
    """
    try:
        supabase = get_supabase_client()
        
        # Read from table
        response = supabase.table(table_name).select("*").limit(limit).execute()
        
        return {
            "status": "success",
            "count": len(response.data),
            "data": response.data
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }








# Keep your existing write functions but update them:
def write_to_db(data, table_name: str = "research_labs"):
    """
    Write data to Supabase table.
    
    Args:
        data: List of dictionaries to insert
        table_name: Name of the table to write to
    """
    try:
        supabase = get_supabase_client()
        if isinstance(data, dict):
            data = [data]
        # Insert data
        response = supabase.table(table_name).insert(data).execute()
        
        return {
            "status": "success",
            "inserted_count": len(response.data),
            "data": response.data
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    # Test the connection
    # result = read_from_db(table_name="TestTable", limit=1)
    # print(result.get("data"))

    data = {
    "id": 1,
    "name": "Alexandra (Alli) Nilles",
    "website": "https://alli.nilles.info/",
    "research_interests": [
      "sustainable robotics",
      "robotics for climate",
      "planning algorithms",
      "distributed AI",
      "embodied intelligence",
      "automated robot design",
      "formal methods in robotics",
      "human-robot interfaces and programming languages"
    ],
    "src_url": "https://cs.wwu.edu/nillesa2wwuedu"
  }
    result = write_to_db(data, table_name="research_labs")
    print(result)