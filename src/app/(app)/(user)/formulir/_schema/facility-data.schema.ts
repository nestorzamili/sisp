import { z } from 'zod';

export const step4Schema = z.object({
  // Ruang Kelas - dengan jumlah
  ruangKelasTotal: z.number().min(0, 'Harus berupa angka positif'),
  ruangKelasBaik: z.number().min(0, 'Harus berupa angka positif'),
  ruangKelasRusak: z.number().min(0, 'Harus berupa angka positif'),
  ruangKelasKeterangan: z.string().optional(),

  // Perpustakaan - dengan jumlah
  perpustakaanTotal: z.number().min(0, 'Harus berupa angka positif'),
  perpustakaanBaik: z.number().min(0, 'Harus berupa angka positif'),
  perpustakaanRusak: z.number().min(0, 'Harus berupa angka positif'),
  perpustakaanKeterangan: z.string().optional(),

  // Ruang Kepala Sekolah - dengan jumlah
  ruangKepalaSekolahTotal: z.number().min(0, 'Harus berupa angka positif'),
  ruangKepalaSekolahBaik: z.number().min(0, 'Harus berupa angka positif'),
  ruangKepalaSekolahRusak: z.number().min(0, 'Harus berupa angka positif'),
  ruangKepalaSekolahKeterangan: z.string().optional(),

  // Ruang Guru - dengan jumlah
  ruangGuruTotal: z.number().min(0, 'Harus berupa angka positif'),
  ruangGuruBaik: z.number().min(0, 'Harus berupa angka positif'),
  ruangGuruRusak: z.number().min(0, 'Harus berupa angka positif'),
  ruangGuruKeterangan: z.string().optional(),

  // Aula Pertemuan - dengan jumlah
  aulaPertemuanTotal: z.number().min(0, 'Harus berupa angka positif'),
  aulaPertemuanBaik: z.number().min(0, 'Harus berupa angka positif'),
  aulaPertemuanRusak: z.number().min(0, 'Harus berupa angka positif'),
  aulaPertemuanKeterangan: z.string().optional(),

  // Laboratorium IPA - dengan jumlah
  laboratoriumIpaTotal: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumIpaBaik: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumIpaRusak: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumIpaKeterangan: z.string().optional(),

  // Laboratorium Bahasa - dengan jumlah
  laboratoriumBahasaTotal: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumBahasaBaik: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumBahasaRusak: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumBahasaKeterangan: z.string().optional(),

  // Laboratorium TIK - dengan jumlah
  laboratoriumTikTotal: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumTikBaik: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumTikRusak: z.number().min(0, 'Harus berupa angka positif'),
  laboratoriumTikKeterangan: z.string().optional(),
});

export type Step4Data = z.infer<typeof step4Schema>;
