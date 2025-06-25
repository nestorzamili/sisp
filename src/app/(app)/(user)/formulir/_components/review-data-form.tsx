'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  School,
  Users,
  GraduationCap,
  Building2,
  Wrench,
  Target,
  FileText,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { type FormulirCompleteData } from '@/types/formulir.types';

interface ReviewDataFormProps {
  initialData: FormulirCompleteData;
  onSubmit: () => void;
  onBack: () => void;
  disabled?: boolean;
}

export function ReviewDataForm({
  initialData,
  onSubmit,
  onBack,
  disabled = false,
}: ReviewDataFormProps) {
  // Helper functions
  const formatNumber = (value: number | undefined | null) => {
    return value ? value.toLocaleString('id-ID') : '0';
  };

  const SectionHeader = ({
    icon: Icon,
    title,
    isComplete,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    isComplete: boolean;
  }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-lg ${
            isComplete
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isComplete
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          />
        </div>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      </div>
      <Badge
        variant={isComplete ? 'default' : 'secondary'}
        className={`${
          isComplete
            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
            : ''
        }`}
      >
        {isComplete ? (
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Lengkap
          </div>
        ) : (
          'Belum lengkap'
        )}
      </Badge>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Review Data Formulir
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Periksa kembali semua data yang telah Anda masukkan sebelum mengirim
          formulir untuk proses verifikasi
        </p>
      </div>

      {/* Informasi Sekolah */}
      <Card>
        <CardHeader>
          <SectionHeader
            icon={School}
            title="Informasi Sekolah"
            isComplete={!!initialData.sekolah.nama_sekolah}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Nama Sekolah
              </label>
              <p className="text-foreground">
                {initialData.sekolah.nama_sekolah || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">NPSN</label>
              <p className="text-foreground">
                {initialData.sekolah.npsn || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Nama Kepala Sekolah
              </label>
              <p className="text-foreground">
                {initialData.sekolah.nama_kepala_sekolah || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                NIP Kepala Sekolah
              </label>
              <p className="text-foreground">
                {initialData.sekolah.nip_kepala_sekolah || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Alamat Sekolah
              </label>
              <p className="text-foreground">
                {initialData.sekolah.alamat_sekolah || '-'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Kecamatan
              </label>
              <p className="text-foreground">
                {initialData.sekolah.kecamatan || '-'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Guru dan Siswa - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Guru */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={Users}
              title="Data Guru"
              isComplete={initialData.guru.length > 0}
            />
          </CardHeader>
          <CardContent>
            {initialData.guru.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status Guru</TableHead>
                    <TableHead className="text-right">Laki-laki</TableHead>
                    <TableHead className="text-right">Perempuan</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // Group data by status_guru
                    const groupedData = initialData.guru.reduce(
                      (acc, guru) => {
                        if (!acc[guru.status_guru]) {
                          acc[guru.status_guru] = { L: 0, P: 0 };
                        }
                        acc[guru.status_guru][guru.jenis_kelamin] = guru.jumlah;
                        return acc;
                      },
                      {} as Record<string, { L: number; P: number }>,
                    );

                    return Object.entries(groupedData).map(([status, data]) => (
                      <TableRow key={status}>
                        <TableCell className="font-medium">{status}</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(data.L)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatNumber(data.P)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatNumber(data.L + data.P)}
                        </TableCell>
                      </TableRow>
                    ));
                  })()}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">Belum ada data guru</p>
            )}
          </CardContent>
        </Card>

        {/* Data Siswa */}
        <Card>
          <CardHeader>
            <SectionHeader
              icon={GraduationCap}
              title="Data Siswa"
              isComplete={initialData.rombonganBelajar.length > 0}
            />
          </CardHeader>
          <CardContent>
            {initialData.rombonganBelajar.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tingkatan Kelas</TableHead>
                    <TableHead className="text-right">Laki-laki</TableHead>
                    <TableHead className="text-right">Perempuan</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    // Group data by tingkatan_kelas
                    const groupedData = initialData.rombonganBelajar.reduce(
                      (acc, rombel) => {
                        if (!acc[rombel.tingkatan_kelas]) {
                          acc[rombel.tingkatan_kelas] = { L: 0, P: 0 };
                        }
                        acc[rombel.tingkatan_kelas][rombel.jenis_kelamin] =
                          rombel.jumlah_siswa;
                        return acc;
                      },
                      {} as Record<string, { L: number; P: number }>,
                    );

                    // Sort by class level (7, 8, 9)
                    return Object.entries(groupedData)
                      .sort(([a], [b]) => parseInt(a) - parseInt(b))
                      .map(([kelas, data]) => (
                        <TableRow key={kelas}>
                          <TableCell className="font-medium">
                            Kelas {kelas}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatNumber(data.L)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatNumber(data.P)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatNumber(data.L + data.P)}
                          </TableCell>
                        </TableRow>
                      ));
                  })()}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">Belum ada data siswa</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Sarana */}
      <Card>
        <CardHeader>
          <SectionHeader
            icon={Building2}
            title="Data Sarana"
            isComplete={initialData.sarana.length > 0}
          />
        </CardHeader>
        <CardContent>
          {initialData.sarana.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Sarana</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Baik</TableHead>
                  <TableHead className="text-right">Rusak</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialData.sarana.map((sarana, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {sarana.nama_sarana}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(sarana.jumlah_total)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(sarana.jumlah_kondisi_baik)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(sarana.jumlah_kondisi_rusak)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sarana.keterangan || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">Belum ada data sarana</p>
          )}
        </CardContent>
      </Card>

      {/* Data Prasarana */}
      <Card>
        <CardHeader>
          <SectionHeader
            icon={Wrench}
            title="Data Prasarana"
            isComplete={initialData.prasarana.length > 0}
          />
        </CardHeader>
        <CardContent>
          {initialData.prasarana.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Prasarana</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Baik</TableHead>
                  <TableHead className="text-right">Rusak</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialData.prasarana.map((prasarana, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {prasarana.nama_prasarana}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(prasarana.jumlah_total)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(prasarana.jumlah_kondisi_baik)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(prasarana.jumlah_kondisi_rusak)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {prasarana.keterangan || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">Belum ada data prasarana</p>
          )}
        </CardContent>
      </Card>

      {/* Kebutuhan Prioritas */}
      <Card>
        <CardHeader>
          <SectionHeader
            icon={Target}
            title="Kebutuhan Prioritas"
            isComplete={initialData.kebutuhanPrioritas.length > 0}
          />
        </CardHeader>
        <CardContent>
          {initialData.kebutuhanPrioritas.length > 0 ? (
            <div className="space-y-4">
              {initialData.kebutuhanPrioritas.map((kebutuhan, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <p className="text-foreground">{kebutuhan.penjelasan}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Belum ada data kebutuhan prioritas
            </p>
          )}
        </CardContent>
      </Card>

      {/* Lampiran */}
      <Card>
        <CardHeader>
          <SectionHeader
            icon={FileText}
            title="Lampiran"
            isComplete={initialData.lampiran.length > 0}
          />
        </CardHeader>
        <CardContent>
          {initialData.lampiran.length > 0 ? (
            <div className="space-y-3">
              {initialData.lampiran.map((lampiran, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{lampiran.nama_dokumen}</p>
                      <p className="text-sm text-muted-foreground">
                        {lampiran.keterangan}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(lampiran.url, '_blank')}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Lihat Data
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Belum ada lampiran</p>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="text-sm px-6 py-2"
          disabled={disabled}
        >
          Kembali
        </Button>
        <Button
          type="button"
          className="btn-primary text-sm px-6 py-2"
          onClick={onSubmit}
          disabled={disabled}
        >
          Kirim untuk Verifikasi
        </Button>
      </div>
    </div>
  );
}
