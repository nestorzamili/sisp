import React, { useState } from 'react';
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
  Upload,
  X,
  Plus,
  Trash2,
  FileImage,
  FileIcon,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { step7Schema, Step7Data } from '../_schema/attachments.schema';
import { UploadResponse } from '@/types/lampiran';

interface AttachmentsFormProps {
  onSubmit: (data: Step7Data) => void;
  onBack: () => void;
}

export function AttachmentsForm({ onSubmit, onBack }: AttachmentsFormProps) {
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});

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

  const handleFileUpload = async (index: number, file: File) => {
    if (!file) return; // Validate file size (5MB max)
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
                </h4>{' '}
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
                      Lampiran #{index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            {' '}
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
                              disabled={uploading[index]}
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
                                  </span>{' '}
                                  <span className="text-xs text-muted-foreground">
                                    PDF, JPG, JPEG, PNG, WebP (max 5MB)
                                  </span>
                                </div>
                              )}
                            </label>
                          </div>
                        )}
                      </div>
                      <FormField
                        control={form.control}
                        name={`lampiran.${index}.url`}
                        render={() => <FormMessage />}
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <FormField
                    control={form.control}
                    name={`lampiran.${index}.keterangan`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">
                          Keterangan Lampiran
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan detail tentang dokumen ini, kondisi yang ditunjukkan, atau informasi penting lainnya..."
                            className="min-h-20 resize-y"
                            {...field}
                          />
                        </FormControl>
                        <div className="text-xs text-muted-foreground">
                          {field.value?.length || 0}/500 karakter
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Add More Button */}
          {fields.length > 0 && (
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={addLampiran}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Lampiran Lain
              </Button>
            </div>
          )}

          {/* Summary */}
          {fields.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">
                Ringkasan Lampiran
              </h4>
              <p className="text-sm text-muted-foreground">
                Total dokumen:{' '}
                <span className="font-medium text-primary">
                  {fields.length}
                </span>{' '}
                file
              </p>
              <p className="text-sm text-muted-foreground">
                File terupload:{' '}
                <span className="font-medium text-primary">
                  {
                    fields.filter((_, index) =>
                      form.watch(`lampiran.${index}.url`),
                    ).length
                  }
                </span>{' '}
                file
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="text-sm px-6 py-2"
          >
            Kembali
          </Button>
          <Button type="submit" className="btn-primary text-sm px-6 py-2">
            Selesai & Kirim Semua Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
