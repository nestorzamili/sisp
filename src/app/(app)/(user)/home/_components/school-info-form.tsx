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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';
import {
  step1Schema,
  Step1Data,
  kecamatanOptions,
} from '../_schema/school-info.schema';

interface SchoolInfoFormProps {
  onSubmit: (data: Step1Data) => void;
}

export function SchoolInfoForm({ onSubmit }: SchoolInfoFormProps) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="namaSekolah"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">
                  Nama Sekolah
                </FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama sekolah" {...field} />
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
                <FormLabel className="text-sm font-medium">NPSN</FormLabel>
                <FormControl>
                  <Input placeholder="8 digit NPSN" maxLength={8} {...field} />
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
                <FormLabel className="text-sm font-medium">
                  Nama Kepala Sekolah
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama kepala sekolah"
                    {...field}
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
                <FormLabel className="text-sm font-medium">
                  NIP Kepala Sekolah
                </FormLabel>
                <FormControl>
                  <Input placeholder="18 digit NIP" maxLength={18} {...field} />
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
                <FormLabel className="text-sm font-medium">Kecamatan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kecamatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kecamatanOptions.map((kecamatan) => (
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
              <FormLabel className="text-sm font-medium">
                Alamat Sekolah
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan alamat lengkap sekolah"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" className="btn-primary text-sm px-6 py-2">
            Lanjut ke Data Guru
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
