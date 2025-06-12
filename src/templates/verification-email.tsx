export function VerificationEmailTemplate(url: string, name?: string) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verifikasi Email - SISP Nias Selatan</title>
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
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          background: #4c51bf;
          color: #fff !important;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          display: inline-block;
        }
        .fallback {
          font-size: 13px;
          color: #718096;
          word-break: break-word;
          margin: 20px 0;
        }
        .note {
          font-size: 13px;
          color: #718096;
          margin-top: 30px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #a0aec0;
          margin-top: 40px;
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SISP Nias Selatan</div>
        </div>
        
        <div class="greeting">Halo${name ? ' ' + name : ''},</div>
        <div class="description">
          Terima kasih telah mendaftarkan sekolah Anda pada <strong>Sistem Informasi Sarana Prasarana (SISP)</strong>. Untuk mengaktifkan akun Anda, silakan verifikasi alamat email ini dengan menekan tombol di bawah:
        </div>

        <div class="button-container">
          <a href="${url}" class="button">Verifikasi Email</a>
        </div>

        <div class="fallback">
          Tidak dapat mengklik tombol? Salin dan tempel tautan berikut ke browser Anda:<br />
          <a href="${url}">${url}</a>
        </div>

        <div class="note">
          Jika Anda tidak merasa melakukan pendaftaran, abaikan email ini. Tautan akan kedaluwarsa dalam 24 jam.
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} Dinas Pendidikan Kabupaten Nias Selatan
        </div>
      </div>
    </body>
    </html>
  `;
}
