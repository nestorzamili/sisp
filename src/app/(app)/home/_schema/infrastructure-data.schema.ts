import { z } from 'zod';

export const step5Schema = z.object({
  // Meja dan Kursi Siswa
  mejaKursiSiswaTotal: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  mejaKursiSiswaBaik: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  mejaKursiSiswaRusak: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),

  // Komputer
  komputerTotal: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  komputerBaik: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  komputerRusak: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),

  // Toilet Siswa
  toiletSiswaTotal: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  toiletSiswaBaik: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  toiletSiswaRusak: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),

  // Toilet Guru
  toiletGuruTotal: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  toiletGuruBaik: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  toiletGuruRusak: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),

  // Prasarana Lainnya
  prasaranaLainnya: z
    .array(
      z.object({
        nama: z.string().min(1, 'Nama prasarana harus diisi'),
        jumlah: z
          .string()
          .min(1, 'Jumlah harus diisi')
          .refine(
            (val) => !isNaN(Number(val)) && Number(val) > 0,
            'Harus berupa angka positif',
          ),
        kondisi: z.string().min(1, 'Kondisi harus dipilih'),
      }),
    )
    .optional(),
});

export type Step5Data = z.infer<typeof step5Schema>;
