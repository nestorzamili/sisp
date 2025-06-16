'use server';

import { revalidatePath } from 'next/cache';
import { RombonganBelajarService } from '@/lib/services/rombongan-belajar.service';
import { Step3Data } from '../_schema/student-data.schema';
import { RombonganBelajarFormData } from '@/types/rombongan-belajar';
import {
  validateAuthAndSchool,
  getCurrentYear,
} from '../_utils/auth-school.util';

const rombonganBelajarService = new RombonganBelajarService();

// Get existing student data for the current user's school
export async function getStudentDataAction(tahunAjaran?: string) {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    // Get student data
    const currentYear = tahunAjaran || getCurrentYear();
    const studentResult =
      await rombonganBelajarService.getRombonganBelajarBySekolah(
        schoolData!.id,
        currentYear,
      );

    if (!studentResult.success) {
      return {
        success: false,
        error: studentResult.error || 'Gagal mengambil data siswa',
      };
    } // Transform data to form format
    const studentData = studentResult.data || [];
    const formData: Step3Data = {
      siswaKelas7Laki: 0,
      siswaKelas7Perempuan: 0,
      siswaKelas8Laki: 0,
      siswaKelas8Perempuan: 0,
      siswaKelas9Laki: 0,
      siswaKelas9Perempuan: 0,
    };

    // Fill form data from database
    studentData.forEach((rombel) => {
      if (rombel.tingkatan_kelas === '7') {
        if (rombel.jenis_kelamin === 'L') {
          formData.siswaKelas7Laki = rombel.jumlah_siswa;
        } else {
          formData.siswaKelas7Perempuan = rombel.jumlah_siswa;
        }
      } else if (rombel.tingkatan_kelas === '8') {
        if (rombel.jenis_kelamin === 'L') {
          formData.siswaKelas8Laki = rombel.jumlah_siswa;
        } else {
          formData.siswaKelas8Perempuan = rombel.jumlah_siswa;
        }
      } else if (rombel.tingkatan_kelas === '9') {
        if (rombel.jenis_kelamin === 'L') {
          formData.siswaKelas9Laki = rombel.jumlah_siswa;
        } else {
          formData.siswaKelas9Perempuan = rombel.jumlah_siswa;
        }
      }
    });

    return {
      success: true,
      data: formData,
    };
  } catch (error) {
    console.error('Error fetching student data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data siswa',
    };
  }
}

// Save student data
export async function saveStudentDataAction(
  data: Step3Data,
  tahunAjaran?: string,
) {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    } // Transform form data to service format
    const currentYear = tahunAjaran || getCurrentYear();
    const rombonganBelajarFormData: RombonganBelajarFormData = {
      siswaKelas7Laki: data.siswaKelas7Laki,
      siswaKelas7Perempuan: data.siswaKelas7Perempuan,
      siswaKelas8Laki: data.siswaKelas8Laki,
      siswaKelas8Perempuan: data.siswaKelas8Perempuan,
      siswaKelas9Laki: data.siswaKelas9Laki,
      siswaKelas9Perempuan: data.siswaKelas9Perempuan,
      tahun_ajaran: currentYear,
    };

    // Save student data
    const result = await rombonganBelajarService.saveRombonganBelajarFromForm(
      schoolData!.id,
      rombonganBelajarFormData,
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Gagal menyimpan data siswa',
      };
    }

    revalidatePath('/home');

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error saving student data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data siswa',
    };
  }
}
