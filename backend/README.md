# Wedding RSVP backend

FastAPI service that receives RSVP POSTs and appends rows to the
"Wedding RSVPs" Google Sheet via a service account.

Currently deployed on the `buff2` VPS at
`https://api.larper-research.xyz/wedding/rsvp` (port 8071 internal,
behind Traefik with auto LetsEncrypt).

## Layout

```
api.py              # FastAPI app: POST /rsvp, GET /health
init_sheet.py       # one-off: write & format the header row in the sheet
requirements.txt
wedding-rsvp.service   # systemd unit (drop into /etc/systemd/system/)
traefik/wedding.yml    # Traefik dynamic config (drop into /docker/traefik/dynamic/)
.env.example
```

## Required secrets (NOT in git)

- `service_account_sheets.json` — Google service account key with Editor
  access to the sheet. Place at `/root/wedding-rsvp/service_account_sheets.json`,
  `chmod 600`.
- `.env` — sheet config. Copy from `.env.example`, fill in `SHEET_ID`.

## Deploy from scratch

```bash
ssh root@<host>
mkdir -p /root/wedding-rsvp && cd /root/wedding-rsvp

# Copy in: api.py, requirements.txt, init_sheet.py
# Copy in: service_account_sheets.json (chmod 600)
# Copy in: .env (chmod 600)

python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

# One-off: write header row
.venv/bin/python init_sheet.py

# systemd
cp wedding-rsvp.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now wedding-rsvp.service

# Traefik route
cp traefik/wedding.yml /docker/traefik/dynamic/
# Traefik watches the dynamic dir; no restart needed.

# Smoke test
curl https://api.larper-research.xyz/wedding/health
```

## Operations

- Logs: `journalctl -u wedding-rsvp.service -f`
- Restart: `systemctl restart wedding-rsvp.service`
- Update code: edit `api.py`, then `systemctl restart wedding-rsvp.service`

## Updating CORS

`api.py` uses `allow_origins=["*"]` for now. Once the wedding site has a
fixed origin, narrow it to that list and restart the service.

## Sheet schema

Columns (must match `COLS` in `api.py`):

| Submitted At | Name | Email | Attending | Plus One | Plus One Name | Dietary | Note |
