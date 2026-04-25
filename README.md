# Sean & Wei Qi · Wedding Site

Vite + React + React Router. Multi-page wedding site (Home, Details, RSVP, FAQ).

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs to dist/
npm run preview      # serve the built dist/
```

## Project layout

```
index.html              # Vite entry
vite.config.js
public/
  favicon.svg
src/
  main.jsx              # bootstrap + BrowserRouter
  App.jsx               # routes
  styles.css
  components/
    Layout.jsx
    Nav.jsx
    Footer.jsx
    Countdown.jsx       # live countdown to 7 Nov 2026
  pages/
    Home.jsx            # hero + countdown + RSVP CTA
    Details.jsx         # date, time, venue, calendar, map
    Rsvp.jsx            # form
    Faq.jsx             # good-to-know
    NotFound.jsx
  lib/
    calendar.js         # .ics download
```

## RSVP backend

The form POSTs JSON to `https://api.larper-research.xyz/wedding/rsvp`, which
appends a row to the **"Wedding RSVPs"** Google Sheet.

The backend is a small FastAPI service running on the `buff2` VPS:

- Code: `/root/wedding-rsvp/api.py`
- Service: `systemctl {status,restart} wedding-rsvp.service`
- Listens on `127.0.0.1:8071`
- Routed by Traefik via `/docker/traefik/dynamic/wedding.yml`
- Auth: service account `sheets@sheets-367309.iam.gserviceaccount.com`
  (key at `/root/wedding-rsvp/service_account_sheets.json`)
- Sheet ID is set in `/root/wedding-rsvp/.env` as `SHEET_ID`

To override during local dev, set `VITE_RSVP_ENDPOINT` in `.env.local`.

Payload shape:

```json
{
  "name": "...",
  "email": "...",
  "attending": "Joyfully accepts" | "Regretfully declines",
  "plus_one": "Bringing a guest" | "Coming solo",
  "plus_one_name": "...",
  "dietary": "...",
  "note": "...",
  "submitted_at": "2026-04-25T12:00:00.000Z"
}
```

## Deploy

`dist/` is plain static output. Drop it on Netlify, Cloudflare Pages, Vercel, or
GitHub Pages. For GitHub Pages under a repo subpath, set `base` in `vite.config.js`
to `'/wedding/'`.
