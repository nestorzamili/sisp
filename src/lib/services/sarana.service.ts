import prisma from '@/lib/prisma';
import { SaranaInput, SaranaData } from '@/types/sarana';

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
}
