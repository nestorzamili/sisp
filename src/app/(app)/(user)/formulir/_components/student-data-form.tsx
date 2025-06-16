import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';
import { toast } from 'sonner';
import { step3Schema, Step3Data } from '../_schema/student-data.schema';
import {
  getStudentDataAction,
  saveStudentDataAction,
} from '../_actions/student-data.action';

interface StudentDataFormProps {
  onSubmit: (data: Step3Data) => void;
  onBack: () => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
}

export function StudentDataForm({
  onSubmit,
  onBack,
  disabled = false,
  hideCompletionStatus = false,
}: StudentDataFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);
  const form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      siswaKelas7Laki: 0,
      siswaKelas7Perempuan: 0,
      siswaKelas8Laki: 0,
      siswaKelas8Perempuan: 0,
      siswaKelas9Laki: 0,
      siswaKelas9Perempuan: 0,
    },
  });

  // Load existing student data on component mount
  useEffect(() => {
    async function loadStudentData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const result = await getStudentDataAction();

        if (result.success && result.data) {
          form.reset(result.data); // Check if there's existing data (non-zero values)
          const hasData = Object.values(result.data).some((value) => value > 0);
          setHasExistingData(hasData);
        } else {
          setLoadError(result.error || 'Gagal memuat data siswa');
        }
      } catch (error) {
        console.error('Error loading student data:', error);
        setLoadError('Terjadi kesalahan saat memuat data');
      } finally {
        setIsLoading(false);
      }
    }

    loadStudentData();
  }, [form]);

  // Handle form submission
  async function handleSubmit(values: Step3Data) {
    try {
      setIsSubmitting(true);

      const result = await saveStudentDataAction(values);

      if (result.success) {
        toast.success('Data siswa berhasil disimpan');
        onSubmit(values);
      } else {
        toast.error(result.error || 'Gagal menyimpan data siswa');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Calculate completion status
  const getCompletionStatus = () => {
    const fields = [
      'siswaKelas7Laki',
      'siswaKelas7Perempuan',
      'siswaKelas8Laki',
      'siswaKelas8Perempuan',
      'siswaKelas9Laki',
      'siswaKelas9Perempuan',
    ] as const;
    const completed = fields.filter((field) =>
      Boolean(form.getValues(field) && form.getValues(field) > 0),
    ).length;
    return { completed, total: fields.length };
  };
  const completionStatus = getCompletionStatus();
  const completionPercentage = Math.round(
    (completionStatus.completed / completionStatus.total) * 100,
  );

  // Reusable class section component
  const ClassSection = ({
    title,
    lakiFieldName,
    perempuanFieldName,
  }: {
    title: string;
    lakiFieldName: keyof Step3Data;
    perempuanFieldName: keyof Step3Data;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
        <GraduationCap className="w-5 h-5 text-primary" />
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {' '}
        <FormField
          control={form.control}
          name={lakiFieldName}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Laki-laki
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  disabled={isSubmitting || disabled}
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={perempuanFieldName}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Perempuan
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  disabled={isSubmitting || disabled}
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Memuat data siswa...
          </span>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{loadError}</AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Data Peserta Didik
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Masukkan jumlah siswa berdasarkan tingkat kelas dan jenis kelamin di
          sekolah Anda
        </p>
      </div>{' '}
      {/* Progress indicator */}
      {hasExistingData && !hideCompletionStatus && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data siswa sudah tersimpan sebelumnya. Kelengkapan data:{' '}
            {completionStatus.completed}/{completionStatus.total} field (
            {completionPercentage}%)
          </AlertDescription>
        </Alert>
      )}{' '}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-5">
            {/* Kelas VII */}
            <ClassSection
              title="Kelas VII"
              lakiFieldName="siswaKelas7Laki"
              perempuanFieldName="siswaKelas7Perempuan"
            />

            {/* Kelas VIII */}
            <ClassSection
              title="Kelas VIII"
              lakiFieldName="siswaKelas8Laki"
              perempuanFieldName="siswaKelas8Perempuan"
            />

            {/* Kelas IX */}
            <ClassSection
              title="Kelas IX"
              lakiFieldName="siswaKelas9Laki"
              perempuanFieldName="siswaKelas9Perempuan"
            />
          </div>
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="text-sm px-6 py-2"
              disabled={isSubmitting}
            >
              Kembali
            </Button>
            <Button
              type="submit"
              className="btn-primary text-sm px-6 py-2"
              disabled={isSubmitting || disabled}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Lanjut ke Data Sarana'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
