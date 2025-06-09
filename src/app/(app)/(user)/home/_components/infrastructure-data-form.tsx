import React from 'react';
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
import {
  Armchair,
  Laptop,
  DoorOpen,
  UserCheck,
  Plus,
  Trash2,
} from 'lucide-react';
import { step5Schema, Step5Data } from '../_schema/infrastructure-data.schema';

const kondisiOptions = [
  { value: 'baik', label: 'Baik' },
  { value: 'rusak-ringan', label: 'Rusak Ringan' },
  { value: 'rusak-sedang', label: 'Rusak Sedang' },
  { value: 'rusak-berat', label: 'Rusak Berat' },
];

interface InfrastructureDataFormProps {
  onSubmit: (data: Step5Data) => void;
  onBack: () => void;
}

export function InfrastructureDataForm({
  onSubmit,
  onBack,
}: InfrastructureDataFormProps) {
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
              <Input type="number" min="0" placeholder="0" {...field} />
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
              <Input type="number" min="0" placeholder="0" {...field} />
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
            </FormLabel>
            <FormControl>
              <Input type="number" min="0" placeholder="0" {...field} />
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Data Prasarana Sekolah
            </h3>
            <p className="text-sm text-muted-foreground">
              Lengkapi data kondisi prasarana sekolah untuk analisis prioritas
              kebutuhan
            </p>
          </div>

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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPrasaranaLainnya}
                className="flex items-center gap-2"
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
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Contoh: Papan Tulis"
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
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="0"
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
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                          title="Hapus prasarana"
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
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="text-sm px-6 py-2"
          >
            Kembali
          </Button>
          <Button type="submit" className="btn-primary text-sm px-6 py-2">
            Lanjut ke Prioritas Kebutuhan
          </Button>
        </div>
      </form>
    </Form>
  );
}
