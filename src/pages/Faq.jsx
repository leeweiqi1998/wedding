const items = [
  { title: 'Dress code', body: 'Suits and floor-length gowns.' },
  { title: 'Plus ones', body: "You're warmly welcome to bring a guest if you'd like. Just pop their name in your RSVP." },
  { title: 'Adults only', body: 'With love, this is an adults-only evening.' },
  { title: 'Dietary notes', body: 'Allergies or dietary needs? Let us know in the RSVP form.' },
  { title: 'Getting there', body: 'Clifford Pier is at The Fullerton Bay Hotel, 80 Collyer Quay. Valet parking is available; Raffles Place MRT is a short walk.' },
];

export default function Faq() {
  return (
    <>
      <header className="page-head">
        <h1>Good to know</h1>
        <div className="sub">A few quick notes</div>
      </header>

      <section className="block notes">
        <div className="wrap">
          <ul>
            {items.map((it) => (
              <li key={it.title}>
                <strong>{it.title}</strong>
                {it.body}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
