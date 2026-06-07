import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFrom: process.env.SMTP_FROM || '',
  appointmentReceiverEmail: process.env.APPOINTMENT_RECEIVER_EMAIL || 'bianca.buca@yahoo.com'
};
