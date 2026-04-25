import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx';
import Rsvp from './pages/Rsvp.jsx';
import Faq from './pages/Faq.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
