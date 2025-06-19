import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/sign-in', '/sign-up', '/forgot-password', '/landing'],
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
        allow: ['/', '/sign-in', '/sign-up', '/landing'],
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
