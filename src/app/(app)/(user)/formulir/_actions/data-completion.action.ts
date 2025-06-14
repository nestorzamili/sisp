'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { GuruService } from '@/lib/services/guru.service';
import { RombonganBelajarService } from '@/lib/services/rombongan-belajar.service';
import { SaranaService } from '@/lib/services/sarana.service';
import { PrasaranaService } from '@/lib/services/prasarana.service';
import { KebutuhanPrioritasService } from '@/lib/services/kebutuhan-prioritas.service';
import { JenisRuangan } from '@/types/sarana';
import { headers } from 'next/headers';

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
    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    // Check Step 1: School Info Completion
    const step1Complete = !!(
      sekolah.nama_sekolah &&
      sekolah.npsn &&
      sekolah.nama_kepala_sekolah &&
      sekolah.nip_kepala_sekolah &&
      sekolah.alamat_sekolah &&
      sekolah.kecamatan
    ); // Check Step 2: Teacher Data Completion
    const teacherResult = await guruService.getGuruBySekolah(
      sekolah.id,
      currentYear.toString(),
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
        currentYear.toString(),
      );
    const step3Complete =
      studentResult.success &&
      studentResult.data &&
      studentResult.data.length > 0 &&
      studentResult.data.some((rombel) => rombel.jumlah_siswa > 0); // Check Step 4: Sarana Data Completion
    const saranaData = await SaranaService.getSaranaBySekolahIdAndTahunAjaran(
      sekolah.id,
      tahunAjaran,
    );
    // Check if all essential sarana types are present and have meaningful data
    const essentialSaranaTypes: JenisRuangan[] = [
      'RuangKelas',
      'Perpustakaan',
      'RuangKepalaSekolah',
      'RuangGuru',
      'AulaPertemuan',
      'LaboratoriumIPA',
      'LaboratoriumBahasa',
      'LaboratoriumTIK',
    ];

    const existingSaranaTypes = saranaData.map((s) => s.jenis_sarana);
    const hasAllEssentialTypes = essentialSaranaTypes.every((type) =>
      existingSaranaTypes.includes(type),
    );

    // Also check that at least some sarana have meaningful data (not all zeros)
    const hasMeaningfulData = saranaData.some(
      (s) =>
        s.jumlah_total > 0 ||
        s.jumlah_kondisi_baik > 0 ||
        s.jumlah_kondisi_rusak > 0,
    );
    const step4Complete =
      saranaData.length > 0 && hasAllEssentialTypes && hasMeaningfulData;

    // Check Step 5: Prasarana Data Completion
    const prasaranaData =
      await PrasaranaService.getPrasaranaBySekolahIdAndTahunAjaran(
        sekolah.id,
        tahunAjaran,
      );

    // Check if at least some prasarana data exists and has meaningful data
    const hasPrasaranaData = prasaranaData.some(
      (p) =>
        p.jumlah_total > 0 ||
        p.jumlah_kondisi_baik > 0 ||
        p.jumlah_kondisi_rusak > 0,
    );
    const step5Complete = prasaranaData.length > 0 && hasPrasaranaData; // Check Step 6: Priority Needs Data Completion
    const step6Complete =
      await KebutuhanPrioritasService.hasKebutuhanPrioritasData(
        sekolah.id,
        tahunAjaran,
      ); // Check Step 7: Lampiran Data Completion (optional, always true)
    const step7Complete = true; // Lampiran is optional, so it's always considered complete

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
