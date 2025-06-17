import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { SekolahWithDetails } from '@/types/sekolah';

// Register font for better text rendering
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 4,
  },
  headerAddress: {
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: '#f0f0f0',
    padding: 5,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  label: {
    width: '35%',
    fontSize: 9,
    fontWeight: 500,
  },
  value: {
    width: '65%',
    fontSize: 9,
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 3,
    marginBottom: 3,
    fontSize: 8,
    textAlign: 'center',
  },
  tableCellLeft: {
    margin: 5,
    fontSize: 8,
    textAlign: 'left',
  },
  emptyState: {
    textAlign: 'center',
    fontWeight: 300,
    color: '#666666',
    marginTop: 10,
    marginBottom: 10,
  },
  lampiranImage: {
    width: '45%',
    maxHeight: 300,
    marginBottom: 10,
    marginRight: '5%',
  },
  lampiranContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lampiranItem: {
    width: '45%',
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#cccccc',
    padding: 5,
  },
  lampiranTitle: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 5,
    textAlign: 'center',
  },
});

interface SekolahPDFProps {
  data: SekolahWithDetails;
}

export const SekolahPDF = ({ data }: SekolahPDFProps) => {
  // Helper functions
  const formatGender = (gender: string) => {
    return gender === 'L' ? 'Laki-laki' : gender === 'P' ? 'Perempuan' : gender;
  };

  const convertToRoman = (num: string) => {
    const arabicToRoman: { [key: string]: string } = {
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

  // Group functions
  const groupGuruByStatus = (guruData: typeof data.guru) => {
    if (!guruData) return {};
    return guruData.reduce(
      (acc, guru) => {
        const status = guru.status_guru;
        if (!acc[status]) acc[status] = {};
        const gender = formatGender(guru.jenis_kelamin);
        acc[status][gender] = (acc[status][gender] || 0) + guru.jumlah;
        return acc;
      },
      {} as Record<string, Record<string, number>>,
    );
  };

  const groupRombelByTingkatan = (rombelData: typeof data.rombonganBelajar) => {
    if (!rombelData) return {};
    return rombelData.reduce(
      (acc, rombel) => {
        const tingkatan = rombel.tingkatan_kelas;
        if (!acc[tingkatan]) acc[tingkatan] = {};
        const gender = formatGender(rombel.jenis_kelamin);
        acc[tingkatan][gender] =
          (acc[tingkatan][gender] || 0) + rombel.jumlah_siswa;
        return acc;
      },
      {} as Record<string, Record<string, number>>,
    );
  };

  const groupSaranaByName = (saranaData: typeof data.sarana) => {
    if (!saranaData) return {};
    return saranaData.reduce(
      (acc, sarana) => {
        const name = sarana.nama_sarana;
        if (!acc[name]) {
          acc[name] = {
            total: 0,
            baik: 0,
            rusak: 0,
            keterangan: sarana.keterangan,
          };
        }
        acc[name].total += sarana.jumlah_total;
        acc[name].baik += sarana.jumlah_kondisi_baik;
        acc[name].rusak += sarana.jumlah_kondisi_rusak;
        if (!acc[name].keterangan && sarana.keterangan) {
          acc[name].keterangan = sarana.keterangan;
        }
        return acc;
      },
      {} as Record<
        string,
        {
          total: number;
          baik: number;
          rusak: number;
          keterangan: string | null;
        }
      >,
    );
  };

  const groupPrasaranaByName = (prasaranaData: typeof data.prasarana) => {
    if (!prasaranaData) return {};
    return prasaranaData.reduce(
      (acc, prasarana) => {
        const name = prasarana.nama_prasarana;
        if (!acc[name]) {
          acc[name] = {
            total: 0,
            baik: 0,
            rusak: 0,
            keterangan: prasarana.keterangan,
          };
        }
        acc[name].total += prasarana.jumlah_total;
        acc[name].baik += prasarana.jumlah_kondisi_baik;
        acc[name].rusak += prasarana.jumlah_kondisi_rusak;
        if (!acc[name].keterangan && prasarana.keterangan) {
          acc[name].keterangan = prasarana.keterangan;
        }
        return acc;
      },
      {} as Record<
        string,
        {
          total: number;
          baik: number;
          rusak: number;
          keterangan: string | null;
        }
      >,
    );
  }; // Check if file is image
  const isImageFile = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) =>
      url.toLowerCase().includes(ext.toLowerCase()),
    );
  };

  // Filter only images from lampiran
  const getImageLampiran = (lampiran: typeof data.lampiran) => {
    if (!lampiran) return [];
    return lampiran.filter((item) => isImageFile(item.url));
  };
  // Chunk lampiran for pagination (2 per page)
  const chunkLampiran = (
    array: Array<{
      id: string;
      nama_dokumen: string;
      url: string;
      keterangan: string;
    }>,
    size: number,
  ) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  const imageLampiran = getImageLampiran(data.lampiran);
  const imageLampiranChunks =
    imageLampiran.length > 0 ? chunkLampiran(imageLampiran, 2) : [];

  return (
    <Document>
      {' '}
      {/* Main Page */}{' '}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={styles.logo}
            src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo-nias-selatan.svg`}
          />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              PEMERINTAH KABUPATEN NIAS SELATAN
            </Text>
            <Text style={styles.headerSubtitle}>DINAS PENDIDIKAN</Text>
            <Text style={styles.headerAddress}>
              Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera Utara
              {'\n'}
              Email : disdiknisel90@gmail.com Kode Pos 22865
            </Text>
          </View>
        </View>
        <Text style={styles.title}>DATA SEKOLAH</Text>
        {/* Informasi Sekolah */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Sekolah</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nama Sekolah:</Text>
            <Text style={styles.value}>{data.nama_sekolah}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NPSN:</Text>
            <Text style={styles.value}>{data.npsn}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kepala Sekolah:</Text>
            <Text style={styles.value}>
              {data.nama_kepala_sekolah || 'Belum diisi'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NIP Kepala Sekolah:</Text>
            <Text style={styles.value}>
              {data.nip_kepala_sekolah || 'Belum diisi'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.value}>
              {data.alamat_sekolah || 'Belum diisi'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kecamatan:</Text>
            <Text style={styles.value}>{data.kecamatan || 'Belum diisi'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Telepon:</Text>
            <Text style={styles.value}>{data.phone || 'Belum diisi'}</Text>
          </View>{' '}
          <View style={styles.row}>
            <Text style={styles.label}>Email User:</Text>
            <Text style={styles.value}>
              {data.user?.email || 'Belum diisi'}
            </Text>
          </View>
        </View>
        {/* Data Guru */}
        <View style={styles.section}>
          {' '}
          <Text style={styles.sectionTitle}>Data Guru</Text>
          {data.guru && data.guru.length > 0 ? (
            Object.entries(groupGuruByStatus(data.guru)).map(
              ([status, genderData]) => (
                <View key={status} style={{ marginBottom: 8 }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      marginBottom: 3,
                    }}
                  >
                    {status}
                  </Text>
                  {Object.entries(genderData).map(([gender, jumlah]) => (
                    <View key={gender} style={styles.row}>
                      <Text style={styles.label}>{gender}:</Text>
                      <Text style={styles.value}>{jumlah} orang</Text>
                    </View>
                  ))}
                </View>
              ),
            )
          ) : (
            <Text style={styles.emptyState}>Belum ada data guru</Text>
          )}
        </View>
        {/* Data Rombongan Belajar */}
        <View style={styles.section}>
          {' '}
          <Text style={styles.sectionTitle}>Rombongan Belajar</Text>
          {data.rombonganBelajar && data.rombonganBelajar.length > 0 ? (
            Object.entries(groupRombelByTingkatan(data.rombonganBelajar)).map(
              ([tingkatan, genderData]) => (
                <View key={tingkatan} style={{ marginBottom: 8 }}>
                  {' '}
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      marginBottom: 3,
                    }}
                  >
                    Kelas {convertToRoman(tingkatan)}
                  </Text>
                  {Object.entries(genderData).map(([gender, jumlah]) => (
                    <View key={gender} style={styles.row}>
                      <Text style={styles.label}>{gender}:</Text>
                      <Text style={styles.value}>{jumlah} siswa</Text>
                    </View>
                  ))}
                </View>
              ),
            )
          ) : (
            <Text style={styles.emptyState}>
              Belum ada data rombongan belajar
            </Text>
          )}
        </View>
        {/* Data Sarana */}
        <View style={styles.section}>
          {' '}
          <Text style={styles.sectionTitle}>Data Sarana</Text>
          {data.sarana && data.sarana.length > 0 ? (
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Nama Sarana</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Baik</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Rusak</Text>
                </View>
              </View>
              {Object.entries(groupSaranaByName(data.sarana)).map(
                ([name, saranaData]) => (
                  <View key={name} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellLeft}>{name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{saranaData.total}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{saranaData.baik}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{saranaData.rusak}</Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          ) : (
            <Text style={styles.emptyState}>Belum ada data sarana</Text>
          )}
        </View>
        {/* Data Prasarana */}
        <View style={styles.section}>
          {' '}
          <Text style={styles.sectionTitle}>Data Prasarana</Text>
          {data.prasarana && data.prasarana.length > 0 ? (
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Nama Prasarana</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Baik</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Rusak</Text>
                </View>
              </View>
              {Object.entries(groupPrasaranaByName(data.prasarana)).map(
                ([name, prasaranaData]) => (
                  <View key={name} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellLeft}>{name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {prasaranaData.total}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{prasaranaData.baik}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {prasaranaData.rusak}
                      </Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          ) : (
            <Text style={styles.emptyState}>Belum ada data prasarana</Text>
          )}
        </View>
        {/* Kebutuhan Prioritas */}
        <View style={styles.section}>
          {' '}
          <Text style={styles.sectionTitle}>Kebutuhan Prioritas</Text>
          {data.kebutuhanPrioritas && data.kebutuhanPrioritas.length > 0 ? (
            data.kebutuhanPrioritas.map((prioritas, index) => (
              <View key={prioritas.id} style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 9 }}>
                  {index + 1}. {prioritas.penjelasan || 'Tidak ada penjelasan'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyState}>
              Belum ada data kebutuhan prioritas
            </Text>
          )}
        </View>{' '}
        {/* Info Lampiran */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lampiran</Text>
          {imageLampiran.length > 0 ? (
            <View>
              {/* Summary */}
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 9, fontWeight: 500, marginBottom: 5 }}>
                  Total: {imageLampiran.length} gambar lampiran
                </Text>
              </View>

              {/* Images List */}
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 9, fontWeight: 500, marginBottom: 3 }}>
                  📸 Daftar Lampiran Gambar:
                </Text>
                {imageLampiran.map((lampiran, index) => (
                  <View
                    key={lampiran.id}
                    style={{ marginBottom: 2, marginLeft: 10 }}
                  >
                    <Text style={{ fontSize: 8 }}>
                      {index + 1}. {lampiran.nama_dokumen}
                      {lampiran.keterangan && ` - ${lampiran.keterangan}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.emptyState}>Belum ada lampiran gambar</Text>
          )}
        </View>
      </Page>
      {/* Image Lampiran Pages */}
      {imageLampiranChunks.map((chunk, pageIndex) => (
        <Page key={`image-${pageIndex}`} size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              style={styles.logo}
              src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo-nias-selatan.svg`}
            />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>
                PEMERINTAH KABUPATEN NIAS SELATAN
              </Text>
              <Text style={styles.headerSubtitle}>DINAS PENDIDIKAN</Text>
              <Text style={styles.headerAddress}>
                Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera Utara
                {'\n'}
                Email : disdiknisel90@gmail.com Kode Pos 22865
              </Text>
            </View>
          </View>{' '}
          <Text style={styles.title}>
            LAMPIRAN - {data.nama_sekolah} (Halaman {pageIndex + 1})
          </Text>
          <View style={styles.lampiranContainer}>
            {chunk.map((lampiran) => (
              <View key={lampiran.id} style={styles.lampiranItem}>
                <Text style={styles.lampiranTitle}>
                  {lampiran.nama_dokumen}
                </Text>
                {lampiran.keterangan && (
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: 'center',
                      marginBottom: 5,
                      fontWeight: 300,
                      color: '#666666',
                    }}
                  >
                    {lampiran.keterangan}
                  </Text>
                )}
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  src={lampiran.url}
                  style={{
                    width: '100%',
                    maxHeight: 250,
                    objectFit: 'contain',
                  }}
                />
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};
