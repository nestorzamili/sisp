import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/admin/*',
          '/api/*',
          '/dashboard/*',
          '/(user)/*',
          '/reset-password/*',
          '/private/*',
          '/_next/*',
          '/temp/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        disallow: [
          '/admin/*',
          '/api/*',
          '/dashboard/*',
          '/(user)/*',
          '/reset-password/*',
          '/private/*',
        ],
      },
    ],
    sitemap: 'https://sisp.blastify.tech/sitemap.xml',
    host: 'https://sisp.blastify.tech',
  };
}
