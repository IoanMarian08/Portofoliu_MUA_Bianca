const API_URL = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

export async function submitAppointment(payload) {
  const endpoint = API_URL ? `${API_URL}/api/appointments` : '/api/appointments';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to submit appointment request.');
  }

  return data;
}
