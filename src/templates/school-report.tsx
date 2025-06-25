import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { SekolahWithDetails } from '@/types/sekolah';

// Constants
const PRIMARY_COLOR = '#1a365d';
const ACCENT_COLOR = '#3182ce';
const LIGHT_GRAY = '#f7fafc';
const MEDIUM_GRAY = '#e2e8f0';
const DARK_GRAY = '#4a5568';
const WHITE = '#ffffff';

// Use built-in fonts to avoid font loading issues
// Font.register can cause DataView errors with external fonts

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: WHITE,
    paddingHorizontal: 40,
    paddingVertical: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR,
    paddingBottom: 10,
    position: 'relative',
  },
  logo: {
    width: 65,
    height: 60,
    position: 'absolute',
    left: 0,
  },
  headerText: {
    flex: 1,
    paddingLeft: 80,
    paddingRight: 80,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    color: PRIMARY_COLOR,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    color: PRIMARY_COLOR,
  },
  headerAddress: {
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 1.4,
    color: DARK_GRAY,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
    color: PRIMARY_COLOR,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
    pageBreakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    color: PRIMARY_COLOR,
  },
  infoGrid: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: '25%',
    fontWeight: 'normal',
    color: DARK_GRAY,
    textAlign: 'left',
    paddingRight: 8,
    paddingLeft: 12,
  },
  infoColon: {
    width: 10,
    fontWeight: 'normal',
    color: DARK_GRAY,
  },
  infoValue: {
    flex: 1,
    fontWeight: 'normal',
    color: '#1a202c',
    paddingLeft: 2,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: MEDIUM_GRAY,
    marginBottom: 12,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: ACCENT_COLOR,
  },
  tableRowEven: {
    backgroundColor: LIGHT_GRAY,
  },
  tableRowOdd: {
    backgroundColor: WHITE,
  },
  tableCol: {
    borderRightWidth: 0.5,
    borderRightColor: MEDIUM_GRAY,
    paddingVertical: 5,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    color: WHITE,
  },
  tableCell: {
    fontSize: 9,
    textAlign: 'center',
    color: DARK_GRAY,
  },
  tableCellLeft: {
    fontSize: 9,
    textAlign: 'left',
    color: DARK_GRAY,
  },
  emptyState: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#a0aec0',
    marginVertical: 10,
    fontSize: 10,
  },
  lampiranContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  lampiranItem: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: MEDIUM_GRAY,
    borderRadius: 6,
    padding: 10,
    backgroundColor: LIGHT_GRAY,
  },
  lampiranTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    color: DARK_GRAY,
  },
  lampiranDescription: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 8,
    color: '#718096',
  },
  lampiranImage: {
    width: '100%',
    maxHeight: 180,
    objectFit: 'contain',
    borderRadius: 4,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 5,
    color: DARK_GRAY,
  },
});

// Helper functions
const formatGender = (gender: string) => {
  return gender === 'L' ? 'Laki-laki' : gender === 'P' ? 'Perempuan' : gender;
};

const convertToRoman = (num: string) => {
  const arabicToRoman: Record<string, string> = {
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
    '6': 'VI',
    '7': 'VII',
    '8': 'VIII',
    '9': 'IX',
    '10': 'X',
    '11': 'XI',
    '12': 'XII',
  };
  return arabicToRoman[num] || num;
};

const isImageFile = (url: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
};

// Types for grouped data
type GroupedFacilityData = Record<
  string,
  {
    total: number;
    baik: number;
    rusak: number;
    keterangan: string | null;
  }
>;

interface SekolahPDFProps {
  data: SekolahWithDetails;
}

