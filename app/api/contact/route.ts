import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  packageType?: string;
  projectBrief?: string;
};

const RECEIVER_EMAIL = 'the.corpus.projects@gmail.com';

function getRequiredString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = getRequiredString(body.name);
    const email = getRequiredString(body.email);
    const company = getRequiredString(body.company);
    const phone = getRequiredString(body.phone);
    const packageType = getRequiredString(body.packageType);
    const projectBrief = getRequiredString(body.projectBrief);

    if (!name || !email || !packageType || !projectBrief) {
      return Response.json(
        { message: 'Please complete the required fields before sending.' },
        { status: 400 },
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return Response.json(
        { message: 'Email delivery is not configured on the server yet.' },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const text = [
      'New package inquiry from Corpus Project website',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Company / Brand: ${company || 'Not provided'}`,
      `Phone / WhatsApp: ${phone || 'Not provided'}`,
      `Package Type: ${packageType}`,
      '',
      'Project Brief:',
      projectBrief,
    ].join('\n');

    const html = `
      <h2>New package inquiry from Corpus Project website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company / Brand:</strong> ${escapeHtml(company || 'Not provided')}</p>
      <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Package Type:</strong> ${escapeHtml(packageType)}</p>
      <p><strong>Project Brief:</strong></p>
      <p>${escapeHtml(projectBrief).replace(/\n/g, '<br />')}</p>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: 'Order #1',
      text,
      html,
    });

    return Response.json({
      message: 'Your request has been sent. We will review it and get back to you.',
    });
  } catch {
    return Response.json(
      { message: 'Unable to send your request right now. Please try again.' },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
