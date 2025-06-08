import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | SISP SMP Nias Selatan',
    default: 'SISP SMP Nias Selatan - Sistem Informasi Sarana Prasarana',
  },
  description:
    'Sistem Informasi Sarana dan Prasarana (SISP) SMP Di Kabupaten Nias Selatan. Platform digital untuk pendataan, pengelolaan, dan monitoring sarana prasarana sekolah menengah pertama.',
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
  publisher: 'Dinas Pendidikan Kabupaten Nias Selatan',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
