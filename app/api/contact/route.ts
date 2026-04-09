import { Resend } from 'resend';

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

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { message: 'Email delivery is not configured on the server yet.' },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { error } = await resend.emails.send({
      from: 'Corpus Project <onboarding@resend.dev>',
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: 'Order #1',
      html,
    });

    if (error) {
      return Response.json(
        { message: 'Unable to send your request right now. Please try again.' },
        { status: 500 },
      );
    }

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
