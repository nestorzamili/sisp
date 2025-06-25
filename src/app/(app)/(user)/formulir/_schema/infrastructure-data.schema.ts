import { z } from 'zod';
import { FormulirCompleteData } from '@/types/formulir.types';

export const step5Schema = z.object({
  // Meja dan Kursi Siswa
  mejaKursiSiswaTotal: z.number().min(0, 'Harus berupa angka positif'),
  mejaKursiSiswaBaik: z.number().min(0, 'Harus berupa angka positif'),
  mejaKursiSiswaRusak: z.number().min(0, 'Harus berupa angka positif'),
  mejaKursiSiswaKeterangan: z.string().optional(),

  // Komputer
  komputerTotal: z.number().min(0, 'Harus berupa angka positif'),
  komputerBaik: z.number().min(0, 'Harus berupa angka positif'),
  komputerRusak: z.number().min(0, 'Harus berupa angka positif'),
  komputerKeterangan: z.string().optional(),

  // Toilet Siswa
  toiletSiswaTotal: z.number().min(0, 'Harus berupa angka positif'),
  toiletSiswaBaik: z.number().min(0, 'Harus berupa angka positif'),
  toiletSiswaRusak: z.number().min(0, 'Harus berupa angka positif'),
  toiletSiswaKeterangan: z.string().optional(),

  // Toilet Guru
  toiletGuruTotal: z.number().min(0, 'Harus berupa angka positif'),
  toiletGuruBaik: z.number().min(0, 'Harus berupa angka positif'),
  toiletGuruRusak: z.number().min(0, 'Harus berupa angka positif'),
  toiletGuruKeterangan: z.string().optional(),
  // Prasarana Lainnya - updated to use counts instead of condition strings
  prasaranaLainnya: z
    .array(
      z.object({
        nama: z.string().min(1, 'Nama prasarana harus diisi'),
        jumlahTotal: z.number().min(1, 'Jumlah total harus lebih dari 0'),
        jumlahBaik: z.number().min(0, 'Harus berupa angka positif'),
        jumlahRusak: z.number().min(0, 'Harus berupa angka positif'),
        keterangan: z.string().optional(),
      }),
    )
    .optional(),
});

export type Step5Data = z.infer<typeof step5Schema>;

export function getStep5InitialData(
  completeData: FormulirCompleteData | null,
): Step5Data {
  return {
    mejaKursiSiswaTotal:
      completeData?.prasarana.find(
        (p) => p.jenis_prasarana === 'MejaKursiSiswa',
      )?.jumlah_total || 0,
    mejaKursiSiswaBaik:
      completeData?.prasarana.find(
        (p) => p.jenis_prasarana === 'MejaKursiSiswa',
      )?.jumlah_kondisi_baik || 0,
    mejaKursiSiswaRusak:
      completeData?.prasarana.find(
        (p) => p.jenis_prasarana === 'MejaKursiSiswa',
      )?.jumlah_kondisi_rusak || 0,
    mejaKursiSiswaKeterangan:
      completeData?.prasarana.find(
        (p) => p.jenis_prasarana === 'MejaKursiSiswa',
      )?.keterangan || '',

    komputerTotal:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'Komputer')
        ?.jumlah_total || 0,
    komputerBaik:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'Komputer')
        ?.jumlah_kondisi_baik || 0,
    komputerRusak:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'Komputer')
        ?.jumlah_kondisi_rusak || 0,
    komputerKeterangan:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'Komputer')
        ?.keterangan || '',

    toiletSiswaTotal:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanSiswa')
        ?.jumlah_total || 0,
    toiletSiswaBaik:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanSiswa')
        ?.jumlah_kondisi_baik || 0,
    toiletSiswaRusak:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanSiswa')
        ?.jumlah_kondisi_rusak || 0,
    toiletSiswaKeterangan:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanSiswa')
        ?.keterangan || '',

    toiletGuruTotal:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanGuru')
        ?.jumlah_total || 0,
    toiletGuruBaik:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanGuru')
        ?.jumlah_kondisi_baik || 0,
    toiletGuruRusak:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanGuru')
        ?.jumlah_kondisi_rusak || 0,
    toiletGuruKeterangan:
      completeData?.prasarana.find((p) => p.jenis_prasarana === 'JambanGuru')
        ?.keterangan || '',

    prasaranaLainnya:
      completeData?.prasarana
        .filter((p) => p.jenis_prasarana === 'PrasaranaLainnya')
        .map((p) => ({
          nama: p.nama_prasarana,
          jumlahTotal: p.jumlah_total,
          jumlahBaik: p.jumlah_kondisi_baik,
          jumlahRusak: p.jumlah_kondisi_rusak,
          keterangan: p.keterangan || '',
        })) || [],
  };
}
