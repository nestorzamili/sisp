import logger from '@/lib/logger';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, from } = await request.json();

    if (!to || !subject || !html) {
      logger.warn('Missing required fields for sending email', {
        to, 
        subject: !!subject,
        html: !!html,
      });
      return Response.json(
        { error: 'Missing required fields: to, subject, html' },
        { status: 400 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      logger.error({ err: error }, 'Resend API error');
      return Response.json({ error }, { status: 500 });
    }

    logger.info(`Email sent successfully to ${to} with ID: ${data?.id}`);

    return Response.json({ data });
  } catch (error) {
    logger.error({ err: error }, 'Failed to send email');
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
