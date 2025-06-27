import logger from '@/lib/logger';

export async function sendEmail({
  to,
  subject,
  html,
  from = `SISP - Nias Selatan <${process.env.EMAIL_USER}>`,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  // Validate recipient email
  if (!to || typeof to !== 'string') {
    logger.error('Invalid recipient email address:', to);
    throw new Error('Invalid recipient email address');
  }

  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        from,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Email API error: ${errorData.error}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    logger.error('Failed to send email:', error);
    throw error;
  }
}
