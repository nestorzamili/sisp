'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { HomeDataResponse } from '@/types/home.types';

export async function getUserSekolahDataAction(): Promise<HomeDataResponse> {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Get sekolah data for the user with related data
    const sekolah = await prisma.sekolah.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviewedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        guru: {
          select: {
            id: true,
            status_guru: true,
            jenis_kelamin: true,
            jumlah: true,
            tahun_ajaran: true,
          },
        },
        rombonganBelajar: {
          select: {
            id: true,
            tingkatan_kelas: true,
            jenis_kelamin: true,
            jumlah_siswa: true,
            tahun_ajaran: true,
          },
        },
        sarana: {
          select: {
            id: true,
            jenis_sarana: true,
            nama_sarana: true,
            jumlah_total: true,
            jumlah_kondisi_baik: true,
            jumlah_kondisi_rusak: true,
            tahun_ajaran: true,
          },
        },
        prasarana: {
          select: {
            id: true,
            jenis_prasarana: true,
            nama_prasarana: true,
            jumlah_total: true,
            jumlah_kondisi_baik: true,
            jumlah_kondisi_rusak: true,
            tahun_ajaran: true,
          },
        },
      },
    });

    return {
      success: true,
      data: {
        user: session.user,
        sekolah: sekolah,
      },
    };
  } catch (error) {
    console.error('Error getting user sekolah data:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan saat mengambil data',
    };
  }
}
