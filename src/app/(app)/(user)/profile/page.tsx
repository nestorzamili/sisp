'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCircle2, Lock } from 'lucide-react';
import ProfileForm from './_components/profile-form';
import ChangePasswordForm from './_components/change-password-form';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Profil Saya
            </h1>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
              Kelola informasi profil dan keamanan akun Anda
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-card rounded-xl shadow-md border border-border/50 p-6 sm:p-8">
            <Tabs defaultValue="profile" className="space-y-6">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-sm grid-cols-2 h-11">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <UserCircle2 size={16} />
                    <span>Profil</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Lock size={16} />
                    <span>Keamanan</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="space-y-0">
                <div className="max-w-full mx-auto">
                  <ProfileForm />
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-0">
                <div className="max-w-2xl mx-auto">
                  <ChangePasswordForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
