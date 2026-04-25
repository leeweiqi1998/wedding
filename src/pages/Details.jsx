import { downloadIcs } from '../lib/calendar.js';

const GCAL_URL =
  'https://www.google.com/calendar/render?action=TEMPLATE' +
  '&text=Sean+%26+Wei+Qi%27s+Wedding+Dinner' +
  '&dates=20261107T103000Z/20261107T160000Z' +
  '&details=Formal.+Reception+from+6%3A30pm%2C+dinner+at+7pm.' +
  '&location=Clifford+Pier%2C+The+Fullerton+Bay+Hotel%2C+80+Collyer+Quay%2C+Singapore+049326';

export default function Details() {
  return (
    <>
      <header className="page-head">
        <h1>The Details</h1>
        <div className="sub">Saturday &middot; 7 November 2026</div>
      </header>

      <section className="block details">
        <div className="wrap">
          <dl>
            <dt>Date</dt>
            <dd>Saturday, 7 November 2026</dd>

            <dt>Time</dt>
            <dd>6:30 pm reception<small>Dinner at 7:00 pm</small></dd>

            <dt>Venue</dt>
            <dd>
              Clifford Pier
              <small>
                The Fullerton Bay Hotel<br />
                80 Collyer Quay, Singapore 049326
              </small>
            </dd>

            <dt>Dress code</dt>
            <dd>Formal</dd>

            <dt>Plus one</dt>
            <dd>Warmly welcome</dd>

            <dt>Children</dt>
            <dd>Adults only, please</dd>
          </dl>

          <div className="cal">
            <span className="cal-label">Save the date</span>
            <div className="cal-btns">
              <button type="button" className="cal-btn" onClick={downloadIcs}>
                Apple / Outlook
              </button>
              <a className="cal-btn" href={GCAL_URL} target="_blank" rel="noopener noreferrer">
                Google Calendar
              </a>
            </div>
          </div>

          <div className="map">
            <iframe
              src="https://www.google.com/maps?q=Clifford+Pier+Fullerton+Bay+Singapore&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clifford Pier on Google Maps"
            />
          </div>
          <div className="map-links">
            <a href="https://maps.google.com/?q=Clifford+Pier+Fullerton+Bay+Singapore" target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
            <a href="https://maps.apple.com/?q=Clifford+Pier+Singapore" target="_blank" rel="noopener noreferrer">
              Apple Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
