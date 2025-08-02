import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# --- Database Connection ---
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME", "lawvriksh_db")
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None

# --- Pydantic Models ---
class LoginRequest(BaseModel):
    email: str
    passcode: str

# --- API Endpoints ---
@app.post("/login")
def login(request: LoginRequest):
    """
    Handles user login.
    In a real application, you would verify the email and a hashed version of the passcode.
    For this example, we'll perform a simple lookup.
    """
    connection = get_db_connection()
    if connection is None:
        raise HTTPException(status_code=503, detail="Database service is unavailable.")

    cursor = connection.cursor(dictionary=True)
    try:
        # IMPORTANT: In a real-world scenario, NEVER store plain text passcodes.
        # You should hash passcodes using a library like passlib.
        # The query would then compare the hash of the input passcode with the stored hash.
        query = "SELECT email FROM users WHERE email = %s AND passcode = %s"
        cursor.execute(query, (request.email, request.passcode))
        user = cursor.fetchone()

        if user:
            return {"message": "Login successful", "user": user}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or passcode")

    except Error as e:
        print(f"Error during login query: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
    finally:
        cursor.close()
        connection.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the LawVriksh Backend"}

# To run this application:
# 1. Make sure you have a .env file in this directory with your DB credentials:
#    DB_HOST=your_host
#    DB_USER=your_user
#    DB_PASSWORD=your_password
#    DB_NAME=your_database
# 2. Install dependencies: pip install -r requirements.txt
# 3. Run the server: uvicorn main:app --reload
