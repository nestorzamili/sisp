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

    return `🏫 *SISP SMP - PENDAFTARAN SEKOLAH BARU*

📅 Waktu: ${timestamp} WIB

📝 *Data Sekolah:*
• Nama: ${schoolName}
• NPSN: ${npsn}
• Email: ${email}
• No. HP: ${phone}

⚠️ *Status:* Menunggu Persetujuan Admin

🔗 Silakan login ke dashboard admin untuk memverifikasi dan menyetujui pendaftaran sekolah ini.

_Sistem Informasi Sarana Prasarana SMP_
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

    return `✅ *SISP - AKUN SEKOLAH DISETUJUI*

📅 Waktu: ${timestamp} WIB

🎉 Selamat! Akun sekolah Anda telah disetujui:

📝 *Data Sekolah:*
• Nama: ${schoolName}
• NPSN: ${npsn}

🔗 *Link Login:* ${loginUrl}

Silakan login ke sistem untuk mulai menginput data sarana prasarana sekolah Anda.

_Sistem Informasi Sarana Prasarana SMP_
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

    return `❌ *SISP - PENDAFTARAN DITOLAK*

📅 Waktu: ${timestamp} WIB

Mohon maaf, pendaftaran sekolah berikut ditolak:

📝 *Data Sekolah:*
• Nama: ${schoolName}
• NPSN: ${npsn}

📋 *Alasan:* ${reason}

Silakan hubungi admin untuk informasi lebih lanjut atau mendaftar ulang dengan data yang benar.

_Sistem Informasi Sarana Prasarana SMP_
_Dinas Pendidikan Kabupaten Nias Selatan_`;
  }
}
