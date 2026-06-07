import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
