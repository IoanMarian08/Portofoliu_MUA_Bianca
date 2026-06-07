import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { useTranslation } from '../hooks/useTranslation';

const portraitPlaceholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500">
      <defs>
        <linearGradient id="p" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eee1d4" />
          <stop offset="100%" stop-color="#90715d" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1500" fill="url(#p)" />
      <text x="50%" y="50%" text-anchor="middle" fill="#fffaf3" font-size="72" font-family="Georgia, serif" letter-spacing="10">
        ARTIST PORTRAIT
      </text>
    </svg>
  `);

function MeetYourArtist() {
  const { t } = useTranslation();

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          eyebrow={t('meetArtist.eyebrow')}
          title={t('meetArtist.title')}
          description={t('meetArtist.description')}
        />

        <div className="split-section">
          <Reveal>
            <img
              className="feature-image"
              src={portraitPlaceholder}
              alt={t('meetArtist.portraitAlt')}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <Reveal className="copy-card" delay={120}>
            <p>{t('meetArtist.paragraphOne')}</p>
            <p>{t('meetArtist.paragraphTwo')}</p>
            <Button as={Link} to="/make-an-appointment">
              {t('meetArtist.cta')}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default MeetYourArtist;
