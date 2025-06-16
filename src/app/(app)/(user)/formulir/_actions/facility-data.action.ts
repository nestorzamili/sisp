'use server';

import { revalidatePath } from 'next/cache';
import { SaranaService } from '@/lib/services/sarana.service';
import { Step4Data } from '../_schema/facility-data.schema';
import { JenisRuangan } from '@/types/sarana';
import {
  validateAuthAndSchool,
  getCurrentAcademicYear,
} from '../_utils/auth-school.util';

// Get existing facility data for the current user's school
export async function getFacilityDataAction() {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const tahunAjaran = getCurrentAcademicYear();
    const saranaData = await SaranaService.getSaranaBySekolahIdAndTahunAjaran(
      schoolData!.id,
      tahunAjaran,
    );

    // Convert database data to form format
    const formData: Partial<Step4Data> = {};

    saranaData.forEach((sarana) => {
      switch (sarana.jenis_sarana) {
        case JenisRuangan.RuangKelas:
          formData.ruangKelasTotal = sarana.jumlah_total;
          formData.ruangKelasBaik = sarana.jumlah_kondisi_baik;
          formData.ruangKelasRusak = sarana.jumlah_kondisi_rusak;
          formData.ruangKelasKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.Perpustakaan:
          formData.perpustakaanTotal = sarana.jumlah_total;
          formData.perpustakaanBaik = sarana.jumlah_kondisi_baik;
          formData.perpustakaanRusak = sarana.jumlah_kondisi_rusak;
          formData.perpustakaanKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.RuangKepalaSekolah:
          formData.ruangKepalaSekolahTotal = sarana.jumlah_total;
          formData.ruangKepalaSekolahBaik = sarana.jumlah_kondisi_baik;
          formData.ruangKepalaSekolahRusak = sarana.jumlah_kondisi_rusak;
          formData.ruangKepalaSekolahKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.RuangGuru:
          formData.ruangGuruTotal = sarana.jumlah_total;
          formData.ruangGuruBaik = sarana.jumlah_kondisi_baik;
          formData.ruangGuruRusak = sarana.jumlah_kondisi_rusak;
          formData.ruangGuruKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.AulaPertemuan:
          formData.aulaPertemuanTotal = sarana.jumlah_total;
          formData.aulaPertemuanBaik = sarana.jumlah_kondisi_baik;
          formData.aulaPertemuanRusak = sarana.jumlah_kondisi_rusak;
          formData.aulaPertemuanKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.LaboratoriumIPA:
          formData.laboratoriumIpaTotal = sarana.jumlah_total;
          formData.laboratoriumIpaBaik = sarana.jumlah_kondisi_baik;
          formData.laboratoriumIpaRusak = sarana.jumlah_kondisi_rusak;
          formData.laboratoriumIpaKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.LaboratoriumBahasa:
          formData.laboratoriumBahasaTotal = sarana.jumlah_total;
          formData.laboratoriumBahasaBaik = sarana.jumlah_kondisi_baik;
          formData.laboratoriumBahasaRusak = sarana.jumlah_kondisi_rusak;
          formData.laboratoriumBahasaKeterangan = sarana.keterangan || '';
          break;
        case JenisRuangan.LaboratoriumTIK:
          formData.laboratoriumTikTotal = sarana.jumlah_total;
          formData.laboratoriumTikBaik = sarana.jumlah_kondisi_baik;
          formData.laboratoriumTikRusak = sarana.jumlah_kondisi_rusak;
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
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const tahunAjaran = getCurrentAcademicYear();

    // Convert form data to database format
    const saranaInputs = [
      // Ruang Kelas
      {
        jenis_sarana: JenisRuangan.RuangKelas,
        nama_sarana: 'Ruang Kelas',
        jumlah_total: data.ruangKelasTotal,
        jumlah_kondisi_baik: data.ruangKelasBaik,
        jumlah_kondisi_rusak: data.ruangKelasRusak,
        keterangan: data.ruangKelasKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Perpustakaan
      {
        jenis_sarana: JenisRuangan.Perpustakaan,
        nama_sarana: 'Perpustakaan',
        jumlah_total: data.perpustakaanTotal,
        jumlah_kondisi_baik: data.perpustakaanBaik,
        jumlah_kondisi_rusak: data.perpustakaanRusak,
        keterangan: data.perpustakaanKeterangan,
        tahun_ajaran: tahunAjaran,
      }, // Ruang Kepala Sekolah
      {
        jenis_sarana: JenisRuangan.RuangKepalaSekolah,
        nama_sarana: 'Ruang Kepala Sekolah',
        jumlah_total: data.ruangKepalaSekolahTotal,
        jumlah_kondisi_baik: data.ruangKepalaSekolahBaik,
        jumlah_kondisi_rusak: data.ruangKepalaSekolahRusak,
        keterangan: data.ruangKepalaSekolahKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Ruang Guru
      {
        jenis_sarana: JenisRuangan.RuangGuru,
        nama_sarana: 'Ruang Guru',
        jumlah_total: data.ruangGuruTotal,
        jumlah_kondisi_baik: data.ruangGuruBaik,
        jumlah_kondisi_rusak: data.ruangGuruRusak,
        keterangan: data.ruangGuruKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Aula Pertemuan
      {
        jenis_sarana: JenisRuangan.AulaPertemuan,
        nama_sarana: 'Aula Pertemuan',
        jumlah_total: data.aulaPertemuanTotal,
        jumlah_kondisi_baik: data.aulaPertemuanBaik,
        jumlah_kondisi_rusak: data.aulaPertemuanRusak,
        keterangan: data.aulaPertemuanKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Laboratorium IPA
      {
        jenis_sarana: JenisRuangan.LaboratoriumIPA,
        nama_sarana: 'Laboratorium IPA',
        jumlah_total: data.laboratoriumIpaTotal,
        jumlah_kondisi_baik: data.laboratoriumIpaBaik,
        jumlah_kondisi_rusak: data.laboratoriumIpaRusak,
        keterangan: data.laboratoriumIpaKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Laboratorium Bahasa
      {
        jenis_sarana: JenisRuangan.LaboratoriumBahasa,
        nama_sarana: 'Laboratorium Bahasa',
        jumlah_total: data.laboratoriumBahasaTotal,
        jumlah_kondisi_baik: data.laboratoriumBahasaBaik,
        jumlah_kondisi_rusak: data.laboratoriumBahasaRusak,
        keterangan: data.laboratoriumBahasaKeterangan,
        tahun_ajaran: tahunAjaran,
      },
      // Laboratorium TIK
      {
        jenis_sarana: JenisRuangan.LaboratoriumTIK,
        nama_sarana: 'Laboratorium TIK',
        jumlah_total: data.laboratoriumTikTotal,
        jumlah_kondisi_baik: data.laboratoriumTikBaik,
        jumlah_kondisi_rusak: data.laboratoriumTikRusak,
        keterangan: data.laboratoriumTikKeterangan,
        tahun_ajaran: tahunAjaran,
      },
    ];

    await SaranaService.upsertSaranaBatch(schoolData!.id, saranaInputs);

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
