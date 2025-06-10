'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { RombonganBelajarService } from '@/lib/services/rombongan-belajar.service';
import { Step3Data } from '../_schema/student-data.schema';
import { RombonganBelajarFormData } from '@/types/rombongan-belajar';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const sekolahService = new SekolahService();
const rombonganBelajarService = new RombonganBelajarService();

// Get existing student data for the current user's school
export async function getStudentDataAction(tahunAjaran?: string) {
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

    // Get school data first
    const schoolResult = await sekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    // Get student data
    const currentYear = tahunAjaran || new Date().getFullYear().toString();
    const studentResult =
      await rombonganBelajarService.getRombonganBelajarBySekolah(
        schoolResult.data.id,
        currentYear,
      );

    if (!studentResult.success) {
      return {
        success: false,
        error: studentResult.error || 'Gagal mengambil data siswa',
      };
    }

    // Transform data to form format
    const studentData = studentResult.data || [];
    const formData: Step3Data = {
      rombelKelas7: '0',
      rombelKelas8: '0',
      rombelKelas9: '0',
      siswaKelas7Laki: '0',
      siswaKelas7Perempuan: '0',
      siswaKelas8Laki: '0',
      siswaKelas8Perempuan: '0',
      siswaKelas9Laki: '0',
      siswaKelas9Perempuan: '0',
    };

    // Fill form data from database
    studentData.forEach((rombel) => {
      if (rombel.tingkatan_kelas === '7') {
        if (rombel.jenis_kelamin === 'L') {
          formData.siswaKelas7Laki = rombel.jumlah_siswa.toString();
        } else {
          formData.siswaKelas7Perempuan = rombel.jumlah_siswa.toString();
        }
      } else if (rombel.tingkatan_kelas === '8') {
        if (rombel.jenis_kelamin === 'L') {
          formData.siswaKelas8Laki = rombel.jumlah_siswa.toString();
        } else {
          formData.siswaKelas8Perempuan = rombel.jumlah_siswa.toString();
        }
      } else if (rombel.tingkatan_kelas === '9') {
        if (rombel.jenis_kelamin === 'L') {
          formData.siswaKelas9Laki = rombel.jumlah_siswa.toString();
        } else {
          formData.siswaKelas9Perempuan = rombel.jumlah_siswa.toString();
        }
      }
    });

    // Calculate rombongan belajar totals from student counts
    // Assuming average class size of 30 students for rombel calculation
    const avgClassSize = 30;
    const totalKelas7 =
      Number(formData.siswaKelas7Laki) + Number(formData.siswaKelas7Perempuan);
    const totalKelas8 =
      Number(formData.siswaKelas8Laki) + Number(formData.siswaKelas8Perempuan);
    const totalKelas9 =
      Number(formData.siswaKelas9Laki) + Number(formData.siswaKelas9Perempuan);

    formData.rombelKelas7 = Math.ceil(totalKelas7 / avgClassSize).toString();
    formData.rombelKelas8 = Math.ceil(totalKelas8 / avgClassSize).toString();
    formData.rombelKelas9 = Math.ceil(totalKelas9 / avgClassSize).toString();

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
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Get school data first
    const schoolResult = await sekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    // Transform form data to service format
    const currentYear = tahunAjaran || new Date().getFullYear().toString();
    const rombonganBelajarFormData: RombonganBelajarFormData = {
      rombelKelas7: Number(data.rombelKelas7),
      rombelKelas8: Number(data.rombelKelas8),
      rombelKelas9: Number(data.rombelKelas9),
      siswaKelas7Laki: Number(data.siswaKelas7Laki),
      siswaKelas7Perempuan: Number(data.siswaKelas7Perempuan),
      siswaKelas8Laki: Number(data.siswaKelas8Laki),
      siswaKelas8Perempuan: Number(data.siswaKelas8Perempuan),
      siswaKelas9Laki: Number(data.siswaKelas9Laki),
      siswaKelas9Perempuan: Number(data.siswaKelas9Perempuan),
      tahun_ajaran: currentYear,
    };

    // Save student data
    const result = await rombonganBelajarService.saveRombonganBelajarFromForm(
      schoolResult.data.id,
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

// Get student statistics
export async function getStudentStatisticsAction(tahunAjaran?: string) {
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

    // Get school data first
    const schoolResult = await sekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = tahunAjaran || new Date().getFullYear().toString();
    const result = await rombonganBelajarService.getRombonganBelajarStatistics(
      schoolResult.data.id,
      currentYear,
    );

    return result;
  } catch (error) {
    console.error('Error fetching student statistics:', error);
    return {
      success: false,
      error: 'Gagal mengambil statistik siswa',
    };
  }
}
