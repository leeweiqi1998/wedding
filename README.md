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

## RSVP form

The RSVP form POSTs JSON to a private endpoint that records submissions.
Override the URL during local dev with `VITE_RSVP_ENDPOINT` in `.env.local`.

## Deploy

`dist/` is plain static output. Drop it on Netlify, Cloudflare Pages, Vercel, or
GitHub Pages. For GitHub Pages under a repo subpath, set `base` in `vite.config.js`
to `'/wedding/'`.
