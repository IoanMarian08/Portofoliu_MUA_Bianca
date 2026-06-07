import AppointmentForm from '../components/AppointmentForm';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { useTranslation } from '../hooks/useTranslation';

function MakeAppointment() {
  const { t } = useTranslation();

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          className="page-header--narrow"
          eyebrow={t('appointment.eyebrow')}
          title={t('appointment.title')}
          description={t('appointment.description')}
        />

        <Reveal className="booking-panel">
          <div className="booking-panel__intro">
            <p className="eyebrow">{t('appointment.introEyebrow')}</p>
            <h2>{t('appointment.introTitle')}</h2>
            {t('appointment.introDescription') ? <p>{t('appointment.introDescription')}</p> : null}
          </div>
          <AppointmentForm />
        </Reveal>
      </div>
    </section>
  );
}

export default MakeAppointment;
