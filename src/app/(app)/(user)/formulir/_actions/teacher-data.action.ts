'use server';

import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { GuruService } from '@/lib/services/guru.service';
import { Step2Data } from '../_schema/teacher-data.schema';
import { GuruFormData } from '@/types/guru';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const guruService = new GuruService();

// Get existing teacher data for the current user's school
export async function getTeacherDataAction(tahunAjaran?: string) {
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
    const schoolResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    // Get teacher data
    const currentYear = tahunAjaran || new Date().getFullYear().toString();
    const teacherResult = await guruService.getGuruBySekolah(
      schoolResult.data.id,
      currentYear,
    );

    if (!teacherResult.success) {
      return {
        success: false,
        error: teacherResult.error || 'Gagal mengambil data guru',
      };
    }

    // Transform data to form format
    const teacherData = teacherResult.data || [];
    const formData: Step2Data = {
      guruPnsLaki: '0',
      guruPnsPerempuan: '0',
      guruPpppLaki: '0',
      guruPpppPerempuan: '0',
      guruGttLaki: '0',
      guruGttPerempuan: '0',
    };

    // Fill form data from database
    teacherData.forEach((guru) => {
      if (guru.status_guru === 'PNS') {
        if (guru.jenis_kelamin === 'L') {
          formData.guruPnsLaki = guru.jumlah.toString();
        } else {
          formData.guruPnsPerempuan = guru.jumlah.toString();
        }
      } else if (guru.status_guru === 'PPPK') {
        if (guru.jenis_kelamin === 'L') {
          formData.guruPpppLaki = guru.jumlah.toString();
        } else {
          formData.guruPpppPerempuan = guru.jumlah.toString();
        }
      } else if (guru.status_guru === 'Honorer') {
        if (guru.jenis_kelamin === 'L') {
          formData.guruGttLaki = guru.jumlah.toString();
        } else {
          formData.guruGttPerempuan = guru.jumlah.toString();
        }
      }
    });

    return {
      success: true,
      data: formData,
    };
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data guru',
    };
  }
}

// Save teacher data
export async function saveTeacherDataAction(
  data: Step2Data,
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
    const schoolResult = await SekolahService.getSekolahByUserId(
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
    const guruFormData: GuruFormData = {
      guruPnsLaki: Number(data.guruPnsLaki),
      guruPnsPerempuan: Number(data.guruPnsPerempuan),
      guruPpppLaki: Number(data.guruPpppLaki),
      guruPpppPerempuan: Number(data.guruPpppPerempuan),
      guruGttLaki: Number(data.guruGttLaki),
      guruGttPerempuan: Number(data.guruGttPerempuan),
      tahun_ajaran: currentYear,
    };

    // Save teacher data
    const result = await guruService.saveGuruFromForm(
      schoolResult.data.id,
      guruFormData,
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Gagal menyimpan data guru',
      };
    }

    revalidatePath('/home');

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error saving teacher data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data guru',
    };
  }
}

// Get teacher statistics
export async function getTeacherStatisticsAction(tahunAjaran?: string) {
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
    const schoolResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = tahunAjaran || new Date().getFullYear().toString();
    const result = await guruService.getGuruStatistics(
      schoolResult.data.id,
      currentYear,
    );

    return result;
  } catch (error) {
    console.error('Error fetching teacher statistics:', error);
    return {
      success: false,
      error: 'Gagal mengambil statistik guru',
    };
  }
}
