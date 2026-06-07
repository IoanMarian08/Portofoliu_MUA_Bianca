import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { CONTACT_DETAILS } from '../constants/site';
import { useTranslation } from '../hooks/useTranslation';

function Instagram() {
  const { t } = useTranslation();

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          className="page-header--narrow"
          eyebrow={t('instagramPage.eyebrow')}
          title={t('instagramPage.title')}
          description={t('instagramPage.description')}
        />

        <Reveal className="instagram-card">
          <p>{t('instagramPage.cardText')}</p>
          <Button as="a" href={CONTACT_DETAILS.instagram} target="_blank" rel="noreferrer">
            {t('instagramPage.cta')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default Instagram;
