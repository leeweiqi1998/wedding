# Sean & Wei Qi — Wedding Site

Static multi-page wedding site. No build step.

## Structure

```
index.html       # Hero + intro + CTA
details.html     # Date, time, venue, dress code, map, calendar
rsvp.html        # RSVP form
faq.html         # Good to know
favicon.svg
assets/
  css/styles.css
  js/nav.js      # active-link highlighting
  js/calendar.js # .ics download for Apple / Outlook
  js/rsvp.js     # RSVP form submit
```

## Local preview

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Wiring up RSVP → Google Sheets

The form in `rsvp.html` POSTs to a URL set in `assets/js/rsvp.js`:

```js
const RSVP_ENDPOINT = ''; // set to Apps Script /exec URL
```

Two options:

1. **Google Apps Script (simplest)** — bound to the sheet, deploy as a web app. No service account needed.
2. **Backend with service account** — small server (Cloudflare Worker, Cloud Run, etc.) using the existing `service_account_sheets.json` and the Sheets API. Share the target sheet with the service-account email as Editor:
   - `sheets@sheets-367309.iam.gserviceaccount.com`

## Deploying

Anything that serves static files works (GitHub Pages, Netlify, Cloudflare Pages, Vercel). Push to `main` and point your host at the repo root.
