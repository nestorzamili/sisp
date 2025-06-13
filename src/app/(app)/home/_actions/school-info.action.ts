'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { Step1Data } from '../_schema/school-info.schema';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const sekolahService = new SekolahService();

// Get existing school info for the current user
export async function getSchoolInfoAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const result = await sekolahService.getSekolahByUserId(session.user.id);

    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error || 'Data sekolah tidak ditemukan',
      };
    }

    // Transform database data to form format
    const schoolData = {
      namaSekolah: result.data.nama_sekolah || '',
      npsn: result.data.npsn || '',
      namaKepalaSekolah: result.data.nama_kepala_sekolah || '',
      nipKepalaSekolah: result.data.nip_kepala_sekolah || '',
      alamatSekolah: result.data.alamat_sekolah || '',
      kecamatan: result.data.kecamatan || '',
    };

    return {
      success: true,
      data: schoolData,
    };
  } catch (error) {
    console.error('Error fetching school info:', error);
    return {
      success: false,
      error: 'Gagal mengambil informasi sekolah',
    };
  }
}

// Update school info
export async function updateSchoolInfoAction(data: Step1Data) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Get existing school data
    const existingResult = await sekolahService.getSekolahByUserId(
      session.user.id,
    );

    if (!existingResult.success || !existingResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    // Update school data
    const updateData = {
      nama_sekolah: data.namaSekolah,
      npsn: data.npsn,
      nama_kepala_sekolah: data.namaKepalaSekolah,
      nip_kepala_sekolah: data.nipKepalaSekolah,
      alamat_sekolah: data.alamatSekolah,
      kecamatan: data.kecamatan,
      updatedAt: new Date(), // Changed from updated_at to updatedAt
    };

    const result = await sekolahService.updateSekolah(
      existingResult.data.id,
      updateData,
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Gagal mengupdate informasi sekolah',
      };
    }

    revalidatePath('/home');

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error updating school info:', error);
    return {
      success: false,
      error: 'Gagal mengupdate informasi sekolah',
    };
  }
}
