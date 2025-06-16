import { auth } from '@/lib/auth';
import { SekolahService } from '@/lib/services/sekolah.service';
import { headers } from 'next/headers';
import type { SekolahWithDetails } from '@/types/sekolah';

export interface AuthSchoolResult {
  success: boolean;
  error?: string;
  sessionUserId?: string;
  schoolData?: SekolahWithDetails;
}

/**
 * Utility function to validate authentication and get school data
 * Used across all form actions to reduce code duplication
 */
export async function validateAuthAndSchool(): Promise<AuthSchoolResult> {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // Get school data
    const schoolResult = await SekolahService.getSekolahByUserId(
      session.user.id,
    );

    if (!schoolResult.success || !schoolResult.data) {
      return {
        success: false,
        error: schoolResult.error || 'Data sekolah tidak ditemukan',
      };
    }

    return {
      success: true,
      sessionUserId: session.user.id,
      schoolData: schoolResult.data,
    };
  } catch (error) {
    console.error('Error in validateAuthAndSchool:', error);
    return {
      success: false,
      error: 'Terjadi kesalahan pada validasi',
    };
  }
}

/**
 * Get current academic year in format YYYY/YYYY+1
 */
export function getCurrentAcademicYear(): string {
  const currentYear = new Date().getFullYear();
  return `${currentYear}/${currentYear + 1}`;
}

/**
 * Get current year as string
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}
