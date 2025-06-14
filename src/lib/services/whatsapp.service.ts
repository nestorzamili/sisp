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
      throw new Error('WHATSAPP_API_KEY environment variable is required');
    }

    if (!this.baseUrl) {
      throw new Error('WHATSAPP_API_URL environment variable is required');
    }

    if (this.adminNumbers.length === 0) {
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
      console.log('WhatsApp admin notification:', result);
      return result;
    }

    const result = await response.json();
    console.log('WhatsApp admin notification:', {
      status: result.status,
      message: result.message,
    });
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
      console.log('WhatsApp approval notification:', result);
      return result;
    }

    const result = await response.json();
    console.log('WhatsApp approval notification:', {
      status: result.status,
      message: result.message,
    });
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
      console.log('WhatsApp rejection notification:', result);
      return result;
    }

    const result = await response.json();
    console.log('WhatsApp rejection notification:', {
      status: result.status,
      message: result.message,
    });
    return result;
  }
}
