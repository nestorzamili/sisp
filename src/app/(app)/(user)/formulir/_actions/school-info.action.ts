'use server';

import { revalidatePath } from 'next/cache';
import { SekolahService } from '@/lib/services/sekolah.service';
import { Step1Data } from '../_schema/school-info.schema';
import { validateAuthAndSchool } from '../_utils/auth-school.util';

// Get existing school info for the current user
export async function getSchoolInfoAction() {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    // Transform database data to form format
    const formData = {
      namaSekolah: schoolData!.nama_sekolah || '',
      npsn: schoolData!.npsn || '',
      namaKepalaSekolah: schoolData!.nama_kepala_sekolah || '',
      nipKepalaSekolah: schoolData!.nip_kepala_sekolah || '',
      alamatSekolah: schoolData!.alamat_sekolah || '',
      kecamatan: schoolData!.kecamatan || '',
    };

    return {
      success: true,
      data: formData,
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
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    // Update school data
    const updateData = {
      nama_sekolah: data.namaSekolah,
      npsn: data.npsn,
      nama_kepala_sekolah: data.namaKepalaSekolah,
      nip_kepala_sekolah: data.nipKepalaSekolah,
      alamat_sekolah: data.alamatSekolah,
      kecamatan: data.kecamatan,
    };

    const result = await SekolahService.updateSekolah(
      schoolData!.id,
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
