'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SekolahService } from '@/lib/services/sekolah.service';
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
    } // First get the basic sekolah to find the ID
    const result = await SekolahService.getSekolahByUserId(session.user.id);

    if (!result.success || !result.data) {
      return {
        success: true,
        data: {
          user: session.user,
          sekolah: null,
        },
      };
    }

    // Get detailed sekolah data including all relations
    const detailedResult = await SekolahService.getSekolahById(
      result.data.id,
      true,
    );

    if (!detailedResult.success || !detailedResult.data) {
      return {
        success: false,
        error: 'Gagal mengambil detail data sekolah',
      };
    }
    return {
      success: true,
      data: {
        user: session.user,
        sekolah: detailedResult.data,
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
