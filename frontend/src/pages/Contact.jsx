import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_DETAILS } from '../constants/site';
import Button from '../components/Button';
import InputField from '../components/InputField';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import TextareaField from '../components/TextareaField';
import { useTranslation } from '../hooks/useTranslation';

function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setValues({ name: '', email: '', message: '' });
  }

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          eyebrow={t('contactPage.eyebrow')}
          title={t('contactPage.title')}
          description={t('contactPage.description')}
        />

        <div className="split-section split-section--contact">
          <Reveal className="copy-card">
            <div className="contact-links contact-links--stacked">
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
              <Button as={Link} to="/feedback" className="button--secondary">
                {t('common.feedback')}
              </Button>
            </div>
          </Reveal>

          <Reveal className="copy-card" delay={120}>
            <form className="appointment-form" onSubmit={handleSubmit}>
              <InputField
                id="contact-name"
                label={t('common.name')}
                name="name"
                type="text"
                value={values.name}
                onChange={(event) => setValues({ ...values, name: event.target.value })}
                required
              />
              <InputField
                id="contact-email"
                label={t('common.email')}
                name="email"
                type="email"
                value={values.email}
                onChange={(event) => setValues({ ...values, email: event.target.value })}
                required
              />
              <TextareaField
                id="contact-message"
                label={t('common.message')}
                name="message"
                rows="5"
                value={values.message}
                onChange={(event) => setValues({ ...values, message: event.target.value })}
                required
              />
              {submitted ? (
                <div className="form-status form-status--success">{t('contactPage.formSuccess')}</div>
              ) : null}
              <Button type="submit">{t('common.sendMessage')}</Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
