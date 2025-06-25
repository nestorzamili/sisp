import {
  FormulirGuru,
  FormulirRombonganBelajar,
  FormulirSarana,
  FormulirPrasarana,
  FormulirKebutuhanPrioritas,
} from '@/types/formulir.types';
import { Step2Data } from './teacher-data.schema';
import { Step3Data } from './student-data.schema';
import { Step4Data } from './facility-data.schema';
import { Step5Data } from './infrastructure-data.schema';
import { Step6Data } from './priority-needs.schema';

/**
 * Transform Step2Data (teacher form data) to FormulirGuru array
 */
export function transformTeacherData(data: Step2Data): FormulirGuru[] {
  return [
    {
      status_guru: 'PNS' as const,
      jenis_kelamin: 'L' as const,
      jumlah: data.guruPnsLaki,
    },
    {
      status_guru: 'PNS' as const,
      jenis_kelamin: 'P' as const,
      jumlah: data.guruPnsPerempuan,
    },
    {
      status_guru: 'PPPK' as const,
      jenis_kelamin: 'L' as const,
      jumlah: data.guruPppkLaki,
    },
    {
      status_guru: 'PPPK' as const,
      jenis_kelamin: 'P' as const,
      jumlah: data.guruPppkPerempuan,
    },
    {
      status_guru: 'Honorer' as const,
      jenis_kelamin: 'L' as const,
      jumlah: data.guruHonorerLaki,
    },
    {
      status_guru: 'Honorer' as const,
      jenis_kelamin: 'P' as const,
      jumlah: data.guruHonorerPerempuan,
    },
  ];
}

/**
 * Transform Step3Data (student form data) to FormulirRombonganBelajar array
 */
export function transformStudentData(
  data: Step3Data,
): FormulirRombonganBelajar[] {
  return [
    {
      tingkatan_kelas: '7',
      jenis_kelamin: 'L' as const,
      jumlah_siswa: data.siswaKelas7Laki,
    },
    {
      tingkatan_kelas: '7',
      jenis_kelamin: 'P' as const,
      jumlah_siswa: data.siswaKelas7Perempuan,
    },
    {
      tingkatan_kelas: '8',
      jenis_kelamin: 'L' as const,
      jumlah_siswa: data.siswaKelas8Laki,
    },
    {
      tingkatan_kelas: '8',
      jenis_kelamin: 'P' as const,
      jumlah_siswa: data.siswaKelas8Perempuan,
    },
    {
      tingkatan_kelas: '9',
      jenis_kelamin: 'L' as const,
      jumlah_siswa: data.siswaKelas9Laki,
    },
    {
      tingkatan_kelas: '9',
      jenis_kelamin: 'P' as const,
      jumlah_siswa: data.siswaKelas9Perempuan,
    },
  ];
}

/**
 * Transform Step4Data (facility form data) to FormulirSarana array
 */
