'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { PrasaranaService } from '@/lib/services/prasarana.service';
import { revalidatePath } from 'next/cache';
import type { Step5Data } from '../_schema/infrastructure-data.schema';
import type { PrasaranaFormData } from '@/types/prasarana';

// Get existing infrastructure data for the current user's school
export async function getInfrastructureDataAction() {
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
        error: sekolahResult.error || 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    const prasaranaData =
      await PrasaranaService.getPrasaranaBySekolahIdAndTahunAjaran(
        sekolahResult.data.id,
        tahunAjaran,
      );

    // Convert database data to form format
    const formData: Partial<Step5Data> = {
      mejaKursiSiswaTotal: '0',
      mejaKursiSiswaBaik: '0',
      mejaKursiSiswaRusak: '0',
      komputerTotal: '0',
      komputerBaik: '0',
      komputerRusak: '0',
      toiletSiswaTotal: '0',
      toiletSiswaBaik: '0',
      toiletSiswaRusak: '0',
      toiletGuruTotal: '0',
      toiletGuruBaik: '0',
      toiletGuruRusak: '0',
      prasaranaLainnya: [],
    };

    const prasaranaLainnya: Array<{
      nama: string;
      jumlah: string;
      kondisi: string;
    }> = [];

    prasaranaData.forEach((prasarana) => {
      switch (prasarana.jenis_prasarana) {
        case 'MejaKursiSiswa':
          formData.mejaKursiSiswaTotal = prasarana.jumlah_total.toString();
          formData.mejaKursiSiswaBaik =
            prasarana.jumlah_kondisi_baik.toString();
          formData.mejaKursiSiswaRusak =
            prasarana.jumlah_kondisi_rusak.toString();
          break;
        case 'Komputer':
          formData.komputerTotal = prasarana.jumlah_total.toString();
          formData.komputerBaik = prasarana.jumlah_kondisi_baik.toString();
          formData.komputerRusak = prasarana.jumlah_kondisi_rusak.toString();
          break;
        case 'JambanSiswa':
          formData.toiletSiswaTotal = prasarana.jumlah_total.toString();
          formData.toiletSiswaBaik = prasarana.jumlah_kondisi_baik.toString();
          formData.toiletSiswaRusak = prasarana.jumlah_kondisi_rusak.toString();
          break;
        case 'JambanGuru':
          formData.toiletGuruTotal = prasarana.jumlah_total.toString();
          formData.toiletGuruBaik = prasarana.jumlah_kondisi_baik.toString();
          formData.toiletGuruRusak = prasarana.jumlah_kondisi_rusak.toString();
          break;
        case 'PrasaranaLainnya':
          prasaranaLainnya.push({
            nama: prasarana.nama_prasarana,
            jumlah: prasarana.jumlah_total.toString(),
            kondisi: getKondisiFromCounts(prasarana),
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
        error: sekolahResult.error || 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    // Convert form data to service format
    const prasaranaFormData: PrasaranaFormData = {
      mejaKursiSiswaTotal: Number(data.mejaKursiSiswaTotal),
      mejaKursiSiswaBaik: Number(data.mejaKursiSiswaBaik),
      mejaKursiSiswaRusak: Number(data.mejaKursiSiswaRusak),
      komputerTotal: Number(data.komputerTotal),
      komputerBaik: Number(data.komputerBaik),
      komputerRusak: Number(data.komputerRusak),
      toiletSiswaTotal: Number(data.toiletSiswaTotal),
      toiletSiswaBaik: Number(data.toiletSiswaBaik),
      toiletSiswaRusak: Number(data.toiletSiswaRusak),
      toiletGuruTotal: Number(data.toiletGuruTotal),
      toiletGuruBaik: Number(data.toiletGuruBaik),
      toiletGuruRusak: Number(data.toiletGuruRusak),
      prasaranaLainnya: data.prasaranaLainnya?.map((item) => ({
        nama: item.nama,
        jumlah: Number(item.jumlah),
        kondisi: item.kondisi,
      })),
      tahun_ajaran: tahunAjaran,
    };

    const result = await PrasaranaService.savePrasaranaFromForm(
      sekolahResult.data.id,
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

// Helper function to determine condition from counts
function getKondisiFromCounts(prasarana: {
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
}): string {
  if (prasarana.jumlah_total === 0) return '';
  if (prasarana.jumlah_kondisi_baik === prasarana.jumlah_total) return 'baik';
  if (prasarana.jumlah_kondisi_rusak === prasarana.jumlah_total)
    return 'rusak-berat';
  if (prasarana.jumlah_kondisi_baik > prasarana.jumlah_kondisi_rusak)
    return 'rusak-ringan';
  return 'rusak-sedang';
}
