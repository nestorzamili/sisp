'use client';

import { HTMLAttributes, useState } from 'react';
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
import { PasswordInput } from '@/components/password-input';
import { useRouter } from 'next/navigation';
import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthLink } from '@/app/(auth)/_components/auth-footers';
import { resetPassword } from '@/lib/auth-client';
import logger from '@/lib/logger';

type ResetFormProps = HTMLAttributes<HTMLDivElement> & {
  token: string;
};

export function ResetForm({ className, token, ...props }: ResetFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const router = useRouter();

  const formSchema = z
    .object({
      password: z
        .string()
        .trim()
        .min(8, { message: 'Password minimal 8 karakter' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
          message:
            'Password harus mengandung huruf besar, kecil, angka, dan simbol',
        }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Konfirmasi password harus diisi' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Konfirmasi password tidak cocok',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFormState({ status: 'idle', message: '' });

    try {
      await resetPassword(
        {
          newPassword: data.password,
          token: token,
        },
        {
          onSuccess: () => {
            form.reset();
            router.push('/sign-in?message=password_reset_success');
          },
          onError: (ctx) => {
            logger.error('Error during password reset:', ctx.error);
            setFormState({
              status: 'error',
              message:
                ctx.error.message ||
                'Gagal mengubah password. Silakan coba lagi.',
            });
          },
        },
      );
    } catch (error) {
      logger.error('Error during password reset:', error);
      setFormState({
        status: 'error',
        message: 'Terjadi kesalahan saat mengubah password. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {formState.status === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <div className="flex items-center gap-2">
            <IconAlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm leading-relaxed">
              {formState.message}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-3 sm:gap-4 w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="form-field w-full">
                  <FormLabel className="form-label">Password Baru</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Masukkan password baru"
                      {...field}
                      className="input-primary h-9 sm:h-10 text-sm w-full"
                      disabled={isLoading}
                      autoFocus
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
                    Konfirmasi Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Masukkan ulang password baru"
                      {...field}
                      className="input-primary h-9 sm:h-10 text-sm w-full"
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
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Mengubah Password...
                </div>
              ) : (
                'Ubah Password'
              )}
            </Button>

            <AuthLink
              question="Sudah ingat password?"
              linkText="Masuk di sini"
              href="/sign-in"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
