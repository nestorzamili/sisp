# 🏫 SISP - Sistem Informasi Sarana dan Prasarana

<div align="center">

<img src="public/logo-nias-selatan.png" alt="SISP Logo" width="80" height="80">

**Sistem Informasi Sarana dan Prasarana SMP di Kabupaten Nias Selatan**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://prisma.io/)

[🌐 Live Web](https://sisp.blastify.tech)

</div>

---

## 📋 Tentang

Platform digital untuk pendataan, pengelolaan, dan monitoring sarana prasarana SMP di Kabupaten Nias Selatan. Dikembangkan untuk Dinas Pendidikan guna meningkatkan efisiensi dan transparansi dalam pengelolaan aset pendidikan.

### Fitur Utama
- 🏢 Manajemen data sekolah
- 📊 Inventarisasi sarana dan prasarana
- 👥 Sistem multi-user dengan role management
- 📈 Dashboard analitik dan pelaporan
- 🔍 Workflow review dan verifikasi data

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Prisma ORM, PostgreSQL
- **Auth**: Better Auth dengan Argon2
- **UI**: Radix UI, Lucide Icons

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/nestorzamili/sisp-nisel.git
   cd sisp-nisel
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local dengan konfigurasi database dan auth
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run Development**
   ```bash
   npm run dev
   ```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit dengan conventional commits
4. Submit pull request


---

<div align="center">

*Dibuat dengan ❤️ untuk kemajuan pendidikan di Kabupaten Nias Selatan*
