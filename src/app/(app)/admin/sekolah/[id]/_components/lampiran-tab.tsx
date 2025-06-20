'use client';

import React from 'react';
import {
  FileText,
  Download,
  Eye,
  FileImage,
  FileIcon,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SekolahWithDetails } from '@/types/sekolah';
import Image from 'next/image';

interface LampiranTabProps {
  data: SekolahWithDetails;
}

export function LampiranTab({ data }: LampiranTabProps) {
  // Helper function to get file icon
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (
      ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')
    ) {
      return FileImage;
    }
    return FileIcon;
  };

  // Helper function to check if file is image
  const isImageFile = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(
      extension || '',
    );
  };

  // File Preview Component
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Lampiran ({data.lampiran?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.lampiran && data.lampiran.length > 0 ? (
          <div className="space-y-4">
            {data.lampiran.map((lampiran) => (
              <div
                key={lampiran.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {React.createElement(getFileIcon(lampiran.nama_dokumen), {
                    className: 'w-8 h-8 text-primary flex-shrink-0',
                  })}
                  <div className="space-y-1">
                    <p className="font-medium">{lampiran.nama_dokumen}</p>
                    {lampiran.keterangan && (
                      <p className="text-sm text-muted-foreground">
                        {lampiran.keterangan}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Lihat
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {React.createElement(
                            getFileIcon(lampiran.nama_dokumen),
                            { className: 'w-5 h-5' },
                          )}
                          {lampiran.nama_dokumen}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <FilePreview
                          url={lampiran.url}
                          fileName={lampiran.nama_dokumen}
                        />
                        {lampiran.keterangan && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium mb-1">
                              Keterangan:
                            </p>
                            <p className="text-sm text-gray-600">
                              {lampiran.keterangan}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>{' '}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(lampiran.url, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Unduh
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada lampiran
          </p>
        )}
      </CardContent>
    </Card>
  );
}
