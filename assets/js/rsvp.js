// RSVP form handler.
//
// Submits the form as JSON to RSVP_ENDPOINT. Wire this to a Google Apps Script
// web-app URL (or any backend that writes to your Google Sheet).
//
// Apps Script setup sketch:
//   1. In your Google Sheet → Extensions → Apps Script
//   2. Add a doPost(e) that appends e.parameter (or JSON.parse(e.postData.contents))
//      as a new row to the sheet.
//   3. Deploy → New deployment → Web app, "Anyone" access, copy the /exec URL.
//   4. Paste that URL into RSVP_ENDPOINT below.
const RSVP_ENDPOINT = ''; // <-- set me to the Apps Script /exec URL

const plusOneRadios = document.querySelectorAll('input[name="plus_one"]');
const plusOneNameWrap = document.getElementById('plus-one-name');
plusOneRadios.forEach((r) =>
  r.addEventListener('change', () => {
    const yes =
      document.querySelector('input[name="plus_one"]:checked')?.value ===
      'Bringing a guest';
    plusOneNameWrap.classList.toggle('show', yes);
  })
);

const form = document.getElementById('rsvp-form');
const thanks = document.getElementById('thanks');
const oops = document.getElementById('oops');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: if filled, silently pretend success.
  if (form.elements['bot-field']?.value) {
    form.style.display = 'none';
    thanks.classList.add('show');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const payload = Object.fromEntries(new FormData(form).entries());
  payload.submitted_at = new Date().toISOString();

  try {
    if (!RSVP_ENDPOINT) {
      // No endpoint wired up yet — log so it's obvious during local testing.
      console.warn('RSVP_ENDPOINT is not configured. Payload:', payload);
      throw new Error('RSVP endpoint not configured');
    }
    const res = await fetch(RSVP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload).toString(),
    });
    if (!res.ok) throw new Error('Network error');
    form.style.display = 'none';
    thanks.classList.add('show');
    thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (err) {
    oops.classList.add('show');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send RSVP';
  }
});
