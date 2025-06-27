import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import {
  FormulirCompleteData,
  FormulirServiceResponse,
  FormulirStepStatus,
  SaveSekolahInfoInput,
  SaveGuruInput,
  SaveRombonganBelajarInput,
  SaveSaranaInput,
  SavePrasaranaInput,
  SaveKebutuhanPrioritasInput,
  SaveLampiranInput,
  FormulirSekolahInfo,
  FormulirGuru,
  FormulirRombonganBelajar,
  FormulirSarana,
  FormulirPrasarana,
  FormulirKebutuhanPrioritas,
  FormulirLampiran,
} from '@/types/formulir.types';

export class FormulirService {
  /**
   * Get complete formulir data for a user
   */
  static async getCompleteFormulirData(
    userId: string,
  ): Promise<FormulirServiceResponse<FormulirCompleteData | null>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
        include: {
          guru: true,
          rombonganBelajar: true,
          sarana: true,
          prasarana: true,
          kebutuhanPrioritas: true,
          lampiran: true,
        },
      });

      if (!sekolah) {
        logger.info(
          { userId },
          'Sekolah tidak ditemukan pada getCompleteFormulirData',
        );
        return {
          success: true,
          data: null,
        };
      }

      const formData: FormulirCompleteData = {
        sekolah: {
          id: sekolah.id,
          nama_sekolah: sekolah.nama_sekolah,
          npsn: sekolah.npsn,
          nama_kepala_sekolah: sekolah.nama_kepala_sekolah,
          nip_kepala_sekolah: sekolah.nip_kepala_sekolah,
          alamat_sekolah: sekolah.alamat_sekolah,
          kecamatan: sekolah.kecamatan,
          phone: sekolah.phone,
          status: sekolah.status as
            | 'DRAFT'
            | 'PENDING'
            | 'APPROVED'
            | 'REJECTED',
          reviewNotes: sekolah.reviewNotes,
        },
        guru: sekolah.guru.map(
          (g): FormulirGuru => ({
            id: g.id,
            status_guru: g.status_guru as 'PNS' | 'PPPK' | 'Honorer',
            jenis_kelamin: g.jenis_kelamin as 'L' | 'P',
            jumlah: g.jumlah,
          }),
        ),
        rombonganBelajar: sekolah.rombonganBelajar.map(
          (rb): FormulirRombonganBelajar => ({
            id: rb.id,
            tingkatan_kelas: rb.tingkatan_kelas,
            jenis_kelamin: rb.jenis_kelamin as 'L' | 'P',
            jumlah_siswa: rb.jumlah_siswa,
          }),
        ),
        sarana: sekolah.sarana.map(
          (s): FormulirSarana => ({
            id: s.id,
            jenis_sarana: s.jenis_sarana as FormulirSarana['jenis_sarana'],
            nama_sarana: s.nama_sarana,
            jumlah_total: s.jumlah_total,
            jumlah_kondisi_baik: s.jumlah_kondisi_baik,
            jumlah_kondisi_rusak: s.jumlah_kondisi_rusak,
            keterangan: s.keterangan || undefined,
          }),
        ),
        prasarana: sekolah.prasarana.map(
          (p): FormulirPrasarana => ({
            id: p.id,
            jenis_prasarana:
              p.jenis_prasarana as FormulirPrasarana['jenis_prasarana'],
            nama_prasarana: p.nama_prasarana,
            jumlah_total: p.jumlah_total,
            jumlah_kondisi_baik: p.jumlah_kondisi_baik,
            jumlah_kondisi_rusak: p.jumlah_kondisi_rusak,
            keterangan: p.keterangan || undefined,
          }),
        ),
        kebutuhanPrioritas: sekolah.kebutuhanPrioritas.map(
          (kp): FormulirKebutuhanPrioritas => ({
            id: kp.id,
            jenis: kp.jenis as 'Sarana' | 'Prasarana',
            penjelasan: kp.penjelasan,
          }),
        ),
        lampiran: sekolah.lampiran.map(
          (l): FormulirLampiran => ({
            id: l.id,
            nama_dokumen: l.nama_dokumen,
            url: l.url,
            keterangan: l.keterangan,
          }),
        ),
      };

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil mengambil data lengkap formulir',
      );
      return {
        success: true,
        data: formData,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error getting complete formulir data');
      return {
        success: false,
        error: 'Gagal mengambil data formulir',
      };
    }
  }

  /**
   * Get step completion status
   */
  static async getStepStatus(
    userId: string,
  ): Promise<FormulirServiceResponse<FormulirStepStatus>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
        include: {
          guru: true,
          rombonganBelajar: true,
          sarana: true,
          prasarana: true,
          kebutuhanPrioritas: true,
          lampiran: true,
        },
      });

      if (!sekolah) {
        logger.info({ userId }, 'Sekolah tidak ditemukan pada getStepStatus');
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      // Step 1: Basic school information
      const step1Complete = !!(
        sekolah.nama_sekolah &&
        sekolah.npsn &&
        sekolah.nama_kepala_sekolah &&
        sekolah.nip_kepala_sekolah &&
        sekolah.alamat_sekolah &&
        sekolah.kecamatan
      );

      // Step 2: Teacher data
      const step2Complete =
        sekolah.guru.length > 0 && sekolah.guru.some((guru) => guru.jumlah > 0);

      // Step 3: Student data
      const step3Complete =
        sekolah.rombonganBelajar.length > 0 &&
        sekolah.rombonganBelajar.some((rombel) => rombel.jumlah_siswa > 0);

      // Step 4: Facility data (Sarana)
      const essentialSaranaTypes = [
        'RuangKelas',
        'Perpustakaan',
        'RuangKepalaSekolah',
        'RuangGuru',
        'AulaPertemuan',
        'LaboratoriumIPA',
        'LaboratoriumBahasa',
        'LaboratoriumTIK',
      ];

      const existingSaranaTypes = sekolah.sarana.map(
        (s) => s.jenis_sarana as string,
      );
      const hasAllEssentialTypes = essentialSaranaTypes.every((type) =>
        existingSaranaTypes.includes(type),
      );

      const hasMeaningfulSaranaData = sekolah.sarana.some(
        (s) =>
          s.jumlah_total > 0 ||
          s.jumlah_kondisi_baik > 0 ||
          s.jumlah_kondisi_rusak > 0,
      );

      const step4Complete =
        sekolah.sarana.length > 0 &&
        hasAllEssentialTypes &&
        hasMeaningfulSaranaData;

      // Step 5: Infrastructure data (Prasarana)
      const hasPrasaranaData = sekolah.prasarana.some(
        (p) =>
          p.jumlah_total > 0 ||
          p.jumlah_kondisi_baik > 0 ||
          p.jumlah_kondisi_rusak > 0,
      );
      const step5Complete = sekolah.prasarana.length > 0 && hasPrasaranaData;

      // Step 6: Priority needs
      const step6Complete = sekolah.kebutuhanPrioritas.length > 0;

      // Step 7: Attachments
      const hasLampiranData = sekolah.lampiran.length > 0;
      const statusNotDraft = sekolah.status !== 'DRAFT';
      const step7Complete = hasLampiranData || statusNotDraft;

      // Step 8: Submit for review
      const allPreviousStepsComplete =
        step1Complete &&
        step2Complete &&
        step3Complete &&
        step4Complete &&
        step5Complete &&
        step6Complete &&
        step7Complete;
      const step8Complete =
        allPreviousStepsComplete && sekolah.status === 'PENDING';

      return {
        success: true,
        data: {
          sekolahStatus: sekolah.status as
            | 'DRAFT'
            | 'PENDING'
            | 'APPROVED'
            | 'REJECTED',
          reviewNote: sekolah.reviewNotes,
          step1: step1Complete,
          step2: step2Complete,
          step3: step3Complete,
          step4: step4Complete,
          step5: step5Complete,
          step6: step6Complete,
          step7: step7Complete,
          step8: step8Complete,
        },
      };
    } catch (error) {
      logger.error({ err: error }, 'Error getting step status');
      return {
        success: false,
        error: 'Gagal memeriksa status kelengkapan data',
      };
    }
  }

  /**
   * Save school information (Step 1)
   */
  static async saveSekolahInfo(
    userId: string,
    data: SaveSekolahInfoInput,
  ): Promise<FormulirServiceResponse<FormulirSekolahInfo>> {
    try {
      const sekolah = await prisma.sekolah.upsert({
        where: { userId },
        update: {
          nama_sekolah: data.nama_sekolah,
          npsn: data.npsn,
          nama_kepala_sekolah: data.nama_kepala_sekolah,
          nip_kepala_sekolah: data.nip_kepala_sekolah,
          alamat_sekolah: data.alamat_sekolah,
          kecamatan: data.kecamatan,
          phone: data.phone,
        },
        create: {
          userId,
          nama_sekolah: data.nama_sekolah,
          npsn: data.npsn,
          nama_kepala_sekolah: data.nama_kepala_sekolah,
          nip_kepala_sekolah: data.nip_kepala_sekolah,
          alamat_sekolah: data.alamat_sekolah,
          kecamatan: data.kecamatan,
          phone: data.phone,
        },
      });
      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan info sekolah',
      );
      return {
        success: true,
        data: {
          id: sekolah.id,
          nama_sekolah: sekolah.nama_sekolah,
          npsn: sekolah.npsn,
          nama_kepala_sekolah: sekolah.nama_kepala_sekolah,
          nip_kepala_sekolah: sekolah.nip_kepala_sekolah,
          alamat_sekolah: sekolah.alamat_sekolah,
          kecamatan: sekolah.kecamatan,
          phone: sekolah.phone,
          status: sekolah.status as
            | 'DRAFT'
            | 'PENDING'
            | 'APPROVED'
            | 'REJECTED',
          reviewNotes: sekolah.reviewNotes,
        },
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving school info');
      return {
        success: false,
        error: 'Gagal menyimpan informasi sekolah',
      };
    }
  }

  /**
   * Save teacher data (Step 2)
   */
  static async saveGuruData(
    userId: string,
    data: SaveGuruInput,
  ): Promise<FormulirServiceResponse<FormulirGuru[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info({ userId }, 'Sekolah tidak ditemukan pada saveGuruData');
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      // Delete existing guru data
      await prisma.guru.deleteMany({
        where: { sekolahId: sekolah.id },
      });

      // Insert new guru data
      await prisma.guru.createMany({
        data: data.dataGuru.map((guru) => ({
          sekolahId: sekolah.id,
          status_guru: guru.status_guru,
          jenis_kelamin: guru.jenis_kelamin,
          jumlah: guru.jumlah,
          tahun_ajaran: new Date().getFullYear().toString(), // Keep for database compatibility
        })),
      });

      // Fetch created data
      const createdData = await prisma.guru.findMany({
        where: { sekolahId: sekolah.id },
      });

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan data guru',
      );
      return {
        success: true,
        data: createdData.map(
          (g): FormulirGuru => ({
            id: g.id,
            status_guru: g.status_guru as 'PNS' | 'PPPK' | 'Honorer',
            jenis_kelamin: g.jenis_kelamin as 'L' | 'P',
            jumlah: g.jumlah,
          }),
        ),
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving guru data');
      return {
        success: false,
        error: 'Gagal menyimpan data guru',
      };
    }
  }

  /**
   * Save student data (Step 3)
   */
  static async saveRombonganBelajarData(
    userId: string,
    data: SaveRombonganBelajarInput,
  ): Promise<FormulirServiceResponse<FormulirRombonganBelajar[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info(
          { userId },
          'Sekolah tidak ditemukan pada saveRombonganBelajarData',
        );
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      // Delete existing rombongan belajar data
      await prisma.rombonganBelajar.deleteMany({
        where: { sekolahId: sekolah.id },
      });

      // Insert new data
      await prisma.rombonganBelajar.createMany({
        data: data.dataRombonganBelajar.map((rb) => ({
          sekolahId: sekolah.id,
          tingkatan_kelas: rb.tingkatan_kelas,
          jenis_kelamin: rb.jenis_kelamin,
          jumlah_siswa: rb.jumlah_siswa,
          tahun_ajaran: new Date().getFullYear().toString(), // Keep for database compatibility
        })),
      });

      // Fetch created data
      const createdData = await prisma.rombonganBelajar.findMany({
        where: { sekolahId: sekolah.id },
      });

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan data rombongan belajar',
      );
      return {
        success: true,
        data: createdData.map(
          (rb): FormulirRombonganBelajar => ({
            id: rb.id,
            tingkatan_kelas: rb.tingkatan_kelas,
            jenis_kelamin: rb.jenis_kelamin as 'L' | 'P',
            jumlah_siswa: rb.jumlah_siswa,
          }),
        ),
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving rombongan belajar data');
      return {
        success: false,
        error: 'Gagal menyimpan data siswa',
      };
    }
  }

  /**
   * Save facility data (Step 4)
   */
  static async saveSaranaData(
    userId: string,
    data: SaveSaranaInput,
  ): Promise<FormulirServiceResponse<FormulirSarana[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info({ userId }, 'Sekolah tidak ditemukan pada saveSaranaData');
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      const currentYear = new Date().getFullYear();
      const tahunAjaran = `${currentYear}/${currentYear + 1}`;

      // Delete existing sarana data
      await prisma.sarana.deleteMany({
        where: { sekolahId: sekolah.id },
      });

      // Insert new data
      await prisma.sarana.createMany({
        data: data.dataSarana.map((s) => ({
          sekolahId: sekolah.id,
          jenis_sarana: s.jenis_sarana,
          nama_sarana: s.nama_sarana,
          jumlah_total: s.jumlah_total,
          jumlah_kondisi_baik: s.jumlah_kondisi_baik,
          jumlah_kondisi_rusak: s.jumlah_kondisi_rusak,
          keterangan: s.keterangan,
          tahun_ajaran: tahunAjaran, // Keep for database compatibility
        })),
      });

      // Fetch created data
      const createdData = await prisma.sarana.findMany({
        where: { sekolahId: sekolah.id },
      });

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan data sarana',
      );
      return {
        success: true,
        data: createdData.map(
          (s): FormulirSarana => ({
            id: s.id,
            jenis_sarana: s.jenis_sarana as FormulirSarana['jenis_sarana'],
            nama_sarana: s.nama_sarana,
            jumlah_total: s.jumlah_total,
            jumlah_kondisi_baik: s.jumlah_kondisi_baik,
            jumlah_kondisi_rusak: s.jumlah_kondisi_rusak,
            keterangan: s.keterangan || undefined,
          }),
        ),
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving sarana data');
      return {
        success: false,
        error: 'Gagal menyimpan data sarana',
      };
    }
  }

  /**
   * Save infrastructure data (Step 5)
   */
  static async savePrasaranaData(
    userId: string,
    data: SavePrasaranaInput,
  ): Promise<FormulirServiceResponse<FormulirPrasarana[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info(
          { userId },
          'Sekolah tidak ditemukan pada savePrasaranaData',
        );
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      const currentYear = new Date().getFullYear();
      const tahunAjaran = `${currentYear}/${currentYear + 1}`;

      // Delete existing prasarana data
      await prisma.prasarana.deleteMany({
        where: { sekolahId: sekolah.id },
      });

      // Insert new data
      await prisma.prasarana.createMany({
        data: data.dataPrasarana.map((p) => ({
          sekolahId: sekolah.id,
          jenis_prasarana: p.jenis_prasarana,
          nama_prasarana: p.nama_prasarana,
          jumlah_total: p.jumlah_total,
          jumlah_kondisi_baik: p.jumlah_kondisi_baik,
          jumlah_kondisi_rusak: p.jumlah_kondisi_rusak,
          keterangan: p.keterangan,
          tahun_ajaran: tahunAjaran, // Keep for database compatibility
        })),
      });

      // Fetch created data
      const createdData = await prisma.prasarana.findMany({
        where: { sekolahId: sekolah.id },
      });

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan data prasarana',
      );
      return {
        success: true,
        data: createdData.map(
          (p): FormulirPrasarana => ({
            id: p.id,
            jenis_prasarana:
              p.jenis_prasarana as FormulirPrasarana['jenis_prasarana'],
            nama_prasarana: p.nama_prasarana,
            jumlah_total: p.jumlah_total,
            jumlah_kondisi_baik: p.jumlah_kondisi_baik,
            jumlah_kondisi_rusak: p.jumlah_kondisi_rusak,
            keterangan: p.keterangan || undefined,
          }),
        ),
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving prasarana data');
      return {
        success: false,
        error: 'Gagal menyimpan data prasarana',
      };
    }
  }

  /**
   * Save priority needs data (Step 6)
   */
  static async saveKebutuhanPrioritasData(
    userId: string,
    data: SaveKebutuhanPrioritasInput,
  ): Promise<FormulirServiceResponse<FormulirKebutuhanPrioritas[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info(
          { userId },
          'Sekolah tidak ditemukan pada saveKebutuhanPrioritasData',
        );
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      const currentYear = new Date().getFullYear();
      const tahunAjaran = `${currentYear}/${currentYear + 1}`;

      // Delete existing data
      await prisma.kebutuhanPrioritas.deleteMany({
        where: { sekolahId: sekolah.id },
      });

      // Insert new data
      await prisma.kebutuhanPrioritas.createMany({
        data: data.dataKebutuhanPrioritas.map((kp) => ({
          sekolahId: sekolah.id,
          jenis: kp.jenis,
          penjelasan: kp.penjelasan,
          tahun_ajaran: tahunAjaran, // Keep for database compatibility
        })),
      });

      // Fetch created data
      const createdData = await prisma.kebutuhanPrioritas.findMany({
        where: { sekolahId: sekolah.id },
      });

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan data kebutuhan prioritas',
      );
      return {
        success: true,
        data: createdData.map(
          (kp): FormulirKebutuhanPrioritas => ({
            id: kp.id,
            jenis: kp.jenis as 'Sarana' | 'Prasarana',
            penjelasan: kp.penjelasan,
          }),
        ),
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving kebutuhan prioritas data');
      return {
        success: false,
        error: 'Gagal menyimpan data kebutuhan prioritas',
      };
    }
  }

  /**
   * Save attachment data (Step 7)
   */
  static async saveLampiranData(
    userId: string,
    data: SaveLampiranInput,
  ): Promise<FormulirServiceResponse<FormulirLampiran[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info(
          { userId },
          'Sekolah tidak ditemukan pada saveLampiranData',
        );
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      // Delete existing data
      await prisma.lampiran.deleteMany({
        where: { sekolahId: sekolah.id },
      });

      // Insert new data
      await prisma.lampiran.createMany({
        data: data.dataLampiran.map((l) => ({
          sekolahId: sekolah.id,
          nama_dokumen: l.nama_dokumen,
          url: l.url,
          keterangan: l.keterangan,
        })),
      });

      // Fetch created data
      const createdData = await prisma.lampiran.findMany({
        where: { sekolahId: sekolah.id },
      });

      logger.info(
        { userId, sekolahId: sekolah.id },
        'Berhasil menyimpan data lampiran',
      );
      return {
        success: true,
        data: createdData.map(
          (l): FormulirLampiran => ({
            id: l.id,
            nama_dokumen: l.nama_dokumen,
            url: l.url,
            keterangan: l.keterangan,
          }),
        ),
      };
    } catch (error) {
      logger.error({ err: error }, 'Error saving lampiran data');
      return {
        success: false,
        error: 'Gagal menyimpan data lampiran',
      };
    }
  }

  /**
   * Submit for review (Step 8)
   */
  static async submitForReview(
    userId: string,
  ): Promise<FormulirServiceResponse<FormulirSekolahInfo>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
      });

      if (!sekolah) {
        logger.info({ userId }, 'Sekolah tidak ditemukan pada submitForReview');
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }

      if (sekolah.status !== 'DRAFT' && sekolah.status !== 'REJECTED') {
        logger.warn(
          { userId, sekolahId: sekolah.id, status: sekolah.status },
          'Submit ditolak karena status tidak sesuai',
        );
        return {
          success: false,
          error:
            'Data tidak dapat disubmit karena status sudah PENDING atau APPROVED',
        };
      }

      const updatedSekolah = await prisma.sekolah.update({
        where: { userId },
        data: {
          status: 'PENDING',
          reviewedAt: null,
          reviewedById: null,
          reviewNotes: null,
        },
      });

      logger.info(
        { userId, sekolahId: updatedSekolah.id },
        'Berhasil submit untuk review',
      );
      return {
        success: true,
        data: {
          id: updatedSekolah.id,
          nama_sekolah: updatedSekolah.nama_sekolah,
          npsn: updatedSekolah.npsn,
          nama_kepala_sekolah: updatedSekolah.nama_kepala_sekolah,
          nip_kepala_sekolah: updatedSekolah.nip_kepala_sekolah,
          alamat_sekolah: updatedSekolah.alamat_sekolah,
          kecamatan: updatedSekolah.kecamatan,
          phone: updatedSekolah.phone,
          status: updatedSekolah.status as
            | 'DRAFT'
            | 'PENDING'
            | 'APPROVED'
            | 'REJECTED',
          reviewNotes: updatedSekolah.reviewNotes,
        },
      };
    } catch (error) {
      logger.error({ err: error }, 'Error submitting for review');
      return {
        success: false,
        error: 'Gagal submit untuk review',
      };
    }
  }
}
