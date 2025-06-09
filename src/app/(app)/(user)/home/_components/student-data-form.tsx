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
import { step3Schema, Step3Data } from '../_schema/student-data.schema';

interface StudentDataFormProps {
  onSubmit: (data: Step3Data) => void;
  onBack: () => void;
}

export function StudentDataForm({ onSubmit, onBack }: StudentDataFormProps) {
  const form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      rombelKelas7: '0',
      rombelKelas8: '0',
      rombelKelas9: '0',
      siswaKelas7Laki: '0',
      siswaKelas7Perempuan: '0',
      siswaKelas8Laki: '0',
      siswaKelas8Perempuan: '0',
      siswaKelas9Laki: '0',
      siswaKelas9Perempuan: '0',
    },
  });

  // Calculate totals
  const totalRombel =
    (Number(form.watch('rombelKelas7')) || 0) +
    (Number(form.watch('rombelKelas8')) || 0) +
    (Number(form.watch('rombelKelas9')) || 0);

  const totalKelas7 =
    (Number(form.watch('siswaKelas7Laki')) || 0) +
    (Number(form.watch('siswaKelas7Perempuan')) || 0);

  const totalKelas8 =
    (Number(form.watch('siswaKelas8Laki')) || 0) +
    (Number(form.watch('siswaKelas8Perempuan')) || 0);

  const totalKelas9 =
    (Number(form.watch('siswaKelas9Laki')) || 0) +
    (Number(form.watch('siswaKelas9Perempuan')) || 0);

  const totalLaki =
    (Number(form.watch('siswaKelas7Laki')) || 0) +
    (Number(form.watch('siswaKelas8Laki')) || 0) +
    (Number(form.watch('siswaKelas9Laki')) || 0);

  const totalPerempuan =
    (Number(form.watch('siswaKelas7Perempuan')) || 0) +
    (Number(form.watch('siswaKelas8Perempuan')) || 0) +
    (Number(form.watch('siswaKelas9Perempuan')) || 0);

  const totalSiswa = totalLaki + totalPerempuan;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Rombongan Belajar Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Jumlah Rombongan Belajar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="rombelKelas7"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Kelas VII
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rombelKelas8"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Kelas VIII
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rombelKelas9"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Kelas IX
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium">
                Total Rombongan Belajar
              </FormLabel>
              <div className="h-10 flex items-center justify-center bg-primary/10 rounded-md border border-primary/20">
                <span className="text-base font-semibold text-primary">
                  {totalRombel}
                </span>
              </div>
            </FormItem>
          </div>
        </div>

        {/* Students Data Section */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Jumlah Siswa
          </h3>

          {/* Kelas VII */}
          <div className="space-y-3">
            <h4 className="text-base font-medium text-foreground border-l-4 border-primary pl-3">
              Kelas VII
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="siswaKelas7Laki"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Laki-laki
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siswaKelas7Perempuan"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Perempuan
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Total</FormLabel>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                  <span className="text-base font-semibold">{totalKelas7}</span>
                </div>
              </FormItem>
            </div>
          </div>

          {/* Kelas VIII */}
          <div className="space-y-3">
            <h4 className="text-base font-medium text-foreground border-l-4 border-primary pl-3">
              Kelas VIII
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="siswaKelas8Laki"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Laki-laki
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siswaKelas8Perempuan"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Perempuan
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Total</FormLabel>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                  <span className="text-base font-semibold">{totalKelas8}</span>
                </div>
              </FormItem>
            </div>
          </div>

          {/* Kelas IX */}
          <div className="space-y-3">
            <h4 className="text-base font-medium text-foreground border-l-4 border-primary pl-3">
              Kelas IX
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="siswaKelas9Laki"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Laki-laki
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siswaKelas9Perempuan"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Perempuan
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Total</FormLabel>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                  <span className="text-base font-semibold">{totalKelas9}</span>
                </div>
              </FormItem>
            </div>
          </div>

          {/* Total Seluruh Siswa */}
          <div className="space-y-4 bg-primary/5 p-4 rounded-lg border border-primary/20 mt-5">
            <h4 className="text-base font-medium text-foreground">
              Total Seluruh Siswa
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-primary">
                  Total Laki-laki
                </div>
                <div className="h-12 flex items-center justify-center bg-primary/10 rounded-md border border-primary/20">
                  <span className="text-xl font-bold text-primary">
                    {totalLaki}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-primary">
                  Total Perempuan
                </div>
                <div className="h-12 flex items-center justify-center bg-primary/10 rounded-md border border-primary/20">
                  <span className="text-xl font-bold text-primary">
                    {totalPerempuan}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-primary">
                  Total Keseluruhan
                </div>
                <div className="h-12 flex items-center justify-center bg-primary/5 rounded-md border-2 border-primary/30">
                  <span className="text-2xl font-bold text-primary">
                    {totalSiswa}
                  </span>
                </div>
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
          >
            Kembali
          </Button>
          <Button type="submit" className="btn-primary text-sm px-6 py-2">
            Lanjut ke Data Sarana
          </Button>
        </div>
      </form>
    </Form>
  );
}
