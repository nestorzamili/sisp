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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  step1Schema,
  Step1Data,
  ExistingSchoolData,
} from '../_schema/school-info.schema';
import {
  getSchoolInfoAction,
  updateSchoolInfoAction,
} from '../_actions/school-info.action';
import { KECAMATAN_LIST } from '@/constants/kecamatan';

interface SchoolInfoFormProps {
  onSubmit: (data: Step1Data) => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
}

export function SchoolInfoForm({
  onSubmit,
  disabled = false,
  hideCompletionStatus = false,
}: SchoolInfoFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [existingData, setExistingData] = useState<ExistingSchoolData | null>(
    null,
  );

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      namaSekolah: '',
      npsn: '',
      namaKepalaSekolah: '',
      nipKepalaSekolah: '',
      alamatSekolah: '',
      kecamatan: '',
    },
  });

  // Load existing school data on component mount
  useEffect(() => {
    async function loadSchoolData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const result = await getSchoolInfoAction();

        if (result.success && result.data) {
          setExistingData(result.data);

          // Pre-populate form with existing data
          form.reset({
            namaSekolah: result.data.namaSekolah || '',
            npsn: result.data.npsn || '',
            namaKepalaSekolah: result.data.namaKepalaSekolah || '',
            nipKepalaSekolah: result.data.nipKepalaSekolah || '',
            alamatSekolah: result.data.alamatSekolah || '',
            kecamatan: result.data.kecamatan || '',
          });
        } else {
          setLoadError(result.error || 'Gagal memuat data sekolah');
        }
      } catch (error) {
        console.error('Error loading school data:', error);
        setLoadError('Terjadi kesalahan saat memuat data');
      } finally {
        setIsLoading(false);
      }
    }

    loadSchoolData();
  }, [form]);

  // Handle form submission
  async function handleSubmit(values: Step1Data) {
    try {
      setIsSubmitting(true);

      const result = await updateSchoolInfoAction(values);

      if (result.success) {
        toast.success('Informasi sekolah berhasil diperbarui');
        onSubmit(values);
      } else {
        toast.error(result.error || 'Gagal menyimpan informasi sekolah');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Check if field has existing data
  const hasExistingData = (fieldName: keyof ExistingSchoolData): boolean => {
    return existingData ? Boolean(existingData[fieldName]?.trim()) : false;
  };

  // Get completion status
  const getCompletionStatus = () => {
    if (!existingData) return { completed: 0, total: 6 };

    const fields: (keyof ExistingSchoolData)[] = [
      'namaSekolah',
      'npsn',
      'namaKepalaSekolah',
      'nipKepalaSekolah',
      'alamatSekolah',
      'kecamatan',
    ];

    const completed = fields.filter((field) => hasExistingData(field)).length;
    return { completed, total: fields.length };
  };

  const completionStatus = getCompletionStatus();
  const completionPercentage = Math.round(
    (completionStatus.completed / completionStatus.total) * 100,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm text-muted-foreground">
            Memuat data sekolah...
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
      {/* Completion Status */}
      {existingData && !hideCompletionStatus && (
        <div
          className={`rounded-lg border p-4 ${
            completionPercentage === 100
              ? 'border-green-200 bg-green-50'
              : 'border-yellow-200 bg-yellow-50'
          }`}
        >
          <div className="flex items-start gap-3">
            {completionPercentage === 100 ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            )}
            <div
              className={`text-sm leading-relaxed ${
                completionPercentage === 100
                  ? 'text-green-800'
                  : 'text-yellow-800'
              }`}
            >
              {completionPercentage === 100
                ? 'Informasi sekolah sudah lengkap! Anda dapat melanjutkan ke tahap selanjutnya.'
                : `Informasi sekolah ${completionPercentage}% lengkap (${completionStatus.completed}/${completionStatus.total} field). Silakan lengkapi data yang masih kosong.`}
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="namaSekolah"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center space-x-2">
                    <span>Nama Sekolah</span>
                    {hasExistingData('namaSekolah') && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama sekolah"
                      {...field}
                      disabled={isSubmitting || disabled}
                      className={
                        hasExistingData('namaSekolah') ? 'border-green-200' : ''
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="npsn"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center space-x-2">
                    <span>NPSN</span>
                    {hasExistingData('npsn') && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="8 digit NPSN"
                      maxLength={8}
                      {...field}
                      disabled={isSubmitting || disabled}
                      className={
                        hasExistingData('npsn') ? 'border-green-200' : ''
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="namaKepalaSekolah"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center space-x-2">
                    <span>Nama Kepala Sekolah</span>
                    {hasExistingData('namaKepalaSekolah') && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama kepala sekolah"
                      {...field}
                      disabled={isSubmitting || disabled}
                      className={
                        hasExistingData('namaKepalaSekolah')
                          ? 'border-green-200'
                          : ''
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nipKepalaSekolah"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center space-x-2">
                    <span>NIP Kepala Sekolah</span>
                    {hasExistingData('nipKepalaSekolah') && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="18 digit NIP"
                      maxLength={18}
                      {...field}
                      disabled={isSubmitting || disabled}
                      className={
                        hasExistingData('nipKepalaSekolah')
                          ? 'border-green-200'
                          : ''
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kecamatan"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center space-x-2">
                    <span>Kecamatan</span>
                    {hasExistingData('kecamatan') && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting || disabled}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={
                          hasExistingData('kecamatan') ? 'border-green-200' : ''
                        }
                      >
                        <SelectValue placeholder="Pilih kecamatan" />
                      </SelectTrigger>
                    </FormControl>{' '}
                    <SelectContent>
                      {KECAMATAN_LIST.map((kecamatan) => (
                        <SelectItem key={kecamatan} value={kecamatan}>
                          {kecamatan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="alamatSekolah"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center space-x-2">
                  <span>Alamat Sekolah</span>
                  {hasExistingData('alamatSekolah') && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan alamat lengkap sekolah"
                    {...field}
                    disabled={isSubmitting || disabled}
                    className={`min-h-[100px] ${
                      hasExistingData('alamatSekolah') ? 'border-green-200' : ''
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
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
                <>
                  Lanjut ke Data Guru
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
