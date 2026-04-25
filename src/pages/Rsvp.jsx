import { useState } from 'react';

// Wire this to your backend that writes to the "Wedding RSVPs" Google Sheet
// using the service account. See README for the suggested Cloudflare Worker
// / Cloud Run setup.
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT || '';

const initial = {
  name: '',
  email: '',
  attending: '',
  plus_one: '',
  plus_one_name: '',
  dietary: '',
  note: '',
};

export default function Rsvp() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [hp, setHp] = useState(''); // honeypot

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (hp) {
      setStatus('sent'); // pretend success for bots
      return;
    }
    setStatus('sending');

    const payload = { ...form, submitted_at: new Date().toISOString() };

    try {
      if (!RSVP_ENDPOINT) {
        console.warn('VITE_RSVP_ENDPOINT not set. Payload:', payload);
        throw new Error('endpoint not configured');
      }
      const res = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('network');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <>
        <header className="page-head">
          <h1>Thank you</h1>
        </header>
        <section className="block">
          <div className="wrap">
            <p className="muted">
              Your RSVP has been received. We can&rsquo;t wait to celebrate with you.
            </p>
          </div>
        </section>
      </>
    );
  }

  const showPlusOneName = form.plus_one === 'Bringing a guest';

  return (
    <>
      <header className="page-head">
        <h1>RSVP</h1>
        <div className="sub">Kindly respond by 1 October 2026</div>
      </header>

      <section className="block rsvp">
        <div className="wrap">
          <form className="rsvp-form" onSubmit={submit} noValidate>
            <p className="hp">
              <label>
                Don&rsquo;t fill this out:{' '}
                <input
                  name="bot-field"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </label>
            </p>

            <div className="field">
              <label className="lbl" htmlFor="name">Your name</label>
              <input
                type="text" id="name" name="name"
                value={form.name} onChange={onChange}
                required autoComplete="name"
              />
            </div>

            <div className="field">
              <label className="lbl" htmlFor="email">
                Email <span className="opt">(so we can reach you)</span>
              </label>
              <input
                type="email" id="email" name="email"
                value={form.email} onChange={onChange}
                required autoComplete="email"
              />
            </div>

            <div className="field">
              <fieldset>
                <legend>Will you join us?</legend>
                <div className="radios">
                  <Radio name="attending" value="Joyfully accepts" current={form.attending} onChange={onChange} required />
                  <Radio name="attending" value="Regretfully declines" current={form.attending} onChange={onChange} />
                </div>
              </fieldset>
            </div>

            <div className="field">
              <fieldset>
                <legend>Will anyone be joining you?</legend>
                <div className="radios">
                  <Radio name="plus_one" value="Bringing a guest" label="I'll bring a guest" current={form.plus_one} onChange={onChange} />
                  <Radio name="plus_one" value="Coming solo" label="Just me" current={form.plus_one} onChange={onChange} />
                </div>
              </fieldset>
            </div>

            {showPlusOneName && (
              <div className="field">
                <label className="lbl" htmlFor="plus_one_name">Plus one&rsquo;s full name</label>
                <input
                  type="text" id="plus_one_name" name="plus_one_name"
                  value={form.plus_one_name} onChange={onChange}
                />
              </div>
            )}

            <div className="field">
              <label className="lbl" htmlFor="dietary">
                Dietary restrictions or allergies <span className="opt">(optional)</span>
              </label>
              <textarea
                id="dietary" name="dietary" rows="3"
                value={form.dietary} onChange={onChange}
                placeholder="e.g. vegetarian, no shellfish, nut allergy"
              />
            </div>

            <div className="field">
              <label className="lbl" htmlFor="note">Leave us a quirky or intentional note</label>
              <textarea
                id="note" name="note" rows="3" required
                value={form.note} onChange={onChange}
                placeholder="Be silly, be sweet, be specific — just don't leave us hanging."
              />
            </div>

            <div className="submit-row">
              <button type="submit" className="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send RSVP'}
              </button>
            </div>

            {status === 'error' && (
              <div className="form-status error show" role="alert">
                <h3>Something went wrong</h3>
                <p>Please try again, or email us directly.</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Radio({ name, value, label, current, onChange, required }) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={current === value}
        onChange={onChange}
        required={required}
      />
      <span>{label || value}</span>
    </label>
  );
}
