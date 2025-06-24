'use server';

import { validateAuthAndSchool } from '../_utils/auth-school.util';
import { getSchoolInfoAction } from './school-info.action';
import { getTeacherDataAction } from './teacher-data.action';
import { getStudentDataAction } from './student-data.action';
import { getFacilityDataAction } from './facility-data.action';
import { getInfrastructureDataAction } from './infrastructure-data.action';
import { getPriorityNeedsDataAction } from './priority-needs-data.action';
import { getLampiranDataAction } from './lampiran-data.action';
import { ReviewService } from '@/lib/services/review.service';
import { Step1Data } from '../_schema/school-info.schema';
import { Step2Data } from '../_schema/teacher-data.schema';
import { Step3Data } from '../_schema/student-data.schema';
import { Step4Data } from '../_schema/facility-data.schema';
import { Step5Data } from '../_schema/infrastructure-data.schema';
import { Step6Data } from '../_schema/priority-needs.schema';

export interface ReviewData {
  schoolInfo: Step1Data | null;
  teacherData: Step2Data | null;
  studentData: Step3Data | null;
  facilityData: Partial<Step4Data> | null;
  infrastructureData: Partial<Step5Data> | null;
  priorityNeedsData: Step6Data | null;
  attachmentsData: Array<{
    id: string;
    nama_dokumen: string;
    url: string;
    keterangan: string;
  }> | null;
}

export async function getReviewDataAction() {
  try {
    const { success, error } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    // Get all form data in parallel
    const [
      schoolInfo,
      teacherData,
      studentData,
      facilityData,
      infrastructureData,
      priorityNeedsData,
      attachmentsData,
    ] = await Promise.all([
      getSchoolInfoAction(),
      getTeacherDataAction(),
      getStudentDataAction(),
      getFacilityDataAction(),
      getInfrastructureDataAction(),
      getPriorityNeedsDataAction(),
      getLampiranDataAction(),
    ]);
    const reviewData: ReviewData = {
      schoolInfo: schoolInfo.success ? (schoolInfo.data ?? null) : null,
      teacherData: teacherData.success ? (teacherData.data ?? null) : null,
      studentData: studentData.success ? (studentData.data ?? null) : null,
      facilityData: facilityData.success ? (facilityData.data ?? null) : null,
      infrastructureData: infrastructureData.success
        ? (infrastructureData.data ?? null)
        : null,
      priorityNeedsData: priorityNeedsData.success
        ? (priorityNeedsData.data ?? null)
        : null,
      attachmentsData: attachmentsData.success
        ? (attachmentsData.data ?? null)
        : null,
    };

    return {
      success: true,
      data: reviewData,
    };
  } catch (error) {
    console.error('Error getting review data:', error);
    return {
      success: false,
      error: 'Gagal mengambil data untuk review',
    };
  }
}

export async function submitAllDataAction() {
  try {
    const { success, error, schoolData } = await validateAuthAndSchool();

    if (!success) {
      return { success: false, error };
    }

    // Submit school data for review
    const submitResult = await ReviewService.submitForReview(schoolData!.id);

    if (!submitResult.success) {
      return {
        success: false,
        error: submitResult.error || 'Gagal submit data untuk review',
      };
    }

    return {
      success: true,
      message: 'Data berhasil disubmit untuk review',
    };
  } catch (error) {
    console.error('Error submitting all data:', error);
    return {
      success: false,
      error: 'Gagal submit data',
    };
  }
}
