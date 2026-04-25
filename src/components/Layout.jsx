import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <>
      <Nav />
      <main key={location.pathname} className="page-fade">
        {children}
      </main>
      <Footer />
    </>
  );
}
