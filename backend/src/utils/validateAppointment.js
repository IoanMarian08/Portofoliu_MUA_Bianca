export function validateAppointmentPayload(payload) {
  const requiredFields = [
    'fullName',
    'email',
    'phone',
    'service',
    'preferredDate',
    'preferredTime',
    'eventType',
    'location'
  ];

  const missingField = requiredFields.find((field) => !String(payload[field] || '').trim());

  if (missingField) {
    return `${missingField} is required.`;
  }

  if (!/\S+@\S+\.\S+/.test(payload.email)) {
    return 'A valid email address is required.';
  }

  return null;
}
