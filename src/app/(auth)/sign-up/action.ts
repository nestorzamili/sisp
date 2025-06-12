'use server';

import { SekolahService } from '@/lib/services/sekolah.service';
import { WhatsAppService } from '@/lib/services/whatsapp.service';
import {
  CreateSekolahData,
  SekolahServiceResponse,
  SekolahWithDetails,
} from '@/types/sekolah';

export async function createSekolahAction(
  data: CreateSekolahData,
): Promise<SekolahServiceResponse<SekolahWithDetails>> {
  try {
    const sekolahService = new SekolahService();
    const result = await sekolahService.createSekolah(data);
    if (result.success && result.data) {
      const { nama_sekolah, npsn, user, phone } = result.data;
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
          console.error('Failed to send WhatsApp notification:', whatsappError);
        }
      });
    }

    return result;
  } catch (error) {
    console.error('Error in createSekolahAction:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan saat membuat data sekolah',
    };
  }
}

export async function checkNpsnExistsAction(npsn: string): Promise<boolean> {
  try {
    const sekolahService = new SekolahService();
    return await sekolahService.checkNpsnExists(npsn);
  } catch (error) {
    console.error('Error in checkNpsnExistsAction:', error);
    return false;
  }
}
