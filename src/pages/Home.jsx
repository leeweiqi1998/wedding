import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown.jsx';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Save the Date</div>
        <h1 className="names">
          Sean
          <span className="and">and</span>
          Wei Qi
        </h1>
        <div className="meta">
          <div>7 . 11 . 2026</div>
          <div>Clifford Pier &middot; Singapore</div>
        </div>
        <Countdown />
        <Link to="/rsvp" className="hero-cta">RSVP</Link>
      </section>

      <section className="block">
        <div className="wrap">
          <p className="muted">
            Better late than never &mdash;<br />join us for the night!
          </p>
        </div>
      </section>
    </>
  );
}
