"""Inspect and initialize the Wedding RSVPs sheet header row."""
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

SHEET_ID = "191nKm0iZp7WY84LIZak0Bt_bMgSjZjUt5U2xitARK34"
SA_FILE = "/root/wedding-rsvp/service_account_sheets.json"

HEADERS = [
    "Submitted At",
    "Name",
    "Email",
    "Attending",
    "Plus One",
    "Plus One Name",
    "Dietary",
    "Note",
]

creds = service_account.Credentials.from_service_account_file(
    SA_FILE, scopes=["https://www.googleapis.com/auth/spreadsheets"]
)
sheets = build("sheets", "v4", credentials=creds, cache_discovery=False)

meta = sheets.spreadsheets().get(spreadsheetId=SHEET_ID).execute()
title = meta.get("properties", {}).get("title")
first_tab = meta["sheets"][0]["properties"]["title"]
print(f"Spreadsheet: {title!r}")
print(f"First tab:   {first_tab!r}")

rng = f"{first_tab}!A1:H1"
res = sheets.spreadsheets().values().get(spreadsheetId=SHEET_ID, range=rng).execute()
existing = res.get("values", [[]])
existing_row = existing[0] if existing else []
print(f"Existing row 1: {existing_row}")

if not existing_row:
    sheets.spreadsheets().values().update(
        spreadsheetId=SHEET_ID,
        range=rng,
        valueInputOption="RAW",
        body={"values": [HEADERS]},
    ).execute()
    print("Wrote headers.")
elif existing_row == HEADERS:
    print("Headers already correct.")
else:
    print(f"Headers exist but differ. Expected {HEADERS}, got {existing_row}.")

# Also format header row: bold + freeze.
sheet_id = meta["sheets"][0]["properties"]["sheetId"]
sheets.spreadsheets().batchUpdate(
    spreadsheetId=SHEET_ID,
    body={"requests": [
        {"repeatCell": {
            "range": {"sheetId": sheet_id, "startRowIndex": 0, "endRowIndex": 1},
            "cell": {"userEnteredFormat": {"textFormat": {"bold": True}}},
            "fields": "userEnteredFormat.textFormat.bold",
        }},
        {"updateSheetProperties": {
            "properties": {"sheetId": sheet_id, "gridProperties": {"frozenRowCount": 1}},
            "fields": "gridProperties.frozenRowCount",
        }},
    ]},
).execute()
print("Formatted: header bold + frozen.")

# Make sure SHEET_RANGE in .env points at the right tab.
print(f"\nSet SHEET_RANGE={first_tab}!A:H if not already.")
