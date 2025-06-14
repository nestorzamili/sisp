import prisma from '@/lib/prisma';
import { SaranaInput, SaranaData, SaranaStatistics } from '@/types/sarana';

export class SaranaService {
  static async getSaranaBySekolahId(sekolahId: string): Promise<SaranaData[]> {
    return await prisma.sarana.findMany({
      where: {
        sekolahId,
      },
      orderBy: [
        { tahun_ajaran: 'desc' },
        { jenis_sarana: 'asc' },
        { nama_sarana: 'asc' },
      ],
    });
  }

  static async getSaranaBySekolahIdAndTahunAjaran(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<SaranaData[]> {
    return await prisma.sarana.findMany({
      where: {
        sekolahId,
        tahun_ajaran: tahunAjaran,
      },
      orderBy: [{ jenis_sarana: 'asc' }, { nama_sarana: 'asc' }],
    });
  }

  static async createSarana(
    sekolahId: string,
    data: SaranaInput,
  ): Promise<SaranaData> {
    return await prisma.sarana.create({
      data: {
        sekolahId,
        ...data,
      },
    });
  }

  static async updateSarana(
    id: string,
    data: Partial<SaranaInput>,
  ): Promise<SaranaData> {
    return await prisma.sarana.update({
      where: { id },
      data,
    });
  }

  static async deleteSarana(id: string): Promise<void> {
    await prisma.sarana.delete({
      where: { id },
    });
  }

  static async upsertSaranaBatch(
    sekolahId: string,
    saranaList: SaranaInput[],
  ): Promise<void> {
    // Delete existing sarana for the school and academic years
    const tahunAjaranList = [...new Set(saranaList.map((s) => s.tahun_ajaran))];

    await prisma.sarana.deleteMany({
      where: {
        sekolahId,
        tahun_ajaran: {
          in: tahunAjaranList,
        },
      },
    });

    // Create new sarana entries
    if (saranaList.length > 0) {
      await prisma.sarana.createMany({
        data: saranaList.map((sarana) => ({
          sekolahId,
          ...sarana,
        })),
      });
    }
  }
  static async getSaranaStats(sekolahId: string): Promise<SaranaStatistics> {
    const sarana = await prisma.sarana.findMany({
      where: { sekolahId },
      select: {
        jumlah_total: true,
        jumlah_kondisi_baik: true,
        jumlah_kondisi_rusak: true,
        tahun_ajaran: true,
      },
    });

    const totalSarana = sarana.reduce((sum, s) => sum + s.jumlah_total, 0);
    const totalKondisiBaik = sarana.reduce(
      (sum, s) => sum + s.jumlah_kondisi_baik,
      0,
    );
    const totalKondisiRusak = sarana.reduce(
      (sum, s) => sum + s.jumlah_kondisi_rusak,
      0,
    );

    const tahunAjaranTerbaru =
      sarana.length > 0
        ? Math.max(
            ...sarana.map((s) => parseInt(s.tahun_ajaran.split('/')[0])),
          ).toString()
        : null;

    return {
      totalSarana,
      totalKondisiBaik,
      totalKondisiRusak,
      tahunAjaranTerbaru: tahunAjaranTerbaru
        ? `${tahunAjaranTerbaru}/${parseInt(tahunAjaranTerbaru) + 1}`
        : null,
    };
  }
}
