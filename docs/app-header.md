# AppHeader Component - Dokumentasi

## Lokasi File
- **File Utama**: `src/components/layout/app-header.tsx`
- **Export**: `src/components/layout/index.ts`

## Deskripsi
Header aplikasi yang digunakan di seluruh halaman dalam aplikasi SISP. Header ini telah dipindahkan dari lokasi sebelumnya (`src/app/(app)/formulir/_components/header.tsx`) ke struktur yang lebih tepat.

## Fitur Utama

### 1. Navigasi
- **Home** (`/home`): Halaman dashboard utama
- **Formulir** (`/formulir`): Halaman input data sekolah
- **Bantuan**: Link untuk bantuan (belum diimplementasi)

### 2. Logo dan Branding
- Logo Nias Selatan
- Nama institusi: "Dinas Pendidikan"
- Subtitle: "Bidang Sarana dan Prasarana SMP"

### 3. User Actions
- **Notifications**: Dropdown notifikasi
- **Theme Toggle**: Switch dark/light mode
- **Profile Dropdown**: Menu profil user

### 4. Responsive Design
- Desktop: Navigasi lengkap dengan ikon dan teks
- Mobile: Navigasi dengan ikon dan teks tersembunyi pada layar kecil

## Struktur Navigasi

```tsx
const navigationItems = [
  {
    href: '/home',
    label: 'Home',
    icon: Home,
    isActive: isHomeActive,
  },
  {
    href: '/formulir',
    label: 'Formulir',
    icon: FileText,
    isActive: isFormulirActive,
  },
];
```

## Best Practices yang Diterapkan

### 1. **Lokasi File yang Tepat**
```
src/components/layout/
├── app-header.tsx     # Header utama aplikasi
├── app-sidebar.tsx    # Sidebar (existing)
├── header.tsx         # Header lain (existing)
├── main.tsx          # Main layout (existing)
├── app-footer.tsx    # Footer (existing)
└── index.ts          # Export semua komponen
```

**Mengapa di `/components/layout/`?**
- Komponen digunakan di beberapa halaman (home, formulir)
- Merupakan komponen layout aplikasi secara global
- Memudahkan maintenance dan reusability
- Mengikuti struktur folder yang konsisten

### 2. **Centralized Exports**
```tsx
// src/components/layout/index.ts
export { AppHeader } from './app-header';
export { AppSidebar } from './app-sidebar';
// ...dll
```

### 3. **Import yang Bersih**
```tsx
// Sebelum
import { DashboardHeader } from '../formulir/_components/header';

// Sesudah
import { AppHeader } from '@/components/layout';
```

### 4. **State Management yang Baik**
- Menggunakan `usePathname()` untuk active state
- Responsive navigation dengan conditional rendering
- Centralized navigation items configuration

## Penggunaan

### Di Halaman Home
```tsx
import { AppHeader } from '@/components/layout';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted">
      <AppHeader />
      {/* Konten halaman */}
    </div>
  );
}
```

### Di Halaman Formulir
```tsx
import { AppHeader } from '@/components/layout';

export default function FormulirPage() {
  return (
    <div className="min-h-screen bg-muted">
      <AppHeader />
      {/* Konten halaman */}
    </div>
  );
}
```

## Keuntungan Refactoring

1. **Reusability**: Satu komponen untuk semua halaman
2. **Maintainability**: Perubahan cukup di satu tempat
3. **Consistency**: UI dan UX yang konsisten
4. **Scalability**: Mudah ditambahkan navigasi baru
5. **Clean Architecture**: Struktur folder yang logis

## Perubahan dari Versi Sebelumnya

### Navigation Items
- ✅ Ditambahkan: **Home** dengan ikon dan routing ke `/home`
- ✅ Diperbaiki: **Formulir** sekarang routing ke `/formulir` (bukan `/home`)
- ✅ Tetap ada: **Bantuan** dengan ikon HelpCircle

### Responsive Design
- ✅ Desktop: Ikon + Teks
- ✅ Mobile: Ikon + Teks tersembunyi pada layar kecil
- ✅ Active state yang lebih jelas

### File Structure
- ✅ Dipindahkan dari `formulir/_components/` ke `components/layout/`
- ✅ Renamed dari `DashboardHeader` ke `AppHeader`
- ✅ Centralized exports

## Catatan Tambahan

- Header ini menggunakan sticky positioning (`sticky top-0 z-50`)
- Active state dikelola otomatis berdasarkan pathname
- Responsive breakpoint pada `md:` (768px)
- Konsisten dengan design system existing (shadcn/ui)
