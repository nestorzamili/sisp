'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { LampiranService } from '@/lib/services/lampiran.service';
import { Step7Data } from '../_schema/attachments.schema';
import { headers } from 'next/headers';

export async function saveLampiranDataAction(data: Step7Data) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Get school data first
    const schoolResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const sekolah = schoolResult.data;

    // Delete existing lampiran for this school first
    await LampiranService.deleteAllLampiranBySekolahId(sekolah.id); // Save new lampiran data if provided
    if (data.lampiran && data.lampiran.length > 0) {
      for (const lampiran of data.lampiran) {
        await LampiranService.createLampiran(sekolah.id, {
          nama_dokumen: lampiran.nama_dokumen,
          url: lampiran.url,
          keterangan: lampiran.keterangan,
        });
      }
    }

    // Update school status to PENDING when final step is submitted
    await SekolahService.updateSekolah(sekolah.id, {
      status: 'PENDING',
    });

    return {
      success: true,
      message:
        'Data lampiran berhasil disimpan dan status sekolah diperbarui ke PENDING',
    };
  } catch (error) {
    console.error('Error saving lampiran data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data lampiran',
    };
  }
}

export async function getLampiranDataAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Get school data first
    const schoolResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const sekolah = schoolResult.data;
    const lampiran = await LampiranService.getLampiranBySekolahId(sekolah.id);

    return {
      success: true,
      data: lampiran,
    };
  } catch (error) {
    console.error('Error getting lampiran data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data lampiran',
    };
  }
}
