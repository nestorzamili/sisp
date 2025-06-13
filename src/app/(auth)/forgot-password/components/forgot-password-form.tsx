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
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthLink } from '@/app/(auth)/_components/auth-footers';
import { forgetPassword } from '@/lib/auth-client';

type ForgotFormProps = HTMLAttributes<HTMLDivElement>;

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const formSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email harus diisi' })
      .email({ message: 'Format email tidak valid' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFormState({ status: 'idle', message: '' });

    try {
      await forgetPassword(
        {
          email: data.email,
          redirectTo: '/reset-password',
        },
        {
          onSuccess: () => {
            setFormState({
              status: 'success',
              message:
                'Link reset password telah dikirim ke email Anda. Silakan periksa kotak masuk dan folder spam.',
            });
            form.reset();
          },
          onError: (ctx) => {
            console.error('Error during password reset:', ctx.error);
            setFormState({
              status: 'error',
              message:
                ctx.error.message ||
                'Gagal mengirim email reset password. Silakan coba lagi.',
            });
          },
        },
      );
    } catch (error) {
      console.error('Error during password reset:', error);
      setFormState({
        status: 'error',
        message:
          'Terjadi kesalahan saat mengirim email reset password. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="mb-4 sm:mb-5">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
          Masukkan alamat email yang terdaftar di akun Anda. Kami akan
          mengirimkan link untuk mereset password.
        </p>
      </div>

      {formState.status !== 'idle' && (
        <Alert
          variant={formState.status === 'success' ? 'default' : 'destructive'}
          className={
            formState.status === 'success'
              ? 'border-green-500 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400 mb-4'
              : 'mb-4'
          }
        >
          {formState.status === 'success' ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <AlertDescription className="text-sm leading-relaxed">
            {formState.message}
          </AlertDescription>
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
                      placeholder="Masukkan alamat email Anda"
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
            <Button
              className="btn-primary mt-2 sm:mt-3 h-9 sm:h-10 text-sm w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Mengirim Email...
                </div>
              ) : (
                'Kirim Link Reset Password'
              )}
            </Button>

            <AuthLink
              question="Ingat password Anda?"
              linkText="Kembali ke Login"
              href="/sign-in"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
