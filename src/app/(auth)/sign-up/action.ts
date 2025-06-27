'use server';

import { SekolahService } from '@/lib/services/sekolah.service';
import { WhatsAppService } from '@/lib/services/whatsapp.service';
import {
  CreateSekolahData,
  SekolahServiceResponse,
  SekolahWithDetails,
} from '@/types/sekolah';

import logger from '@/lib/logger';

export async function createSekolahAction(
  data: CreateSekolahData,
): Promise<SekolahServiceResponse<SekolahWithDetails>> {
  try {
    const result = await SekolahService.createSekolah(data);

    if (result.success && result.data) {
      const { nama_sekolah, npsn, user, phone } = result.data;

      // Check if WhatsApp notifications are enabled
      const isWhatsAppEnabled = process.env.WHATSAPP_ENABLED === 'true';

      if (isWhatsAppEnabled) {
        Promise.resolve().then(async () => {
          try {
            const whatsappService = new WhatsAppService();
            await whatsappService.sendAdminNotification(
              nama_sekolah,
              npsn,
              user?.email || 'Email tidak tersedia',
              phone || 'No. HP tidak tersedia',
            );
          } catch (whatsappError) {
            logger.error(
              { err: whatsappError },
              'Failed to send WhatsApp notification',
            );
          }
        });
      } else {
        logger.info(
          'WhatsApp notifications are disabled. Skipping notification.',
        );
      }
    }

    return result;
  } catch (error) {
    logger.error({ err: error }, 'Error in createSekolahAction');
    return {
      success: false,
      error: 'Terjadi kesalahan saat membuat data sekolah',
    };
  }
}
