'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { changePassword } from '@/lib/auth-client';
import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ChangePasswordForm() {
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // Enhanced password validation schema
  const passwordFormSchema = z
    .object({
      currentPassword: z
        .string()
        .trim()
        .min(8, { message: 'Password saat ini minimal 8 karakter' }),
      newPassword: z
        .string()
        .trim()
        .min(8, { message: 'Password baru minimal 8 karakter' })
        .refine(
          (password) => {
            const complexityRegex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            return complexityRegex.test(password);
          },
          {
            message:
              'Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 karakter khusus',
          },
        ),
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Konfirmasi password tidak sesuai',
      path: ['confirmPassword'],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: 'Password baru harus berbeda dari password saat ini',
      path: ['newPassword'],
    });

  type PasswordFormValues = z.infer<typeof passwordFormSchema>; // Password change form with improved configuration
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange', // Validate on change for better UX
  });

  // Watch form values for real-time changes
  const formValues = form.watch();

  // Memoized form validation check
  const formValidation = useMemo(() => {
    const { currentPassword, newPassword, confirmPassword } = formValues;
    return {
      hasValues: Boolean(
        currentPassword?.trim() &&
          newPassword?.trim() &&
          confirmPassword?.trim(),
      ),
      isValid: form.formState.isValid,
    };
  }, [formValues, form.formState.isValid]);
  // Centralized error handling for password change
  const handlePasswordChangeError = useCallback(
    (errorMessage: string) => {
      if (
        ['invalid password', 'incorrect password', 'wrong password'].some(
          (err) => errorMessage.toLowerCase().includes(err),
        )
      ) {
        setPasswordError('Password saat ini tidak benar');
        form.setFocus('currentPassword');
      } else {
        toast.error(
          `Gagal mengubah password: ${errorMessage || 'Terjadi masalah saat mengubah password'}`,
        );
      }
    },
    [form],
  );
  // Handle password change
  const onSubmit = useCallback(
    async (data: PasswordFormValues) => {
      setIsChangingPassword(true);
      setPasswordError(null);
      try {
        await changePassword(
          {
            newPassword: data.newPassword,
            currentPassword: data.currentPassword,
            revokeOtherSessions: true,
          },
          {
            onSuccess: () => {
              toast.success(
                'Password berhasil diubah! Anda akan tetap login di perangkat ini.',
              );
              form.reset();
              router.refresh();
            },
            onError: (ctx: { error?: { message: string } }) => {
              handlePasswordChangeError(ctx.error?.message || '');
            },
          },
        );
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : typeof error === 'object' && error !== null && 'message' in error
              ? String((error as { message: unknown }).message)
              : 'Terjadi kesalahan yang tidak diketahui';

        toast.error(
          `Gagal mengubah password: ${errorMessage || 'Terjadi masalah saat mengubah password'}`,
        );
      } finally {
        setIsChangingPassword(false);
      }
    },
    [form, router, handlePasswordChangeError],
  );
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Keamanan Akun</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Perbarui password akun Anda untuk keamanan yang lebih baik
        </p>
      </div>
      {passwordError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{passwordError}</AlertDescription>
        </Alert>
      )}{' '}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Password Saat Ini
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11"
                    {...field}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Password Baru
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Password harus minimal 8 karakter dan mengandung huruf kecil,
                  huruf besar, angka, dan karakter khusus
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Konfirmasi Password Baru
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="min-w-[140px]"
              disabled={
                isChangingPassword ||
                !formValidation.hasValues ||
                !formValidation.isValid
              }
            >
              {isChangingPassword ? 'Mengubah...' : 'Ubah Password'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
