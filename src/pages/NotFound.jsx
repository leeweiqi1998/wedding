import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <header className="page-head">
        <h1>Lost?</h1>
        <div className="sub">That page isn&rsquo;t in our plans</div>
      </header>
      <section className="block">
        <div className="wrap">
          <p className="muted">
            <Link to="/">Back to the start</Link>
          </p>
        </div>
      </section>
    </>
  );
}
