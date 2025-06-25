import { pdf } from '@react-pdf/renderer';
import { SekolahPDF } from '@/templates/school-report';
import { SekolahReportPDF } from '@/templates/summary-report';
import { SekolahWithDetails } from '@/types/sekolah';
import { ReportData } from '@/types/report.types';

export const generateSekolahPDF = async (data: SekolahWithDetails) => {
  try {
    const blob = await pdf(<SekolahPDF data={data} />).toBlob();
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Gagal membuat PDF');
  }
};

export const downloadSekolahPDF = async (data: SekolahWithDetails) => {
  try {
    const blob = await generateSekolahPDF(data);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.nama_sekolah} - ${data.npsn}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

export const generateSekolahReportPDF = async (data: ReportData) => {
  try {
    const blob = await pdf(<SekolahReportPDF data={data} />).toBlob();
    return blob;
  } catch (error) {
    console.error('Error generating report PDF:', error);
    throw new Error('Gagal membuat PDF laporan');
  }
};

export const downloadSekolahReportPDF = async (data: ReportData) => {
  try {
    const blob = await generateSekolahReportPDF(data);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Generate filename with timestamp
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = `Laporan_Data_Sekolah_${timestamp}.pdf`;

    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading report PDF:', error);
    throw error;
  }
};
