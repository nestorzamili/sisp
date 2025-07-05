import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/admin/',
          '/api/',
          '/dashboard/',
          '/user/',
          '/reset-password/',
          '/private/',
          '/_next/',
          '/temp/',
          '/cdn-cgi/',
        ],
      },
    ],
    sitemap: 'https://sisp.blastify.tech/sitemap.xml',
  };
}
