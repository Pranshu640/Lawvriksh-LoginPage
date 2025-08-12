import os
import random
import bcrypt
import resend
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from decouple import config
from datetime import datetime, timedelta

app = FastAPI()

# --- Environment Variable Configuration ---
# Using python-decouple to safely manage environment variables
DB_HOST = config("DB_HOST", default="localhost")
DB_USER = config("DB_USER", default="root")
DB_PASSWORD = config("DB_PASSWORD")
DB_NAME = config("DB_NAME", default="lawvriksh_db")
RESEND_API_KEY = config("RESEND_API_KEY")

resend.api_key = RESEND_API_KEY

# --- Database Connection ---
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        # For a production app, you'd want more robust logging here
        raise HTTPException(status_code=503, detail="Database service is unavailable.")

# --- Pydantic Models ---
class OTPRequest(BaseModel):
    email: str

class OTPVerifyRequest(BaseModel):
    email: str
    otp: str

# --- Helper Functions ---
def generate_otp():
    """Generates a secure 6-digit OTP."""
    return str(random.randint(100000, 999999))

def hash_otp(otp: str):
    """Hashes the OTP using bcrypt."""
    salt = bcrypt.gensalt()
    hashed_otp = bcrypt.hashpw(otp.encode('utf-8'), salt)
    return hashed_otp.decode('utf-8')

def verify_otp(plain_otp: str, hashed_otp: str):
    """Verifies the plain OTP against the stored hash."""
    return bcrypt.checkpw(plain_otp.encode('utf-8'), hashed_otp.encode('utf-8'))

# --- API Endpoints ---

@app.post("/request-otp")
def request_otp(request: OTPRequest):
    """
    Handles the request for a new OTP.
    1. Validates if the user exists.
    2. Generates, hashes, and stores a new OTP.
    3. Sends the OTP to the user's email.
    """
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Step 1: Check if the user exists in the 'users' table
        query = "SELECT email FROM users WHERE email = %s"
        cursor.execute(query, (request.email,))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=404, detail="Email not registered.")

        # Step 2: Generate and hash the OTP
        otp = generate_otp()
        otp_hash = hash_otp(otp)
        expires_at = datetime.utcnow() + timedelta(minutes=5) # OTP is valid for 5 minutes

        # Step 3: Store the new OTP request, deleting any old ones
        # This ensures only the latest OTP is valid
        delete_query = "DELETE FROM otp_requests WHERE email = %s"
        cursor.execute(delete_query, (request.email,))
        
        insert_query = "INSERT INTO otp_requests (email, otp_hash, expires_at) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (request.email, otp_hash, expires_at.strftime('%Y-%m-%d %H:%M:%S')))
        connection.commit()

        # Step 4: Send the OTP via email using Resend
        try:
            params = {
                "from": "onboarding@resend.dev",
                "to": request.email,
                "subject": "Your LawVriksh Login Code",
                "html": f"<p>Your one-time passcode is: <strong>{otp}</strong></p><p>This code will expire in 5 minutes.</p>"
            }
            email_response = resend.Emails.send(params)
            print(f"Email sent response: {email_response}") # For debugging
        except Exception as e:
            print(f"Error sending email: {e}")
            raise HTTPException(status_code=500, detail="Failed to send OTP email.")

        return {"message": "An OTP has been sent to your email."}

    except Error as e:
        print(f"Database error in /request-otp: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
    finally:
        cursor.close()
        connection.close()


@app.post("/verify-otp")
def verify_otp_endpoint(request: OTPVerifyRequest):
    """
    Verifies the submitted OTP and logs the user in.
    1. Finds the OTP record.
    2. Checks for expiry.
    3. Verifies the OTP hash.
    4. Deletes the used OTP and returns a success message.
    """
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Step 1: Retrieve the OTP record
        query = "SELECT otp_hash, expires_at FROM otp_requests WHERE email = %s"
        cursor.execute(query, (request.email,))
        otp_record = cursor.fetchone()

        if not otp_record:
            raise HTTPException(status_code=400, detail="Invalid OTP or request. Please try again.")

        # Step 2: Check if the OTP has expired
        expires_at = otp_record['expires_at']
        if datetime.utcnow() > expires_at:
            # Clean up expired OTP
            delete_query = "DELETE FROM otp_requests WHERE email = %s"
            cursor.execute(delete_query, (request.email,))
            connection.commit()
            raise HTTPException(status_code=400, detail="OTP has expired. Please request a new one.")

        # Step 3: Verify the OTP
        if not verify_otp(request.otp, otp_record['otp_hash']):
            # Here you might want to add logic for tracking failed attempts
            raise HTTPException(status_code=401, detail="Invalid OTP provided.")

        # Step 4: Success! Clean up the OTP record
        delete_query = "DELETE FROM otp_requests WHERE email = %s"
        cursor.execute(delete_query, (request.email,))
        connection.commit()

        # In a real app, you would generate a JWT or session token here
        # and return it to the client for authenticated requests.
        return {"message": "Login successful!"}

    except Error as e:
        print(f"Database error in /verify-otp: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
    finally:
        cursor.close()
        connection.close()


@app.get("/")
def read_root():
    return {"message": "Welcome to the LawVriksh Backend - OTP Login System"}

# To run this application:
# 1. Create the `otp_requests` table in your MySQL database.
# 2. Make sure you have a .env file in this directory with your credentials:
#    DB_HOST=your_host
#    DB_USER=your_user
#    DB_PASSWORD=your_password
#    DB_NAME=your_database
#    RESEND_API_KEY=your_resend_api_key
# 3. Install dependencies: pip install -r requirements.txt
# 4. Run the server: uvicorn main:app --reload