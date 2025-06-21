export function VerificationEmailTemplate(url: string, name?: string) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Verifikasi Email - SISP SMP Nias Selatan</title>
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
        
        /* Success indicator */
        .success-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0fff4;
          border: 2px solid #38a169;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        
        .success-icon {
          width: 24px;
          height: 24px;
          background-color: #38a169;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        
        .success-text {
          color: #22543d;
          font-weight: 600;
          font-size: 16px;
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
        
        .note {
          background-color: #fffaf0;
          border-left: 4px solid #ed8936;
          padding: 16px 20px;
          margin: 24px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .note-text {
          font-size: 14px;
          color: #9c4221;
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
          .note {
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
        }      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="header">
          <div class="logo">SISP SMP Nias Selatan</div>
          <div class="subtitle">Sistem Informasi Sarana dan Prasarana</div>
        </div>
        
        <div class="content">
          <div class="success-indicator">
            <div class="success-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="success-text">Akun Berhasil Disetujui</div>
          </div>
          
          <div class="greeting">Halo${name ? ' ' + name : ''}! 👋</div>
          <div class="description">
            Selamat! Akun Anda telah <strong>disetujui</strong> oleh administrator. Untuk melengkapi proses pendaftaran dan memastikan keamanan akun Anda, silakan verifikasi alamat email dengan mengklik tombol di bawah ini.
          </div>

          <div class="button-container">
            <a href="${url}" class="button">✉️ Verifikasi Email Sekarang</a>
          </div>

          <div class="fallback">
            <div class="fallback-title">🔗 Tautan Alternatif</div>
            <div class="fallback-text">
              Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:
              <br><br>
              <a href="${url}" class="fallback-link">${url}</a>
            </div>
          </div>

          <div class="note">
            <div class="note-text">
              <strong>⚠️ Penting:</strong> Jika Anda tidak merasa mengajukan pendaftaran, abaikan email ini. Tautan verifikasi akan kedaluwarsa dalam <strong>24 jam</strong> demi keamanan.
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
