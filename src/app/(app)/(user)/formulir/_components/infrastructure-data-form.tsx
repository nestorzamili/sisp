import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
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
} from 'lucide-react';
import { step5Schema, Step5Data } from '../_schema/infrastructure-data.schema';

interface InfrastructureDataFormProps {
  onSubmit: (data: Step5Data) => void;
  onBack: () => void;
  disabled?: boolean;
  hideCompletionStatus?: boolean;
  initialData?: Step5Data;
}

export function InfrastructureDataForm({
  onSubmit,
  onBack,
  disabled = false,
  hideCompletionStatus = false,
  initialData,
}: InfrastructureDataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: initialData || {
      mejaKursiSiswaTotal: 0,
      mejaKursiSiswaBaik: 0,
      mejaKursiSiswaRusak: 0,
      mejaKursiSiswaKeterangan: '',
      komputerTotal: 0,
      komputerBaik: 0,
      komputerRusak: 0,
      komputerKeterangan: '',
      toiletSiswaTotal: 0,
      toiletSiswaBaik: 0,
      toiletSiswaRusak: 0,
      toiletSiswaKeterangan: '',
      toiletGuruTotal: 0,
      toiletGuruBaik: 0,
      toiletGuruRusak: 0,
      toiletGuruKeterangan: '',
      prasaranaLainnya: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'prasaranaLainnya',
  });

  // Handle form submission
  async function handleSubmit(values: Step5Data) {
    setIsSubmitting(true);
    try {
      onSubmit(values);
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
    <div className="space-y-4">
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
              {' '}
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
          name={
            `${baseName}Baik` as
              | 'mejaKursiSiswaBaik'
              | 'komputerBaik'
              | 'toiletSiswaBaik'
              | 'toiletGuruBaik'
          }
          render={({ field }) => (
            <FormItem className="space-y-2">
              {' '}
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
              {' '}
              <FormLabel className="text-sm font-medium">
                Kondisi Rusak/Tidak Layak
              </FormLabel>{' '}
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
      </div>
      <FormField
        control={form.control}
        name={`${baseName}Keterangan` as keyof Step5Data}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Keterangan (Opsional)
            </FormLabel>{' '}
            <FormControl>
              <Textarea
                placeholder="Keterangan tambahan..."
                className={`min-h-20 ${disabled ? 'cursor-default' : ''}`}
                value={(field.value as string) || ''}
                onChange={field.onChange}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
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
  const addPrasaranaLainnya = () => {
    append({
      nama: '',
      jumlahTotal: 0,
      jumlahBaik: 0,
      jumlahRusak: 0,
      keterangan: '',
    });
  };

  return (
    <div className="space-y-6">
      {' '}
      {/* Form Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Data Prasarana Sekolah
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Lengkapi data kondisi prasarana sekolah untuk analisis prioritas
          kebutuhan. Pastikan total jumlah kondisi baik dan rusak sesuai dengan
          jumlah total.
        </p>
      </div>{' '}
      {/* Existing Data Alert */}
      {initialData && !hideCompletionStatus && (
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
            </InfrastructureSection>{' '}
            {/* Prasarana Lainnya */}
            <InfrastructureSection icon={Plus} title="Prasarana Lainnya">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Tambahkan prasarana lain yang belum tercantum di atas
                  </p>
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
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border border-gray-200 rounded-lg p-4 space-y-4"
                      >
                        <div className="space-y-4">
                          {/* Nama Prasarana - Full width dengan tombol hapus */}
                          <FormField
                            control={form.control}
                            name={`prasaranaLainnya.${index}.nama`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <FormLabel className="text-sm font-medium">
                                    Nama Prasarana
                                  </FormLabel>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                    title="Hapus prasarana"
                                    disabled={isSubmitting || disabled}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                                <FormControl>
                                  <Input
                                    placeholder="Contoh: Papan Tulis, Meja Komputer, dll"
                                    readOnly={disabled}
                                    disabled={isSubmitting}
                                    className={disabled ? 'cursor-default' : ''}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Jumlah dalam grid 3 kolom */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name={`prasaranaLainnya.${index}.jumlahTotal`}
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
                                      onChange={(e) =>
                                        field.onChange(
                                          Number(e.target.value) || 0,
                                        )
                                      }
                                      value={field.value || 0}
                                      readOnly={disabled}
                                      disabled={isSubmitting}
                                      className={
                                        disabled ? 'cursor-default' : ''
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`prasaranaLainnya.${index}.jumlahBaik`}
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
                                      onChange={(e) =>
                                        field.onChange(
                                          Number(e.target.value) || 0,
                                        )
                                      }
                                      value={field.value || 0}
                                      readOnly={disabled}
                                      disabled={isSubmitting}
                                      className={
                                        disabled ? 'cursor-default' : ''
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`prasaranaLainnya.${index}.jumlahRusak`}
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium">
                                    Kondisi Rusak
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      placeholder="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number(e.target.value) || 0,
                                        )
                                      }
                                      value={field.value || 0}
                                      readOnly={disabled}
                                      disabled={isSubmitting}
                                      className={
                                        disabled ? 'cursor-default' : ''
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Keterangan - Full width */}
                          <FormField
                            control={form.control}
                            name={`prasaranaLainnya.${index}.keterangan`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">
                                  Keterangan (Opsional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Keterangan tambahan tentang kondisi atau spesifikasi prasarana..."
                                    className={`min-h-20 ${disabled ? 'cursor-default' : ''}`}
                                    value={(field.value as string) || ''}
                                    onChange={field.onChange}
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    readOnly={disabled}
                                    disabled={isSubmitting}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </InfrastructureSection>
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
