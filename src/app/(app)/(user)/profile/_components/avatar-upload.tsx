'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  IconCamera,
  IconEdit,
  IconUser,
  IconTrash,
  IconLoader,
  IconMaximize,
  IconX,
} from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import logger from '@/lib/logger';

interface AvatarUploadProps {
  currentImage?: string | null;
  name?: string;
  onImageChange: (imageUrl: string) => void;
}

export function AvatarUpload({
  currentImage,
  name = '',
  onImageChange,
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(currentImage || '');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update image when currentImage prop changes
  useEffect(() => {
    if (currentImage !== undefined) {
      setImage(currentImage || '');
    }
  }, [currentImage]);

  // Close lightbox with ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    if (lightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const getInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, []);
  const handleRemoveImage = useCallback(() => {
    setImage('');
    onImageChange('');
    toast.success('Foto profil berhasil dihapus');
  }, [onImageChange]);
  const handleImageChange = useCallback(
    (imageUrl: string) => {
      setImage(imageUrl);
      onImageChange(imageUrl);
    },
    [onImageChange],
  );
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Silakan pilih file gambar yang valid');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'sisp/profiles');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (result.success && result.url) {
          handleImageChange(result.url);
          // Toast success akan ditampilkan di profile form
        } else {
          toast.error(result.error || 'Gagal mengupload gambar');
        }
      } catch (error) {
        logger.error({ err: error }, 'Error uploading image');
        toast.error('Gagal mengupload gambar');
      } finally {
        setIsUploading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [handleImageChange],
  );

  const openLightbox = useCallback(() => {
    if (image) {
      setLightboxOpen(true);
    }
  }, [image]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h4 className="text-sm font-medium text-foreground mb-1">
          Foto Profil
        </h4>
        <p className="text-xs text-muted-foreground">Klik untuk memperbesar</p>
      </div>

      <div className="relative group">
        <Avatar
          className="h-36 w-36 border-3 border-border shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={openLightbox}
        >
          {image ? (
            <AvatarImage
              src={image}
              alt={name}
              className="object-cover transition-opacity duration-200 hover:opacity-90 cursor-pointer"
            />
          ) : (
            <AvatarFallback className="text-3xl bg-muted/50">
              {name ? getInitials(name) : <IconUser size={36} />}
            </AvatarFallback>
          )}

          {/* Zoom indicator on hover */}
          {image && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
              <IconMaximize className="h-5 w-5 text-white" />
            </div>
          )}
        </Avatar>{' '}
        <div className="absolute -bottom-2 -right-2 flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-10 w-10 rounded-full shadow-lg hover:scale-105 transition-transform border border-border"
              >
                {isUploading && <IconLoader className="h-4 w-4 animate-spin" />}
                {!isUploading && image && <IconEdit className="h-4 w-4" />}
                {!isUploading && !image && <IconCamera className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {image ? 'Ubah Foto' : 'Upload Foto'}
            </TooltipContent>
          </Tooltip>
          {image && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveImage}
                  className="h-10 w-10 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Hapus Foto</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Avatar Lightbox */}
      {lightboxOpen && image && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 rounded-full bg-background/50 hover:bg-background/80"
              onClick={() => setLightboxOpen(false)}
            >
              <IconX className="h-5 w-5" />
            </Button>

            <div className="relative max-h-[80vh] max-w-full rounded-lg overflow-hidden">
              {' '}
              <Image
                src={image}
                alt={name || 'Foto Profil'}
                width={600}
                height={600}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
