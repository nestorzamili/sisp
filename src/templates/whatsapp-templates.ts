export class WhatsAppTemplates {
  static createRegistrationMessage(
    schoolName: string,
    npsn: string,
    email: string,
    phone: string,
  ): string {
    return `*SISP SMP – Pendaftaran Sekolah Baru*

*Data Sekolah:*
• Nama Sekolah: ${schoolName}
• NPSN: ${npsn}
• Email: ${email}
• No. HP: ${phone}

Status: Menunggu persetujuan dari admin.

Silakan login ke dashboard admin untuk melakukan verifikasi dan persetujuan pendaftaran sekolah.

_Dinas Pendidikan Kabupaten Nias Selatan_
_Bidang Sarana dan Prasarana SMP_`;
  }
  static createApprovalMessage(
    schoolName: string,
    npsn: string,
    loginUrl: string,
  ): string {
    return `*SISP SMP – Akun Sekolah Disetujui*

Selamat, akun sekolah Anda telah disetujui.

*Data Sekolah:*
• Nama Sekolah: ${schoolName}
• NPSN: ${npsn}

Silakan login ke sistem melalui tautan berikut untuk mulai menginput data sarana dan prasarana:
${loginUrl}

_Dinas Pendidikan Kabupaten Nias Selatan_
_Bidang Sarana dan Prasarana SMP_`;
  }
  static createRejectionMessage(
    schoolName: string,
    npsn: string,
    reason: string,
  ): string {
    return `*SISP SMP – Pendaftaran Ditolak*

Mohon maaf, pendaftaran sekolah berikut tidak dapat disetujui:

*Data Sekolah:*
• Nama Sekolah: ${schoolName}
• NPSN: ${npsn}

Alasan Penolakan: ${reason}

Silakan hubungi admin untuk informasi lebih lanjut atau lakukan pendaftaran ulang dengan data yang sesuai.

_Dinas Pendidikan Kabupaten Nias Selatan_
_Bidang Sarana dan Prasarana SMP_`;
  }
}
