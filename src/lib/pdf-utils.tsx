import { pdf } from '@react-pdf/renderer';
import { SekolahPDF } from '@/components/pdf/sekolah-pdf';
import { SekolahWithDetails } from '@/types/sekolah';

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
