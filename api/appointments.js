const nodemailer = require('nodemailer');

function validateAppointmentPayload(payload) {
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

  if (!/\S+@\S+\.\S+/.test(payload.email || '')) {
    return 'A valid email address is required.';
  }

  return null;
}

function assertMailerConfig() {
  const requiredConfig = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'APPOINTMENT_RECEIVER_EMAIL'
  ];

  const missingConfig = requiredConfig.find((key) => !process.env[key]);

  if (missingConfig) {
    throw new Error(`Missing environment variable: ${missingConfig}`);
  }
}

function appointmentHtml(payload) {
  const selectedLanguage = payload.language === 'ro' ? 'Romanian' : 'English';
  const rows = [
    ['Selected website language', selectedLanguage],
    ['Full name', payload.fullName],
    ['Email', payload.email],
    ['Phone number', payload.phone],
    ['Desired service', payload.service],
    ['Preferred date', payload.preferredDate],
    ['Preferred time', payload.preferredTime],
    ['Event type', payload.eventType],
    ['Location', payload.location],
    ['Additional details', payload.details || 'Not provided']
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border:1px solid #e8ddd2;font-weight:600;color:#4d392d;">${label}</td>
          <td style="padding:12px 16px;border:1px solid #e8ddd2;color:#3b2d25;">${value}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family:Helvetica,Arial,sans-serif;background:#f7f1e9;padding:32px;">
      <div style="max-width:760px;margin:0 auto;background:#fffaf5;border-radius:24px;padding:32px;border:1px solid #ebdfd1;">
        <p style="letter-spacing:0.2em;text-transform:uppercase;color:#866953;font-size:12px;">New Makeup Appointment Request</p>
        <h1 style="font-family:Georgia,serif;color:#2d221d;margin-top:0;">Makeup by Bianca</h1>
        <table style="width:100%;border-collapse:collapse;background:#fffefb;">
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.'
    });
  }

  const validationMessage = validateAppointmentPayload(req.body || {});

  if (validationMessage) {
    return res.status(400).json({
      success: false,
      message: validationMessage
    });
  }

  try {
    assertMailerConfig();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.APPOINTMENT_RECEIVER_EMAIL || 'bianca.buca@yahoo.com',
      replyTo: req.body.email,
      subject: 'New Makeup Appointment Request',
      html: appointmentHtml(req.body)
    });

    return res.status(200).json({
      success: true,
      message: 'Your appointment request has been sent successfully.'
    });
  } catch (error) {
    console.error('Vercel appointment email error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your appointment request.'
    });
  }
};
