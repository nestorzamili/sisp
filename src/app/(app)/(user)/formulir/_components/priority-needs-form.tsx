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
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { step6Schema, Step6Data } from '../_schema/priority-needs.schema';
import { getPriorityNeedsDataAction } from '../_actions/priority-needs-data.action';

interface PriorityNeedsFormProps {
  onSubmit: (data: Step6Data) => void;
  onBack: () => void;
  disabled?: boolean;
}

export function PriorityNeedsForm({
  onSubmit,
  onBack,
  disabled = false,
}: PriorityNeedsFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);

  const form = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: {
      kebutuhanPrioritas: '',
    },
  });

  // Load existing priority needs data on component mount
  useEffect(() => {
    async function loadPriorityNeedsData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const result = await getPriorityNeedsDataAction();

        if (result.success && result.data) {
          form.reset(result.data);

          // Check if there's existing data (non-empty text)
          const hasData =
            !!result.data.kebutuhanPrioritas &&
            result.data.kebutuhanPrioritas.trim().length > 0;
          setHasExistingData(hasData);
        } else {
          setLoadError(result.error || 'Gagal memuat data kebutuhan prioritas');
        }
      } catch (error) {
        console.error('Error loading priority needs data:', error);
        setLoadError('Terjadi kesalahan saat memuat data');
      } finally {
        setIsLoading(false);
      }
    }

    loadPriorityNeedsData();
  }, [form]); // Handle form submission
  async function handleSubmit(values: Step6Data) {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Memuat data kebutuhan prioritas...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
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
          Kebutuhan Prioritas Sekolah
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Jelaskan kebutuhan prioritas sarana dan prasarana sekolah Anda untuk
          membantu analisis dan perencanaan pembangunan yang lebih tepat sasaran
        </p>
      </div>

      {/* Existing Data Alert */}
      {hasExistingData && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data kebutuhan prioritas sudah tersimpan sebelumnya. Anda dapat
            memperbarui data atau melanjutkan ke tahap berikutnya.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                      className="min-h-32 resize-y"
                      disabled={isSubmitting || disabled}
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
                'Lanjut ke Lampiran'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
