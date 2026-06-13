const API_URL = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

export async function submitContactMessage(payload) {
  const endpoint = API_URL ? `${API_URL}/api/contact` : '/api/contact';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to send contact message.');
  }

  return data;
}
