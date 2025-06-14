import prisma from '@/lib/prisma';
import { CreateLampiranData, Lampiran } from '@/types/lampiran';

export class LampiranService {
  static async createLampiran(
    sekolahId: string,
    data: CreateLampiranData,
  ): Promise<Lampiran> {
    return await prisma.lampiran.create({
      data: {
        sekolahId,
        nama_dokumen: data.nama_dokumen,
        url: data.url,
        keterangan: data.keterangan,
      },
    });
  }

  static async getLampiranBySekolahId(sekolahId: string): Promise<Lampiran[]> {
    return await prisma.lampiran.findMany({
      where: {
        sekolahId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async deleteLampiran(id: string): Promise<void> {
    await prisma.lampiran.delete({
      where: {
        id,
      },
    });
  }

  static async updateLampiran(
    id: string,
    data: Partial<CreateLampiranData>,
  ): Promise<Lampiran> {
    return await prisma.lampiran.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteAllLampiranBySekolahId(sekolahId: string): Promise<void> {
    await prisma.lampiran.deleteMany({
      where: {
        sekolahId,
      },
    });
  }
}
