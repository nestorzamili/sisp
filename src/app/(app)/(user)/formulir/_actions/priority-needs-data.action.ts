'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { KebutuhanPrioritasService } from '@/lib/services/kebutuhan-prioritas.service';
import { revalidatePath } from 'next/cache';
import type { Step6Data } from '../_schema/priority-needs.schema';
import type { KebutuhanPrioritasFormData } from '@/types/kebutuhan-prioritas';

// Get existing priority needs data for the current user's school
export async function getPriorityNeedsDataAction() {
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

    const sekolahResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!sekolahResult.success || !sekolahResult.data) {
      return {
        success: false,
        error: sekolahResult.error || 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    const kebutuhanPrioritasData =
      await KebutuhanPrioritasService.getKebutuhanPrioritasBySekolahIdAndTahunAjaran(
        sekolahResult.data.id,
        tahunAjaran,
      );

    // Convert database data to form format
    const formData: Partial<Step6Data> = {
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
export async function savePriorityNeedsDataAction(data: Step6Data) {
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

    const sekolahResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );
    if (!sekolahResult.success || !sekolahResult.data) {
      return {
        success: false,
        error: sekolahResult.error || 'Data sekolah tidak ditemukan',
      };
    }

    const currentYear = new Date().getFullYear();
    const tahunAjaran = `${currentYear}/${currentYear + 1}`;

    // Convert form data to service format
    const kebutuhanPrioritasFormData: KebutuhanPrioritasFormData = {
      kebutuhanPrioritas: data.kebutuhanPrioritas,
      tahun_ajaran: tahunAjaran,
    };

    const result =
      await KebutuhanPrioritasService.saveKebutuhanPrioritasFromForm(
        sekolahResult.data.id,
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
