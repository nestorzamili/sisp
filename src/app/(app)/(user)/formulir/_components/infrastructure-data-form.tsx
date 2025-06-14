import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Armchair,
  Laptop,
  DoorOpen,
  UserCheck,
  Plus,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { step5Schema, Step5Data } from '../_schema/infrastructure-data.schema';
import {
  getInfrastructureDataAction,
  saveInfrastructureDataAction,
} from '../_actions/infrastructure-data.action';

const kondisiOptions = [
  { value: 'baik', label: 'Baik' },
  { value: 'rusak-ringan', label: 'Rusak Ringan' },
  { value: 'rusak-sedang', label: 'Rusak Sedang' },
  { value: 'rusak-berat', label: 'Rusak Berat' },
];

interface InfrastructureDataFormProps {
  onSubmit: (data: Step5Data) => void;
  onBack: () => void;
  disabled?: boolean;
}

export function InfrastructureDataForm({
  onSubmit,
  onBack,
  disabled = false,
}: InfrastructureDataFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasExistingData, setHasExistingData] = useState(false);
  const form = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      mejaKursiSiswaTotal: '0',
      mejaKursiSiswaBaik: '0',
      mejaKursiSiswaRusak: '0',
      komputerTotal: '0',
      komputerBaik: '0',
      komputerRusak: '0',
      toiletSiswaTotal: '0',
      toiletSiswaBaik: '0',
      toiletSiswaRusak: '0',
      toiletGuruTotal: '0',
      toiletGuruBaik: '0',
      toiletGuruRusak: '0',
      prasaranaLainnya: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'prasaranaLainnya',
  });

  // Load existing infrastructure data on component mount
  useEffect(() => {
    async function loadInfrastructureData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const result = await getInfrastructureDataAction();

        if (result.success && result.data) {
          form.reset(result.data);

          // Check if there's existing data (non-zero values)
          const hasData = Object.entries(result.data).some(([key, value]) => {
            if (key === 'prasaranaLainnya') {
              return Array.isArray(value) && value.length > 0;
            }
            return typeof value === 'string' && Number(value) > 0;
          });
          setHasExistingData(hasData);
        } else {
          setLoadError(result.error || 'Gagal memuat data prasarana');
        }
      } catch (error) {
        console.error('Error loading infrastructure data:', error);
        setLoadError('Terjadi kesalahan saat memuat data');
      } finally {
        setIsLoading(false);
      }
    }

    loadInfrastructureData();
  }, [form]);

  // Handle form submission
  async function handleSubmit(values: Step5Data) {
    try {
      setIsSubmitting(true);

      const result = await saveInfrastructureDataAction(values);

      if (result.success) {
        toast.success('Data prasarana berhasil disimpan');
        onSubmit(values);
      } else {
        toast.error(result.error || 'Gagal menyimpan data prasarana');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  }

  const InfrastructureSection = ({
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
        name={
          `${baseName}Total` as
            | 'mejaKursiSiswaTotal'
            | 'komputerTotal'
            | 'toiletSiswaTotal'
            | 'toiletGuruTotal'
        }
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">Jumlah Total</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                disabled={isSubmitting || disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={
          `${baseName}Baik` as
            | 'mejaKursiSiswaBaik'
            | 'komputerBaik'
            | 'toiletSiswaBaik'
            | 'toiletGuruBaik'
        }
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">Kondisi Baik</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                disabled={isSubmitting || disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={
          `${baseName}Rusak` as
            | 'mejaKursiSiswaRusak'
            | 'komputerRusak'
            | 'toiletSiswaRusak'
            | 'toiletGuruRusak'
        }
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Kondisi Rusak/Tidak Layak
            </FormLabel>{' '}
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                disabled={isSubmitting || disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
  const addPrasaranaLainnya = () => {
    append({ nama: '', jumlah: '', kondisi: '' });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Memuat data prasarana...
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
          Data Prasarana Sekolah
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Lengkapi data kondisi prasarana sekolah untuk analisis prioritas
          kebutuhan
        </p>
      </div>
      {/* Existing Data Alert */}
      {hasExistingData && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data prasarana sudah tersimpan sebelumnya. Anda dapat memperbarui
            data atau melanjutkan ke tahap berikutnya.
          </AlertDescription>
        </Alert>
      )}{' '}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-8">
            {/* Meja dan Kursi Siswa */}
            <InfrastructureSection icon={Armchair} title="Meja dan Kursi Siswa">
              <QuantityInputs baseName="mejaKursiSiswa" />
            </InfrastructureSection>

            {/* Komputer */}
            <InfrastructureSection icon={Laptop} title="Komputer">
              <QuantityInputs baseName="komputer" />
            </InfrastructureSection>

            {/* Toilet Siswa */}
            <InfrastructureSection icon={DoorOpen} title="Toilet Siswa">
              <QuantityInputs baseName="toiletSiswa" />
            </InfrastructureSection>

            {/* Toilet Guru */}
            <InfrastructureSection icon={UserCheck} title="Toilet Guru">
              <QuantityInputs baseName="toiletGuru" />
            </InfrastructureSection>

            {/* Prasarana Lainnya */}
            <div className="space-y-4">
              <div className="flex justify-end">
                {' '}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPrasaranaLainnya}
                  className="flex items-center gap-2"
                  disabled={isSubmitting || disabled}
                >
                  <Plus className="w-4 h-4" />
                  Tambah Prasarana
                </Button>
              </div>

              {fields.length > 0 && (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                          <FormField
                            control={form.control}
                            name={`prasaranaLainnya.${index}.nama`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">
                                  Nama Prasarana
                                </FormLabel>{' '}
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: Papan Tulis"
                                    disabled={isSubmitting || disabled}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`prasaranaLainnya.${index}.jumlah`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">
                                  Jumlah
                                </FormLabel>{' '}
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder="0"
                                    disabled={isSubmitting || disabled}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`prasaranaLainnya.${index}.kondisi`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">
                                  Kondisi
                                </FormLabel>{' '}
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={isSubmitting || disabled}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih kondisi" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {kondisiOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="pt-[30px]">
                          {' '}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                            title="Hapus prasarana"
                            disabled={isSubmitting || disabled}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Lanjut ke Prioritas Kebutuhan'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