export function transformFacilityData(data: Step4Data): FormulirSarana[] {
  return [
    {
      jenis_sarana: 'RuangKelas' as const,
      nama_sarana: 'Ruang Kelas',
      jumlah_total: data.ruangKelasTotal,
      jumlah_kondisi_baik: data.ruangKelasBaik,
      jumlah_kondisi_rusak: data.ruangKelasRusak,
      keterangan: data.ruangKelasKeterangan,
    },
    {
      jenis_sarana: 'Perpustakaan' as const,
      nama_sarana: 'Perpustakaan',
      jumlah_total: data.perpustakaanTotal,
      jumlah_kondisi_baik: data.perpustakaanBaik,
      jumlah_kondisi_rusak: data.perpustakaanRusak,
      keterangan: data.perpustakaanKeterangan,
    },
    {
      jenis_sarana: 'RuangKepalaSekolah' as const,
      nama_sarana: 'Ruang Kepala Sekolah',
      jumlah_total: data.ruangKepalaSekolahTotal,
      jumlah_kondisi_baik: data.ruangKepalaSekolahBaik,
      jumlah_kondisi_rusak: data.ruangKepalaSekolahRusak,
      keterangan: data.ruangKepalaSekolahKeterangan,
    },
    {
      jenis_sarana: 'RuangGuru' as const,
      nama_sarana: 'Ruang Guru',
      jumlah_total: data.ruangGuruTotal,
      jumlah_kondisi_baik: data.ruangGuruBaik,
      jumlah_kondisi_rusak: data.ruangGuruRusak,
      keterangan: data.ruangGuruKeterangan,
    },
    {
      jenis_sarana: 'AulaPertemuan' as const,
      nama_sarana: 'Aula Pertemuan',
      jumlah_total: data.aulaPertemuanTotal,
      jumlah_kondisi_baik: data.aulaPertemuanBaik,
      jumlah_kondisi_rusak: data.aulaPertemuanRusak,
      keterangan: data.aulaPertemuanKeterangan,
    },
    {
      jenis_sarana: 'LaboratoriumIPA' as const,
      nama_sarana: 'Laboratorium IPA',
      jumlah_total: data.laboratoriumIpaTotal,
      jumlah_kondisi_baik: data.laboratoriumIpaBaik,
      jumlah_kondisi_rusak: data.laboratoriumIpaRusak,
      keterangan: data.laboratoriumIpaKeterangan,
    },
    {
      jenis_sarana: 'LaboratoriumBahasa' as const,
      nama_sarana: 'Laboratorium Bahasa',
      jumlah_total: data.laboratoriumBahasaTotal,
      jumlah_kondisi_baik: data.laboratoriumBahasaBaik,
      jumlah_kondisi_rusak: data.laboratoriumBahasaRusak,
      keterangan: data.laboratoriumBahasaKeterangan,
    },
    {
      jenis_sarana: 'LaboratoriumTIK' as const,
      nama_sarana: 'Laboratorium TIK',
      jumlah_total: data.laboratoriumTikTotal,
      jumlah_kondisi_baik: data.laboratoriumTikBaik,
      jumlah_kondisi_rusak: data.laboratoriumTikRusak,
      keterangan: data.laboratoriumTikKeterangan,
    },
  ];
}

/**
 * Transform Step5Data (infrastructure form data) to FormulirPrasarana array
 */
export function transformInfrastructureData(
  data: Step5Data,
): FormulirPrasarana[] {
  const prasaranaData: FormulirPrasarana[] = [
    {
      jenis_prasarana: 'MejaKursiSiswa',
      nama_prasarana: 'Meja dan Kursi Siswa',
      jumlah_total: data.mejaKursiSiswaTotal,
      jumlah_kondisi_baik: data.mejaKursiSiswaBaik,
      jumlah_kondisi_rusak: data.mejaKursiSiswaRusak,
      keterangan: data.mejaKursiSiswaKeterangan,
    },
    {
      jenis_prasarana: 'Komputer',
      nama_prasarana: 'Komputer',
      jumlah_total: data.komputerTotal,
      jumlah_kondisi_baik: data.komputerBaik,
      jumlah_kondisi_rusak: data.komputerRusak,
      keterangan: data.komputerKeterangan,
    },
    {
      jenis_prasarana: 'JambanSiswa',
      nama_prasarana: 'Toilet Siswa',
      jumlah_total: data.toiletSiswaTotal,
      jumlah_kondisi_baik: data.toiletSiswaBaik,
      jumlah_kondisi_rusak: data.toiletSiswaRusak,
      keterangan: data.toiletSiswaKeterangan,
    },
    {
      jenis_prasarana: 'JambanGuru',
      nama_prasarana: 'Toilet Guru',
      jumlah_total: data.toiletGuruTotal,
      jumlah_kondisi_baik: data.toiletGuruBaik,
      jumlah_kondisi_rusak: data.toiletGuruRusak,
      keterangan: data.toiletGuruKeterangan,
    },
  ];

  // Add prasarana lainnya if exists
  if (data.prasaranaLainnya) {
    data.prasaranaLainnya.forEach((item) => {
      prasaranaData.push({
        jenis_prasarana: 'PrasaranaLainnya',
        nama_prasarana: item.nama,
        jumlah_total: item.jumlahTotal,
        jumlah_kondisi_baik: item.jumlahBaik,
        jumlah_kondisi_rusak: item.jumlahRusak,
        keterangan: item.keterangan,
      });
    });
  }

  return prasaranaData;
}

/**
 * Transform Step6Data (priority needs form data) to FormulirKebutuhanPrioritas array
 */
export function transformPriorityNeedsData(
  data: Step6Data,
): FormulirKebutuhanPrioritas[] {
  return [
    {
      jenis: 'Sarana' as const,
      penjelasan: data.kebutuhanPrioritas,
    },
  ];
}
