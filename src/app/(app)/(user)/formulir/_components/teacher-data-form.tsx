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

import { Loader2, CheckCircle2, AlertCircle, Users, User } from 'lucide-react';
import { toast } from 'sonner';
import { step2Schema, Step2Data } from '../_schema/teacher-data.schema';
import {
  getTeacherDataAction,
  saveTeacherDataAction,
} from '../_actions/teacher-data.action';

interface TeacherDataFormProps {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
}

export function TeacherDataForm({
  onSubmit,
  onBack,
  disabled = false,
  hideCompletionStatus = false,
}: TeacherDataFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);
  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      guruPnsLaki: 0,
      guruPnsPerempuan: 0,
      guruPpppLaki: 0,
      guruPpppPerempuan: 0,
      guruGttLaki: 0,
      guruGttPerempuan: 0,
    },
  });

  // Load existing teacher data on component mount
  useEffect(() => {
    async function loadTeacherData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const result = await getTeacherDataAction();

        if (result.success && result.data) {
          form.reset(result.data); // Check if there's existing data (non-zero values)
          const hasData = Object.values(result.data).some(
            (value) => Number(value) > 0,
          );
          setHasExistingData(hasData);
        } else {
          setLoadError(result.error || 'Gagal memuat data guru');
        }
      } catch (error) {
        console.error('Error loading teacher data:', error);
        setLoadError('Terjadi kesalahan saat memuat data');
      } finally {
        setIsLoading(false);
      }
    }

    loadTeacherData();
  }, [form]);

  // Handle form submission
  async function handleSubmit(values: Step2Data) {
    try {
      setIsSubmitting(true);

      const result = await saveTeacherDataAction(values);

      if (result.success) {
        toast.success('Data guru berhasil disimpan');
        onSubmit(values);
      } else {
        toast.error(result.error || 'Gagal menyimpan data guru');
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
      'guruPnsLaki',
      'guruPnsPerempuan',
      'guruPpppLaki',
      'guruPpppPerempuan',
      'guruGttLaki',
      'guruGttPerempuan',
    ] as const;
    const completed = fields.filter((field) =>
      Boolean(form.getValues(field) && Number(form.getValues(field)) > 0),
    ).length;
    return { completed, total: fields.length };
  };
  const completionStatus = getCompletionStatus();
  const completionPercentage = Math.round(
    (completionStatus.completed / completionStatus.total) * 100,
  );

  // Reusable teacher category component
  const TeacherCategorySection = ({
    title,
    lakiFieldName,
    perempuanFieldName,
    icon: Icon,
  }: {
    title: string;
    lakiFieldName: keyof Step2Data;
    perempuanFieldName: keyof Step2Data;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
        <Icon className="w-5 h-5 text-primary" />
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {...field}
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
                  {...field}
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
            Memuat data guru...
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
          Data Tenaga Pendidik
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Masukkan jumlah guru berdasarkan status kepegawaian dan jenis kelamin
          di sekolah Anda
        </p>
      </div>{' '}
      {/* Progress indicator */}
      {hasExistingData && !hideCompletionStatus && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data guru sudah tersimpan sebelumnya. Kelengkapan data:{' '}
            {completionStatus.completed}/{completionStatus.total} field (
            {completionPercentage}%)
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {' '}
          <div className="space-y-5">
            {/* Guru PNS */}
            <TeacherCategorySection
              title="Guru PNS"
              lakiFieldName="guruPnsLaki"
              perempuanFieldName="guruPnsPerempuan"
              icon={Users}
            />

            {/* Guru PPPK */}
            <TeacherCategorySection
              title="Guru PPPK"
              lakiFieldName="guruPpppLaki"
              perempuanFieldName="guruPpppPerempuan"
              icon={Users}
            />

            {/* Guru GTT/Honorer */}
            <TeacherCategorySection
              title="Guru GTT/Honorer"
              lakiFieldName="guruGttLaki"
              perempuanFieldName="guruGttPerempuan"
              icon={User}
            />
          </div>
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="text-sm px-6 py-2"
              disabled={isSubmitting || disabled}
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
                'Lanjut ke Data Siswa'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
