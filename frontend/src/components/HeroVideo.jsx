import { Link } from 'react-router-dom';
import { BRAND, HERO_VIDEO_URL } from '../constants/site';
import { useTranslation } from '../hooks/useTranslation';
import Button from './Button';

function HeroVideo() {
  const { t } = useTranslation();

  return (
    <section className="hero" aria-label={t('home.introAria')}>
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">{t('home.heroLabel')}</p>
        <h1>{BRAND.name}</h1>
        <p>{t('home.heroTagline')}</p>
        <Button as={Link} to="/meet-your-artist">
          {t('home.heroCta')}
        </Button>
      </div>
    </section>
  );
}

export default HeroVideo;
