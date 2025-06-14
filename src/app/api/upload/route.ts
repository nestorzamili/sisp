import { v2 as cloudinary } from 'cloudinary';
import { NextRequest } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Get the form data with the file
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const baseFolder = (formData.get('folder') as string) || 'sisp';

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    } // Check file size (max 5MB for all files)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 },
      );
    }

    // Validate file type - support images and PDFs
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ];
    const validPdfTypes = ['application/pdf'];
    const validTypes = [...validImageTypes, ...validPdfTypes];

    if (!validTypes.includes(file.type)) {
      return Response.json(
        {
          error: 'Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed',
        },
        { status: 400 },
      );
    }

    // Determine if file is image
    const isImage = validImageTypes.includes(file.type);

    // Set folder based on file type
    const folder = isImage ? `${baseFolder}/images` : `${baseFolder}/documents`;

    // Convert file to base64 for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`; // Configure upload options based on file type
    const uploadOptions: {
      folder: string;
      resource_type: 'image' | 'auto';
    } = {
      folder,
      resource_type: isImage ? 'image' : 'auto',
    };

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      base64String,
      uploadOptions,
    );

    let optimizedUrl = uploadResult.secure_url;

    // Apply optimization only for images
    if (isImage && optimizedUrl && optimizedUrl.includes('/upload/')) {
      optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto/');
    }

    // Return success with file information
    return Response.json({
      success: true,
      url: optimizedUrl,
      publicId: uploadResult.public_id,
      fileType: isImage ? 'image' : 'pdf',
      originalFilename: file.name,
      size: file.size,
      format: uploadResult.format,
    });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Upload failed';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
