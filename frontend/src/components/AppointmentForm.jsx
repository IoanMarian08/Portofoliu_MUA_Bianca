import { useState } from 'react';
import { submitAppointment } from '../api/appointments';
import { useTranslation } from '../hooks/useTranslation';
import { validateAppointmentForm } from '../utils/validation';
import Button from './Button';
import InputField from './InputField';
import TextareaField from './TextareaField';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  eventType: '',
  location: '',
  details: ''
};

function AppointmentForm() {
  const { language, t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ type: '', message: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateAppointmentForm(values, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setResult({ type: '', message: '' });

    try {
      await submitAppointment({ ...values, language });
      setResult({ type: 'success', message: t('appointment.success') });
      setValues(initialValues);
    } catch {
      setResult({ type: 'error', message: t('appointment.error') });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <InputField
          id="fullName"
          label={t('appointment.fullName')}
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />
        <InputField
          id="email"
          label={t('appointment.email')}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <InputField
          id="phone"
          label={t('appointment.phone')}
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        <InputField
          id="service"
          label={t('appointment.service')}
          name="service"
          type="text"
          value={values.service}
          onChange={handleChange}
          error={errors.service}
          required
        />
        <InputField
          id="preferredDate"
          label={t('appointment.preferredDate')}
          name="preferredDate"
          type="date"
          value={values.preferredDate}
          onChange={handleChange}
          error={errors.preferredDate}
          required
        />
        <InputField
          id="preferredTime"
          label={t('appointment.preferredTime')}
          name="preferredTime"
          type="time"
          value={values.preferredTime}
          onChange={handleChange}
          error={errors.preferredTime}
          required
        />
        <InputField
          id="eventType"
          label={t('appointment.eventType')}
          name="eventType"
          type="text"
          value={values.eventType}
          onChange={handleChange}
          error={errors.eventType}
          required
        />
        <InputField
          id="location"
          label={t('appointment.location')}
          name="location"
          type="text"
          value={values.location}
          onChange={handleChange}
          error={errors.location}
          required
        />
      </div>

      <TextareaField
        id="details"
        label={t('appointment.details')}
        name="details"
        rows="5"
        value={values.details}
        onChange={handleChange}
        placeholder={t('appointment.detailsPlaceholder')}
      />

      {result.message ? (
        <div className={`form-status form-status--${result.type}`}>{result.message}</div>
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? t('appointment.sending') : t('appointment.submit')}
      </Button>
    </form>
  );
}

export default AppointmentForm;
