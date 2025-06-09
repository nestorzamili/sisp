'use client';

import { HTMLAttributes, useState, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
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
import { PasswordInput } from '@/components/password-input';
import { AuthLink } from '@/app/(auth)/_components/auth-footers';
import { signUp } from '@/lib/auth-client';
import { createSekolahAction } from '../action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type SignUpFormProps = HTMLAttributes<HTMLDivElement>;

// Simplified form schema with only essential fields for registration
const formSchema = z
  .object({
    schoolName: z
      .string()
      .trim()
      .min(5, { message: 'Nama sekolah minimal 5 karakter' })
      .max(100, { message: 'Nama sekolah maksimal 100 karakter' }),
    npsn: z
      .string()
      .trim()
      .length(8, { message: 'NPSN harus 8 digit' })
      .regex(/^\d{8}$/, { message: 'NPSN hanya boleh berisi angka' }),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email harus diisi' })
      .email({ message: 'Format email tidak valid' }),
    phone: z
      .string()
      .trim()
      .min(10, { message: 'Nomor HP minimal 10 digit' })
      .max(15, { message: 'Nomor HP maksimal 15 digit' })
      .regex(/^(\+62|62|0)8[1-9][0-9]{6,11}$/, {
        message: 'Format nomor HP tidak valid (contoh: 08123456789)',
      }),
    password: z
      .string()
      .trim()
      .min(8, { message: 'Password minimal 8 karakter' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
        message:
          'Password harus mengandung huruf besar, kecil, angka, dan simbol',
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

type SchoolFormData = z.infer<typeof formSchema>;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SchoolFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: '',
      npsn: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  // Watch form values
  const watchedValues = form.watch();

  // Form validation check
  const isSubmitDisabled = useMemo(() => {
    const { isValid, isDirty } = form.formState;
    const hasAllFields = Object.values(watchedValues).every(
      (value) => typeof value === 'string' && value.trim().length > 0,
    );

    return isLoading || (isDirty && (!isValid || !hasAllFields));
  }, [isLoading, form.formState, watchedValues]);

  // Registration submission handler
  async function onSubmit(values: SchoolFormData) {
    setIsLoading(true);

    try {
      // Create user account with better-auth
      const { data: authData, error: authError } = await signUp.email({
        email: values.email,
        password: values.password,
        name: values.schoolName,
      });

      if (authError) {
        toast.error(authError.message || 'Gagal membuat akun');
        return;
      }

      if (!authData?.user?.id) {
        toast.error('User ID tidak ditemukan');
        return;
      }

      // Create sekolah record with minimal data using server action
      const sekolahResult = await createSekolahAction({
        nama_sekolah: values.schoolName,
        npsn: values.npsn,
        phone: values.phone,
        userId: authData.user.id,
      });

      if (!sekolahResult.success) {
        toast.error(sekolahResult.error || 'Gagal membuat data sekolah');
        return;
      }

      // Success
      form.reset();

      // Redirect to sign-in with success parameter
      router.push('/sign-in?success=registration');
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(
        'Terjadi kesalahan saat mendaftarkan sekolah. Silakan coba lagi.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="card-primary p-5 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="grid gap-3 sm:gap-4 w-full">
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem className="form-field w-full">
                    <FormLabel className="form-label">Nama Sekolah *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: SMP Negeri 1 Telukdalam"
                        className="input-primary h-9 sm:h-10 text-sm w-full"
                        {...field}
                        disabled={isLoading}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage className="form-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="npsn"
                render={({ field }) => (
                  <FormItem className="form-field w-full">
                    <FormLabel className="form-label">NPSN *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="8 digit NPSN"
                        className="input-primary h-9 sm:h-10 text-sm w-full"
                        {...field}
                        disabled={isLoading}
                        maxLength={8}
                      />
                    </FormControl>
                    <FormMessage className="form-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-field w-full">
                    <FormLabel className="form-label">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@sekolah.sch.id"
                        className="input-primary h-9 sm:h-10 text-sm w-full"
                        {...field}
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage className="form-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="form-field w-full">
                    <FormLabel className="form-label">No. HP *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        className="input-primary h-9 sm:h-10 text-sm w-full"
                        {...field}
                        disabled={isLoading}
                        maxLength={15}
                      />
                    </FormControl>
                    <FormMessage className="form-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="form-field w-full">
                    <FormLabel className="form-label">Password *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Minimal 8 karakter"
                        className="input-primary h-9 sm:h-10 text-sm w-full"
                        {...field}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage className="form-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="form-field w-full">
                    <FormLabel className="form-label">
                      Konfirmasi Password *
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Masukkan ulang password"
                        className="input-primary h-9 sm:h-10 text-sm w-full"
                        {...field}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage className="form-error" />
                  </FormItem>
                )}
              />

              <Button
                className="btn-primary mt-2 sm:mt-3 h-9 sm:h-10 text-sm w-full"
                disabled={isSubmitDisabled}
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Mendaftarkan Sekolah...
                  </div>
                ) : (
                  'Daftarkan Sekolah'
                )}
              </Button>

              <AuthLink
                question="Sudah punya akun?"
                linkText="Masuk"
                href="/sign-in"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
