export function AccountRejectedEmailTemplate(
  name: string,
  rejectionReason: string,
) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Permohonan Ditolak - SISP Nias Selatan</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f6f8;
          margin: 0;
          padding: 0;
          color: #2d3748;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 24px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        .logo {
          font-size: 26px;
          font-weight: bold;
          color: #4a5568;
        }
        .greeting {
          font-size: 18px;
          margin-top: 24px;
          margin-bottom: 16px;
        }
        .description {
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .rejection-box {
          background-color: #fed7d7;
          border: 1px solid #fc8181;
          border-radius: 6px;
          padding: 16px;
          margin: 20px 0;
        }
        .rejection-title {
          font-weight: 600;
          color: #e53e3e;
          margin-bottom: 8px;
        }
        .rejection-reason {
          color: #742a2a;
          font-size: 14px;
          line-height: 1.5;
        }
        .info-box {
          background-color: #bee3f8;
          border: 1px solid #63b3ed;
          border-radius: 6px;
          padding: 16px;
          margin: 20px 0;
        }
        .info-title {
          font-weight: 600;
          color: #2b6cb0;
          margin-bottom: 8px;
        }
        .info-text {
          color: #2c5282;
          font-size: 14px;
          line-height: 1.5;
        }
        .contact-info {
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 16px;
          margin: 20px 0;
        }
        .contact-title {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
        }
        .contact-text {
          color: #718096;
          font-size: 14px;
          line-height: 1.5;
        }        .footer {
          text-align: center;
          font-size: 12px;
          color: #a0aec0;
          margin-top: 40px;
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SISP Nias Selatan</div>
        </div>
        
        <div class="greeting">Halo ${name},</div>
        <div class="description">
          Kami ingin memberitahukan bahwa permohonan pendaftaran akun Anda untuk Sistem Informasi Sekolah dan Peserta didik (SISP) Kabupaten Nias Selatan telah ditinjau oleh tim administrator.
        </div>

        <div class="rejection-box">
          <div class="rejection-title">Permohonan Ditolak</div>
          <div class="rejection-reason">
            Mohon maaf, permohonan pendaftaran Anda tidak dapat disetujui dengan alasan sebagai berikut:
            <br><br>
            <strong>${rejectionReason}</strong>
          </div>
        </div>

        <div class="info-box">
          <div class="info-title">Apa yang dapat Anda lakukan?</div>
          <div class="info-text">
            • Pastikan data yang Anda berikan sudah benar dan sesuai<br>
            • Lengkapi dokumen yang diperlukan jika ada yang kurang<br>
            • Hubungi administrator untuk klarifikasi lebih lanjut<br>
            • Anda dapat mengajukan pendaftaran ulang setelah memperbaiki data
          </div>
        </div>

        <div class="contact-info">
          <div class="contact-title">Butuh Bantuan?</div>
          <div class="contact-text">
            Jika Anda memiliki pertanyaan atau memerlukan bantuan, silakan hubungi tim administrator SISP Nias Selatan melalui:
            <br><br>
            <strong>Email:</strong> disdiknisel90@gmail.com<br>
            <strong>Telepon:</strong> +62 639 21001 (jam kerja: 08:00 - 16:00 WIB)
          </div>
        </div>        <div class="footer">
          &copy; 2025 Dinas Pendidikan Kabupaten Nias Selatan. Hak cipta dilindungi undang-undang.<br>
          Dibuat oleh <a href="https://nestorzamili.works" target="_blank" style="color: #4c51bf; text-decoration: none;">Nestor Zamili</a>
        </div>
      </div>
    </body>
    </html>
  `;
}
