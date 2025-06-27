import logger from '@/lib/logger';
import { WhatsAppTemplates } from '@/templates/whatsapp-templates';

interface WhatsAppMessage {
  numbers: string[];
  content: string;
}

interface WhatsAppApiResponse {
  status: boolean;
  message: string;
}

export class WhatsAppService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly adminNumbers: string[];

  constructor() {
    this.apiKey = process.env.WHATSAPP_API_KEY || '';
    this.baseUrl = process.env.WHATSAPP_API_URL || '';
    this.adminNumbers = (process.env.WHATSAPP_ADMIN_NUMBERS || '')
      .split(',')
      .filter((num) => num.trim());

    if (!this.apiKey) {
      logger.error('WHATSAPP_API_KEY environment variable is required');
      throw new Error('WHATSAPP_API_KEY environment variable is required');
    }

    if (!this.baseUrl) {
      logger.error('WHATSAPP_API_URL environment variable is required');
      throw new Error('WHATSAPP_API_URL environment variable is required');
    }

    if (this.adminNumbers.length === 0) {
      logger.error('WHATSAPP_ADMIN_NUMBERS environment variable is required');
      throw new Error(
        'WHATSAPP_ADMIN_NUMBERS environment variable is required',
      );
    }
  }

  async sendAdminNotification(
    schoolName: string,
    npsn: string,
    email: string,
    phone: string,
  ): Promise<WhatsAppApiResponse> {
    const message = WhatsAppTemplates.createRegistrationMessage(
      schoolName,
      npsn,
      email,
      phone,
    );

    const payload: WhatsAppMessage = {
      numbers: this.adminNumbers,
      content: message,
    };

    logger.info(
      { schoolName, npsn, email, phone },
      'Mengirim WhatsApp admin notification',
    );
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const result = {
        status: false,
        message: errorData.message || `HTTP error: ${response.status}`,
      };
      logger.error({ result }, 'WhatsApp admin notification failed');
      return result;
    }

    const result = await response.json();
    logger.info({ result }, 'WhatsApp admin notification sent');
    return result;
  }

  async sendApprovalNotification(
    schoolPhone: string,
    schoolName: string,
    npsn: string,
    loginUrl: string,
  ): Promise<WhatsAppApiResponse> {
    const message = WhatsAppTemplates.createApprovalMessage(
      schoolName,
      npsn,
      loginUrl,
    );

    const payload: WhatsAppMessage = {
      numbers: [schoolPhone],
      content: message,
    };

    logger.info(
      { schoolPhone, schoolName, npsn },
      'Mengirim WhatsApp approval notification',
    );
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const result = {
        status: false,
        message: errorData.message || `HTTP error: ${response.status}`,
      };
      logger.error({ result }, 'WhatsApp approval notification failed');
      return result;
    }

    const result = await response.json();
    logger.info({ result }, 'WhatsApp approval notification sent');
    return result;
  }

  async sendRejectionNotification(
    schoolPhone: string,
    schoolName: string,
    npsn: string,
    reason: string,
  ): Promise<WhatsAppApiResponse> {
    const message = WhatsAppTemplates.createRejectionMessage(
      schoolName,
      npsn,
      reason,
    );

    const payload: WhatsAppMessage = {
      numbers: [schoolPhone],
      content: message,
    };

    logger.info(
      { schoolPhone, schoolName, npsn, reason },
      'Mengirim WhatsApp rejection notification',
    );
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const result = {
        status: false,
        message: errorData.message || `HTTP error: ${response.status}`,
      };
      logger.error({ result }, 'WhatsApp rejection notification failed');
      return result;
    }

    const result = await response.json();
    logger.info({ result }, 'WhatsApp rejection notification sent');
    return result;
  }
}
