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
import {
  FormulirStepStatus,
  FormulirCompleteData,
  FormulirPrasarana,
} from '@/types/formulir.types';
import { Step1Data, getStep1InitialData } from './_schema/school-info.schema';
import { Step2Data, getStep2InitialData } from './_schema/teacher-data.schema';
import { Step3Data, getStep3InitialData } from './_schema/student-data.schema';
import { Step4Data, getStep4InitialData } from './_schema/facility-data.schema';
import {
  Step5Data,
  getStep5InitialData,
} from './_schema/infrastructure-data.schema';
import {
  Step6Data,
  getStep6InitialData,
} from './_schema/priority-needs.schema';
import { Step7Data, getStep7InitialData } from './_schema/attachments.schema';
import {
  getFormulirDataAction,
  saveSekolahInfoAction,
  saveGuruAction,
  saveRombonganBelajarAction,
  saveSaranaAction,
  savePrasaranaAction,
  saveKebutuhanPrioritasAction,
  saveLampiranAction,
  submitForReviewAction,
  getFormulirStepStatusAction,
} from './_actions/formulir.action';

export default function FormulirPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dataCompletionStatus, setDataCompletionStatus] =
    useState<FormulirStepStatus>({
      sekolahStatus: 'DRAFT',
      reviewNote: null,
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      step8: false,
    });
  const [completeData, setCompleteData] = useState<FormulirCompleteData | null>(
    null,
  );
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if forms should be disabled based on school status
  const isFormDisabled =
    dataCompletionStatus.sekolahStatus === 'PENDING' ||
    dataCompletionStatus.sekolahStatus === 'APPROVED';

  // Load formulir data and completion status on component mount
  useEffect(() => {
    async function loadFormulirData() {
      try {
        setIsLoading(true);
        const result = await getFormulirDataAction();

        if (result.success && result.data) {
          setCompleteData(result.data.data);
          setDataCompletionStatus(result.data.status);

          const completed = Object.entries(result.data.status)
            .filter(([key, isComplete]) => key.startsWith('step') && isComplete)
            .map(([step]) => parseInt(step.replace('step', '')));

          setCompletedSteps(completed);
        }
      } catch (error) {
        console.error('Error loading formulir data:', error);
        toast.error('Gagal memuat data formulir');
      } finally {
        setIsLoading(false);
      }
    }
    loadFormulirData();
  }, []);

  // Refresh completion status after form submissions
  const refreshCompletionStatus = async () => {
    try {
      const result = await getFormulirStepStatusAction();

      if (result.success && result.data) {
        setDataCompletionStatus(result.data);

        const completed = Object.entries(result.data)
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
      const result = await saveSekolahInfoAction({
        nama_sekolah: data.namaSekolah,
        npsn: data.npsn,
        nama_kepala_sekolah: data.namaKepalaSekolah,
        nip_kepala_sekolah: data.nipKepalaSekolah,
        alamat_sekolah: data.alamatSekolah,
        kecamatan: data.kecamatan,
      });
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
      const guruData = [
        {
          status_guru: 'PNS' as const,
          jenis_kelamin: 'L' as const,
          jumlah: data.guruPnsLaki,
        },
        {
          status_guru: 'PNS' as const,
          jenis_kelamin: 'P' as const,
          jumlah: data.guruPnsPerempuan,
        },
        {
          status_guru: 'PPPK' as const,
          jenis_kelamin: 'L' as const,
          jumlah: data.guruPppkLaki,
        },
        {
          status_guru: 'PPPK' as const,
          jenis_kelamin: 'P' as const,
          jumlah: data.guruPppkPerempuan,
        },
        {
          status_guru: 'Honorer' as const,
          jenis_kelamin: 'L' as const,
          jumlah: data.guruHonorerLaki,
        },
        {
          status_guru: 'Honorer' as const,
          jenis_kelamin: 'P' as const,
          jumlah: data.guruHonorerPerempuan,
        },
      ];

      const result = await saveGuruAction({ dataGuru: guruData });
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
      const rombonganBelajarData = [
        {
          tingkatan_kelas: '7',
          jenis_kelamin: 'L' as const,
          jumlah_siswa: data.siswaKelas7Laki,
        },
        {
          tingkatan_kelas: '7',
          jenis_kelamin: 'P' as const,
          jumlah_siswa: data.siswaKelas7Perempuan,
        },
        {
          tingkatan_kelas: '8',
          jenis_kelamin: 'L' as const,
          jumlah_siswa: data.siswaKelas8Laki,
        },
        {
          tingkatan_kelas: '8',
          jenis_kelamin: 'P' as const,
          jumlah_siswa: data.siswaKelas8Perempuan,
        },
        {
          tingkatan_kelas: '9',
          jenis_kelamin: 'L' as const,
          jumlah_siswa: data.siswaKelas9Laki,
        },
        {
          tingkatan_kelas: '9',
          jenis_kelamin: 'P' as const,
          jumlah_siswa: data.siswaKelas9Perempuan,
        },
      ];

      const result = await saveRombonganBelajarAction({
        dataRombonganBelajar: rombonganBelajarData,
      });
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
      const saranaData = [
        {
          jenis_sarana: 'RuangKelas' as const,
          nama_sarana: 'Ruang Kelas',
          jumlah_total: data.ruangKelasTotal,
          jumlah_kondisi_baik: data.ruangKelasBaik,
          jumlah_kondisi_rusak: data.ruangKelasRusak,
          keterangan: data.ruangKelasKeterangan,
        },
        {
          jenis_sarana: 'Perpustakaan' as const,
          nama_sarana: 'Perpustakaan',
          jumlah_total: data.perpustakaanTotal,
          jumlah_kondisi_baik: data.perpustakaanBaik,
          jumlah_kondisi_rusak: data.perpustakaanRusak,
          keterangan: data.perpustakaanKeterangan,
        },
        {
          jenis_sarana: 'RuangKepalaSekolah' as const,
          nama_sarana: 'Ruang Kepala Sekolah',
          jumlah_total: data.ruangKepalaSekolahTotal,
          jumlah_kondisi_baik: data.ruangKepalaSekolahBaik,
          jumlah_kondisi_rusak: data.ruangKepalaSekolahRusak,
          keterangan: data.ruangKepalaSekolahKeterangan,
        },
        {
          jenis_sarana: 'RuangGuru' as const,
          nama_sarana: 'Ruang Guru',
          jumlah_total: data.ruangGuruTotal,
          jumlah_kondisi_baik: data.ruangGuruBaik,
          jumlah_kondisi_rusak: data.ruangGuruRusak,
          keterangan: data.ruangGuruKeterangan,
        },
        {
          jenis_sarana: 'AulaPertemuan' as const,
          nama_sarana: 'Aula Pertemuan',
          jumlah_total: data.aulaPertemuanTotal,
          jumlah_kondisi_baik: data.aulaPertemuanBaik,
          jumlah_kondisi_rusak: data.aulaPertemuanRusak,
          keterangan: data.aulaPertemuanKeterangan,
        },
        {
          jenis_sarana: 'LaboratoriumIPA' as const,
          nama_sarana: 'Laboratorium IPA',
          jumlah_total: data.laboratoriumIpaTotal,
          jumlah_kondisi_baik: data.laboratoriumIpaBaik,
          jumlah_kondisi_rusak: data.laboratoriumIpaRusak,
          keterangan: data.laboratoriumIpaKeterangan,
        },
        {
          jenis_sarana: 'LaboratoriumBahasa' as const,
          nama_sarana: 'Laboratorium Bahasa',
          jumlah_total: data.laboratoriumBahasaTotal,
          jumlah_kondisi_baik: data.laboratoriumBahasaBaik,
          jumlah_kondisi_rusak: data.laboratoriumBahasaRusak,
          keterangan: data.laboratoriumBahasaKeterangan,
        },
        {
          jenis_sarana: 'LaboratoriumTIK' as const,
          nama_sarana: 'Laboratorium TIK',
          jumlah_total: data.laboratoriumTikTotal,
          jumlah_kondisi_baik: data.laboratoriumTikBaik,
          jumlah_kondisi_rusak: data.laboratoriumTikRusak,
          keterangan: data.laboratoriumTikKeterangan,
        },
      ];

      const result = await saveSaranaAction({ dataSarana: saranaData });
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
      const prasaranaData: FormulirPrasarana[] = [
        {
          jenis_prasarana: 'MejaKursiSiswa',
          nama_prasarana: 'Meja dan Kursi Siswa',
          jumlah_total: data.mejaKursiSiswaTotal,
          jumlah_kondisi_baik: data.mejaKursiSiswaBaik,
          jumlah_kondisi_rusak: data.mejaKursiSiswaRusak,
          keterangan: data.mejaKursiSiswaKeterangan,
        },
        {
          jenis_prasarana: 'Komputer',
          nama_prasarana: 'Komputer',
          jumlah_total: data.komputerTotal,
          jumlah_kondisi_baik: data.komputerBaik,
          jumlah_kondisi_rusak: data.komputerRusak,
          keterangan: data.komputerKeterangan,
        },
        {
          jenis_prasarana: 'JambanSiswa',
          nama_prasarana: 'Toilet Siswa',
          jumlah_total: data.toiletSiswaTotal,
          jumlah_kondisi_baik: data.toiletSiswaBaik,
          jumlah_kondisi_rusak: data.toiletSiswaRusak,
          keterangan: data.toiletSiswaKeterangan,
        },
        {
          jenis_prasarana: 'JambanGuru',
          nama_prasarana: 'Toilet Guru',
          jumlah_total: data.toiletGuruTotal,
          jumlah_kondisi_baik: data.toiletGuruBaik,
          jumlah_kondisi_rusak: data.toiletGuruRusak,
          keterangan: data.toiletGuruKeterangan,
        },
      ];

      // Add prasarana lainnya if exists
      if (data.prasaranaLainnya) {
        data.prasaranaLainnya.forEach((item) => {
          prasaranaData.push({
            jenis_prasarana: 'PrasaranaLainnya',
            nama_prasarana: item.nama,
            jumlah_total: item.jumlahTotal,
            jumlah_kondisi_baik: item.jumlahBaik,
            jumlah_kondisi_rusak: item.jumlahRusak,
            keterangan: item.keterangan,
          });
        });
      }

      const result = await savePrasaranaAction({
        dataPrasarana: prasaranaData,
      });
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
      const kebutuhanPrioritasData = [
        {
          jenis: 'Sarana' as const,
          penjelasan: data.kebutuhanPrioritas,
        },
      ];

      const result = await saveKebutuhanPrioritasAction({
        dataKebutuhanPrioritas: kebutuhanPrioritasData,
      });
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
      const lampiranData = data.lampiran || [];

      const result = await saveLampiranAction({ dataLampiran: lampiranData });
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
      const result = await submitForReviewAction();
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
        {isLoading ? (
          <Card className="bg-card rounded-xl shadow-sm border overflow-hidden p-6 md:p-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Memuat data formulir...</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="bg-card rounded-xl shadow-sm border overflow-hidden p-6 md:p-8">
            {' '}
            {currentStep === 1 && (
              <SchoolInfoForm
                initialData={getStep1InitialData(completeData)}
                onSubmit={onStep1Submit}
                disabled={isFormDisabled}
                hideCompletionStatus={isFormDisabled}
              />
            )}{' '}
            {currentStep === 2 && (
              <TeacherDataForm
                initialData={getStep2InitialData(completeData)}
                onSubmit={onStep2Submit}
                onBack={() => setCurrentStep(1)}
                disabled={isFormDisabled}
                hideCompletionStatus={isFormDisabled}
              />
            )}
            {currentStep === 3 && (
              <StudentDataForm
                initialData={getStep3InitialData(completeData)}
                onSubmit={onStep3Submit}
                onBack={() => setCurrentStep(2)}
                disabled={isFormDisabled}
                hideCompletionStatus={isFormDisabled}
              />
            )}{' '}
            {currentStep === 4 && (
              <FacilityDataForm
                initialData={getStep4InitialData(completeData)}
                onSubmit={onStep4Submit}
                onBack={() => setCurrentStep(3)}
                disabled={isFormDisabled}
                hideCompletionStatus={isFormDisabled}
              />
            )}
            {currentStep === 5 && (
              <InfrastructureDataForm
                initialData={getStep5InitialData(completeData)}
                onSubmit={onStep5Submit}
                onBack={() => setCurrentStep(4)}
                disabled={isFormDisabled}
                hideCompletionStatus={isFormDisabled}
              />
            )}
            {currentStep === 6 && (
              <PriorityNeedsForm
                initialData={getStep6InitialData(completeData)}
                onSubmit={onStep6Submit}
                onBack={() => setCurrentStep(5)}
                disabled={isFormDisabled}
                hideCompletionStatus={isFormDisabled}
              />
            )}{' '}
            {currentStep === 7 && (
              <AttachmentsForm
                initialData={getStep7InitialData(completeData)}
                onSubmit={onStep7Submit}
                onBack={() => setCurrentStep(6)}
                disabled={isFormDisabled}
                hideFormInfo={isFormDisabled}
              />
            )}
            {currentStep === 8 && completeData && (
              <ReviewDataForm
                initialData={completeData}
                onSubmit={onStep8Submit}
                onBack={() => setCurrentStep(7)}
                disabled={isFormDisabled}
              />
            )}
          </Card>
        )}
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
