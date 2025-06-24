'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { FormHeader } from './_components/form-header';
import { StepIndicator } from './_components/step-indicator';
import { SchoolInfoForm } from './_components/school-info-form';
import { TeacherDataForm } from './_components/teacher-data-form';
import { StudentDataForm } from './_components/student-data-form';
import { FacilityDataForm } from './_components/facility-data-form';
import { InfrastructureDataForm } from './_components/infrastructure-data-form';
import { PriorityNeedsForm } from './_components/priority-needs-form';
import { AttachmentsForm } from './_components/attachments-form';
import { ReviewDataForm } from './_components/review-data-form';
import { StatusMessage } from './_components/status-message';
import { ConfirmationDialog } from './_components/confirmation-dialog';
import { SuccessDialog } from './_components/success-dialog';
import { toast } from 'sonner';
import { Step1Data } from '@/types/user-home.types';
import { Step2Data } from './_schema/teacher-data.schema';
import { Step3Data } from './_schema/student-data.schema';
import { Step4Data } from './_schema/facility-data.schema';
import { Step5Data } from './_schema/infrastructure-data.schema';
import { Step6Data } from './_schema/priority-needs.schema';
import { Step7Data } from './_schema/attachments.schema';
import { getDataCompletionStatusAction } from './_actions/data-completion.action';
import { saveFacilityDataAction } from './_actions/facility-data.action';
import { saveInfrastructureDataAction } from './_actions/infrastructure-data.action';
import { savePriorityNeedsDataAction } from './_actions/priority-needs-data.action';
import { saveLampiranDataAction } from './_actions/lampiran-data.action';
import { updateSchoolInfoAction } from './_actions/school-info.action';
import { saveTeacherDataAction } from './_actions/teacher-data.action';
import { saveStudentDataAction } from './_actions/student-data.action';

