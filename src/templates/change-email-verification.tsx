export function ChangeEmailVerificationTemplate(
  url: string,
  newEmail: string,
  name?: string,
) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Verifikasi Perubahan Email - SISP SMP Nias Selatan</title>
      <style>
        /* Reset styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        /* Base styles */
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 20px;
          color: #1a202c;
          line-height: 1.6;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        /* Container styles */
        .email-wrapper {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        /* Header styles */
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 32px 24px;
          text-align: center;
        }
        
        .logo {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 8px;
        }
        
        .subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 500;
        }
        
        /* Content styles */
        .content {
          padding: 40px 32px;
        }
        
        .greeting {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
        }
        
        .description {
          font-size: 16px;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 32px;
        }
        
        /* Change indicator */
        .change-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e6fffa;
          border: 2px solid #38b2ac;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        
        .change-icon {
          width: 24px;
          height: 24px;
          background-color: #38b2ac;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        
        .change-text {
          color: #234e52;
          font-weight: 600;
          font-size: 16px;
        }
        
        /* Email change info */
        .email-change-info {
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        
        .email-change-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 12px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .email-display {
          background-color: #ffffff;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          padding: 12px 16px;
          margin: 8px 0;
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          color: #2d3748;
          word-break: break-all;
        }
        
        .new-email {
          border-left: 4px solid #38b2ac;
          background-color: #e6fffa;
          color: #234e52;
        }
        
        /* Button styles */
        .button-container {
          text-align: center;
          margin: 40px 0;
        }
        
        .button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff !important;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          border: none;
          min-width: 200px;
        }
        
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        /* Fallback and note styles */
        .fallback {
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        
        .fallback-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .fallback-text {
          font-size: 13px;
          color: #718096;
          word-break: break-all;
          line-height: 1.5;
        }
        
        .fallback-link {
          color: #667eea;
          text-decoration: none;
        }
        
        .security-note {
          background-color: #fef5e7;
          border-left: 4px solid #ed8936;
          padding: 16px 20px;
          margin: 24px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .security-note-text {
          font-size: 14px;
          color: #9c4221;
          line-height: 1.5;
        }
        
        .expiry-info {
          background-color: #ebf8ff;
          border-left: 4px solid #3182ce;
          padding: 16px 20px;
          margin: 24px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .expiry-text {
          font-size: 14px;
          color: #2c5282;
          line-height: 1.5;
        }
        
        /* Additional info box */
        .info-box {
          background-color: #e6fffa;
          border-left: 4px solid #38b2ac;
          padding: 16px 20px;
          margin: 24px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .info-text {
          font-size: 14px;
          color: #234e52;
          line-height: 1.5;
        }
        
        /* Footer styles */
        .footer {
          background-color: #f7fafc;
          padding: 32px 24px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
          font-size: 12px;
          color: #718096;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        
        .footer-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }
        
        .footer-link:hover {
          text-decoration: underline;
        }
        
        /* Mobile responsive styles */
        @media only screen and (max-width: 600px) {
          body {
            padding: 10px;
          }
          
          .email-wrapper {
            border-radius: 8px;
          }
          
          .header {
            padding: 24px 20px;
          }
          
          .logo {
            font-size: 24px;
          }
          
          .content {
            padding: 32px 20px;
          }
          
          .greeting {
            font-size: 20px;
          }
          
          .description {
            font-size: 15px;
          }
          
          .button {
            padding: 14px 24px;
            font-size: 15px;
            min-width: auto;
            width: 100%;
            max-width: 280px;
          }
          
          .fallback,
          .security-note,
          .expiry-info,
          .info-box,
          .email-change-info {
            margin: 20px 0;
            padding: 16px;
          }
          
          .footer {
            padding: 24px 20px;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .fallback-text {
            color: #a0aec0;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="header">
          <div class="logo">SISP SMP Nias Selatan</div>
          <div class="subtitle">Sistem Informasi Sarana dan Prasarana</div>
        </div>
        
        <div class="content">
          <div class="change-indicator">
            <div class="change-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="change-text">Verifikasi Perubahan Email</div>
          </div>
          
          <div class="greeting">Halo${name ? ' ' + name : ''}! 👋</div>
          <div class="description">
            Kami menerima permintaan untuk <strong>mengubah alamat email</strong> akun Anda di SISP SMP Nias Selatan. Untuk keamanan dan memastikan bahwa Anda memiliki akses ke email baru, silakan verifikasi alamat email baru Anda.
          </div>

          <div class="email-change-info">
            <div class="email-change-title">
              📧 Informasi Perubahan Email
            </div>
            <div style="margin: 12px 0;">
              <strong style="font-size: 14px; color: #4a5568;">Email Baru:</strong>
              <div class="email-display new-email">
                ${newEmail}
              </div>
            </div>
          </div>

          <div class="button-container">
            <a href="${url}" class="button">✅ Verifikasi Email Baru</a>
          </div>

          <div class="fallback">
            <div class="fallback-title">🔗 Tautan Alternatif</div>
            <div class="fallback-text">
              Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:
              <br><br>
              <a href="${url}" class="fallback-link">${url}</a>
            </div>
          </div>

          <div class="info-box">
            <div class="info-text">
              <strong>ℹ️ Yang Terjadi Setelah Verifikasi:</strong><br>
              • Email lama Anda akan diganti dengan email baru<br>
              • Notifikasi sistem akan dikirim ke email baru<br>
              • Anda dapat login menggunakan email baru
            </div>
          </div>

          <div class="security-note">
            <div class="security-note-text">
              <strong>🛡️ Keamanan Akun:</strong> Jika Anda tidak meminta perubahan email ini, segera hubungi administrator. Abaikan email ini jika Anda tidak merasa mengajukan perubahan email.
            </div>
          </div>
          
          <div class="expiry-info">
            <div class="expiry-text">
              <strong>⏰ Informasi Penting:</strong> Tautan verifikasi ini akan <strong>kedaluwarsa dalam 1 jam</strong> demi menjaga keamanan akun Anda. Pastikan untuk segera melakukan verifikasi.
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-text">
            &copy; 2025 Dinas Pendidikan Kabupaten Nias Selatan<br>
            Bidang Sarana dan Prasarana SMP<br>
          </div>
          <div class="footer-text">
            Powered by <a href="https://nestorzamili.works" target="_blank" class="footer-link">Nestor Zamili</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
