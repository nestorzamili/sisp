'use server';

import { LampiranService } from '@/lib/services/lampiran.service';
import { SekolahService } from '@/lib/services/sekolah.service';
import { Step7Data } from '../_schema/attachments.schema';
import { validateAuthAndSchool } from '../_utils/auth-school.util';

export async function saveLampiranDataAction(data: Step7Data) {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    // Delete existing lampiran for this school first
    await LampiranService.deleteAllLampiranBySekolahId(schoolData!.id);

    // Save new lampiran data if provided
    if (data.lampiran && data.lampiran.length > 0) {
      for (const lampiran of data.lampiran) {
        await LampiranService.createLampiran(schoolData!.id, {
          nama_dokumen: lampiran.nama_dokumen,
          url: lampiran.url,
          keterangan: lampiran.keterangan,
        });
      }
    } // Update school status to PENDING when final step is submitted
    const submitResult = await SekolahService.submitForReview(schoolData!.id);

    if (!submitResult.success) {
      return {
        success: false,
        error: submitResult.error || 'Gagal submit data untuk review',
      };
    }

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
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const lampiran = await LampiranService.getLampiranBySekolahId(
      schoolData!.id,
    );

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