export default function FormulirPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dataCompletionStatus, setDataCompletionStatus] = useState({
    sekolahStatus: '',
    reviewNote: null as string | null,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if forms should be disabled based on school status
  const isFormDisabled =
    dataCompletionStatus.sekolahStatus === 'PENDING' ||
    dataCompletionStatus.sekolahStatus === 'APPROVED';

  // Load data completion status on component mount
  useEffect(() => {
    async function loadCompletionStatus() {
      try {
        const result = await getDataCompletionStatusAction();

        if (result.success && result.data) {
          const safeData = {
            sekolahStatus: result.data.sekolahStatus || '',
            reviewNote:
              (result.data as { reviewNote?: string | null })?.reviewNote ||
              null,
            step1: Boolean(result.data.step1),
            step2: Boolean(result.data.step2),
            step3: Boolean(result.data.step3),
            step4: Boolean(result.data.step4),
            step5: Boolean(result.data.step5),
            step6: Boolean(result.data.step6),
            step7: Boolean(result.data.step7),
            step8: Boolean(result.data.step8),
          };

          setDataCompletionStatus(safeData);

          const completed = Object.entries(safeData)
            .filter(([key, isComplete]) => key.startsWith('step') && isComplete)
            .map(([step]) => parseInt(step.replace('step', '')));

          setCompletedSteps(completed);
        }
      } catch (error) {
        console.error('Error loading completion status:', error);
      }
    }
    loadCompletionStatus();
  }, []);
  // Refresh completion status after form submissions
  const refreshCompletionStatus = async () => {
    try {
      console.log('Refreshing completion status...');
      const result = await getDataCompletionStatusAction();

      if (result.success && result.data) {
        console.log('New status from server:', result.data.sekolahStatus);

        const safeData = {
          sekolahStatus: result.data.sekolahStatus || '',
          reviewNote:
            (result.data as { reviewNote?: string | null })?.reviewNote || null,
          step1: Boolean(result.data.step1),
          step2: Boolean(result.data.step2),
          step3: Boolean(result.data.step3),
          step4: Boolean(result.data.step4),
          step5: Boolean(result.data.step5),
          step6: Boolean(result.data.step6),
          step7: Boolean(result.data.step7),
          step8: Boolean(result.data.step8),
        };

        setDataCompletionStatus(safeData);
        console.log('Updated dataCompletionStatus:', safeData);

        const completed = Object.entries(safeData)
          .filter(([key, isComplete]) => key.startsWith('step') && isComplete)
          .map(([step]) => parseInt(step.replace('step', '')));

        setCompletedSteps(completed);
      }
    } catch (error) {
      console.error('Error refreshing completion status:', error);
    }
  };
  const onStep1Submit = async (data: Step1Data) => {
    try {
      const result = await updateSchoolInfoAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 1), 1]);
        await refreshCompletionStatus();
        toast.success('Informasi sekolah berhasil disimpan');
        setCurrentStep(2);
      } else {
        toast.error(result.error || 'Gagal menyimpan informasi sekolah');
      }
    } catch (error) {
      console.error('Unexpected error saving school info:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };

  const onStep2Submit = async (data: Step2Data) => {
    try {
      const result = await saveTeacherDataAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 2), 2]);
        await refreshCompletionStatus();
        toast.success('Data guru berhasil disimpan');
        setCurrentStep(3);
      } else {
        toast.error(result.error || 'Gagal menyimpan data guru');
      }
    } catch (error) {
      console.error('Unexpected error saving teacher data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };

  const onStep3Submit = async (data: Step3Data) => {
    try {
      const result = await saveStudentDataAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 3), 3]);
        await refreshCompletionStatus();
        toast.success('Data siswa berhasil disimpan');
        setCurrentStep(4);
      } else {
        toast.error(result.error || 'Gagal menyimpan data siswa');
      }
    } catch (error) {
      console.error('Unexpected error saving student data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };
  const onStep4Submit = async (data: Step4Data) => {
    try {
      const result = await saveFacilityDataAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 4), 4]);
        await refreshCompletionStatus();
        toast.success('Data sarana berhasil disimpan');
        setCurrentStep(5);
      } else {
        toast.error(result.error || 'Gagal menyimpan data sarana');
      }
    } catch (error) {
      console.error('Unexpected error saving facility data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };
  const onStep5Submit = async (data: Step5Data) => {
    try {
      const result = await saveInfrastructureDataAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 5), 5]);
        await refreshCompletionStatus();
        toast.success('Data prasarana berhasil disimpan');
        setCurrentStep(6);
      } else {
        toast.error(result.error || 'Gagal menyimpan data prasarana');
      }
    } catch (error) {
      console.error('Unexpected error saving infrastructure data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };
  const onStep6Submit = async (data: Step6Data) => {
    try {
      const result = await savePriorityNeedsDataAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 6), 6]);
        await refreshCompletionStatus();
        toast.success('Data kebutuhan prioritas berhasil disimpan');
        setCurrentStep(7);
      } else {
        toast.error(result.error || 'Gagal menyimpan data kebutuhan prioritas');
      }
    } catch (error) {
      console.error('Unexpected error saving priority needs data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };
  const onStep7Submit = async (data: Step7Data) => {
    try {
      const result = await saveLampiranDataAction(data);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 7), 7]);
        await refreshCompletionStatus();
        toast.success('Data lampiran berhasil disimpan');
        setCurrentStep(8);
      } else {
        toast.error(result.error || 'Gagal menyimpan data lampiran');
      }
    } catch (error) {
      console.error('Unexpected error saving lampiran data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };
  const onStep8Submit = () => {
    // Step 8 is review and final submit
    setShowConfirmationDialog(true);
  };
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Import the submit action
      const { submitAllDataAction } = await import(
        './_actions/review-data.action'
      );
      const result = await submitAllDataAction();
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 8), 8]);

        // Force refresh completion status to get updated status
        await refreshCompletionStatus();

        setShowConfirmationDialog(false);
        setShowSuccessDialog(true);
      } else {
        toast.error(result.error || 'Gagal submit data');
      }
    } catch (error) {
      console.error('Unexpected error submitting data:', error);
      toast.error('Terjadi kesalahan saat submit data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };
  return (
    <div className="min-h-[calc(100vh-180px)] bg-background">
      {' '}
      {/* Header Section */}
      <div className="bg-header-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FormHeader />
        </div>
      </div>{' '}
      {/* Step Indicator */}
      <div>
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          dataCompletionStatus={dataCompletionStatus}
          onStepClick={handleStepClick}
        />
      </div>
      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {' '}
        {/* Show status message */}
        <StatusMessage
          sekolahStatus={dataCompletionStatus.sekolahStatus}
          reviewNote={dataCompletionStatus.reviewNote}
        />
        <Card className="bg-card rounded-xl shadow-sm border overflow-hidden p-6 md:p-8">
          {' '}
          {currentStep === 1 && (
            <SchoolInfoForm
              onSubmit={onStep1Submit}
              disabled={isFormDisabled}
              hideCompletionStatus={isFormDisabled}
            />
          )}{' '}
          {currentStep === 2 && (
            <TeacherDataForm
              onSubmit={onStep2Submit}
              onBack={() => setCurrentStep(1)}
              disabled={isFormDisabled}
              hideCompletionStatus={isFormDisabled}
            />
          )}
          {currentStep === 3 && (
            <StudentDataForm
              onSubmit={onStep3Submit}
              onBack={() => setCurrentStep(2)}
              disabled={isFormDisabled}
              hideCompletionStatus={isFormDisabled}
            />
          )}{' '}
          {currentStep === 4 && (
            <FacilityDataForm
              onSubmit={onStep4Submit}
              onBack={() => setCurrentStep(3)}
              disabled={isFormDisabled}
              hideCompletionStatus={isFormDisabled}
            />
          )}
          {currentStep === 5 && (
            <InfrastructureDataForm
              onSubmit={onStep5Submit}
              onBack={() => setCurrentStep(4)}
              disabled={isFormDisabled}
              hideCompletionStatus={isFormDisabled}
            />
          )}
          {currentStep === 6 && (
            <PriorityNeedsForm
              onSubmit={onStep6Submit}
              onBack={() => setCurrentStep(5)}
              disabled={isFormDisabled}
              hideCompletionStatus={isFormDisabled}
            />
          )}{' '}
          {currentStep === 7 && (
            <AttachmentsForm
              onSubmit={onStep7Submit}
              onBack={() => setCurrentStep(6)}
              disabled={isFormDisabled}
              hideFormInfo={isFormDisabled}
            />
          )}
          {currentStep === 8 && (
            <ReviewDataForm
              onSubmit={onStep8Submit}
              onBack={() => setCurrentStep(7)}
              disabled={isFormDisabled}
            />
          )}
        </Card>
      </div>
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
        onConfirm={handleConfirmSubmit}
        isLoading={isSubmitting}
      />{' '}
      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
}
