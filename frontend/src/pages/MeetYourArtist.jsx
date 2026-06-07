import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { useTranslation } from '../hooks/useTranslation';
import artistPortrait from '../assets/images/meet_the_artist.png';

function MeetYourArtist() {
  const { t } = useTranslation();
  const story = t('meetArtist.story');

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          className="page-header--quote"
          eyebrow={t('meetArtist.eyebrow')}
          title={t('meetArtist.title')}
          description={t('meetArtist.description')}
        />

        <div className="split-section split-section--artist">
          <Reveal>
            <img
              className="feature-image"
              src={artistPortrait}
              alt={t('meetArtist.portraitAlt')}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <Reveal className="copy-card" delay={120}>
            {Array.isArray(story)
              ? story.map((paragraph, index) => <p key={`meet-artist-${index}`}>{paragraph}</p>)
              : null}
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
