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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Building2,
  FlaskConical,
  BookOpen,
  Languages,
  Laptop,
  Users,
  User,
  Building,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import {
  step4Schema,
  Step4Data,
  kondisiOptions,
} from '../_schema/facility-data.schema';

interface FacilityDataFormProps {
  onSubmit: (data: Step4Data) => void;
  onBack: () => void;
  initialData?: Partial<Step4Data>;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
}

export function FacilityDataForm({
  onSubmit,
  onBack,
  initialData,
  disabled = false,
  hideCompletionStatus = false,
}: FacilityDataFormProps) {
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      ruangKelasTotal: initialData?.ruangKelasTotal || '0',
      ruangKelasBaik: initialData?.ruangKelasBaik || '0',
      ruangKelasRusak: initialData?.ruangKelasRusak || '0',
      perpustakaanTotal: initialData?.perpustakaanTotal || '0',
      perpustakaanBaik: initialData?.perpustakaanBaik || '0',
      perpustakaanRusak: initialData?.perpustakaanRusak || '0',
      ruangKepalaSekolahKondisi: initialData?.ruangKepalaSekolahKondisi || '',
      ruangKepalaSekolahKeterangan:
        initialData?.ruangKepalaSekolahKeterangan || '',
      ruangGuruKondisi: initialData?.ruangGuruKondisi || '',
      ruangGuruKeterangan: initialData?.ruangGuruKeterangan || '',
      aulaPertemuanKondisi: initialData?.aulaPertemuanKondisi || '',
      aulaPertemuanKeterangan: initialData?.aulaPertemuanKeterangan || '',
      laboratoriumIpaKondisi: initialData?.laboratoriumIpaKondisi || '',
      laboratoriumIpaKeterangan: initialData?.laboratoriumIpaKeterangan || '',
      laboratoriumBahasaKondisi: initialData?.laboratoriumBahasaKondisi || '',
      laboratoriumBahasaKeterangan:
        initialData?.laboratoriumBahasaKeterangan || '',
      laboratoriumTikKondisi: initialData?.laboratoriumTikKondisi || '',
      laboratoriumTikKeterangan: initialData?.laboratoriumTikKeterangan || '',
    },
  });
  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        ruangKelasTotal: initialData.ruangKelasTotal || '0',
        ruangKelasBaik: initialData.ruangKelasBaik || '0',
        ruangKelasRusak: initialData.ruangKelasRusak || '0',
        perpustakaanTotal: initialData.perpustakaanTotal || '0',
        perpustakaanBaik: initialData.perpustakaanBaik || '0',
        perpustakaanRusak: initialData.perpustakaanRusak || '0',
        ruangKepalaSekolahKondisi: initialData.ruangKepalaSekolahKondisi || '',
        ruangKepalaSekolahKeterangan:
          initialData.ruangKepalaSekolahKeterangan || '',
        ruangGuruKondisi: initialData.ruangGuruKondisi || '',
        ruangGuruKeterangan: initialData.ruangGuruKeterangan || '',
        aulaPertemuanKondisi: initialData.aulaPertemuanKondisi || '',
        aulaPertemuanKeterangan: initialData.aulaPertemuanKeterangan || '',
        laboratoriumIpaKondisi: initialData.laboratoriumIpaKondisi || '',
        laboratoriumIpaKeterangan: initialData.laboratoriumIpaKeterangan || '',
        laboratoriumBahasaKondisi: initialData.laboratoriumBahasaKondisi || '',
        laboratoriumBahasaKeterangan:
          initialData.laboratoriumBahasaKeterangan || '',
        laboratoriumTikKondisi: initialData.laboratoriumTikKondisi || '',
        laboratoriumTikKeterangan: initialData.laboratoriumTikKeterangan || '',
      });

      // Check if there's existing data
      const hasData = Object.values(initialData).some(
        (value) => value && value !== '0' && value.trim() !== '',
      );
      setHasExistingData(hasData);
    }
    setIsFormLoading(false);
  }, [initialData, form]);

  // Handle form submission
  const handleSubmit = async (values: Step4Data) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting facility data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FacilitySection = ({
    icon: Icon,
    title,
    children,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );

  const QuantityInputs = ({ baseName }: { baseName: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name={`${baseName}Total` as 'ruangKelasTotal' | 'perpustakaanTotal'}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">Jumlah Total</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                {...field}
                disabled={isSubmitting || disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${baseName}Baik` as 'ruangKelasBaik' | 'perpustakaanBaik'}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">Kondisi Baik</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                {...field}
                disabled={isSubmitting || disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${baseName}Rusak` as 'ruangKelasRusak' | 'perpustakaanRusak'}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Kondisi Rusak/Tidak Layak
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                {...field}
                disabled={isSubmitting || disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const ConditionInputs = ({
    baseName,
    title,
  }: {
    baseName: string;
    title: string;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={
          `${baseName}Kondisi` as
            | 'ruangKepalaSekolahKondisi'
            | 'ruangGuruKondisi'
            | 'aulaPertemuanKondisi'
            | 'laboratoriumIpaKondisi'
            | 'laboratoriumBahasaKondisi'
            | 'laboratoriumTikKondisi'
        }
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Kondisi {title}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isSubmitting || disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kondisi" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {kondisiOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={
          `${baseName}Keterangan` as
            | 'ruangKepalaSekolahKeterangan'
            | 'ruangGuruKeterangan'
            | 'aulaPertemuanKeterangan'
            | 'laboratoriumIpaKeterangan'
            | 'laboratoriumBahasaKeterangan'
            | 'laboratoriumTikKeterangan'
        }
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Keterangan (Opsional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Keterangan tambahan..."
                className="min-h-10"
                {...field}
                disabled={isSubmitting || disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  // Show loading state
  if (isFormLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memuat data sarana...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress and Status Information */}
      <div className="space-y-4">
        {' '}
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Data Sarana Sekolah
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Lengkapi informasi mengenai kondisi sarana fisik di sekolah Anda
          </p>
        </div>{' '}
        {/* Existing Data Alert */}
        {hasExistingData && !hideCompletionStatus && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Data sarana sudah tersimpan sebelumnya. Anda dapat memperbarui
              data atau melanjutkan ke tahap berikutnya.
            </AlertDescription>
          </Alert>
        )}
      </div>{' '}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-8">
            {/* Ruang Kelas */}
            <FacilitySection icon={Building2} title="Ruang Kelas">
              <QuantityInputs baseName="ruangKelas" />
            </FacilitySection>

            {/* Perpustakaan */}
            <FacilitySection icon={BookOpen} title="Perpustakaan">
              <QuantityInputs baseName="perpustakaan" />
            </FacilitySection>

            {/* Ruang Kepala Sekolah */}
            <FacilitySection icon={User} title="Ruang Kepala Sekolah">
              <ConditionInputs
                baseName="ruangKepalaSekolah"
                title="Ruang Kepala Sekolah"
              />
            </FacilitySection>

            {/* Ruang Guru */}
            <FacilitySection icon={Users} title="Ruang Guru">
              <ConditionInputs baseName="ruangGuru" title="Ruang Guru" />
            </FacilitySection>

            {/* Aula Pertemuan */}
            <FacilitySection icon={Building} title="Aula Pertemuan Sekolah">
              <ConditionInputs
                baseName="aulaPertemuan"
                title="Aula Pertemuan"
              />
            </FacilitySection>

            {/* Laboratorium IPA */}
            <FacilitySection icon={FlaskConical} title="Laboratorium IPA">
              <ConditionInputs
                baseName="laboratoriumIpa"
                title="Laboratorium IPA"
              />
            </FacilitySection>

            {/* Laboratorium Bahasa */}
            <FacilitySection icon={Languages} title="Laboratorium Bahasa">
              <ConditionInputs
                baseName="laboratoriumBahasa"
                title="Laboratorium Bahasa"
              />
            </FacilitySection>

            {/* Laboratorium TIK */}
            <FacilitySection icon={Laptop} title="Laboratorium TIK">
              <ConditionInputs
                baseName="laboratoriumTik"
                title="Laboratorium TIK"
              />
            </FacilitySection>
          </div>{' '}
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
              {isSubmitting ? 'Menyimpan...' : 'Lanjut ke Data Prasarana'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
