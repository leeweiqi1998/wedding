"""Wedding RSVP API.

POST /rsvp accepts JSON, validates, and appends a row to the
"Wedding RSVPs" Google Sheet via a service account.
"""
import os
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2 import service_account
from googleapiclient.discovery import build

SHEET_ID = os.environ["SHEET_ID"]
SHEET_RANGE = os.environ.get("SHEET_RANGE", "Sheet1!A:H")
SA_FILE = os.environ.get(
    "SA_FILE", "/root/wedding-rsvp/service_account_sheets.json"
)

_creds = service_account.Credentials.from_service_account_file(
    SA_FILE, scopes=["https://www.googleapis.com/auth/spreadsheets"]
)
_sheets = build("sheets", "v4", credentials=_creds, cache_discovery=False)

# Column order written to the sheet. Make sure your sheet header row matches.
COLS = [
    "submitted_at",
    "name",
    "email",
    "attending",
    "plus_one",
    "plus_one_name",
    "dietary",
    "note",
]

app = FastAPI(title="Wedding RSVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
    max_age=86400,
)


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/rsvp")
async def rsvp(req: Request):
    try:
        data = await req.json()
    except Exception:
        raise HTTPException(400, "invalid json")

    # Honeypot — silently accept; do not write.
    if data.get("bot-field"):
        return {"ok": True}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    attending = (data.get("attending") or "").strip()
    if not name or not email or not attending:
        raise HTTPException(400, "missing required field")

    submitted_at = (
        data.get("submitted_at") or datetime.now(timezone.utc).isoformat()
    )

    row = [
        submitted_at,
        name,
        email,
        attending,
        (data.get("plus_one") or "").strip(),
        (data.get("plus_one_name") or "").strip(),
        (data.get("dietary") or "").strip(),
        (data.get("note") or "").strip(),
    ]

    _sheets.spreadsheets().values().append(
        spreadsheetId=SHEET_ID,
        range=SHEET_RANGE,
        valueInputOption="RAW",
        insertDataOption="INSERT_ROWS",
        body={"values": [row]},
    ).execute()

    return {"ok": True}
