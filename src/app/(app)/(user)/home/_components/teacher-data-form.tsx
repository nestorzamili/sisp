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
import { step2Schema, Step2Data } from '../_schema/teacher-data.schema';

interface TeacherDataFormProps {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
}

export function TeacherDataForm({ onSubmit, onBack }: TeacherDataFormProps) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Guru PNS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Guru PNS</h3>
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
                      <Input type="number" min="0" placeholder="0" {...field} />
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
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Total</FormLabel>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                  <span className="text-base font-semibold">
                    {(Number(form.watch('guruPnsLaki')) || 0) +
                      (Number(form.watch('guruPnsPerempuan')) || 0)}
                  </span>
                </div>
              </FormItem>
            </div>
          </div>

          {/* Guru PPPP3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Guru PPPP3
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
                      <Input type="number" min="0" placeholder="0" {...field} />
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
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Total</FormLabel>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                  <span className="text-base font-semibold">
                    {(Number(form.watch('guruPpppLaki')) || 0) +
                      (Number(form.watch('guruPpppPerempuan')) || 0)}
                  </span>
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
                      <Input type="number" min="0" placeholder="0" {...field} />
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
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Total</FormLabel>
                <div className="h-10 flex items-center justify-center bg-muted rounded-md border">
                  <span className="text-base font-semibold">
                    {(Number(form.watch('guruGttLaki')) || 0) +
                      (Number(form.watch('guruGttPerempuan')) || 0)}
                  </span>
                </div>
              </FormItem>
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
            Lanjut ke Data Siswa
          </Button>
        </div>
      </form>
    </Form>
  );
}
