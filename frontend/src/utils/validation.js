export function validateAppointmentForm(values, t) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = t('appointment.validation.fullNameRequired');
  if (!values.email.trim()) {
    errors.email = t('appointment.validation.emailRequired');
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = t('appointment.validation.emailInvalid');
  }
  if (!values.phone.trim()) errors.phone = t('appointment.validation.phoneRequired');
  if (!values.service.trim()) errors.service = t('appointment.validation.serviceRequired');
  if (!values.preferredDate) errors.preferredDate = t('appointment.validation.preferredDateRequired');
  if (!values.preferredTime) errors.preferredTime = t('appointment.validation.preferredTimeRequired');
  if (!values.eventType.trim()) errors.eventType = t('appointment.validation.eventTypeRequired');
  if (!values.location.trim()) errors.location = t('appointment.validation.locationRequired');

  return errors;
}
