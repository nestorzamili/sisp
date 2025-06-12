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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordInput } from '@/components/password-input';
import Link from 'next/link';
import { AuthLink } from '@/app/(auth)/_components/auth-footers';
import { signIn } from '@/lib/auth-client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type AlertType = {
  type: 'success' | 'error';
  message: string;
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Email harus diisi' })
      .email({ message: 'Format email tidak valid' }),
    password: z
      .string()
      .min(1, { message: 'Password harus diisi' })
      .min(8, { message: 'Password minimal 8 karakter' }),
    rememberMe: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAlert(null);

    try {
      const { data: authData, error: authError } = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: '/home',
      });

      if (authError) {
        setAlert({
          type: 'error',
          message: authError.message || 'Gagal masuk ke akun',
        });
        return;
      }

      if (authData?.user) {
        setAlert({
          type: 'success',
          message: 'Berhasil masuk ke akun!',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setAlert({
        type: 'error',
        message: 'Terjadi kesalahan saat masuk. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getAlertVariant = (type: 'success' | 'error') => {
    return type === 'error' ? 'destructive' : 'default';
  };

  const getAlertIcon = (type: 'success' | 'error') => {
    return type === 'success' ? (
      <CheckCircle className="h-4 w-4 mr-2" />
    ) : (
      <XCircle className="h-4 w-4 mr-2" />
    );
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {alert && (
        <Alert
          variant={getAlertVariant(alert.type)}
          className={`mb-4 ${
            alert.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : ''
          }`}
        >
          {getAlertIcon(alert.type)}
          <AlertDescription>{alert.message}</AlertDescription>
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
                  <FormMessage className="form-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    Ingat saya
                  </FormLabel>
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
