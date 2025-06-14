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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Upload,
  X,
  Plus,
  Trash2,
  FileImage,
  FileIcon,
  AlertCircle,
} from 'lucide-react';
import {
  step7Schema,
  Step7Data,
  jenisLampiranOptions,
} from '../_schema/attachments.schema';

interface AttachmentsFormProps {
  onSubmit: (data: Step7Data) => void;
  onBack: () => void;
}

export function AttachmentsForm({ onSubmit, onBack }: AttachmentsFormProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File }>(
    {},
  );

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

  const handleFileUpload = (index: number, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [index]: file }));
    form.setValue(`lampiran.${index}.namaFile`, file.name);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[index];
      return newFiles;
    });
    form.setValue(`lampiran.${index}.namaFile`, '');
  };

  const addLampiran = () => {
    append({
      jenisLampiran: '',
      namaFile: '',
      keterangan: '',
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension || '')) {
      return FileImage;
    }
    return FileIcon;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Format file yang didukung: PDF, DOC, DOCX, JPG, JPEG, PNG
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
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          remove(index);
                          removeFile(index);
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name={`lampiran.${index}.jenisLampiran`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium">
                            Jenis Lampiran
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis lampiran" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jenisLampiranOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* File Upload Section */}
                    <div className="space-y-2">
                      <FormLabel className="text-sm font-medium">
                        Upload File
                      </FormLabel>
                      {uploadedFiles[index] ? (
                        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                          <div className="flex items-center gap-2 flex-1">
                            {React.createElement(
                              getFileIcon(uploadedFiles[index].name),
                              {
                                className: 'w-5 h-5 text-green-600',
                              },
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-green-900 truncate">
                                {uploadedFiles[index].name}
                              </p>
                              <p className="text-xs text-green-600">
                                {formatFileSize(uploadedFiles[index].size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            id={`file-${index}`}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(index, file);
                              }
                            }}
                          />
                          <label
                            htmlFor={`file-${index}`}
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium text-primary">
                                Klik untuk upload
                              </span>{' '}
                              atau drag file ke sini
                            </div>
                            <div className="text-xs text-muted-foreground">
                              PDF, DOC, DOCX, JPG, PNG (Max. 5MB)
                            </div>
                          </label>
                        </div>
                      )}
                      <FormField
                        control={form.control}
                        name={`lampiran.${index}.namaFile`}
                        render={() => <FormMessage />}
                      />
                    </div>
                  </div>

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
                  {Object.keys(uploadedFiles).length}
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
