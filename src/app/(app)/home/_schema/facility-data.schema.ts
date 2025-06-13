import { z } from 'zod';

export const kondisiOptions = [
  { value: 'baik', label: 'Baik' },
  { value: 'rusak-ringan', label: 'Rusak Ringan' },
  { value: 'rusak-sedang', label: 'Rusak Sedang' },
  { value: 'rusak-berat', label: 'Rusak Berat' },
  { value: 'tidak-ada', label: 'Tidak Ada' },
];

export const step4Schema = z.object({
  // Ruang Kelas - dengan jumlah
  ruangKelasTotal: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  ruangKelasBaik: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  ruangKelasRusak: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),

  // Perpustakaan - dengan jumlah
  perpustakaanTotal: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  perpustakaanBaik: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  perpustakaanRusak: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),

  // Ruang-ruang lain - kondisi dan keterangan
  ruangKepalaSekolahKondisi: z.string().min(1, 'Kondisi harus dipilih'),
  ruangKepalaSekolahKeterangan: z.string().optional(),

  ruangGuruKondisi: z.string().min(1, 'Kondisi harus dipilih'),
  ruangGuruKeterangan: z.string().optional(),

  aulaPertemuanKondisi: z.string().min(1, 'Kondisi harus dipilih'),
  aulaPertemuanKeterangan: z.string().optional(),

  laboratoriumIpaKondisi: z.string().min(1, 'Kondisi harus dipilih'),
  laboratoriumIpaKeterangan: z.string().optional(),

  laboratoriumBahasaKondisi: z.string().min(1, 'Kondisi harus dipilih'),
  laboratoriumBahasaKeterangan: z.string().optional(),

  laboratoriumTikKondisi: z.string().min(1, 'Kondisi harus dipilih'),
  laboratoriumTikKeterangan: z.string().optional(),
});

export type Step4Data = z.infer<typeof step4Schema>;
