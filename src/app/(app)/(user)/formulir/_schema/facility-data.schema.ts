import { z } from 'zod';
import { FormulirCompleteData } from '@/types/formulir.types';

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

export function getStep4InitialData(
  completeData: FormulirCompleteData | null,
): Step4Data {
  const sarana = completeData?.sarana || [];

  // Helper function to find sarana by type and extract values
  const findSarana = (jenis: string) => {
    const item = sarana.find((s) => s.jenis_sarana === jenis);
    return {
      total: item?.jumlah_total || 0,
      baik: item?.jumlah_kondisi_baik || 0,
      rusak: item?.jumlah_kondisi_rusak || 0,
      keterangan: item?.keterangan || '',
    };
  };

  const ruangKelas = findSarana('RuangKelas');
  const perpustakaan = findSarana('Perpustakaan');
  const ruangKepalaSekolah = findSarana('RuangKepalaSekolah');
  const ruangGuru = findSarana('RuangGuru');
  const aulaPertemuan = findSarana('AulaPertemuan');
  const laboratoriumIpa = findSarana('LaboratoriumIPA');
  const laboratoriumBahasa = findSarana('LaboratoriumBahasa');
  const laboratoriumTik = findSarana('LaboratoriumTIK');

  return {
    ruangKelasTotal: ruangKelas.total,
    ruangKelasBaik: ruangKelas.baik,
    ruangKelasRusak: ruangKelas.rusak,
    ruangKelasKeterangan: ruangKelas.keterangan,

    perpustakaanTotal: perpustakaan.total,
    perpustakaanBaik: perpustakaan.baik,
    perpustakaanRusak: perpustakaan.rusak,
    perpustakaanKeterangan: perpustakaan.keterangan,

    ruangKepalaSekolahTotal: ruangKepalaSekolah.total,
    ruangKepalaSekolahBaik: ruangKepalaSekolah.baik,
    ruangKepalaSekolahRusak: ruangKepalaSekolah.rusak,
    ruangKepalaSekolahKeterangan: ruangKepalaSekolah.keterangan,

    ruangGuruTotal: ruangGuru.total,
    ruangGuruBaik: ruangGuru.baik,
    ruangGuruRusak: ruangGuru.rusak,
    ruangGuruKeterangan: ruangGuru.keterangan,

    aulaPertemuanTotal: aulaPertemuan.total,
    aulaPertemuanBaik: aulaPertemuan.baik,
    aulaPertemuanRusak: aulaPertemuan.rusak,
    aulaPertemuanKeterangan: aulaPertemuan.keterangan,

    laboratoriumIpaTotal: laboratoriumIpa.total,
    laboratoriumIpaBaik: laboratoriumIpa.baik,
    laboratoriumIpaRusak: laboratoriumIpa.rusak,
    laboratoriumIpaKeterangan: laboratoriumIpa.keterangan,

    laboratoriumBahasaTotal: laboratoriumBahasa.total,
    laboratoriumBahasaBaik: laboratoriumBahasa.baik,
    laboratoriumBahasaRusak: laboratoriumBahasa.rusak,
    laboratoriumBahasaKeterangan: laboratoriumBahasa.keterangan,

    laboratoriumTikTotal: laboratoriumTik.total,
    laboratoriumTikBaik: laboratoriumTik.baik,
    laboratoriumTikRusak: laboratoriumTik.rusak,
    laboratoriumTikKeterangan: laboratoriumTik.keterangan,
  };
}
