'use server';

import { revalidatePath } from 'next/cache';
import { PrasaranaService } from '@/lib/services/prasarana.service';
import type { Step5Data } from '../_schema/infrastructure-data.schema';
import type { PrasaranaFormData } from '@/types/prasarana';
import {
  validateAuthAndSchool,
  getCurrentAcademicYear,
} from '../_utils/auth-school.util';

// Get existing infrastructure data for the current user's school
export async function getInfrastructureDataAction() {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const tahunAjaran = getCurrentAcademicYear();
    const prasaranaData =
      await PrasaranaService.getPrasaranaBySekolahIdAndTahunAjaran(
        schoolData!.id,
        tahunAjaran,
      ); // Convert database data to form format - using numbers directly
    const formData: Partial<Step5Data> = {
      mejaKursiSiswaTotal: 0,
      mejaKursiSiswaBaik: 0,
      mejaKursiSiswaRusak: 0,
      mejaKursiSiswaKeterangan: '',
      komputerTotal: 0,
      komputerBaik: 0,
      komputerRusak: 0,
      komputerKeterangan: '',
      toiletSiswaTotal: 0,
      toiletSiswaBaik: 0,
      toiletSiswaRusak: 0,
      toiletSiswaKeterangan: '',
      toiletGuruTotal: 0,
      toiletGuruBaik: 0,
      toiletGuruRusak: 0,
      toiletGuruKeterangan: '',
      prasaranaLainnya: [],
    };
    const prasaranaLainnya: Array<{
      nama: string;
      jumlahTotal: number;
      jumlahBaik: number;
      jumlahRusak: number;
      keterangan: string;
    }> = [];
    prasaranaData.forEach((prasarana) => {
      switch (prasarana.jenis_prasarana) {
        case 'MejaKursiSiswa':
          formData.mejaKursiSiswaTotal = prasarana.jumlah_total;
          formData.mejaKursiSiswaBaik = prasarana.jumlah_kondisi_baik;
          formData.mejaKursiSiswaRusak = prasarana.jumlah_kondisi_rusak;
          formData.mejaKursiSiswaKeterangan = prasarana.keterangan || '';
          break;
        case 'Komputer':
          formData.komputerTotal = prasarana.jumlah_total;
          formData.komputerBaik = prasarana.jumlah_kondisi_baik;
          formData.komputerRusak = prasarana.jumlah_kondisi_rusak;
          formData.komputerKeterangan = prasarana.keterangan || '';
          break;
        case 'JambanSiswa':
          formData.toiletSiswaTotal = prasarana.jumlah_total;
          formData.toiletSiswaBaik = prasarana.jumlah_kondisi_baik;
          formData.toiletSiswaRusak = prasarana.jumlah_kondisi_rusak;
          formData.toiletSiswaKeterangan = prasarana.keterangan || '';
          break;
        case 'JambanGuru':
          formData.toiletGuruTotal = prasarana.jumlah_total;
          formData.toiletGuruBaik = prasarana.jumlah_kondisi_baik;
          formData.toiletGuruRusak = prasarana.jumlah_kondisi_rusak;
          formData.toiletGuruKeterangan = prasarana.keterangan || '';
          break;
        case 'PrasaranaLainnya':
          prasaranaLainnya.push({
            nama: prasarana.nama_prasarana,
            jumlahTotal: prasarana.jumlah_total,
            jumlahBaik: prasarana.jumlah_kondisi_baik,
            jumlahRusak: prasarana.jumlah_kondisi_rusak,
            keterangan: prasarana.keterangan || '',
          });
          break;
        default:
          break;
      }
    });

    formData.prasaranaLainnya = prasaranaLainnya;

    return {
      success: true,
      data: formData,
    };
  } catch (error) {
    console.error('Error getting infrastructure data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data prasarana',
    };
  }
}

// Save infrastructure data for the current user's school
export async function saveInfrastructureDataAction(data: Step5Data) {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const tahunAjaran = getCurrentAcademicYear(); // Convert form data to service format - no number conversion needed
    const prasaranaFormData: PrasaranaFormData = {
      mejaKursiSiswaTotal: data.mejaKursiSiswaTotal,
      mejaKursiSiswaBaik: data.mejaKursiSiswaBaik,
      mejaKursiSiswaRusak: data.mejaKursiSiswaRusak,
      mejaKursiSiswaKeterangan: data.mejaKursiSiswaKeterangan,
      komputerTotal: data.komputerTotal,
      komputerBaik: data.komputerBaik,
      komputerRusak: data.komputerRusak,
      komputerKeterangan: data.komputerKeterangan,
      toiletSiswaTotal: data.toiletSiswaTotal,
      toiletSiswaBaik: data.toiletSiswaBaik,
      toiletSiswaRusak: data.toiletSiswaRusak,
      toiletSiswaKeterangan: data.toiletSiswaKeterangan,
      toiletGuruTotal: data.toiletGuruTotal,
      toiletGuruBaik: data.toiletGuruBaik,
      toiletGuruRusak: data.toiletGuruRusak,
      toiletGuruKeterangan: data.toiletGuruKeterangan,
      prasaranaLainnya: data.prasaranaLainnya?.map((item) => ({
        nama: item.nama,
        jumlah: item.jumlahTotal,
        kondisi: '', // Will be determined by service based on counts
        keterangan: item.keterangan,
      })),
      tahun_ajaran: tahunAjaran,
    };

    const result = await PrasaranaService.savePrasaranaFromForm(
      schoolData!.id,
      prasaranaFormData,
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Gagal menyimpan data prasarana',
      };
    }

    revalidatePath('/home');

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error saving infrastructure data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data prasarana',
    };
  }
}
