'use server';

import { auth } from '@/lib/auth';
import { FormulirService } from '@/lib/services/formulir.service';
import {
  FormulirCompleteData,
  FormulirStepStatus,
  SaveSekolahInfoInput,
  SaveGuruInput,
  SaveRombonganBelajarInput,
  SaveSaranaInput,
  SavePrasaranaInput,
  SaveKebutuhanPrioritasInput,
  SaveLampiranInput,
  FormulirServiceResponse,
} from '@/types/formulir.types';
import { headers } from 'next/headers';

/**
 * Get complete formulir data and step status in one call
 */
export async function getFormulirDataAction(): Promise<
  FormulirServiceResponse<{
    data: FormulirCompleteData | null;
    status: FormulirStepStatus;
  }>
> {
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

    // Get both complete data and step status
    const [dataResult, statusResult] = await Promise.all([
      FormulirService.getCompleteFormulirData(session.user.id),
      FormulirService.getStepStatus(session.user.id),
    ]);

    if (!statusResult.success) {
      return {
        success: false,
        error: statusResult.error,
      };
    }

    return {
      success: true,
      data: {
        data: dataResult.success ? dataResult.data || null : null,
        status: statusResult.data!,
      },
    };
  } catch (error) {
    console.error('Error getting formulir data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data formulir',
    };
  }
}

/**
 * Save school information (Step 1)
 */
export async function saveSekolahInfoAction(
  data: SaveSekolahInfoInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.saveSekolahInfo(session.user.id, data);
    return result;
  } catch (error) {
    console.error('Error saving school info:', error);
    return {
      success: false,
      error: 'Gagal menyimpan informasi sekolah',
    };
  }
}

/**
 * Save teacher data (Step 2)
 */
export async function saveGuruAction(
  data: SaveGuruInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.saveGuruData(session.user.id, data);
    return result;
  } catch (error) {
    console.error('Error saving teacher data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data guru',
    };
  }
}

/**
 * Save student data (Step 3)
 */
export async function saveRombonganBelajarAction(
  data: SaveRombonganBelajarInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.saveRombonganBelajarData(
      session.user.id,
      data,
    );
    return result;
  } catch (error) {
    console.error('Error saving student data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data siswa',
    };
  }
}

/**
 * Save facility data (Step 4)
 */
export async function saveSaranaAction(
  data: SaveSaranaInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.saveSaranaData(session.user.id, data);
    return result;
  } catch (error) {
    console.error('Error saving facility data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data sarana',
    };
  }
}

/**
 * Save infrastructure data (Step 5)
 */
export async function savePrasaranaAction(
  data: SavePrasaranaInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.savePrasaranaData(
      session.user.id,
      data,
    );
    return result;
  } catch (error) {
    console.error('Error saving infrastructure data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data prasarana',
    };
  }
}

/**
 * Save priority needs data (Step 6)
 */
export async function saveKebutuhanPrioritasAction(
  data: SaveKebutuhanPrioritasInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.saveKebutuhanPrioritasData(
      session.user.id,
      data,
    );
    return result;
  } catch (error) {
    console.error('Error saving priority needs data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data kebutuhan prioritas',
    };
  }
}

/**
 * Save attachment data (Step 7)
 */
export async function saveLampiranAction(
  data: SaveLampiranInput,
): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.saveLampiranData(
      session.user.id,
      data,
    );
    return result;
  } catch (error) {
    console.error('Error saving attachment data:', error);
    return {
      success: false,
      error: 'Gagal menyimpan data lampiran',
    };
  }
}

/**
 * Submit for review (Step 8)
 */
export async function submitForReviewAction(): Promise<FormulirServiceResponse> {
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

    const result = await FormulirService.submitForReview(session.user.id);
    return result;
  } catch (error) {
    console.error('Error submitting for review:', error);
    return {
      success: false,
      error: 'Gagal submit untuk review',
    };
  }
}

/**
 * Get step status only (for refreshing status after saves)
 */
export async function getFormulirStepStatusAction(): Promise<
  FormulirServiceResponse<FormulirStepStatus>
> {
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

    const result = await FormulirService.getStepStatus(session.user.id);
    return result;
  } catch (error) {
    console.error('Error getting step status:', error);
    return {
      success: false,
      error: 'Gagal memeriksa status kelengkapan data',
    };
  }
}
