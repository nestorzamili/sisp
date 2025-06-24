'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  AlertCircle,
  Download,
  ExternalLink,
  Eye,
} from 'lucide-react';
import {
  getReviewDataAction,
  type ReviewData,
} from '../_actions/review-data.action';

interface ReviewDataFormProps {
  onSubmit: () => void;
  onBack: () => void;
  disabled?: boolean;
}

export function ReviewDataForm({
  onSubmit,
  onBack,
  disabled = false,
}: ReviewDataFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load review data on component mount
  useEffect(() => {
    async function loadReviewData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const result = await getReviewDataAction();

        if (result.success && result.data) {
          setReviewData(result.data);
        } else {
          setLoadError(result.error || 'Gagal memuat data review');
        }
      } catch (error) {
        console.error('Error loading review data:', error);
        setLoadError('Terjadi kesalahan saat memuat data');
      } finally {
        setIsLoading(false);
      }
    }

    loadReviewData();
  }, []);

  // Handle final submission - trigger confirmation dialog
  const handleSubmit = () => {
    // Call onSubmit which will show confirmation dialog
    onSubmit();
  };

  // Helper functions
  const getKecamatanName = (kecamatan: string) => {
    // KECAMATAN_LIST adalah array string, langsung return kecamatan
    return kecamatan;
  };

  const formatNumber = (value: number | undefined | null) => {
    return value ? value.toLocaleString('id-ID') : '0';
  };

  const isDataComplete = (data: unknown): boolean => {
    if (!data || typeof data !== 'object' || data === null) return false;
    return Object.keys(data).length > 0;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf' ? FileText : Download;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat data review...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{loadError}</AlertDescription>
      </Alert>
    );
  }

  const SectionHeader = ({
    icon: Icon,
    title,
    isComplete,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    isComplete: boolean;
  }) => (
    <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Belum Lengkap
          </div>
        )}
      </Badge>
    </div>
  );

  const DataRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-b-0">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Eye className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Review Data Formulir
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Periksa kembali semua data yang telah Anda isi sebelum mengirim untuk
          review. Pastikan semua informasi sudah benar dan lengkap.
        </p>
      </div>

      {/* Step 1: School Information */}
      <Card className="shadow-sm border-0 bg-card/50">
        <CardHeader className="pb-4">
          <SectionHeader
            icon={School}
            title="Informasi Sekolah"
            isComplete={isDataComplete(reviewData?.schoolInfo)}
          />
        </CardHeader>
        <CardContent className="pt-0">
          {reviewData?.schoolInfo ? (
            <div className="space-y-1">
              <DataRow
                label="Nama Sekolah"
                value={reviewData.schoolInfo.namaSekolah}
              />
              <DataRow label="NPSN" value={reviewData.schoolInfo.npsn} />
              <DataRow
                label="Nama Kepala Sekolah"
                value={reviewData.schoolInfo.namaKepalaSekolah}
              />
              <DataRow
                label="NIP Kepala Sekolah"
                value={reviewData.schoolInfo.nipKepalaSekolah}
              />
              <DataRow
                label="Alamat Sekolah"
                value={reviewData.schoolInfo.alamatSekolah}
              />
              <DataRow
                label="Kecamatan"
                value={getKecamatanName(reviewData.schoolInfo.kecamatan)}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Data belum diisi</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Steps 2 & 3: Teacher and Student Data - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teacher Data */}
        <Card className="shadow-sm border-0 bg-card/50">
          <CardHeader className="pb-4">
            <SectionHeader
              icon={Users}
              title="Data Guru"
              isComplete={isDataComplete(reviewData?.teacherData)}
            />
          </CardHeader>
          <CardContent className="pt-0">
            {reviewData?.teacherData ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">
                        Jenis Guru
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Laki-laki
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Perempuan
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Guru PNS</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.teacherData.guruPnsLaki)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.teacherData.guruPnsPerempuan)}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(
                          (reviewData.teacherData.guruPnsLaki || 0) +
                            (reviewData.teacherData.guruPnsPerempuan || 0),
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Guru PPPP</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.teacherData.guruPpppLaki)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.teacherData.guruPpppPerempuan)}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(
                          (reviewData.teacherData.guruPpppLaki || 0) +
                            (reviewData.teacherData.guruPpppPerempuan || 0),
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Guru GTT</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.teacherData.guruGttLaki)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.teacherData.guruGttPerempuan)}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(
                          (reviewData.teacherData.guruGttLaki || 0) +
                            (reviewData.teacherData.guruGttPerempuan || 0),
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Data belum diisi
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Data */}
        <Card className="shadow-sm border-0 bg-card/50">
          <CardHeader className="pb-4">
            <SectionHeader
              icon={GraduationCap}
              title="Data Siswa"
              isComplete={isDataComplete(reviewData?.studentData)}
            />
          </CardHeader>
          <CardContent className="pt-0">
            {reviewData?.studentData ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Kelas</TableHead>
                      <TableHead className="text-center font-semibold">
                        Laki-laki
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Perempuan
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Kelas 7</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.studentData.siswaKelas7Laki)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(
                          reviewData.studentData.siswaKelas7Perempuan,
                        )}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(
                          (reviewData.studentData.siswaKelas7Laki || 0) +
                            (reviewData.studentData.siswaKelas7Perempuan || 0),
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Kelas 8</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.studentData.siswaKelas8Laki)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(
                          reviewData.studentData.siswaKelas8Perempuan,
                        )}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(
                          (reviewData.studentData.siswaKelas8Laki || 0) +
                            (reviewData.studentData.siswaKelas8Perempuan || 0),
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Kelas 9</TableCell>
                      <TableCell className="text-center">
                        {formatNumber(reviewData.studentData.siswaKelas9Laki)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(
                          reviewData.studentData.siswaKelas9Perempuan,
                        )}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(
                          (reviewData.studentData.siswaKelas9Laki || 0) +
                            (reviewData.studentData.siswaKelas9Perempuan || 0),
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Data belum diisi
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Step 4: Facility Data */}
      <Card className="shadow-sm border-0 bg-card/50">
        <CardHeader className="pb-4">
          <SectionHeader
            icon={Building2}
            title="Data Sarana"
            isComplete={isDataComplete(reviewData?.facilityData)}
          />
        </CardHeader>
        <CardContent className="pt-0">
          {reviewData?.facilityData ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">
                      Jenis Sarana
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Total
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Baik
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Rusak
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Keterangan
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { key: 'ruangKelas', label: 'Ruang Kelas' },
                    { key: 'perpustakaan', label: 'Perpustakaan' },
                    {
                      key: 'ruangKepalaSekolah',
                      label: 'Ruang Kepala Sekolah',
                    },
                    { key: 'ruangGuru', label: 'Ruang Guru' },
                    { key: 'aulaPertemuan', label: 'Aula Pertemuan' },
                    { key: 'laboratoriumIpa', label: 'Laboratorium IPA' },
                    { key: 'laboratoriumBahasa', label: 'Laboratorium Bahasa' },
                    { key: 'laboratoriumTik', label: 'Laboratorium TIK' },
                  ].map((facility, index) => {
                    const facilityData = reviewData?.facilityData as Record<
                      string,
                      unknown
                    >;
                    const total =
                      (facilityData?.[`${facility.key}Total`] as number) || 0;
                    const baik =
                      (facilityData?.[`${facility.key}Baik`] as number) || 0;
                    const rusak =
                      (facilityData?.[`${facility.key}Rusak`] as number) || 0;
                    const keterangan =
                      (facilityData?.[`${facility.key}Keterangan`] as string) ||
                      '-';

                    return (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          {facility.label}
                        </TableCell>
                        <TableCell className="text-center">
                          {formatNumber(total)}
                        </TableCell>
                        <TableCell className="text-center text-green-600">
                          {formatNumber(baik)}
                        </TableCell>
                        <TableCell className="text-center text-red-600">
                          {formatNumber(rusak)}
                        </TableCell>
                        <TableCell className="text-center text-xs">
                          {keterangan}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Data belum diisi</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 5: Infrastructure Data */}
      <Card className="shadow-sm border-0 bg-card/50">
        <CardHeader className="pb-4">
          <SectionHeader
            icon={Wrench}
            title="Data Prasarana"
            isComplete={isDataComplete(reviewData?.infrastructureData)}
          />
        </CardHeader>
        <CardContent className="pt-0">
          {reviewData?.infrastructureData ? (
            <div className="space-y-6">
              {/* Main Infrastructure Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">
                        Jenis Prasarana
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Total
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Baik
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Rusak
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Keterangan
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { key: 'mejaKursiSiswa', label: 'Meja & Kursi Siswa' },
                      { key: 'komputer', label: 'Komputer' },
                      { key: 'toiletSiswa', label: 'Toilet Siswa' },
                      { key: 'toiletGuru', label: 'Toilet Guru' },
                    ].map((infrastructure, index) => {
                      const infrastructureData =
                        reviewData?.infrastructureData as Record<
                          string,
                          unknown
                        >;
                      const total =
                        (infrastructureData?.[
                          `${infrastructure.key}Total`
                        ] as number) || 0;
                      const baik =
                        (infrastructureData?.[
                          `${infrastructure.key}Baik`
                        ] as number) || 0;
                      const rusak =
                        (infrastructureData?.[
                          `${infrastructure.key}Rusak`
                        ] as number) || 0;
                      const keterangan =
                        (infrastructureData?.[
                          `${infrastructure.key}Keterangan`
                        ] as string) || '-';

                      return (
                        <TableRow key={index} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            {infrastructure.label}
                          </TableCell>
                          <TableCell className="text-center">
                            {formatNumber(total)}
                          </TableCell>
                          <TableCell className="text-center text-green-600">
                            {formatNumber(baik)}
                          </TableCell>
                          <TableCell className="text-center text-red-600">
                            {formatNumber(rusak)}
                          </TableCell>
                          <TableCell className="text-center text-xs">
                            {keterangan}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Prasarana Lainnya */}
              {reviewData?.infrastructureData?.prasaranaLainnya &&
                reviewData.infrastructureData.prasaranaLainnya.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-4 border-b border-border/50 pb-2">
                      Prasarana Lainnya
                    </h4>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">
                              Nama Prasarana
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                              Total
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                              Baik
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                              Rusak
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                              Keterangan
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reviewData.infrastructureData.prasaranaLainnya.map(
                            (
                              item: {
                                nama: string;
                                jumlahTotal: number;
                                jumlahBaik: number;
                                jumlahRusak: number;
                                keterangan?: string;
                              },
                              index: number,
                            ) => (
                              <TableRow
                                key={index}
                                className="hover:bg-muted/30"
                              >
                                <TableCell className="font-medium">
                                  {item.nama}
                                </TableCell>
                                <TableCell className="text-center">
                                  {formatNumber(item.jumlahTotal)}
                                </TableCell>
                                <TableCell className="text-center text-green-600">
                                  {formatNumber(item.jumlahBaik)}
                                </TableCell>
                                <TableCell className="text-center text-red-600">
                                  {formatNumber(item.jumlahRusak)}
                                </TableCell>
                                <TableCell className="text-center text-xs">
                                  {item.keterangan || '-'}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Wrench className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Data belum diisi</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 6: Priority Needs */}
      <Card className="shadow-sm border-0 bg-card/50">
        <CardHeader className="pb-4">
          <SectionHeader
            icon={Target}
            title="Kebutuhan Prioritas"
            isComplete={isDataComplete(reviewData?.priorityNeedsData)}
          />
        </CardHeader>
        <CardContent className="pt-0">
          {reviewData?.priorityNeedsData?.kebutuhanPrioritas ? (
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm leading-relaxed text-foreground">
                {reviewData.priorityNeedsData.kebutuhanPrioritas}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Data belum diisi</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 7: Attachments */}
      <Card className="shadow-sm border-0 bg-card/50">
        <CardHeader className="pb-4">
          <SectionHeader
            icon={FileText}
            title="Lampiran"
            isComplete={isDataComplete(reviewData?.attachmentsData)}
          />
        </CardHeader>
        <CardContent className="pt-0">
          {reviewData?.attachmentsData &&
          reviewData.attachmentsData.length > 0 ? (
            <div className="space-y-3">
              {reviewData.attachmentsData.map(
                (
                  attachment: {
                    id: string;
                    nama_dokumen: string;
                    url: string;
                    keterangan: string;
                  },
                  index: number,
                ) => {
                  const FileIcon = getFileIcon(attachment.nama_dokumen);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {attachment.nama_dokumen}
                          </p>
                          {attachment.keterangan && (
                            <p className="text-xs text-muted-foreground">
                              {attachment.keterangan}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Lihat
                        </a>
                      </Button>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">
                Belum ada lampiran
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={disabled}
        >
          Kembali
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={disabled}
          className="min-w-32"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Submit Data
        </Button>
      </div>
    </div>
  );
}
