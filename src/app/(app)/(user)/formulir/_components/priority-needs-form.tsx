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
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
import { step6Schema, type Step6Data } from '../_schema/priority-needs.schema';

interface PriorityNeedsFormProps {
  initialData: Step6Data;
  onSubmit: (data: Step6Data) => void;
  onBack: () => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
}

export function PriorityNeedsForm({
  initialData,
  onSubmit,
  onBack,
  disabled = false,
  hideCompletionStatus = false,
}: PriorityNeedsFormProps) {
  const form = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: initialData,
  });

  // Check if there's existing data (non-empty text)
  const hasExistingData =
    !!initialData.kebutuhanPrioritas &&
    initialData.kebutuhanPrioritas.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Kebutuhan Prioritas Sekolah
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Jelaskan kebutuhan prioritas sarana dan prasarana sekolah Anda untuk
          membantu analisis dan perencanaan pembangunan yang lebih tepat sasaran
        </p>
      </div>

      {/* Existing Data Alert */}
      {hasExistingData && !hideCompletionStatus && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data kebutuhan prioritas sudah tersimpan sebelumnya. Anda dapat
            memperbarui data atau melanjutkan ke tahap berikutnya.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="kebutuhanPrioritas"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Deskripsi Kebutuhan Prioritas
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Contoh: Pembangunan 2 ruang kelas baru karena kekurangan ruang untuk menampung 180 siswa, renovasi laboratorium IPA yang atapnya bocor, pengadaan 50 set meja kursi siswa untuk mengganti yang rusak, perbaikan toilet siswa yang tidak berfungsi, dll..."
                      className={`min-h-32 resize-y ${disabled ? 'cursor-default' : ''}`}
                      readOnly={disabled}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    {field.value?.length || 0}/2000 karakter
                  </div>
                  <FormMessage />
                </FormItem>
              )}
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
              Lanjut ke Lampiran
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
