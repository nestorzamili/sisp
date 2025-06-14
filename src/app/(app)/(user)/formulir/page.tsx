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
import { ConfirmationDialog } from './_components/confirmation-dialog';
import { SuccessDialog } from './_components/success-dialog';
import { toast } from 'sonner';
import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from '@/types/user-home.types';
import { Step7Data } from './_schema/attachments.schema';
import { getDataCompletionStatusAction } from './_actions/data-completion.action';
import {
  saveFacilityDataAction,
  getFacilityDataAction,
} from './_actions/facility-data.action';
import { saveInfrastructureDataAction } from './_actions/infrastructure-data.action';
import { savePriorityNeedsDataAction } from './_actions/priority-needs-data.action';
import { saveLampiranDataAction } from './_actions/lampiran-data.action';
import { updateSchoolInfoAction } from './_actions/school-info.action';
import { saveTeacherDataAction } from './_actions/teacher-data.action';
import { saveStudentDataAction } from './_actions/student-data.action';

export default function FormulirPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [step4InitialData, setStep4InitialData] =
    useState<Partial<Step4Data> | null>(null);
  const [dataCompletionStatus, setDataCompletionStatus] = useState({
    sekolahStatus: '',
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pendingSubmitData, setPendingSubmitData] = useState<Step7Data | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Check if forms should be disabled based on school status
  const isFormDisabled =
    dataCompletionStatus.sekolahStatus === 'PENDING' ||
    dataCompletionStatus.sekolahStatus === 'APPROVED';

  // Get status message based on school status
  const getStatusMessage = () => {
    switch (dataCompletionStatus.sekolahStatus) {
      case 'PENDING':
        return {
          bgColor: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
          title: 'Menunggu Verifikasi',
          message:
            'Data telah disubmit dan sedang dalam proses verifikasi oleh Dinas Pendidikan. Form tidak dapat diedit saat ini.',
        };
      case 'APPROVED':
        return {
          bgColor: 'bg-green-50 border-green-200',
          textColor: 'text-green-800',
          title: 'Data Disetujui',
          message:
            'Data Anda telah diverifikasi dan disetujui oleh Dinas Pendidikan. Form dalam mode read-only.',
        };
      default:
        return {
          bgColor: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-800',
          title: 'Informasi',
          message: 'Form tidak dapat diedit saat ini.',
        };
    }
  };

  // Load data completion status on component mount
  useEffect(() => {
    async function loadCompletionStatus() {
      try {
        const result = await getDataCompletionStatusAction();

        if (result.success && result.data) {
          const safeData = {
            sekolahStatus: result.data.sekolahStatus || '',
            step1: Boolean(result.data.step1),
            step2: Boolean(result.data.step2),
            step3: Boolean(result.data.step3),
            step4: Boolean(result.data.step4),
            step5: Boolean(result.data.step5),
            step6: Boolean(result.data.step6),
            step7: Boolean(result.data.step7),
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

  // Load facility data when step 4 is accessed
  useEffect(() => {
    async function loadFacilityData() {
      if (currentStep === 4 && !step4InitialData) {
        try {
          const result = await getFacilityDataAction();
          if (result.success && result.data) {
            setStep4InitialData(result.data);
          }
        } catch (error) {
          console.error('Error loading facility data:', error);
        }
      }
    }

    loadFacilityData();
  }, [currentStep, step4InitialData]);
  // Refresh completion status after form submissions
  const refreshCompletionStatus = async () => {
    const result = await getDataCompletionStatusAction();
    if (result.success && result.data) {
      const safeData = {
        sekolahStatus: result.data.sekolahStatus || '',
        step1: Boolean(result.data.step1),
        step2: Boolean(result.data.step2),
        step3: Boolean(result.data.step3),
        step4: Boolean(result.data.step4),
        step5: Boolean(result.data.step5),
        step6: Boolean(result.data.step6),
        step7: Boolean(result.data.step7),
      };

      setDataCompletionStatus(safeData);

      const completed = Object.entries(safeData)
        .filter(([key, isComplete]) => key.startsWith('step') && isComplete)
        .map(([step]) => parseInt(step.replace('step', '')));

      setCompletedSteps(completed);
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
  const onStep7Submit = (data: Step7Data) => {
    // Store the data and show confirmation dialog
    setPendingSubmitData(data);
    setShowConfirmationDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingSubmitData) return;

    setIsSubmitting(true);
    try {
      const result = await saveLampiranDataAction(pendingSubmitData);
      if (result.success) {
        setCompletedSteps((prev) => [...prev.filter((s) => s !== 7), 7]);
        await refreshCompletionStatus();
        setShowConfirmationDialog(false);
        setShowSuccessDialog(true);
        setPendingSubmitData(null);
      } else {
        toast.error(result.error || 'Gagal menyimpan data lampiran');
      }
    } catch (error) {
      console.error('Unexpected error saving lampiran data:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };
  return (
    <>
      {/* Main Content - Form Header */}
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-5xl">
        <FormHeader />
      </main>
      {/* Step Indicator - Full Width */}
      <div className="w-full mb-6">
        {' '}
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          dataCompletionStatus={dataCompletionStatus}
          onStepClick={handleStepClick}
        />
      </div>
      {/* Form Content - Container with max-width */}{' '}
      <div className="container mx-auto px-4 md:px-6 pb-6 max-w-5xl">
        {' '}
        {/* Show status message if form is disabled */}
        {isFormDisabled &&
          (() => {
            const statusInfo = getStatusMessage();
            return (
              <div className={`mb-4 p-4 rounded-lg ${statusInfo.bgColor}`}>
                <p className={`${statusInfo.textColor} text-sm`}>
                  <strong>{statusInfo.title}:</strong> {statusInfo.message}
                </p>
              </div>
            );
          })()}
        <Card className="p-4 md:p-6 shadow-sm border border-border/60 bg-background">
          {currentStep === 1 && (
            <SchoolInfoForm
              onSubmit={onStep1Submit}
              disabled={isFormDisabled}
            />
          )}
          {currentStep === 2 && (
            <TeacherDataForm
              onSubmit={onStep2Submit}
              onBack={() => setCurrentStep(1)}
              disabled={isFormDisabled}
            />
          )}
          {currentStep === 3 && (
            <StudentDataForm
              onSubmit={onStep3Submit}
              onBack={() => setCurrentStep(2)}
              disabled={isFormDisabled}
            />
          )}{' '}
          {currentStep === 4 && (
            <FacilityDataForm
              onSubmit={onStep4Submit}
              onBack={() => setCurrentStep(3)}
              initialData={step4InitialData || undefined}
              disabled={isFormDisabled}
            />
          )}
          {currentStep === 5 && (
            <InfrastructureDataForm
              onSubmit={onStep5Submit}
              onBack={() => setCurrentStep(4)}
              disabled={isFormDisabled}
            />
          )}
          {currentStep === 6 && (
            <PriorityNeedsForm
              onSubmit={onStep6Submit}
              onBack={() => setCurrentStep(5)}
              disabled={isFormDisabled}
            />
          )}{' '}
          {currentStep === 7 && (
            <AttachmentsForm
              onSubmit={onStep7Submit}
              onBack={() => setCurrentStep(6)}
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
    </>
  );
}
