import { NavLink } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import Reveal from './Reveal';

const leftItems = [
  { labelKey: 'nav.meetYourArtist', to: '/meet-your-artist' },
  { labelKey: 'nav.contact', to: '/contact' },
  { labelKey: 'nav.makeAppointment', to: '/make-an-appointment' }
];

const rightItems = [
  { labelKey: 'nav.instagram', to: '/instagram' },
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.faqs', to: '/faqs' }
];

function MenuColumns() {
  const { t } = useTranslation();

  return (
    <Reveal className="menu-columns">
      <div className="menu-columns__column">
        {leftItems.map((item) => (
          <NavLink
            key={item.labelKey}
            className={({ isActive }) => `menu-link${isActive ? ' active' : ''}`}
            to={item.to}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
      <div className="menu-columns__column">
        {rightItems.map((item) => (
          <NavLink
            key={item.labelKey}
            className={({ isActive }) => `menu-link${isActive ? ' active' : ''}`}
            to={item.to}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
    </Reveal>
  );
}

export default MenuColumns;
