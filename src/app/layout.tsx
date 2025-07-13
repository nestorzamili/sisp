import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | SISP SMP Nias Selatan',
    default: 'SISP SMP Nias Selatan',
  },
  description:
    'Sistem Informasi Sarana dan Prasarana (SISP) SMP Di Kabupaten Nias Selatan.',
  keywords: [
    'SISP',
    'Nias Selatan',
    'sistem informasi',
    'sarana prasarana',
    'sekolah',
    'SMP',
    'pendidikan',
    'monitoring',
    'inventarisasi',
    'manajemen sekolah',
  ],
  authors: [{ name: 'Nestor Zamili', url: 'https://nestorzamili.works' }],
  creator: 'Nestor Zamili',
  publisher:
    'Dinas Pendidikan Kabupaten Nias Selatan. Bidang Sarana dan Prasarana SMP',
  robots: 'index, follow',
  other: {
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#ffffff',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical images for better LCP */}
        <link rel="preload" href="/school.png" as="image" type="image/png" />
        <link
          rel="preload"
          href="/logo-nias-selatan.png"
          as="image"
          type="image/png"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
