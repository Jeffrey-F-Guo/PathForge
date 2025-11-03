import os
from supabase import create_client, Client
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import execute_values

# Load environment variables
load_dotenv()

# SUPABASE____________________________
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

def supa_read(table_name: str = "research", limit: int = 10):
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
    
def supa_write(data, table_name: str):
    try:
        supabase = get_supabase_client()
        if not isinstance(data, list):
            data = [data]
        response = (
            supabase.table(table_name)
            .insert(data)
            .execute()
        
        )
        return {
            "status": "Success",
            "count": len(response),
            "data": response.data,
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

# SUPABASE____________________________



#PSQL_________________________________
def get_postgres_connection():
    """
    Establishes and returns a connection to the PostgreSQL database.
    """
    CONNECTION_STRING="postgresql://postgres:RlY27nL5usSrLFj5@db.dpfxdwihboiiraquxuqt.supabase.co:5432/postgres"
    try:
        conn = psycopg2.connect(CONNECTION_STRING)
        return conn
    except Exception as e:
        raise ValueError(f"Failed to connect to PostgreSQL: {e}")

def psql_insert(stored_proc):
    """
    Write data to Supabase table.
    
    Args:
        data: List of dictionaries to insert
        table_name: Name of the table to write to
    """
    try:
        conn = get_postgres_connection()
        cursor = conn.cursor()
        cursor.execute(stored_proc)
        conn.commit()


    except Exception as e:
        pass

def read_psql(stored_proc):
    conn = get_postgres_connection()
    cursor = conn.cursor()
    cursor.execute(stored_proc)
    table=cursor.fetchall()
    print(table)
    return table

if __name__ == "__main__":
    # Test the connection
    # result = read_psql("SELECT * FROM career_paths")
    psql_insert("INSERT INTO test_table (id) VALUES (3);")

#     data = {
#     "id": 1,
#     "name": "Alexandra (Alli) Nilles",
#     "website": "https://alli.nilles.info/",
#     "research_interests": [
#       "sustainable robotics",
#       "robotics for climate",
#       "planning algorithms",
#       "distributed AI",
#       "embodied intelligence",
#       "automated robot design",
#       "formal methods in robotics",
#       "human-robot interfaces and programming languages"
#     ],
#     "src_url": "https://cs.wwu.edu/nillesa2wwuedu"
#   }
#     result = write_to_db(data, table_name="research_labs")
#     print(result)