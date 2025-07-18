'use client';

import { HTMLAttributes, useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';

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
import Link from 'next/link';
import { AuthLink } from '@/app/(auth)/_components/auth-footers';
import { signIn } from '@/lib/auth-client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XCircle, CheckCircle } from 'lucide-react';
import logger from '@/lib/logger';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type AlertType = {
  message: string;
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AlertType | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams?.get('message');
    if (message === 'password_reset_success') {
      setSuccessMessage(
        'Password berhasil diubah! Silakan masuk dengan password baru Anda.',
      );
    }
  }, [searchParams]);
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Email harus diisi' })
      .email({ message: 'Format email tidak valid' }),
    password: z
      .string()
      .min(1, { message: 'Password harus diisi' })
      .min(8, { message: 'Password minimal 8 karakter' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    if (searchParams?.get('message')) {
      router.replace('/sign-in', { scroll: false });
    }

    try {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: '/home',
        },
        {
          onError: (ctx) => {
            if (ctx.error.status === 401) {
              setError({
                message: 'Email atau password Anda tidak valid.',
              });
            } else {
              setError({
                message: ctx.error.message || 'Gagal masuk ke akun',
              });
            }
          },
        },
      );
    } catch (error) {
      logger.error('Login error:', error);
      setError({
        message: 'Terjadi kesalahan saat masuk. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {successMessage && (
        <Alert
          variant="default"
          className="border-green-500 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400 mb-4"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <XCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-3 sm:gap-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="form-field w-full">
                  <FormLabel className="form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      className="input-primary h-9 sm:h-10 text-sm w-full"
                      {...field}
                      disabled={isLoading}
                      autoFocus
                      autoComplete="email"
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
                  <div className="flex items-center justify-between w-full">
                    <FormLabel className="form-label">Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-primary hover:opacity-80 transition-colors"
                    >
                      Lupa Password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="Masukkan password"
                      className="input-primary h-9 sm:h-10 text-sm w-full"
                      {...field}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage className="form-error" />{' '}
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
                  Sedang Masuk...
                </div>
              ) : (
                'Masuk'
              )}
            </Button>

            <AuthLink
              question="Belum punya akun?"
              linkText="Daftar Sekarang"
              href="/sign-up"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
