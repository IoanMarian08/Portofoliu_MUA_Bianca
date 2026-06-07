import { Link } from 'react-router-dom';
import { BRAND } from '../constants/site';
import { useTranslation } from '../hooks/useTranslation';
import Button from './Button';
import phoneHeroVideo from '../assets/videos/phone video.mov';
import landscapeHeroVideo from '../assets/videos/landscape video.mov';

function HeroVideo() {
  const { t } = useTranslation();

  return (
    <section className="hero" aria-label={t('home.introAria')}>
      <video
        className="hero__video hero__video--mobile"
        src={phoneHeroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster=""
        preload="auto"
      />
      <video
        className="hero__video hero__video--desktop"
        src={landscapeHeroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster=""
        preload="auto"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        {t('home.heroLabel') ? <p className="eyebrow">{t('home.heroLabel')}</p> : null}
        <h1>{BRAND.name}</h1>
        {t('home.heroTagline') ? <p>{t('home.heroTagline')}</p> : null}
        <Button as={Link} to="/meet-your-artist">
          {t('home.heroCta')}
        </Button>
      </div>
    </section>
  );
}

export default HeroVideo;
