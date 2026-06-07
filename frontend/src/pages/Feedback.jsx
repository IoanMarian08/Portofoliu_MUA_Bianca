import { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import TextareaField from '../components/TextareaField';
import { useTranslation } from '../hooks/useTranslation';

function Feedback() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    eventType: '',
    message: ''
  });

  const beautyTestimonials = t('feedbackPage.testimonials.beauty');
  const bridalTestimonials = t('feedbackPage.testimonials.bridal');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setValues({
      firstName: '',
      eventType: '',
      message: ''
    });
  }

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          eyebrow={t('feedbackPage.eyebrow')}
          title={t('feedbackPage.title')}
          description={t('feedbackPage.description')}
        />

        <div className="feedback-layout">
          <Reveal className="feedback-form-card">
            <p className="eyebrow">{t('feedbackPage.formEyebrow')}</p>
            <h2>{t('feedbackPage.formTitle')}</h2>
            <p>{t('feedbackPage.formDescription')}</p>

            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <InputField
                  id="feedback-first-name"
                  label={t('common.firstName')}
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="feedback-event-type"
                  label={t('appointment.eventType')}
                  name="eventType"
                  type="text"
                  value={values.eventType}
                  onChange={handleChange}
                  required
                />
              </div>

              <TextareaField
                id="feedback-message"
                label={t('common.message')}
                name="message"
                rows="6"
                value={values.message}
                onChange={handleChange}
                placeholder={t('feedbackPage.feedbackPlaceholder')}
                required
              />

              {submitted ? (
                <div className="form-status form-status--success">{t('feedbackPage.success')}</div>
              ) : null}

              <Button type="submit">{t('feedbackPage.submit')}</Button>
            </form>
          </Reveal>

          <div className="feedback-sections">
            <Reveal className="feedback-group">
              <div className="feedback-group__heading">
                <p className="eyebrow">{t('feedbackPage.eyebrow')}</p>
                <h2>{t('feedbackPage.beautyTitle')}</h2>
              </div>
              <div className="feedback-grid">
                {Array.isArray(beautyTestimonials)
                  ? beautyTestimonials.map((item, index) => (
                      <article className="feedback-card" key={`beauty-${index}`}>
                        <p>{item}</p>
                      </article>
                    ))
                  : null}
              </div>
            </Reveal>

            <Reveal className="feedback-group" delay={120}>
              <div className="feedback-group__heading">
                <p className="eyebrow">{t('feedbackPage.eyebrow')}</p>
                <h2>{t('feedbackPage.bridalTitle')}</h2>
              </div>
              <div className="feedback-grid">
                {Array.isArray(bridalTestimonials)
                  ? bridalTestimonials.map((item, index) => (
                      <article className="feedback-card" key={`bridal-${index}`}>
                        <p>{item}</p>
                      </article>
                    ))
                  : null}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feedback;
