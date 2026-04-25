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

## Wiring up RSVP → Google Sheet

The form posts JSON to `VITE_RSVP_ENDPOINT`. Sheet is **"Wedding RSVPs"**, already
shared with the service account `sheets@sheets-367309.iam.gserviceaccount.com` as
Editor.

Suggested setup: a small backend that receives the POST, authenticates with the
service account, and appends a row using the Google Sheets API. Easiest hosts:

- **Cloudflare Worker** (free, fast). Use `googleapis` via a JWT, or sign a JWT
  manually and call `sheets.googleapis.com/v4/spreadsheets/{id}/values/Sheet1:append`.
- **Cloud Run** / **Cloud Functions** with the `googleapis` Node package.
- **Vercel / Netlify Function** with the `googleapis` Node package.

Then set the deployed URL in `.env.local`:

```
VITE_RSVP_ENDPOINT=https://your-endpoint.example.com/rsvp
```

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
