import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpPort === 465,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass
  }
});

function assertMailerConfig() {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.smtpFrom) {
    throw new Error('SMTP configuration is incomplete. Check backend .env values.');
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

function contactHtml(payload) {
  const selectedLanguage = payload.language === 'ro' ? 'Romanian' : 'English';
  const rows = [
    ['Selected website language', selectedLanguage],
    ['Name', payload.name],
    ['Email', payload.email],
    ['Message', payload.message]
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border:1px solid #e8ddd2;font-weight:600;color:#4d392d;">${label}</td>
          <td style="padding:12px 16px;border:1px solid #e8ddd2;color:#3b2d25;white-space:pre-wrap;">${value}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family:Helvetica,Arial,sans-serif;background:#f7f1e9;padding:32px;">
      <div style="max-width:760px;margin:0 auto;background:#fffaf5;border-radius:24px;padding:32px;border:1px solid #ebdfd1;">
        <p style="letter-spacing:0.2em;text-transform:uppercase;color:#866953;font-size:12px;">New Contact Message</p>
        <h1 style="font-family:Georgia,serif;color:#2d221d;margin-top:0;">Makeup by Bianca</h1>
        <table style="width:100%;border-collapse:collapse;background:#fffefb;">
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

export async function sendAppointmentEmail(payload) {
  assertMailerConfig();

  await transporter.sendMail({
    from: env.smtpFrom,
    to: env.appointmentReceiverEmail,
    replyTo: payload.email,
    subject: 'New Makeup Appointment Request',
    html: appointmentHtml(payload)
  });
}

export async function sendContactEmail(payload) {
  assertMailerConfig();

  await transporter.sendMail({
    from: env.smtpFrom,
    to: env.appointmentReceiverEmail,
    replyTo: payload.email,
    subject: 'New Contact Message',
    html: contactHtml(payload)
  });
}
