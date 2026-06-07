import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BRAND } from '../constants/site';
import { useTranslation } from '../hooks/useTranslation';

const navItems = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.meetYourArtist', to: '/meet-your-artist' },
  { labelKey: 'nav.contact', to: '/contact' },
  { labelKey: 'nav.makeAppointment', to: '/make-an-appointment' },
  { labelKey: 'nav.instagram', to: '/instagram' },
  { labelKey: 'nav.feedback', to: '/feedback' },
  { labelKey: 'nav.faqs', to: '/faqs' }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, toggleLanguage } = useTranslation();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand-mark" to="/">
          {BRAND.name}
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label={t('common.menu')}
          onClick={() => setOpen((current) => !current)}
        >
          {t('common.menu')}
        </button>
        <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Primary navigation">
          <div className="site-nav__links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>
          <div className="site-nav__actions">
            <button
              type="button"
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label={`${t('common.languageSwitchLabel')} ${t('common.switchLanguage')}`}
            >
              {t('common.switchLanguage')}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
