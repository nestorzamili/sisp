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
import { changeEmail, updateUser, useSession } from '@/lib/auth-client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { AvatarUpload } from './avatar-upload';
import logger from '@/lib/logger';

export default function ProfileForm() {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: session, isPending: isLoading } = useSession();
  const user = session?.user;

  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    image: string;
  } | null>(null);
  const profileFormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Nama minimal 3 karakter' })
      .max(50, { message: 'Nama maksimal 50 karakter' }),
    email: z.string({ required_error: 'Email wajib diisi' }).email({
      message: 'Format email tidak valid',
    }),
    image: z
      .string()
      .url({ message: 'URL gambar tidak valid' })
      .optional()
      .nullable()
      .or(z.literal('')),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      image: '',
    },
    mode: 'onChange',
  });

  // Watch form values for changes
  const formValues = form.watch();

  const hasFormChanges = useMemo(() => {
    if (!userProfile) return false;

    // Normalize values for comparison
    const currentName = (formValues.name || '').trim();
    const currentEmail = (formValues.email || '').trim();
    const currentImage = formValues.image || '';

    const originalName = (userProfile.name || '').trim();
    const originalEmail = (userProfile.email || '').trim();
    const originalImage = userProfile.image || '';

    const hasChanges =
      currentName !== originalName ||
      currentEmail !== originalEmail ||
      currentImage !== originalImage;

    return hasChanges;
  }, [formValues, userProfile]);
  useEffect(() => {
    if (user) {
      const userValues = {
        name: user.name || '',
        email: user.email || '',
        image: user.image || '',
      };

      form.reset(userValues);
      setUserProfile(userValues);
    }
  }, [user, form]);
  const handleEmailChange = useCallback(
    async (newEmail: string) => {
      try {
        await changeEmail(
          {
            newEmail,
            callbackURL: '/',
          },
          {
            onSuccess: () => {
              toast.success(
                'Email berhasil diubah. Silakan cek email Anda untuk konfirmasi.',
              );
              router.refresh();
            },
            onError: (ctx) => {
              const errorMessage = ctx.error?.message || '';
              if (
                errorMessage.includes('Email already exists') ||
                errorMessage.includes("Couldn't update your email")
              ) {
                form.setValue('email', userProfile?.email || '');
                toast.error(
                  'Email sudah terdaftar. Silakan gunakan email lain.',
                );
              } else {
                toast.error(`Gagal mengubah email: ${errorMessage}`);
              }
            },
          },
        );
      } catch (error) {
        logger.error('Error changing email:', error);
        toast.error('Terjadi kesalahan yang tidak terduga.');
      }
    },
    [form, router, userProfile?.email],
  );
  const handleImageChange = useCallback(
    async (imageUrl: string) => {
      form.setValue('image', imageUrl);
      form.trigger('image');

      // Auto-save image to database
      try {
        await updateUser({
          image: imageUrl || null,
        });

        // Update local state
        setUserProfile((prev) =>
          prev
            ? {
                ...prev,
                image: imageUrl,
              }
            : null,
        );

        toast.success('Foto profil berhasil diperbarui');
        router.refresh();
      } catch (error) {
        logger.error('Error updating image:', error);
        toast.error('Foto berhasil diupload tetapi gagal disimpan ke profil');
      }
    },
    [form, router],
  );
  const handleProfileUpdate = useCallback(
    async (data: ProfileFormValues) => {
      setIsUpdating(true);

      try {
        const hasImageChanged = data.image !== userProfile?.image;
        const hasNameChanged = data.name !== userProfile?.name;

        const updateData: { name?: string; image?: string | null } = {};

        // Add fields that have changed
        if (hasNameChanged) updateData.name = data.name;

        // Update name if it has changed
        if (Object.keys(updateData).length > 0) {
          await updateUser(updateData);
        }

        // Handle image separately
        if (hasImageChanged) {
          try {
            await updateUser({
              image: data.image || null,
            });
          } catch (imageError) {
            logger.error('Error updating image:', imageError);
            toast.error(
              'Profil berhasil diperbarui tetapi ada masalah dengan foto profil.',
            );
          }
        }

        // Handle email change
        if (data.email !== userProfile?.email) {
          await handleEmailChange(data.email);
        } else {
          toast.success('Profil berhasil diperbarui!');
          setUserProfile({
            name: data.name,
            email: data.email,
            image: data.image || '',
          });

          router.refresh();
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : typeof error === 'object' && error !== null && 'message' in error
              ? String((error as { message: unknown }).message)
              : 'Terjadi kesalahan yang tidak diketahui';

        toast.error(`Gagal memperbarui profil: ${errorMessage}`);
      } finally {
        setIsUpdating(false);
      }
    },
    [userProfile, handleEmailChange, router],
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <CardTitle>Profil Pengguna</CardTitle>
        <CardDescription>Kelola informasi profil Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-[1fr_3fr] gap-8 pt-6">
          {/* Avatar upload section */}
          <div className="flex flex-col items-center space-y-4">
            {' '}
            <AvatarUpload
              currentImage={userProfile?.image || ''}
              name={userProfile?.name || ''}
              onImageChange={handleImageChange}
            />
          </div>

          {/* Profile form section */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleProfileUpdate)}
                className="space-y-6"
              >
                {' '}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nama lengkap yang akan ditampilkan di profil Anda
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contoh@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Email untuk login dan notifikasi
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <Input
                        type="hidden"
                        {...field}
                        value={field.value || ''}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <div className="pt-2 flex justify-end">
                  {' '}
                  <Button
                    type="submit"
                    disabled={isUpdating || !hasFormChanges}
                  >
                    {isUpdating ? 'Memperbarui...' : 'Perbarui Profil'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
