'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { GuruService } from '@/lib/services/guru.service';
import { RombonganBelajarService } from '@/lib/services/rombongan-belajar.service';
import { SaranaService } from '@/lib/services/sarana.service';
import { PrasaranaService } from '@/lib/services/prasarana.service';
import { KebutuhanPrioritasService } from '@/lib/services/kebutuhan-prioritas.service';
import { LampiranService } from '@/lib/services/lampiran.service';
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

    const step1Complete = !!(
      sekolah.nama_sekolah &&
      sekolah.npsn &&
      sekolah.nama_kepala_sekolah &&
      sekolah.nip_kepala_sekolah &&
      sekolah.alamat_sekolah &&
      sekolah.kecamatan
    );
    const teacherResult = await guruService.getGuruBySekolah(
      sekolah.id,
      currentYear.toString(),
    );
    const step2Complete =
      teacherResult.success &&
      teacherResult.data &&
      teacherResult.data.length > 0 &&
      teacherResult.data.some((guru) => guru.jumlah > 0);

    const studentResult =
      await rombonganBelajarService.getRombonganBelajarBySekolah(
        sekolah.id,
        currentYear.toString(),
      );
    const step3Complete =
      studentResult.success &&
      studentResult.data &&
      studentResult.data.length > 0 &&
      studentResult.data.some((rombel) => rombel.jumlah_siswa > 0);
    const saranaData = await SaranaService.getSaranaBySekolahIdAndTahunAjaran(
      sekolah.id,
      tahunAjaran,
    );
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

    const hasMeaningfulData = saranaData.some(
      (s) =>
        s.jumlah_total > 0 ||
        s.jumlah_kondisi_baik > 0 ||
        s.jumlah_kondisi_rusak > 0,
    );
    const step4Complete =
      saranaData.length > 0 && hasAllEssentialTypes && hasMeaningfulData;

    const prasaranaData =
      await PrasaranaService.getPrasaranaBySekolahIdAndTahunAjaran(
        sekolah.id,
        tahunAjaran,
      );
    const hasPrasaranaData = prasaranaData.some(
      (p) =>
        p.jumlah_total > 0 ||
        p.jumlah_kondisi_baik > 0 ||
        p.jumlah_kondisi_rusak > 0,
    );
    const step5Complete = prasaranaData.length > 0 && hasPrasaranaData;
    const step6Complete =
      await KebutuhanPrioritasService.hasKebutuhanPrioritasData(
        sekolah.id,
        tahunAjaran,
      );
    const lampiranData = await LampiranService.getLampiranBySekolahId(
      sekolah.id,
    );
    const hasLampiranData = lampiranData.length > 0;
    const statusNotDraft = sekolah.status !== 'DRAFT';
    const step7Complete = hasLampiranData || statusNotDraft;

    // Step 8 is always available if all previous steps are complete
    const allPreviousStepsComplete =
      step1Complete &&
      step2Complete &&
      step3Complete &&
      step4Complete &&
      step5Complete &&
      step6Complete &&
      step7Complete;
    const step8Complete =
      allPreviousStepsComplete && sekolah.status === 'PENDING';

    return {
      success: true,
      data: {
        sekolahStatus: sekolah.status,
        reviewNote: sekolah.reviewNotes,
        step1: step1Complete,
        step2: step2Complete,
        step3: step3Complete,
        step4: step4Complete,
        step5: step5Complete,
        step6: step6Complete,
        step7: step7Complete,
        step8: step8Complete,
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
