'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Container } from '@/components/layout/container';
import { UserCircle2, Lock } from 'lucide-react';
import ProfileForm from './_components/profile-form';
import ChangePasswordForm from './_components/change-password-form';

export default function ProfilePage() {
  return (
    <>
      <Container>
        <div className="mx-auto max-w-3xl py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
            <p className="mt-2 text-muted-foreground">
              Halaman untuk mengelola profil Anda.
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle2 size={16} />
                <span>Profil</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={16} />
                <span>Kata Sandi</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>

            <TabsContent value="security">
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
