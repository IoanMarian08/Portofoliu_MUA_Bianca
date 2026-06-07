import { CONTACT_DETAILS } from '../constants/site';
import { useTranslation } from '../hooks/useTranslation';
import Reveal from './Reveal';

function ContactBlock() {
  const { t } = useTranslation();

  return (
    <section className="contact-block">
      <Reveal className="contact-block__inner">
        <div>
          <p className="eyebrow">{t('home.contactEyebrow')}</p>
          <h2>{t('home.contactTitle')}</h2>
        </div>
        <div className="contact-links">
          <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a>
          <a href={CONTACT_DETAILS.facebook} target="_blank" rel="noreferrer">
            {t('common.facebook')}
          </a>
          <a href={CONTACT_DETAILS.instagram} target="_blank" rel="noreferrer">
            {t('common.instagram')}
          </a>
          <a href={CONTACT_DETAILS.tiktok} target="_blank" rel="noreferrer">
            {t('common.tiktok')}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default ContactBlock;
