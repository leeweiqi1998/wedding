import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/details', label: 'Details' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/faq', label: 'FAQ' },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-mark">S &middot; W</Link>
        <div className="nav-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
