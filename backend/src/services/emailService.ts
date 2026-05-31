import nodemailer from 'nodemailer';

interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

export const sendContactNotification = async (payload: ContactEmailPayload): Promise<boolean> => {
  const transporter = getTransporter();
  const notifyTo = process.env.NOTIFY_EMAIL ?? 'chandan99file@gmail.com';
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  if (!transporter) {
    console.warn('[MAILER] SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
    return false;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;background:#03030c;color:#e2e8f0;padding:24px;border-radius:8px;">
      <h2 style="color:#00f0ff;margin:0 0 16px;">New Portfolio Contact Message</h2>
      <p><strong>Visitor Name:</strong> ${payload.name}</p>
      <p><strong>Visitor Email:</strong> ${payload.email}</p>
      <p><strong>Subject:</strong> ${payload.subject}</p>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <hr style="border-color:#1e293b;margin:16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;line-height:1.6;">${payload.message}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: notifyTo,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject} — ${payload.name}`,
    html,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\nTimestamp: ${timestamp}\n\nMessage:\n${payload.message}`,
  });

  return true;
};
