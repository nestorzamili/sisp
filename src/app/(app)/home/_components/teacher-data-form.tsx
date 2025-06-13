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
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { step2Schema, Step2Data } from '../_schema/teacher-data.schema';
import {
  getTeacherDataAction,
  saveTeacherDataAction,
} from '../_actions/teacher-data.action';

interface TeacherDataFormProps {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
}

export function TeacherDataForm({ onSubmit, onBack }: TeacherDataFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);

  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      guruPnsLaki: '0',
      guruPnsPerempuan: '0',
      guruPpppLaki: '0',
      guruPpppPerempuan: '0',
      guruGttLaki: '0',
      guruGttPerempuan: '0',
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
          form.reset(result.data);

          // Check if there's existing data (non-zero values)
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

  // Calculate totals
  const totalPNS =
    (Number(form.watch('guruPnsLaki')) || 0) +
    (Number(form.watch('guruPnsPerempuan')) || 0);
  const totalPPPK =
    (Number(form.watch('guruPpppLaki')) || 0) +
    (Number(form.watch('guruPpppPerempuan')) || 0);
  const totalGTT =
    (Number(form.watch('guruGttLaki')) || 0) +
    (Number(form.watch('guruGttPerempuan')) || 0);
  const grandTotal = totalPNS + totalPPPK + totalGTT;

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
      {/* Status indicator */}
      {hasExistingData && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data guru sudah tersimpan sebelumnya. Anda dapat memperbarui data
            atau melanjutkan ke tahap selanjutnya.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-6">
            {/* Guru PNS */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Guru PNS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="guruPnsLaki"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Laki-laki
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guruPnsPerempuan"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Perempuan
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Total</FormLabel>
                  <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                    <span className="text-base font-semibold">{totalPNS}</span>
                  </div>
                </FormItem>
              </div>
            </div>

            {/* Guru PPPK */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Guru PPPK
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="guruPpppLaki"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Laki-laki
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guruPpppPerempuan"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Perempuan
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Total</FormLabel>
                  <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                    <span className="text-base font-semibold">{totalPPPK}</span>
                  </div>
                </FormItem>
              </div>
            </div>

            {/* Guru GTT/Honorer */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Guru GTT/Honorer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="guruGttLaki"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Laki-laki
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guruGttPerempuan"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Perempuan
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Total</FormLabel>
                  <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                    <span className="text-base font-semibold">{totalGTT}</span>
                  </div>
                </FormItem>
              </div>
            </div>

            {/* Grand Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">
                  Total Keseluruhan Guru
                </h3>
                <div className="text-2xl font-bold text-primary">
                  {grandTotal} Orang
                </div>
              </div>
            </div>
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
              disabled={isSubmitting}
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
