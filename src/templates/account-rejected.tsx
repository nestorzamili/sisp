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
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Permohonan Ditolak - SISP SMP Nias Selatan</title>
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
        
        /* Status indicator */
        .status-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fef5e7;
          border: 2px solid #ed8936;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        
        .status-icon {
          width: 24px;
          height: 24px;
          background-color: #ed8936;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        
        .status-text {
          color: #9c4221;
          font-weight: 600;
          font-size: 16px;
        }
        
        /* Information boxes */
        .info-box {
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
          border-left: 4px solid;
        }
        
        .rejection-box {
          background-color: #fef5e7;
          border-left-color: #ed8936;
        }
        
        .rejection-title {
          font-weight: 600;
          color: #9c4221;
          margin-bottom: 12px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .rejection-reason {
          color: #744210;
          font-size: 14px;
          line-height: 1.6;
          background-color: #fffbf0;
          padding: 16px;
          border-radius: 6px;
          margin-top: 12px;
          border: 1px solid #f6e05e;
        }
        
        .help-box {
          background-color: #ebf8ff;
          border-left-color: #3182ce;
        }
        
        .help-title {
          font-weight: 600;
          color: #2c5282;
          margin-bottom: 12px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .help-text {
          color: #2d3748;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .help-list {
          list-style: none;
          padding-left: 0;
        }
        
        .help-list li {
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
        }
        
        .help-list li:last-child {
          border-bottom: none;
        }
        
        .help-list li::before {
          content: "✓";
          color: #38a169;
          font-weight: bold;
          margin-right: 12px;
          background-color: #f0fff4;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        
        .contact-box {
          background-color: #f7fafc;
          border-left-color: #4a5568;
        }
        
        .contact-title {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 12px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .contact-text {
          color: #4a5568;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .contact-details {
          background-color: #ffffff;
          padding: 16px;
          border-radius: 6px;
          margin-top: 12px;
          border: 1px solid #e2e8f0;
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
          
          .info-box {
            margin: 20px 0;
            padding: 16px;
          }
          
          .footer {
            padding: 24px 20px;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .help-text, .contact-text {
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
          <div class="status-indicator">
            <div class="status-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="status-text">Permohonan Memerlukan Perhatian</div>
          </div>
          
          <div class="greeting">Halo ${name}! 👋</div>
          <div class="description">
            Terima kasih telah mengajukan permohonan pendaftaran untuk Sistem Informasi Sarana dan Prasarana (SISP) SMP Kabupaten Nias Selatan. Setelah ditinjau oleh tim administrator, kami perlu memberitahukan status permohonan Anda.
          </div>

          <div class="info-box rejection-box">
            <div class="rejection-title">
              ⚠️ Status: Permohonan Ditolak
            </div>
            <div class="rejection-reason">
              <strong>Alasan penolakan:</strong><br>
              ${rejectionReason}
            </div>
          </div>

          <div class="info-box help-box">
            <div class="help-title">
              💡 Langkah Selanjutnya
            </div>
            <ul class="help-list">
              <li>Pastikan semua data yang dimasukkan sudah benar dan sesuai</li>
              <li>Lengkapi dokumen yang diperlukan jika ada yang kurang</li>
              <li>Hubungi administrator untuk klarifikasi lebih lanjut</li>
              <li>Ajukan pendaftaran ulang setelah memperbaiki data</li>
            </ul>
          </div>

          <div class="info-box contact-box">
            <div class="contact-title">
              📞 Butuh Bantuan?
            </div>
            <div class="contact-text">
              Jika Anda memiliki pertanyaan atau memerlukan bantuan, jangan ragu untuk menghubungi tim administrator SISP SMP Nias Selatan:
              
              <div class="contact-details">
                <strong>📧 Email:</strong> disdiknisel90@gmail.com<br>
                <strong>📱 Telepon:</strong> +62 639 21001<br>
                <strong>🕒 Jam Kerja:</strong> 08:00 - 16:00 WIB (Senin - Jumat)
              </div>
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
