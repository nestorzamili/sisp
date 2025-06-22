'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CalendarIcon, Send, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { broadcastNotification, BroadcastNotificationData } from '../action';
import { Checkbox } from '@/components/ui/checkbox';

const broadcastSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Judul wajib diisi')
      .max(100, 'Judul maksimal 100 karakter'),
    message: z
      .string()
      .min(1, 'Pesan wajib diisi')
      .max(500, 'Pesan maksimal 500 karakter'),
    type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    category: z.enum([
      'SYSTEM',
      'APPROVAL',
      'DATA_SUBMISSION',
      'REMINDER',
      'ANNOUNCEMENT',
    ]),
    targetAudience: z.enum(['ALL', 'USERS_ONLY', 'ADMINS_ONLY']),
    actionUrl: z.string().optional(),
    actionLabel: z.string().optional(),
    hasExpiration: z.boolean(),
    expiresAt: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.hasExpiration) {
        return data.expiresAt !== undefined;
      }
      return true;
    },
    {
      message: 'Tanggal kedaluwarsa harus diisi jika expiration diaktifkan',
      path: ['expiresAt'],
    },
  );

type BroadcastFormData = z.infer<typeof broadcastSchema>;

interface BroadcastFormProps {
  onSuccess?: () => void;
}

export function BroadcastForm({ onSuccess }: BroadcastFormProps) {
  const [showBroadcastDialog, setShowBroadcastDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] =
    useState<BroadcastFormData | null>(null);

  const form = useForm<BroadcastFormData>({
    resolver: zodResolver(broadcastSchema),
    defaultValues: {
      title: '',
      message: '',
      type: 'INFO',
      priority: 'MEDIUM',
      category: 'ANNOUNCEMENT',
      targetAudience: 'ALL',
      actionUrl: '',
      actionLabel: '',
      hasExpiration: false,
    },
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return '✅';
      case 'WARNING':
        return '⚠️';
      case 'ERROR':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'Rendah';
      case 'MEDIUM':
        return 'Sedang';
      case 'HIGH':
        return 'Tinggi';
      case 'URGENT':
        return 'Mendesak';
      default:
        return 'Tidak diketahui';
    }
  };

  const onSubmit = async (data: BroadcastFormData) => {
    setFormDataToSubmit(data);
    setShowConfirmDialog(true);
  };

  const getAudienceDescription = (audience: string) => {
    switch (audience) {
      case 'ALL':
        return 'Semua pengguna';
      case 'USERS_ONLY':
        return 'Hanya sekolah';
      case 'ADMINS_ONLY':
        return 'Hanya admin';
      default:
        return 'Target tidak diketahui';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'SYSTEM':
        return 'Sistem';
      case 'APPROVAL':
        return 'Persetujuan';
      case 'DATA_SUBMISSION':
        return 'Submisi Data';
      case 'REMINDER':
        return 'Pengingat';
      case 'ANNOUNCEMENT':
        return 'Pengumuman';
      default:
        return 'Tidak diketahui';
    }
  };

  const handleConfirmSend = async () => {
    if (!formDataToSubmit) return;

    setIsSubmitting(true);
    try {
      const { hasExpiration, ...submitData } = formDataToSubmit;

      const broadcastData: BroadcastNotificationData = {
        ...submitData,
        expiresAt:
          hasExpiration && formDataToSubmit.expiresAt
            ? formDataToSubmit.expiresAt
            : undefined,
      };
      const result = await broadcastNotification(broadcastData);
      if (result.success) {
        const message = `Berhasil mengirim broadcast ke ${result.count || 0} pengguna`;
        toast.success(message);
        form.reset();
        setShowConfirmDialog(false);
        setShowBroadcastDialog(false);
        setFormDataToSubmit(null);
        onSuccess?.();
      } else {
        toast.error(result.error || 'Gagal mengirim broadcast');
      }
    } catch {
      toast.error('Terjadi kesalahan saat mengirim broadcast');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSend = () => {
    setShowConfirmDialog(false);
    setFormDataToSubmit(null);
  };

  const handleCloseDialog = () => {
    setShowBroadcastDialog(false);
    form.reset();
  };

  return (
    <>
      {/* Tombol untuk membuka broadcast form */}
      <Button onClick={() => setShowBroadcastDialog(true)} size="default">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          Broadcast Notification
        </div>
      </Button>

      {/* Dialog Broadcast Form */}
      <Dialog
        open={showBroadcastDialog}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog();
          else setShowBroadcastDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Broadcast Notification
            </DialogTitle>
            <DialogDescription>
              Kirim notifikasi ke pengguna berdasarkan target audience yang
              dipilih
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Notifikasi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan judul notifikasi..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan pesan notifikasi..."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/500 karakter
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="INFO">ℹ️ Info</SelectItem>
                            <SelectItem value="SUCCESS">✅ Success</SelectItem>
                            <SelectItem value="WARNING">⚠️ Warning</SelectItem>
                            <SelectItem value="ERROR">❌ Error</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Priority */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioritas</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih prioritas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="LOW">Rendah</SelectItem>
                            <SelectItem value="MEDIUM">Sedang</SelectItem>
                            <SelectItem value="HIGH">Tinggi</SelectItem>
                            <SelectItem value="URGENT">Mendesak</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SYSTEM">Sistem</SelectItem>
                            <SelectItem value="APPROVAL">
                              Persetujuan
                            </SelectItem>
                            <SelectItem value="DATA_SUBMISSION">
                              Submisi Data
                            </SelectItem>
                            <SelectItem value="REMINDER">Pengingat</SelectItem>
                            <SelectItem value="ANNOUNCEMENT">
                              Pengumuman
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Target Audience */}
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih target audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ALL">
                            <div className="flex flex-col">
                              <span>Semua Pengguna</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="USERS_ONLY">
                            <div className="flex flex-col">
                              <span>Sekolah Saja</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="ADMINS_ONLY">
                            <div className="flex flex-col">
                              <span>Admin Saja</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {getAudienceDescription(field.value)}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action URL and Label */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="actionUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Aksi (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="/path/to/action" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL yang akan dituju saat notifikasi diklik
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="actionLabel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label Aksi (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Lihat Detail" {...field} />
                        </FormControl>
                        <FormDescription>
                          Teks tombol untuk aksi notifikasi
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Has Expiration */}
                <FormField
                  control={form.control}
                  name="hasExpiration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Atur tanggal kedaluwarsa notifikasi
                        </FormLabel>
                        <FormDescription>
                          Notifikasi akan dihapus secara otomatis setelah
                          tanggal ini
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Expiration Date */}
                {form.watch('hasExpiration') && (
                  <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Kedaluwarsa</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP', { locale: id })
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Notifikasi akan kedaluwarsa pada tanggal ini
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    Batal
                  </Button>
                  <Button type="submit">Lanjutkan</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Konfirmasi Broadcast
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin mengirim notifikasi broadcast ini?
            </DialogDescription>
          </DialogHeader>

          {formDataToSubmit && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <strong>Judul:</strong> {formDataToSubmit.title}
                </div>
                <div>
                  <strong>Pesan:</strong> {formDataToSubmit.message}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Tipe:</strong> {getTypeIcon(formDataToSubmit.type)}{' '}
                    {formDataToSubmit.type}
                  </div>
                  <div>
                    <strong>Prioritas:</strong>{' '}
                    {getPriorityLabel(formDataToSubmit.priority)}
                  </div>
                  <div>
                    <strong>Kategori:</strong>{' '}
                    {getCategoryLabel(formDataToSubmit.category)}
                  </div>
                  <div>
                    <strong>Target:</strong>{' '}
                    {getAudienceDescription(formDataToSubmit.targetAudience)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelSend}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button onClick={handleConfirmSend} disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Ya, Kirim Broadcast'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
