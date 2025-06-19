-- CreateEnum
CREATE TYPE "JenisRuangan" AS ENUM ('RuangKepalaSekolah', 'RuangGuru', 'RuangKelas', 'LaboratoriumIPA', 'LaboratoriumBahasa', 'LaboratoriumTIK', 'AulaPertemuan', 'Perpustakaan', 'JambanGuru', 'JambanSiswa', 'MejaKursiSiswa', 'Komputer', 'PrasaranaLainnya');

-- CreateEnum
CREATE TYPE "JenisKebutuhan" AS ENUM ('Sarana', 'Prasarana');

-- CreateEnum
CREATE TYPE "StatusGuru" AS ENUM ('PNS', 'PPPK', 'Honorer');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('L', 'P');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "role" TEXT DEFAULT 'user',
    "banned" BOOLEAN DEFAULT true,
    "banReason" TEXT DEFAULT 'Waiting for admin approval',
    "banExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limit" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "last_request" BIGINT NOT NULL,

    CONSTRAINT "rate_limit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sekolah" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama_sekolah" TEXT NOT NULL,
    "npsn" TEXT NOT NULL,
    "nama_kepala_sekolah" TEXT,
    "nip_kepala_sekolah" TEXT,
    "alamat_sekolah" TEXT,
    "kecamatan" TEXT,
    "phone" TEXT,
    "userId" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "reviewNotes" TEXT,

    CONSTRAINT "sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sarana" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sekolahId" TEXT NOT NULL,
    "jenis_sarana" "JenisRuangan" NOT NULL,
    "nama_sarana" TEXT NOT NULL,
    "jumlah_total" INTEGER NOT NULL,
    "jumlah_kondisi_baik" INTEGER NOT NULL,
    "jumlah_kondisi_rusak" INTEGER NOT NULL,
    "keterangan" TEXT,
    "tahun_ajaran" TEXT NOT NULL,

    CONSTRAINT "sarana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prasarana" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sekolahId" TEXT NOT NULL,
    "jenis_prasarana" "JenisRuangan" NOT NULL,
    "nama_prasarana" TEXT NOT NULL,
    "jumlah_total" INTEGER NOT NULL,
    "jumlah_kondisi_baik" INTEGER NOT NULL,
    "jumlah_kondisi_rusak" INTEGER NOT NULL,
    "keterangan" TEXT,
    "tahun_ajaran" TEXT NOT NULL,

    CONSTRAINT "prasarana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kebutuhan_prioritas" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sekolahId" TEXT NOT NULL,
    "jenis" "JenisKebutuhan" NOT NULL,
    "penjelasan" TEXT NOT NULL,
    "tahun_ajaran" TEXT NOT NULL,

    CONSTRAINT "kebutuhan_prioritas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sekolahId" TEXT NOT NULL,
    "nama_dokumen" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "lampiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guru" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sekolahId" TEXT NOT NULL,
    "status_guru" "StatusGuru" NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tahun_ajaran" TEXT NOT NULL,

    CONSTRAINT "guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rombongan_belajar" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sekolahId" TEXT NOT NULL,
    "tingkatan_kelas" TEXT NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "jumlah_siswa" INTEGER NOT NULL,
    "tahun_ajaran" TEXT NOT NULL,

    CONSTRAINT "rombongan_belajar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_npsn_key" ON "sekolah"("npsn");

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_phone_key" ON "sekolah"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "sekolah_userId_key" ON "sekolah"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sarana_sekolahId_jenis_sarana_nama_sarana_tahun_ajaran_key" ON "sarana"("sekolahId", "jenis_sarana", "nama_sarana", "tahun_ajaran");

-- CreateIndex
CREATE UNIQUE INDEX "prasarana_sekolahId_jenis_prasarana_nama_prasarana_tahun_aj_key" ON "prasarana"("sekolahId", "jenis_prasarana", "nama_prasarana", "tahun_ajaran");

-- CreateIndex
CREATE UNIQUE INDEX "guru_sekolahId_status_guru_jenis_kelamin_tahun_ajaran_key" ON "guru"("sekolahId", "status_guru", "jenis_kelamin", "tahun_ajaran");

-- CreateIndex
CREATE UNIQUE INDEX "rombongan_belajar_sekolahId_tingkatan_kelas_jenis_kelamin_t_key" ON "rombongan_belajar"("sekolahId", "tingkatan_kelas", "jenis_kelamin", "tahun_ajaran");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sekolah" ADD CONSTRAINT "sekolah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sekolah" ADD CONSTRAINT "sekolah_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sarana" ADD CONSTRAINT "sarana_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prasarana" ADD CONSTRAINT "prasarana_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kebutuhan_prioritas" ADD CONSTRAINT "kebutuhan_prioritas_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran" ADD CONSTRAINT "lampiran_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guru" ADD CONSTRAINT "guru_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rombongan_belajar" ADD CONSTRAINT "rombongan_belajar_sekolahId_fkey" FOREIGN KEY ("sekolahId") REFERENCES "sekolah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
