from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import logging
import os
import json
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from pydantic import BaseModel
from db_writer import supa_read 
from data_processing import extract_data, load_data

load_dotenv()
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")
TARGET_BUCKET = "research_scrapes"


# Create the FastAPI app instance
app = FastAPI(
    title="WWU Resource Extractor API",
    description="An API to scrape WWU resources from university websites.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.post("/test-post")
async def test_database(request: dict):
    """
    Test database endpoint.
    
    Accepts POST data and returns a response with dummy data.
    Can be tested with curl:
    
    curl -X POST "http://localhost:8000/test-database" \\
         -H "Content-Type: application/json" \\
         -d '{"name": "John", "action": "test", "value": 123}'
    """

    
    return {
        "message": "Database tested successfully",
        "received_data": {
            "name": request.get("name", "No name provided")

        },
        "test_status": "passed"
    }


@app.get("/test-supabase")
async def test_supabase():
    """
    Test supabase endpoint.
    """
    result = supa_read(table_name="test_table", limit=1)
    return result

class Record(BaseModel):
    id:str
    bucket_id: str
    name: str

class WebhookPayload(BaseModel):
    type: str
    table: str
    schema: str
    record: Optional[Record] = None
    old_record: Optional[Record] = None

@app.post("/write-to-db")
def write_to_db(payload: WebhookPayload, authorization: Optional[str] = Header(None)):

    if not authorization or authorization != f"Bearer {WEBHOOK_SECRET}":
        raise HTTPException(status_code=401, detail="Unauthorized")
    if payload.type not in ["INSERT", "UPDATE"]:
        print(f"WEBHOOK IGNORED: Event type is {payload.type}")
        return {"message": "Ignoring event (not INSERT or UPDATE)"}
    if not payload.record or payload.record.bucket_id != TARGET_BUCKET:
        print(f"WEBHOOK IGNORED: Event for wrong bucket: {payload.record.bucket_id if payload.record else 'unknown'}")
        return {"message": "Ignoring event (wrong bucket or no record)"}

    file_path = payload.record.name
    print(f"WEBHOOK ACCEPTED: Valid trigger for file: {file_path}")
    
    # Now you are safe to call your own internal functions.
    # These functions would run synchronously here.
    try:
        # 1. Call your ETL function
        raw_data = load_data(file_path)
        professors, prof_interests = extract_data(raw_data)

        
        
        # 2. Call your DB writer function
        # db_result = my_db_writer_function(etl_data)
        
        # Simulating work for this example:
        print(f"Calling ETL for {file_path}...")
        print(f"Calling DB Writer for {file_path}...")
        
        return {"status": "success", "file_processed": file_path}

    except Exception as e:
        # If your ETL or DB write fails
        print(f"ERROR: ETL/Writer failed: {e}")
        raise HTTPException(status_code=500, detail=f"ETL process failed: {e}")
 
