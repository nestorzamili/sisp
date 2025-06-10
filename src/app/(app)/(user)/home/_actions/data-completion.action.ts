'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { GuruService } from '@/lib/services/guru.service';
import { RombonganBelajarService } from '@/lib/services/rombongan-belajar.service';
import { headers } from 'next/headers';

const sekolahService = new SekolahService();
const guruService = new GuruService();
const rombonganBelajarService = new RombonganBelajarService();

export async function getDataCompletionStatusAction() {
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
    const schoolResult = await sekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const sekolah = schoolResult.data;
    const currentYear = new Date().getFullYear().toString();

    // Check Step 1: School Info Completion
    const step1Complete = !!(
      sekolah.nama_sekolah &&
      sekolah.npsn &&
      sekolah.nama_kepala_sekolah &&
      sekolah.nip_kepala_sekolah &&
      sekolah.alamat_sekolah &&
      sekolah.kecamatan
    );

    // Check Step 2: Teacher Data Completion
    const teacherResult = await guruService.getGuruBySekolah(
      sekolah.id,
      currentYear,
    );
    const step2Complete =
      teacherResult.success &&
      teacherResult.data &&
      teacherResult.data.length > 0 &&
      teacherResult.data.some((guru) => guru.jumlah > 0);

    // Check Step 3: Student Data Completion
    const studentResult =
      await rombonganBelajarService.getRombonganBelajarBySekolah(
        sekolah.id,
        currentYear,
      );
    const step3Complete =
      studentResult.success &&
      studentResult.data &&
      studentResult.data.length > 0 &&
      studentResult.data.some((rombel) => rombel.jumlah_siswa > 0);

    // TODO: Check Step 4-7 when those services are implemented
    const step4Complete = false; // Sarana
    const step5Complete = false; // Prasarana
    const step6Complete = false; // Kebutuhan Prioritas
    const step7Complete = false; // Lampiran

    return {
      success: true,
      data: {
        step1: step1Complete,
        step2: step2Complete,
        step3: step3Complete,
        step4: step4Complete,
        step5: step5Complete,
        step6: step6Complete,
        step7: step7Complete,
      },
    };
  } catch (error) {
    console.error('Error checking data completion status:', error);
    return {
      success: false,
      error: 'Gagal memeriksa status kelengkapan data',
    };
  }
}
