'use client';

import { HTMLAttributes, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLogin } from '@tabler/icons-react';

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

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // A combined schema that accepts either email or username
  const formSchema = z.object({
    identifier: z
      .string()
      .min(1, { message: 'Email atau username harus diisi' })
      .refine(
        (value) => {
          // Either valid email or username with minimum length
          const isEmail = value.includes('@') && value.includes('.');
          const isUsername = !value.includes('@') && value.length >= 3;
          return isEmail || isUsername;
        },
        {
          message: 'Format email tidak valid atau username minimal 3 karakter',
        },
      ),
    password: z
      .string()
      .min(1, { message: 'Password harus diisi' })
      .min(7, { message: 'Password minimal 7 karakter' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { identifier: '', password: '' },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // TODO: Implement authentication logic
      console.log('Login data:', data);

      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Form Header with Icon and Title */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconLogin className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Masuk</h2>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-3 sm:gap-4 w-full">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="form-field w-full">
                  <FormLabel className="form-label">
                    Email atau Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan email atau username"
                      className="input-primary h-9 sm:h-10 text-sm w-full"
                      {...field}
                      disabled={isLoading}
                      autoFocus
                      autoComplete="username"
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