export const SekolahPDF = ({ data }: SekolahPDFProps) => {
  // Header component
  const PDFHeader = () => (
    <View style={styles.header} fixed>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image style={styles.logo} src="/logo-nias-selatan.png" />
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>
          PEMERINTAH KABUPATEN NIAS SELATAN
        </Text>
        <Text style={styles.headerSubtitle}>DINAS PENDIDIKAN</Text>
        <Text style={styles.headerAddress}>
          Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera Utara
          {'\n'}
          Email: disdiknisel90@gmail.com | Kode Pos: 22865
        </Text>
      </View>
    </View>
  );
  // Data processing functions
  const groupGuruDataByKey = <
    T extends { jenis_kelamin: string; jumlah: number },
  >(
    data: T[],
    key: keyof T,
  ) => {
    if (!data) return {};
    return data.reduce<Record<string, Record<string, number>>>((acc, item) => {
      const groupKey = String(item[key]);
      const gender = formatGender(item.jenis_kelamin);
      if (!acc[groupKey]) acc[groupKey] = {};
      acc[groupKey][gender] = (acc[groupKey][gender] || 0) + item.jumlah;
      return acc;
    }, {});
  };

  const groupRombelDataByKey = <
    T extends { jenis_kelamin: string; jumlah_siswa: number },
  >(
    data: T[],
    key: keyof T,
  ) => {
    if (!data) return {};
    return data.reduce<Record<string, Record<string, number>>>((acc, item) => {
      const groupKey = String(item[key]);
      const gender = formatGender(item.jenis_kelamin);
      if (!acc[groupKey]) acc[groupKey] = {};
      acc[groupKey][gender] = (acc[groupKey][gender] || 0) + item.jumlah_siswa;
      return acc;
    }, {});
  };
  const groupSaranaData = <
    T extends {
      nama_sarana: string;
      jumlah_total: number;
      jumlah_kondisi_baik: number;
      jumlah_kondisi_rusak: number;
      keterangan: string | null;
    },
  >(
    data: T[],
  ) => {
    if (!data) return {};
    return data.reduce<
      Record<
        string,
        {
          total: number;
          baik: number;
          rusak: number;
          keterangan: string | null;
        }
      >
    >((acc, item) => {
      const name = item.nama_sarana;
      if (!acc[name]) {
        acc[name] = {
          total: 0,
          baik: 0,
          rusak: 0,
          keterangan: item.keterangan,
        };
      }
      acc[name].total += item.jumlah_total;
      acc[name].baik += item.jumlah_kondisi_baik;
      acc[name].rusak += item.jumlah_kondisi_rusak;
      if (!acc[name].keterangan && item.keterangan) {
        acc[name].keterangan = item.keterangan;
      }
      return acc;
    }, {});
  };

  const groupPrasaranaData = <
    T extends {
      nama_prasarana: string;
      jumlah_total: number;
      jumlah_kondisi_baik: number;
      jumlah_kondisi_rusak: number;
      keterangan: string | null;
    },
  >(
    data: T[],
  ) => {
    if (!data) return {};
    return data.reduce<
      Record<
        string,
        {
          total: number;
          baik: number;
          rusak: number;
          keterangan: string | null;
        }
      >
    >((acc, item) => {
      const name = item.nama_prasarana;
      if (!acc[name]) {
        acc[name] = {
          total: 0,
          baik: 0,
          rusak: 0,
          keterangan: item.keterangan,
        };
      }
      acc[name].total += item.jumlah_total;
      acc[name].baik += item.jumlah_kondisi_baik;
      acc[name].rusak += item.jumlah_kondisi_rusak;
      if (!acc[name].keterangan && item.keterangan) {
        acc[name].keterangan = item.keterangan;
      }
      return acc;
    }, {});
  };
  // Process data
  const groupedGuru = groupGuruDataByKey(data.guru || [], 'status_guru');
  const groupedRombel = groupRombelDataByKey(
    data.rombonganBelajar || [],
    'tingkatan_kelas',
  );
  const groupedSarana = groupSaranaData(data.sarana || []);
  const groupedPrasarana = groupPrasaranaData(data.prasarana || []);

  const imageLampiran = (data.lampiran || []).filter((item) =>
    isImageFile(item.url),
  );
  const imageLampiranChunks =
    imageLampiran.length > 0 ? chunkArray(imageLampiran, 4) : [];

  // Reusable table component
  const renderTable = (
    headers: string[],
    data: Array<Record<string, string | number>>,
    colWidths: string[] = ['8%', '47%', '22.5%', '22.5%'],
  ) => {
    const headersWithNo = ['No', ...headers];
    const adjustedColWidths =
      colWidths.length === headers.length + 1
        ? colWidths
        : ['8%', '47%', '22.5%', '22.5%'];

    return (
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          {headersWithNo.map((header, i) => (
            <View
              key={i}
              style={[styles.tableCol, { width: adjustedColWidths[i] }]}
            >
              <Text style={styles.tableHeaderCell}>{header}</Text>
            </View>
          ))}
        </View>

        {data.length > 0 ? (
          data.map((row, i) => (
            <View
              key={i}
              style={[
                styles.tableRow,
                i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
              wrap={false}
            >
              <View style={[styles.tableCol, { width: adjustedColWidths[0] }]}>
                <Text style={styles.tableCell}>{i + 1}</Text>
              </View>
              {Object.values(row).map((value, j) => (
                <View
                  key={j}
                  style={[styles.tableCol, { width: adjustedColWidths[j + 1] }]}
                >
                  <Text
                    style={j === 0 ? styles.tableCellLeft : styles.tableCell}
                  >
                    {String(value)}
                  </Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={[styles.tableRow, styles.tableRowEven]}>
            <View style={[styles.tableCol, { width: '100%' }]}>
              <Text style={styles.emptyState}>Tidak ada data</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  // Main document
  return (
    <Document>
      {/* Main Page */}
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Text style={styles.title}>DATA SEKOLAH</Text>
        {/* School Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Informasi Sekolah</Text>{' '}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nama Sekolah</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.nama_sekolah}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>NPSN</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.npsn}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Kepala Sekolah</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.nama_kepala_sekolah}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>NIP Kepala Sekolah</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>
                {data.nip_kepala_sekolah || '-'}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Alamat</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.alamat_sekolah}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Kecamatan</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.kecamatan || '-'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Telepon</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.phone || '-'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoColon}>:</Text>
              <Text style={styles.infoValue}>{data.user?.email || '-'}</Text>
            </View>
          </View>
        </View>
        {/* Teacher Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Data Guru</Text>
          {data.guru?.length ? (
            renderTable(
              ['Status Guru', 'Laki-laki', 'Perempuan'],
              Object.entries(groupedGuru).map(([status, genderData]) => ({
                status,
                'Laki-laki':
                  (genderData as Record<string, number>)['Laki-laki'] || 0,
                Perempuan:
                  (genderData as Record<string, number>)['Perempuan'] || 0,
              })),
            )
          ) : (
            <Text style={styles.emptyState}>Belum ada data guru</Text>
          )}
        </View>
        {/* Class Group Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Rombongan Belajar</Text>
          {data.rombonganBelajar?.length ? (
            renderTable(
              ['Kelas', 'Laki-laki', 'Perempuan'],
              Object.entries(groupedRombel).map(([tingkatan, genderData]) => ({
                kelas: `Kelas ${convertToRoman(tingkatan)}`,
                'Laki-laki':
                  (genderData as Record<string, number>)['Laki-laki'] || 0,
                Perempuan:
                  (genderData as Record<string, number>)['Perempuan'] || 0,
              })),
            )
          ) : (
            <Text style={styles.emptyState}>
              Belum ada data rombongan belajar
            </Text>
          )}
        </View>{' '}
        {/* Facility Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Sarana</Text>
          {data.sarana?.length ? (
            renderTable(
              ['Nama Sarana', 'Total', 'Baik', 'Rusak'],
              Object.entries(groupedSarana).map(([name, saranaData]) => ({
                nama: name,
                total: (saranaData as GroupedFacilityData[string]).total,
                baik: (saranaData as GroupedFacilityData[string]).baik,
                rusak: (saranaData as GroupedFacilityData[string]).rusak,
              })),
              ['8%', '52%', '13.33%', '13.33%', '13.34%'],
            )
          ) : (
            <Text style={styles.emptyState}>Belum ada data sarana</Text>
          )}
        </View>{' '}
        {/* Infrastructure Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Prasarana</Text>
          {data.prasarana?.length ? (
            renderTable(
              ['Nama Prasarana', 'Total', 'Baik', 'Rusak'],
              Object.entries(groupedPrasarana).map(([name, prasaranaData]) => ({
                nama: name,
                total: (prasaranaData as GroupedFacilityData[string]).total,
                baik: (prasaranaData as GroupedFacilityData[string]).baik,
                rusak: (prasaranaData as GroupedFacilityData[string]).rusak,
              })),
              ['8%', '52%', '13.33%', '13.33%', '13.34%'],
            )
          ) : (
            <Text style={styles.emptyState}>Belum ada data prasarana</Text>
          )}
        </View>
        {/* Priority Needs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Kebutuhan Prioritas</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              {data.kebutuhanPrioritas?.[0]?.penjelasan ||
                'Tidak ada data kebutuhan prioritas'}
            </Text>
          </View>
        </View>
        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Lampiran</Text>
          {data.lampiran?.length ? (
            <View style={styles.bulletList}>
              {data.lampiran.map((item) => (
                <Text key={item.id} style={styles.bulletItem}>
                  • {item.nama_dokumen}
                  {item.keterangan && ` (${item.keterangan})`}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyState}>Belum ada lampiran</Text>
          )}{' '}
        </View>
      </Page>

      {/* Image Attachment Pages */}
      {imageLampiranChunks.map((chunk, pageIndex) => (
        <Page key={`image-page-${pageIndex}`} size="A4" style={styles.page}>
          <PDFHeader />
          <Text style={styles.title}>LAMPIRAN DOKUMENTASI</Text>
          <View style={styles.lampiranContainer}>
            {chunk.map((item) => (
              <View key={item.id} style={styles.lampiranItem}>
                <Text style={styles.lampiranTitle}>{item.nama_dokumen}</Text>{' '}
                {item.keterangan && (
                  <Text style={styles.lampiranDescription}>
                    {item.keterangan}
                  </Text>
                )}
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image src={item.url} style={styles.lampiranImage} />
              </View>
            ))}{' '}
          </View>
        </Page>
      ))}
    </Document>
  );
};
