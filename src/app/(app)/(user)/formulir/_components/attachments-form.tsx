import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Upload,
  X,
  Plus,
  Trash2,
  FileImage,
  FileIcon,
  AlertCircle,
  Loader2,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { step7Schema, Step7Data } from '../_schema/attachments.schema';
import { UploadResponse } from '@/types/lampiran';
import { getLampiranDataAction } from '../_actions/lampiran-data.action';
import Image from 'next/image';

interface AttachmentsFormProps {
  onSubmit: (data: Step7Data) => void;
  onBack: () => void;
  disabled?: boolean;
}

export function AttachmentsForm({
  onSubmit,
  onBack,
  disabled = false,
}: AttachmentsFormProps) {
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const form = useForm<Step7Data>({
    resolver: zodResolver(step7Schema),
    defaultValues: {
      lampiran: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lampiran',
  });

  // Load existing lampiran data
  useEffect(() => {
    async function loadLampiranData() {
      try {
        const result = await getLampiranDataAction();
        if (result.success && result.data) {
          const lampiranData = result.data.map((item) => ({
            nama_dokumen: item.nama_dokumen,
            url: item.url,
            keterangan: item.keterangan || '',
          }));
          form.setValue('lampiran', lampiranData);
        }
      } catch (error) {
        console.error('Error loading lampiran data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLampiranData();
  }, [form]);

  const handleFileUpload = async (index: number, file: File) => {
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    // Validate file type - only images and PDFs
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        'Format file tidak didukung. Gunakan PDF, JPG, JPEG, PNG, atau WebP',
      );
      return;
    }

    setUploading((prev) => ({ ...prev, [index]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'sisp/lampiran');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();

      if (result.success && result.url) {
        // Update form with the uploaded file URL and name
        form.setValue(`lampiran.${index}.url`, result.url);
        form.setValue(`lampiran.${index}.nama_dokumen`, file.name);
        toast.success('File berhasil diupload');
      } else {
        toast.error(result.error || 'Gagal mengupload file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Terjadi kesalahan saat mengupload file');
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const addLampiran = () => {
    append({
      nama_dokumen: '',
      url: '',
      keterangan: '',
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (
      ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')
    ) {
      return FileImage;
    }
    return FileIcon;
  };

  const isImageFile = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(
      extension || '',
    );
  };

  const FilePreview = ({
    url,
    fileName,
  }: {
    url: string;
    fileName: string;
  }) => {
    if (isImageFile(url)) {
      return (
        <div className="relative aspect-video w-full max-w-4xl mx-auto">
          <Image
            src={url}
            alt={fileName}
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <FileIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 text-center">
          File PDF tidak dapat dipratinjau
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Buka File
          </a>
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Memuat data lampiran...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Lampiran Dokumen Pendukung (Opsional)
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Upload dokumen pendukung seperti foto kondisi sarana prasarana,
              data siswa, rencana pengembangan, atau dokumen lainnya yang
              relevan (tidak wajib)
            </p>
          </div>

          {/* Upload Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">
                  Panduan Upload Dokumen
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Format file yang didukung: PDF, JPG, JPEG, PNG, WebP
                    (Maksimal 5MB per file)
                  </li>
                  <li>
                    • Pastikan foto kondisi sarana prasarana jelas dan dapat
                    menunjukkan kondisi sebenarnya
                  </li>
                  <li>
                    • Berikan keterangan yang jelas untuk setiap dokumen yang
                    diupload
                  </li>
                  <li>• Dokumen akan diverifikasi oleh tim Dinas Pendidikan</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Add Initial Button if no attachments */}
          {fields.length === 0 && (
            <div className="text-center py-8">
              <Button
                type="button"
                variant="outline"
                onClick={addLampiran}
                className="flex items-center gap-2"
                disabled={disabled}
              >
                <Plus className="w-4 h-4" />
                Tambah Lampiran (Opsional)
              </Button>
            </div>
          )}

          {/* Attachments List */}
          {fields.length > 0 && (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 border border-border rounded-lg bg-card relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">
                      Lampiran {index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      {form.watch(`lampiran.${index}.url`) && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {React.createElement(
                                  getFileIcon(
                                    form.watch(
                                      `lampiran.${index}.nama_dokumen`,
                                    ) || '',
                                  ),
                                  { className: 'w-5 h-5' },
                                )}
                                {form.watch(`lampiran.${index}.nama_dokumen`)}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <FilePreview
                                url={form.watch(`lampiran.${index}.url`)}
                                fileName={
                                  form.watch(
                                    `lampiran.${index}.nama_dokumen`,
                                  ) || ''
                                }
                              />
                              {form.watch(`lampiran.${index}.keterangan`) && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm font-medium mb-1">
                                    Keterangan:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {form.watch(`lampiran.${index}.keterangan`)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={disabled}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Document Name Field */}
                    <FormField
                      control={form.control}
                      name={`lampiran.${index}.nama_dokumen`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium">
                            Nama Dokumen
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama dokumen..."
                              {...field}
                              readOnly={uploading[index]}
                              disabled={disabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* File Upload Section */}
                    <div className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Upload File
                      </FormLabel>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        {form.watch(`lampiran.${index}.url`) ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {React.createElement(
                                getFileIcon(
                                  form.watch(
                                    `lampiran.${index}.nama_dokumen`,
                                  ) || '',
                                ),
                                {
                                  className: 'w-5 h-5 text-primary',
                                },
                              )}
                              <span className="text-sm text-foreground truncate">
                                {form.watch(`lampiran.${index}.nama_dokumen`)}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                form.setValue(`lampiran.${index}.url`, '');
                                form.setValue(
                                  `lampiran.${index}.nama_dokumen`,
                                  '',
                                );
                              }}
                              className="text-red-600 hover:text-red-700"
                              disabled={disabled}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              id={`file-${index}`}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png,.webp"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(index, file);
                                }
                              }}
                              disabled={uploading[index] || disabled}
                            />
                            <label
                              htmlFor={`file-${index}`}
                              className={`cursor-pointer ${uploading[index] ? 'cursor-not-allowed' : ''}`}
                            >
                              {uploading[index] ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span className="text-sm text-muted-foreground">
                                    Mengupload...
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="w-6 h-6 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    Klik untuk upload file
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    PDF, JPG, JPEG, PNG, WebP (max 5MB)
                                  </span>
                                </div>
                              )}
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description Field */}
                  <FormField
                    control={form.control}
                    name={`lampiran.${index}.keterangan`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">
                          Keterangan
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Berikan keterangan mengenai dokumen ini..."
                            className="resize-none"
                            rows={3}
                            {...field}
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* Add More Button */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLampiran}
                  className="flex items-center gap-2"
                  disabled={disabled}
                >
                  <Plus className="w-4 h-4" />
                  Tambah Lampiran Lainnya
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Kembali
          </Button>
          <Button type="submit" disabled={disabled}>
            Selesai & Kirim Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
