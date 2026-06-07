import { sendAppointmentEmail } from '../services/mailer.js';
import { validateAppointmentPayload } from '../utils/validateAppointment.js';

export async function createAppointment(req, res) {
  const validationMessage = validateAppointmentPayload(req.body);

  if (validationMessage) {
    return res.status(400).json({
      success: false,
      message: validationMessage
    });
  }

  try {
    await sendAppointmentEmail(req.body);

    return res.status(200).json({
      success: true,
      message: 'Your appointment request has been sent successfully.'
    });
  } catch (error) {
    console.error('Appointment email error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your appointment request.'
    });
  }
}
