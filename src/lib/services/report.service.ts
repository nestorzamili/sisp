import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import {
  ReportData,
  ReportSekolahItem,
  ReportSummary,
  ReportFilters,
  ReportGuruStats,
  ReportSiswaStats,
  ReportSaranaStats,
  ReportPrasaranaStats,
} from '@/types/report.types';

// Type for Sekolah with included relations
type SekolahWithRelations = Prisma.SekolahGetPayload<{
  include: {
    guru: true;
    rombonganBelajar: true;
    sarana: true;
    prasarana: true;
  };
}>;

// Individual relation types
type GuruData = Prisma.GuruGetPayload<Record<string, never>>;
type RombonganBelajarData = Prisma.RombonganBelajarGetPayload<
  Record<string, never>
>;
type SaranaData = Prisma.SaranaGetPayload<Record<string, never>>;
type PrasaranaData = Prisma.PrasaranaGetPayload<Record<string, never>>;

export class ReportService {
  /**
   * Generate comprehensive report with filters
   */
  static async generateReport(
    filters: ReportFilters = {},
  ): Promise<ReportData> {
    const { kecamatan } = filters;

    // Build where clause for filtering
    const whereClause: Prisma.SekolahWhereInput = {
      // Only include approved schools
      status: 'APPROVED',
    };

    if (kecamatan && kecamatan.length > 0) {
      whereClause.kecamatan = { in: kecamatan };
    }

    // Get all schools with related data
    const sekolahList = await prisma.sekolah.findMany({
      where: whereClause,
      include: {
        guru: true,
        rombonganBelajar: true,
        sarana: true,
        prasarana: true,
      },
      orderBy: [{ kecamatan: 'asc' }, { nama_sekolah: 'asc' }],
    });

    if (!sekolahList || sekolahList.length === 0) {
      throw new Error(
        `Tidak ada data sekolah yang ditemukan untuk kecamatan ${kecamatan?.join(', ')}`,
      );
    }

    // Process each school data
    const processedSekolahList: ReportSekolahItem[] = sekolahList.map(
      (sekolah: SekolahWithRelations) => ({
        sekolah: {
          id: sekolah.id,
          nama_sekolah: sekolah.nama_sekolah,
          npsn: sekolah.npsn,
          kecamatan: sekolah.kecamatan,
          nama_kepala_sekolah: sekolah.nama_kepala_sekolah,
          nip_kepala_sekolah: sekolah.nip_kepala_sekolah,
          alamat_sekolah: sekolah.alamat_sekolah,
          status: sekolah.status,
        },
        guru: this.calculateGuruStats(sekolah.guru),
        siswa: this.calculateSiswaStats(sekolah.rombonganBelajar),
        sarana: this.calculateSaranaStats(sekolah.sarana),
        prasarana: this.calculatePrasaranaStats(sekolah.prasarana),
      }),
    );

    // Calculate summary statistics
    const summary = this.calculateSummary(processedSekolahList);

    return {
      summary,
      sekolahList: processedSekolahList,
      generatedAt: new Date(),
    };
  }

  /**
   * Calculate guru statistics
   */
  private static calculateGuruStats(guruList: GuruData[]): ReportGuruStats {
    const stats = {
      pns: { laki: 0, perempuan: 0, total: 0 },
      pppk: { laki: 0, perempuan: 0, total: 0 },
      honorer: { laki: 0, perempuan: 0, total: 0 },
      totalSemua: 0,
    };

    guruList.forEach((guru) => {
      const jumlah = guru.jumlah || 0;
      const status = guru.status_guru.toLowerCase();
      const gender = guru.jenis_kelamin === 'L' ? 'laki' : 'perempuan';

      if (status === 'pns') {
        stats.pns[gender] += jumlah;
        stats.pns.total += jumlah;
      } else if (status === 'pppk') {
        stats.pppk[gender] += jumlah;
        stats.pppk.total += jumlah;
      } else if (status === 'honorer') {
        stats.honorer[gender] += jumlah;
        stats.honorer.total += jumlah;
      }

      stats.totalSemua += jumlah;
    });

    return stats;
  }

