'use client';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  School,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  Building2,
  Hash,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SekolahWithDetails } from '@/types/sekolah';

interface InfoTabProps {
  data: SekolahWithDetails;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  important?: boolean;
  copyable?: boolean;
}

function InfoItem({
  icon,
  label,
  value,
  important = false,
  copyable = false,
}: InfoItemProps) {
  const isEmpty = !value || value === 'Belum diisi';

  const handleCopy = async () => {
    if (copyable && value) {
      await navigator.clipboard.writeText(value);
      // You could add a toast notification here
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div
        className={`mt-0.5 ${isEmpty ? 'text-muted-foreground/50' : 'text-primary'}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {label}
        </p>
        <div className="flex items-center gap-2">
          {isEmpty ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground italic">
                Belum diisi
              </span>
              <AlertCircle className="h-3 w-3 text-amber-500" />
            </div>
          ) : (
            <span
              className={`text-sm ${important ? 'font-semibold text-foreground' : 'text-foreground'} ${copyable ? 'cursor-pointer hover:text-primary' : ''}`}
              onClick={copyable ? handleCopy : undefined}
              title={copyable ? 'Klik untuk copy' : undefined}
            >
              {value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function InfoTab({ data }: InfoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <School className="h-5 w-5 text-primary" />
          Informasi Sekolah
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <InfoItem
              icon={<School className="h-4 w-4" />}
              label="Nama Sekolah"
              value={data.nama_sekolah}
              important={true}
            />
            <InfoItem
              icon={<Hash className="h-4 w-4" />}
              label="NPSN"
              value={data.npsn}
              copyable={true}
            />
            <InfoItem
              icon={<User className="h-4 w-4" />}
              label="Kepala Sekolah"
              value={data.nama_kepala_sekolah}
            />
            <InfoItem
              icon={<MapPin className="h-4 w-4" />}
              label="Alamat"
              value={data.alamat_sekolah}
            />
            <InfoItem
              icon={<Building2 className="h-4 w-4" />}
              label="Kecamatan"
              value={data.kecamatan}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <InfoItem
              icon={<Phone className="h-4 w-4" />}
              label="Telepon"
              value={data.phone}
              copyable={true}
            />
            <InfoItem
              icon={<Mail className="h-4 w-4" />}
              label="Email User"
              value={data.user?.email}
              copyable={true}
            />
            <Separator className="my-6" />
            <InfoItem
              icon={<Calendar className="h-4 w-4" />}
              label="Terakhir Diperbarui"
              value={format(data.updatedAt, 'dd MMMM yyyy, HH:mm', {
                locale: id,
              })}
            />
            <InfoItem
              icon={<Calendar className="h-4 w-4" />}
              label="Tanggal Dibuat"
              value={format(data.createdAt, 'dd MMMM yyyy, HH:mm', {
                locale: id,
              })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
