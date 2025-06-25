'use client';

import React from 'react';
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
import { CheckCircle2, Users } from 'lucide-react';
import { step2Schema, Step2Data } from '../_schema/teacher-data.schema';

interface TeacherDataFormProps {
  initialData: Step2Data;
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
}

export function TeacherDataForm({
  initialData,
  onSubmit,
  onBack,
  disabled = false,
  hideCompletionStatus = false,
}: TeacherDataFormProps) {
  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: initialData,
  });

  // Check if there's existing data
  const hasExistingData = Object.values(initialData).some(
    (value) => Number(value) > 0,
  );

  // Calculate completion status
  const getCompletionStatus = () => {
    const fields = [
      'guruPnsLaki',
      'guruPnsPerempuan',
      'guruPppkLaki',
      'guruPppkPerempuan',
      'guruHonorerLaki',
      'guruHonorerPerempuan',
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

  // Reusable status section component
  const StatusSection = ({
    title,
    lakiFieldName,
    perempuanFieldName,
  }: {
    title: string;
    lakiFieldName: keyof Step2Data;
    perempuanFieldName: keyof Step2Data;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
        <Users className="w-5 h-5 text-primary" />
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
                  value={field.value || 0}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  readOnly={disabled}
                  className={disabled ? 'cursor-default' : ''}
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
                  value={field.value || 0}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  readOnly={disabled}
                  className={disabled ? 'cursor-default' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

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
      </div>

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {/* PNS */}
            <StatusSection
              title="Guru PNS"
              lakiFieldName="guruPnsLaki"
              perempuanFieldName="guruPnsPerempuan"
            />

            {/* PPPK */}
            <StatusSection
              title="Guru PPPK"
              lakiFieldName="guruPppkLaki"
              perempuanFieldName="guruPppkPerempuan"
            />

            {/* Honorer */}
            <StatusSection
              title="Guru Honorer"
              lakiFieldName="guruHonorerLaki"
              perempuanFieldName="guruHonorerPerempuan"
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="text-sm px-6 py-2"
              disabled={disabled}
            >
              Kembali
            </Button>
            <Button
              type="submit"
              className="btn-primary text-sm px-6 py-2"
              disabled={disabled}
            >
              Lanjut ke Data Siswa
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
