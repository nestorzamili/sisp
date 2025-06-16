'use server';

import { revalidatePath } from 'next/cache';
import { KebutuhanPrioritasService } from '@/lib/services/kebutuhan-prioritas.service';
import { Step6Data } from '../_schema/priority-needs.schema';
import { KebutuhanPrioritasFormData } from '@/types/kebutuhan-prioritas';
import {
  validateAuthAndSchool,
  getCurrentYear,
} from '../_utils/auth-school.util';

// Get existing priority needs data for the current user's school
export async function getPriorityNeedsDataAction(tahunAjaran?: string) {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const currentYear = tahunAjaran || getCurrentYear();

    const kebutuhanPrioritasData =
      await KebutuhanPrioritasService.getKebutuhanPrioritasBySekolahIdAndTahunAjaran(
        schoolData!.id,
        currentYear,
      );

    // Convert database data to form format
    const formData: Step6Data = {
      kebutuhanPrioritas: '',
    };

    // If we have priority needs data, get the first one's explanation
    if (kebutuhanPrioritasData.length > 0) {
      formData.kebutuhanPrioritas = kebutuhanPrioritasData[0].penjelasan;
    }

    return {
      success: true,
      data: formData,
    };
  } catch (error) {
    console.error('Error getting priority needs data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data kebutuhan prioritas',
    };
  }
}

// Save priority needs data for the current user's school
export async function savePriorityNeedsDataAction(
  data: Step6Data,
  tahunAjaran?: string,
) {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    const currentYear = tahunAjaran || getCurrentYear();

    // Convert form data to service format
    const kebutuhanPrioritasFormData: KebutuhanPrioritasFormData = {
      kebutuhanPrioritas: data.kebutuhanPrioritas,
      tahun_ajaran: currentYear,
    };

    const result =
      await KebutuhanPrioritasService.saveKebutuhanPrioritasFromForm(
        schoolData!.id,
        kebutuhanPrioritasFormData,
      );

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Gagal menyimpan data kebutuhan prioritas',
      };
    }

    revalidatePath('/home');

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error saving priority needs data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data kebutuhan prioritas',
    };
  }
}
