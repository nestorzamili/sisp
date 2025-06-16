'use server';

import { revalidatePath } from 'next/cache';
import { GuruService } from '@/lib/services/guru.service';
import { Step2Data } from '../_schema/teacher-data.schema';
import { GuruFormData } from '@/types/guru';
import {
  validateAuthAndSchool,
  getCurrentYear,
} from '../_utils/auth-school.util';

const guruService = new GuruService();

// Get existing teacher data for the current user's school
export async function getTeacherDataAction() {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    } // Get teacher data
    const tahunAjaran = getCurrentYear();
    const teacherResult = await guruService.getGuruBySekolah(
      schoolData!.id,
      tahunAjaran,
    );

    if (!teacherResult.success) {
      return {
        success: false,
        error: teacherResult.error || 'Gagal mengambil data guru',
      };
    }

    // Transform data to form format - using numbers directly
    const teacherData = teacherResult.data || [];
    const formData: Step2Data = {
      guruPnsLaki: 0,
      guruPnsPerempuan: 0,
      guruPpppLaki: 0,
      guruPpppPerempuan: 0,
      guruGttLaki: 0,
      guruGttPerempuan: 0,
    }; // Fill form data from database
    teacherData.forEach((guru) => {
      if (guru.status_guru === 'PNS') {
        if (guru.jenis_kelamin === 'L') {
          formData.guruPnsLaki = guru.jumlah;
        } else {
          formData.guruPnsPerempuan = guru.jumlah;
        }
      } else if (guru.status_guru === 'PPPK') {
        if (guru.jenis_kelamin === 'L') {
          formData.guruPpppLaki = guru.jumlah;
        } else {
          formData.guruPpppPerempuan = guru.jumlah;
        }
      } else if (guru.status_guru === 'Honorer') {
        if (guru.jenis_kelamin === 'L') {
          formData.guruGttLaki = guru.jumlah;
        } else {
          formData.guruGttPerempuan = guru.jumlah;
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
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    } // Transform form data to service format
    const currentYear = tahunAjaran || getCurrentYear();
    const guruFormData: GuruFormData = {
      guruPnsLaki: data.guruPnsLaki,
      guruPnsPerempuan: data.guruPnsPerempuan,
      guruPpppLaki: data.guruPpppLaki,
      guruPpppPerempuan: data.guruPpppPerempuan,
      guruGttLaki: data.guruGttLaki,
      guruGttPerempuan: data.guruGttPerempuan,
      tahun_ajaran: currentYear,
    };

    // Save teacher data
    const result = await guruService.saveGuruFromForm(
      schoolData!.id,
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
