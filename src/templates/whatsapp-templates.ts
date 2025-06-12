export class WhatsAppTemplates {
  static createRegistrationMessage(
    schoolName: string,
    npsn: string,
    email: string,
    phone: string,
  ): string {
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `*SISP SMP – Pendaftaran Sekolah Baru*

Tanggal: ${timestamp} WIB

*Data Sekolah:*
• Nama Sekolah: ${schoolName}
• NPSN: ${npsn}
• Email: ${email}
• No. HP: ${phone}

Status: Menunggu persetujuan dari admin.

Silakan login ke dashboard admin untuk melakukan verifikasi dan persetujuan pendaftaran sekolah.

_Sistem Informasi Sarana dan Prasarana SMP_  
_Dinas Pendidikan Kabupaten Nias Selatan_`;
  }

  static createApprovalMessage(
    schoolName: string,
    npsn: string,
    loginUrl: string,
  ): string {
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `*SISP SMP – Akun Sekolah Disetujui*

Tanggal: ${timestamp} WIB

Selamat, akun sekolah Anda telah disetujui.

*Data Sekolah:*
• Nama Sekolah: ${schoolName}
• NPSN: ${npsn}

Silakan login ke sistem melalui tautan berikut untuk mulai menginput data sarana dan prasarana:
${loginUrl}

_Sistem Informasi Sarana dan Prasarana SMP_  
_Dinas Pendidikan Kabupaten Nias Selatan_`;
  }

  static createRejectionMessage(
    schoolName: string,
    npsn: string,
    reason: string,
  ): string {
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `*SISP SMP – Pendaftaran Ditolak*

Tanggal: ${timestamp} WIB

Mohon maaf, pendaftaran sekolah berikut tidak dapat disetujui:

*Data Sekolah:*
• Nama Sekolah: ${schoolName}
• NPSN: ${npsn}

Alasan Penolakan: ${reason}

Silakan hubungi admin untuk informasi lebih lanjut atau lakukan pendaftaran ulang dengan data yang sesuai.

_Sistem Informasi Sarana dan Prasarana SMP_  
_Dinas Pendidikan Kabupaten Nias Selatan_`;
  }
}
