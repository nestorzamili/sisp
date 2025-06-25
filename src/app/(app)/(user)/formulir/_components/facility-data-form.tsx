import React, { useState } from 'react';
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
} from 'lucide-react';
import { step4Schema, Step4Data } from '../_schema/facility-data.schema';

interface FacilityDataFormProps {
  onSubmit: (data: Step4Data) => void;
  onBack: () => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
  initialData?: Step4Data;
}

export function FacilityDataForm({
  onSubmit,
  onBack,
  disabled = false,
  hideCompletionStatus = false,
  initialData,
}: FacilityDataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: initialData || {
      ruangKelasTotal: 0,
      ruangKelasBaik: 0,
      ruangKelasRusak: 0,
      ruangKelasKeterangan: '',
      perpustakaanTotal: 0,
      perpustakaanBaik: 0,
      perpustakaanRusak: 0,
      perpustakaanKeterangan: '',
      ruangKepalaSekolahTotal: 0,
      ruangKepalaSekolahBaik: 0,
      ruangKepalaSekolahRusak: 0,
      ruangKepalaSekolahKeterangan: '',
      ruangGuruTotal: 0,
      ruangGuruBaik: 0,
      ruangGuruRusak: 0,
      ruangGuruKeterangan: '',
      aulaPertemuanTotal: 0,
      aulaPertemuanBaik: 0,
      aulaPertemuanRusak: 0,
      aulaPertemuanKeterangan: '',
      laboratoriumIpaTotal: 0,
      laboratoriumIpaBaik: 0,
      laboratoriumIpaRusak: 0,
      laboratoriumIpaKeterangan: '',
      laboratoriumBahasaTotal: 0,
      laboratoriumBahasaBaik: 0,
      laboratoriumBahasaRusak: 0,
      laboratoriumBahasaKeterangan: '',
      laboratoriumTikTotal: 0,
      laboratoriumTikBaik: 0,
      laboratoriumTikRusak: 0,
      laboratoriumTikKeterangan: '',
    },
  });

  // Handle form submission
  const handleSubmit = async (values: Step4Data) => {
    setIsSubmitting(true);
    try {
      onSubmit(values);
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

  const QuantityInputsWithNotes = ({ baseName }: { baseName: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`${baseName}Total` as keyof Step4Data}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">
                Jumlah Total
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  value={field.value || 0}
                  readOnly={disabled}
                  disabled={isSubmitting}
                  className={disabled ? 'cursor-default' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${baseName}Baik` as keyof Step4Data}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">
                Kondisi Baik
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  value={field.value || 0}
                  readOnly={disabled}
                  disabled={isSubmitting}
                  className={disabled ? 'cursor-default' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name={`${baseName}Rusak` as keyof Step4Data}
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
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                  value={field.value || 0}
                  readOnly={disabled}
                  disabled={isSubmitting}
                  className={disabled ? 'cursor-default' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>{' '}
      <FormField
        control={form.control}
        name={`${baseName}Keterangan` as keyof Step4Data}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Keterangan (Opsional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Keterangan tambahan..."
                className={`min-h-20 ${disabled ? 'cursor-default' : ''}`}
                {...field}
                readOnly={disabled}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

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
        {initialData && !hideCompletionStatus && (
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
            {' '}
            {/* Ruang Kelas */}
            <FacilitySection icon={Building2} title="Ruang Kelas">
              <QuantityInputsWithNotes baseName="ruangKelas" />
            </FacilitySection>
            {/* Perpustakaan */}
            <FacilitySection icon={BookOpen} title="Perpustakaan">
              <QuantityInputsWithNotes baseName="perpustakaan" />
            </FacilitySection>
            {/* Ruang Kepala Sekolah */}
            <FacilitySection icon={User} title="Ruang Kepala Sekolah">
              <QuantityInputsWithNotes baseName="ruangKepalaSekolah" />
            </FacilitySection>
            {/* Ruang Guru */}
            <FacilitySection icon={Users} title="Ruang Guru">
              <QuantityInputsWithNotes baseName="ruangGuru" />
            </FacilitySection>
            {/* Aula Pertemuan */}
            <FacilitySection icon={Building} title="Aula Pertemuan Sekolah">
              <QuantityInputsWithNotes baseName="aulaPertemuan" />
            </FacilitySection>
            {/* Laboratorium IPA */}
            <FacilitySection icon={FlaskConical} title="Laboratorium IPA">
              <QuantityInputsWithNotes baseName="laboratoriumIpa" />
            </FacilitySection>
            {/* Laboratorium Bahasa */}
            <FacilitySection icon={Languages} title="Laboratorium Bahasa">
              <QuantityInputsWithNotes baseName="laboratoriumBahasa" />
            </FacilitySection>
            {/* Laboratorium TIK */}
            <FacilitySection icon={Laptop} title="Laboratorium TIK">
              <QuantityInputsWithNotes baseName="laboratoriumTik" />
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
