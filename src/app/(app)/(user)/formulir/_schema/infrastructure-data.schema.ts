import { z } from 'zod';

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