  /**
   * Calculate siswa statistics
   */
  private static calculateSiswaStats(
    rombonganBelajarList: RombonganBelajarData[],
  ): ReportSiswaStats {
    const stats = {
      kelas7: { laki: 0, perempuan: 0, total: 0 },
      kelas8: { laki: 0, perempuan: 0, total: 0 },
      kelas9: { laki: 0, perempuan: 0, total: 0 },
      totalSemua: 0,
    };

    rombonganBelajarList.forEach((rb) => {
      const jumlah = rb.jumlah_siswa || 0;
      const kelas = rb.tingkatan_kelas;
      const gender = rb.jenis_kelamin === 'L' ? 'laki' : 'perempuan';

      if (kelas === '7') {
        stats.kelas7[gender] += jumlah;
        stats.kelas7.total += jumlah;
      } else if (kelas === '8') {
        stats.kelas8[gender] += jumlah;
        stats.kelas8.total += jumlah;
      } else if (kelas === '9') {
        stats.kelas9[gender] += jumlah;
        stats.kelas9.total += jumlah;
      }

      stats.totalSemua += jumlah;
    });

    return stats;
  }

  /**
   * Calculate sarana statistics
   */
  private static calculateSaranaStats(
    saranaList: SaranaData[],
  ): ReportSaranaStats {
    let kondisiBaik = 0;
    let kondisiRusak = 0;

    saranaList.forEach((sarana) => {
      kondisiBaik += sarana.jumlah_kondisi_baik || 0;
      kondisiRusak += sarana.jumlah_kondisi_rusak || 0;
    });

    const total = kondisiBaik + kondisiRusak;

    return {
      kondisiBaik,
      kondisiRusak,
      total,
      persentaseBaik: total > 0 ? Math.round((kondisiBaik / total) * 100) : 0,
      persentaseRusak: total > 0 ? Math.round((kondisiRusak / total) * 100) : 0,
    };
  }

  /**
   * Calculate prasarana statistics
   */
  private static calculatePrasaranaStats(
    prasaranaList: PrasaranaData[],
  ): ReportPrasaranaStats {
    let kondisiBaik = 0;
    let kondisiRusak = 0;

    prasaranaList.forEach((prasarana) => {
      kondisiBaik += prasarana.jumlah_kondisi_baik || 0;
      kondisiRusak += prasarana.jumlah_kondisi_rusak || 0;
    });

    const total = kondisiBaik + kondisiRusak;

    return {
      kondisiBaik,
      kondisiRusak,
      total,
      persentaseBaik: total > 0 ? Math.round((kondisiBaik / total) * 100) : 0,
      persentaseRusak: total > 0 ? Math.round((kondisiRusak / total) * 100) : 0,
    };
  }

  /**
   * Calculate summary statistics
   */
  private static calculateSummary(
    sekolahList: ReportSekolahItem[],
  ): ReportSummary {
    const summary: ReportSummary = {
      totalSekolah: sekolahList.length,
      totalGuru: 0,
      totalSiswa: 0,
      totalSarana: 0,
      totalPrasarana: 0,
      sekolahByStatus: {
        draft: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      },
      sekolahByKecamatan: {},
    };

    sekolahList.forEach((item) => {
      // Accumulate totals
      summary.totalGuru += item.guru.totalSemua;
      summary.totalSiswa += item.siswa.totalSemua;
      summary.totalSarana += item.sarana.total;
      summary.totalPrasarana += item.prasarana.total;

      // Count by status
      const status =
        item.sekolah.status.toLowerCase() as keyof typeof summary.sekolahByStatus;
      if (summary.sekolahByStatus[status] !== undefined) {
        summary.sekolahByStatus[status]++;
      }

      // Count by kecamatan
      const kecamatan = item.sekolah.kecamatan || 'Tidak Diketahui';
      summary.sekolahByKecamatan[kecamatan] =
        (summary.sekolahByKecamatan[kecamatan] || 0) + 1;
    });

    return summary;
  }

  /**
   * Get schools count by various criteria for dashboard
   */
  static async getDashboardStats() {
    const [
      totalSekolah,
      sekolahApproved,
      sekolahPending,
      sekolahDraft,
      totalGuru,
      totalSiswa,
    ] = await Promise.all([
      prisma.sekolah.count(),
      prisma.sekolah.count({ where: { status: 'APPROVED' } }),
      prisma.sekolah.count({ where: { status: 'PENDING' } }),
      prisma.sekolah.count({ where: { status: 'DRAFT' } }),
      prisma.guru.aggregate({ _sum: { jumlah: true } }),
      prisma.rombonganBelajar.aggregate({ _sum: { jumlah_siswa: true } }),
    ]);

    return {
      totalSekolah,
      sekolahApproved,
      sekolahPending,
      sekolahDraft,
      totalGuru: totalGuru._sum.jumlah || 0,
      totalSiswa: totalSiswa._sum.jumlah_siswa || 0,
    };
  }
}
