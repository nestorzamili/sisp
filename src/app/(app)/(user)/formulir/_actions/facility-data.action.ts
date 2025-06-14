'use server';

import { auth } from '@/lib/auth';
import { SaranaService } from '@/lib/services/sarana.service';
import { SekolahService } from '@/lib/services/sekolah.service';
import { Step4Data } from '../_schema/facility-data.schema';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { JenisRuangan } from '@/types/sarana';

// Get existing facility data for the current user's school
export async function getFacilityDataAction() {
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

    const sekolahResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!sekolahResult.success || !sekolahResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    const saranaData = await SaranaService.getSaranaBySekolahIdAndTahunAjaran(
      sekolahResult.data.id,
      tahunAjaran,
    );

    // Convert database data to form format
    const formData: Partial<Step4Data> = {};

    saranaData.forEach((sarana) => {
      switch (sarana.jenis_sarana) {
        case JenisRuangan.RuangKelas:
          formData.ruangKelasTotal = sarana.jumlah_total.toString();
          formData.ruangKelasBaik = sarana.jumlah_kondisi_baik.toString();
          formData.ruangKelasRusak = sarana.jumlah_kondisi_rusak.toString();
          break;
        case JenisRuangan.Perpustakaan:
          formData.perpustakaanTotal = sarana.jumlah_total.toString();
          formData.perpustakaanBaik = sarana.jumlah_kondisi_baik.toString();
          formData.perpustakaanRusak = sarana.jumlah_kondisi_rusak.toString();
          break;
        case JenisRuangan.RuangKepalaSekolah:
          formData.ruangKepalaSekolahKondisi = getKondisiFromCounts(sarana);
          formData.ruangKepalaSekolahKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.RuangGuru:
          formData.ruangGuruKondisi = getKondisiFromCounts(sarana);
          formData.ruangGuruKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.AulaPertemuan:
          formData.aulaPertemuanKondisi = getKondisiFromCounts(sarana);
          formData.aulaPertemuanKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.LaboratoriumIPA:
          formData.laboratoriumIpaKondisi = getKondisiFromCounts(sarana);
          formData.laboratoriumIpaKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.LaboratoriumBahasa:
          formData.laboratoriumBahasaKondisi = getKondisiFromCounts(sarana);
          formData.laboratoriumBahasaKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.LaboratoriumTIK:
          formData.laboratoriumTikKondisi = getKondisiFromCounts(sarana);
          formData.laboratoriumTikKeterangan = sarana.keterangan || '';
          break;
      }
    });

    return {
      success: true,
      data: formData,
    };
  } catch (error) {
    console.error('Error getting facility data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data sarana',
    };
  }
}

// Save facility data for the current user's school
export async function saveFacilityDataAction(data: Step4Data) {
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

    const sekolahResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!sekolahResult.success || !sekolahResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    // Convert form data to database format
    const saranaInputs = [
      // Ruang Kelas
      {
        jenis_sarana: JenisRuangan.RuangKelas,
        nama_sarana: 'Ruang Kelas',
        jumlah_total: parseInt(data.ruangKelasTotal),
        jumlah_kondisi_baik: parseInt(data.ruangKelasBaik),
        jumlah_kondisi_rusak: parseInt(data.ruangKelasRusak),
        tahun_ajaran: tahunAjaran,
      },
      // Perpustakaan
      {
        jenis_sarana: JenisRuangan.Perpustakaan,
        nama_sarana: 'Perpustakaan',
        jumlah_total: parseInt(data.perpustakaanTotal),
        jumlah_kondisi_baik: parseInt(data.perpustakaanBaik),
        jumlah_kondisi_rusak: parseInt(data.perpustakaanRusak),
        tahun_ajaran: tahunAjaran,
      },
      // Ruang Kepala Sekolah
      {
        jenis_sarana: JenisRuangan.RuangKepalaSekolah,
        nama_sarana: 'Ruang Kepala Sekolah',
        ...getCountsFromKondisi(data.ruangKepalaSekolahKondisi),
        keterangan: data.ruangKepalaSekolahKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Ruang Guru
      {
        jenis_sarana: JenisRuangan.RuangGuru,
        nama_sarana: 'Ruang Guru',
        ...getCountsFromKondisi(data.ruangGuruKondisi),
        keterangan: data.ruangGuruKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Aula Pertemuan
      {
        jenis_sarana: JenisRuangan.AulaPertemuan,
        nama_sarana: 'Aula Pertemuan',
        ...getCountsFromKondisi(data.aulaPertemuanKondisi),
        keterangan: data.aulaPertemuanKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Laboratorium IPA
      {
        jenis_sarana: JenisRuangan.LaboratoriumIPA,
        nama_sarana: 'Laboratorium IPA',
        ...getCountsFromKondisi(data.laboratoriumIpaKondisi),
        keterangan: data.laboratoriumIpaKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Laboratorium Bahasa
      {
        jenis_sarana: JenisRuangan.LaboratoriumBahasa,
        nama_sarana: 'Laboratorium Bahasa',
        ...getCountsFromKondisi(data.laboratoriumBahasaKondisi),
        keterangan: data.laboratoriumBahasaKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Laboratorium TIK
      {
        jenis_sarana: JenisRuangan.LaboratoriumTIK,
        nama_sarana: 'Laboratorium TIK',
        ...getCountsFromKondisi(data.laboratoriumTikKondisi),
        keterangan: data.laboratoriumTikKeterangan,
        tahun_ajaran: tahunAjaran,
      },
    ];

    await SaranaService.upsertSaranaBatch(sekolahResult.data.id, saranaInputs);

    revalidatePath('/home');

    return {
      success: true,
      message: 'Data sarana berhasil disimpan',
    };
  } catch (error) {
    console.error('Error saving facility data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data sarana',
    };
  }
}

// Helper function to determine condition from counts
function getKondisiFromCounts(sarana: {
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
}): string {
  if (sarana.jumlah_total === 0) return 'tidak-ada';
  if (sarana.jumlah_kondisi_baik === sarana.jumlah_total) return 'baik';
  if (sarana.jumlah_kondisi_rusak === sarana.jumlah_total) return 'rusak-berat';
  if (sarana.jumlah_kondisi_baik > sarana.jumlah_kondisi_rusak)
    return 'rusak-ringan';
  return 'rusak-sedang';
}

// Helper function to convert condition to counts
function getCountsFromKondisi(kondisi: string): {
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
} {
  switch (kondisi) {
    case 'tidak-ada':
      return {
        jumlah_total: 0,
        jumlah_kondisi_baik: 0,
        jumlah_kondisi_rusak: 0,
      };
    case 'baik':
      return {
        jumlah_total: 1,
        jumlah_kondisi_baik: 1,
        jumlah_kondisi_rusak: 0,
      };
    case 'rusak-ringan':
      return {
        jumlah_total: 1,
        jumlah_kondisi_baik: 0,
        jumlah_kondisi_rusak: 1,
      };
    case 'rusak-sedang':
      return {
        jumlah_total: 1,
        jumlah_kondisi_baik: 0,
        jumlah_kondisi_rusak: 1,
      };
    case 'rusak-berat':
      return {
        jumlah_total: 1,
        jumlah_kondisi_baik: 0,
        jumlah_kondisi_rusak: 1,
      };
    default:
      return {
        jumlah_total: 1,
        jumlah_kondisi_baik: 0,
        jumlah_kondisi_rusak: 1,
      };
  }
}
