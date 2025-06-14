'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from './_components/header';
import { FormHeader } from './_components/form-header';
import { StepIndicator } from './_components/step-indicator';
import { SchoolInfoForm } from './_components/school-info-form';
import { TeacherDataForm } from './_components/teacher-data-form';
import { StudentDataForm } from './_components/student-data-form';
import { FacilityDataForm } from './_components/facility-data-form';
import { InfrastructureDataForm } from './_components/infrastructure-data-form';
import { PriorityNeedsForm } from './_components/priority-needs-form';
import { AttachmentsForm } from './_components/attachments-form';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  Step7Data,
} from '@/types/user-home.types';
import { getDataCompletionStatusAction } from './_actions/data-completion.action';
import {
  saveFacilityDataAction,
  getFacilityDataAction,
} from './_actions/facility-data.action';
import { saveInfrastructureDataAction } from './_actions/infrastructure-data.action';

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [step3Data, setStep3Data] = useState<Step3Data | null>(null);
  const [step4Data, setStep4Data] = useState<Step4Data | null>(null);
  const [step4InitialData, setStep4InitialData] =
    useState<Partial<Step4Data> | null>(null);
  const [step5Data, setStep5Data] = useState<Step5Data | null>(null);
  const [step6Data, setStep6Data] = useState<Step6Data | null>(null);
  const [dataCompletionStatus, setDataCompletionStatus] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
  });

  // Load data completion status on component mount
  useEffect(() => {
    async function loadCompletionStatus() {
      try {
        const result = await getDataCompletionStatusAction();

        if (result.success && result.data) {
          const safeData = {
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
            .filter(([, isComplete]) => isComplete)
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
        .filter(([, isComplete]) => isComplete)
        .map(([step]) => parseInt(step.replace('step', '')));

      setCompletedSteps(completed);
    }
  };

  const onStep1Submit = async (data: Step1Data) => {
    setStep1Data(data);
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 1), 1]);
    await refreshCompletionStatus();
    setCurrentStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    setStep2Data(data);
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 2), 2]);
    await refreshCompletionStatus();
    setCurrentStep(3);
  };

  const onStep3Submit = async (data: Step3Data) => {
    setStep3Data(data);
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 3), 3]);
    await refreshCompletionStatus();
    setCurrentStep(4);
  };
  const onStep4Submit = async (data: Step4Data) => {
    try {
      const result = await saveFacilityDataAction(data);
      if (result.success) {
        setStep4Data(data);
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
        setStep5Data(data);
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
    setStep6Data(data);
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 6), 6]);
    await refreshCompletionStatus();
    setCurrentStep(7);
  };

  const onStep7Submit = async (data: Step7Data) => {
    setCompletedSteps((prev) => [...prev.filter((s) => s !== 7), 7]);
    await refreshCompletionStatus();
    console.log('All Form Data:');
    console.log('Step 1 Data:', step1Data);
    console.log('Step 2 Data:', step2Data);
    console.log('Step 3 Data:', step3Data);
    console.log('Step 4 Data:', step4Data);
    console.log('Step 5 Data:', step5Data);
    console.log('Step 6 Data:', step6Data);
    console.log('Step 7 Data:', data);
    // TODO: Submit to backend
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="min-h-screen bg-muted">
      <DashboardHeader />

      {/* Main Content - Form Header */}
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-5xl">
        <FormHeader />
      </main>

      {/* Step Indicator - Full Width */}
      <div className="w-full mb-6">
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          dataCompletionStatus={dataCompletionStatus}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Form Content - Container with max-width */}
      <div className="container mx-auto px-4 md:px-6 pb-6 max-w-5xl">
        <Card className="p-4 md:p-6 shadow-sm border border-border/60 bg-background">
          {currentStep === 1 && <SchoolInfoForm onSubmit={onStep1Submit} />}
          {currentStep === 2 && (
            <TeacherDataForm
              onSubmit={onStep2Submit}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <StudentDataForm
              onSubmit={onStep3Submit}
              onBack={() => setCurrentStep(2)}
            />
          )}{' '}
          {currentStep === 4 && (
            <FacilityDataForm
              onSubmit={onStep4Submit}
              onBack={() => setCurrentStep(3)}
              initialData={step4InitialData || undefined}
            />
          )}
          {currentStep === 5 && (
            <InfrastructureDataForm
              onSubmit={onStep5Submit}
              onBack={() => setCurrentStep(4)}
            />
          )}
          {currentStep === 6 && (
            <PriorityNeedsForm
              onSubmit={onStep6Submit}
              onBack={() => setCurrentStep(5)}
            />
          )}
          {currentStep === 7 && (
            <AttachmentsForm
              onSubmit={onStep7Submit}
              onBack={() => setCurrentStep(6)}
            />
          )}
          {/* Success Page */}
          {completedSteps.includes(7) && currentStep > 7 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Data Berhasil Disimpan!
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Terima kasih telah melengkapi seluruh data sarana dan prasarana
                sekolah beserta lampiran pendukung. Data Anda akan diverifikasi
                dan dianalisis untuk menentukan prioritas kebutuhan pembangunan
                fasilitas pendidikan.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(1);
                    setCompletedSteps([]);
                    setStep1Data(null);
                    setStep2Data(null);
                    setStep3Data(null);
                    setStep4Data(null);
                    setStep5Data(null);
                    setStep6Data(null);
                  }}
                >
                  Input Data Baru
                </Button>
                <Button onClick={() => window.print()}>Cetak Ringkasan</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
