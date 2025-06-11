export function VerificationEmailTemplate(url: string, name?: string) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifikasi Email - SISP Nias Selatan</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding: 30px 0 20px;
          border-bottom: 2px solid #e2e8f0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: -20px -20px 30px -20px;
          border-radius: 12px 12px 0 0;
          color: white;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        .subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }
        .content {
          padding: 0 10px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
        }
        .description {
          font-size: 16px;
          color: #4a5568;
          margin-bottom: 25px;
          line-height: 1.7;
        }
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white !important;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          transition: transform 0.2s;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .security-note {
          background-color: #f7fafc;
          border-left: 4px solid #4299e1;
          padding: 15px;
          border-radius: 4px;
          margin: 25px 0;
          font-size: 14px;
          color: #2d3748;
        }
        .url-fallback {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
          word-break: break-all;
          font-size: 13px;
          color: #6c757d;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #718096;
          font-size: 12px;
        }
        .project-info {
          background-color: #edf2f7;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
          text-align: center;
        }
        .project-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }
        .project-desc {
          font-size: 13px;
          color: #4a5568;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SISP</div>
          <p class="subtitle">Sistem Informasi Sarana Prasarana Pendidikan</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Halo${name ? ' ' + name : ''}! 👋
          </div>
          
          <p class="description">
            Terima kasih telah mendaftarkan sekolah Anda di <strong>Sistem Informasi Sarana Prasarana (SISP) Kabupaten Nias Selatan</strong>. 
            Untuk melanjutkan proses registrasi dan mengamankan akun Anda, silakan verifikasi alamat email ini dengan mengklik tombol di bawah.
          </p>

          <div class="button-container">
            <a href="${url}" class="button">
              ✅ Verifikasi Email Saya
            </a>
          </div>

          <div class="project-info">
            <div class="project-title">📊 Tentang SISP Nias Selatan</div>
            <div class="project-desc">
              Platform digital untuk pendataan dan analisis prioritas kebutuhan sarana prasarana pendidikan 
              di Kabupaten Nias Selatan guna mendukung perencanaan pembangunan pendidikan yang lebih baik.
            </div>
          </div>

          <div class="security-note">
            <strong>🔒 Catatan Keamanan:</strong><br>
            Jika Anda tidak mendaftarkan sekolah di SISP Nias Selatan, silakan abaikan email ini. 
            Akun tidak akan dibuat tanpa verifikasi email.
          </div>

          <p style="font-size: 14px; color: #4a5568; margin-bottom: 15px;">
            <strong>Tidak dapat mengklik tombol?</strong> Salin dan tempel tautan berikut ke browser Anda:
          </p>
          
          <div class="url-fallback">
            <a href="${url}" style="color: #4299e1; text-decoration: none;">${url}</a>
          </div>

          <p style="font-size: 13px; color: #718096; margin-top: 25px;">
            Tautan verifikasi ini akan kedaluwarsa dalam 24 jam untuk menjaga keamanan akun Anda.
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">
            <strong>&copy; ${new Date().getFullYear()} SISP Kabupaten Nias Selatan</strong>
          </p>
          <p style="margin: 0; font-size: 11px;">
            Sistem Informasi Sarana Prasarana Pendidikan<br>
            Dinas Pendidikan Kabupaten Nias Selatan
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
