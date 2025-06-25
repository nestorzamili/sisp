import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { ReportData } from '@/types/report.types';

// Constants
const PRIMARY_COLOR = '#1a365d';
const ACCENT_COLOR = '#3182ce';
const LIGHT_GRAY = '#f7fafc';
const MEDIUM_GRAY = '#e2e8f0';
const DARK_GRAY = '#4a5568';
const WHITE = '#ffffff';

// Styles for Landscape Layout
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: 2,
    borderBottomColor: PRIMARY_COLOR,
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: DARK_GRAY,
    marginBottom: 3,
  },
  generatedDate: {
    fontSize: 8,
    color: DARK_GRAY,
  },
  summarySection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  summaryItem: {
    width: '23%',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 7,
    color: DARK_GRAY,
    marginBottom: 1,
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  tableContainer: {
    marginTop: 10,
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    padding: 4,
    borderRadius: 3,
  },
  tableHeaderText: {
    color: WHITE,
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableHeaderRow1: {
    flexDirection: 'row',
    backgroundColor: ACCENT_COLOR,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  tableHeaderRow2: {
    flexDirection: 'row',
    backgroundColor: ACCENT_COLOR,
  },
  tableHeaderCell: {
    color: WHITE,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRightWidth: 0.5,
    borderRightColor: WHITE,
  },
  tableHeaderCellNoBorder: {
    color: WHITE,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 24,
  },
  tableRowEven: {
    backgroundColor: LIGHT_GRAY,
  },
  tableRowOdd: {
    backgroundColor: WHITE,
  },
  tableCell: {
    fontSize: 9,
    textAlign: 'center',
    color: DARK_GRAY,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  tableCellLeft: {
    fontSize: 9,
    textAlign: 'left',
    color: DARK_GRAY,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    textAlign: 'center',
    fontSize: 7,
    color: DARK_GRAY,
    borderTop: 1,
    borderTopColor: MEDIUM_GRAY,
    paddingTop: 5,
  },
  pdfHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR,
    paddingBottom: 10,
    position: 'relative',
  },
  pdfLogo: {
    width: 65,
    height: 60,
    position: 'absolute',
    left: 0,
  },
  pdfHeaderText: {
    flex: 1,
    paddingLeft: 80,
    paddingRight: 80,
  },
  pdfHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    color: PRIMARY_COLOR,
  },
  pdfHeaderSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    color: PRIMARY_COLOR,
  },
  pdfHeaderAddress: {
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 1.4,
    color: DARK_GRAY,
  },
});

interface SekolahReportPDFProps {
  data: ReportData;
}

export const SekolahReportPDF: React.FC<SekolahReportPDFProps> = ({ data }) => {
  // Split data into chunks for pagination
  const itemsPerPage = 15; // Adjust based on landscape space
  const pages = [];
  for (let i = 0; i < data.sekolahList.length; i += itemsPerPage) {
    pages.push(data.sekolahList.slice(i, i + itemsPerPage));
  }

  // Header ala sekolah-pdf
  const PDFHeader = () => (
    <View style={styles.pdfHeader} fixed>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image style={styles.pdfLogo} src="/logo-nias-selatan.png" />
      <View style={styles.pdfHeaderText}>
        <Text style={styles.pdfHeaderTitle}>
          PEMERINTAH KABUPATEN NIAS SELATAN
        </Text>
        <Text style={styles.pdfHeaderSubtitle}>DINAS PENDIDIKAN</Text>
        <Text style={styles.pdfHeaderAddress}>
          Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera Utara{'\n'}
          Email: disdiknisel90@gmail.com | Kode Pos: 22865
        </Text>
      </View>
    </View>
  );

  // Table column widths (total 100%)
  const colWidths = [
    '4%', // No
    '16%', // Nama Sekolah
    '8%', // NPSN
    '10%', // Kecamatan
    '8%', // Guru PNS
    '7%', // Guru PPPK
    '7%', // Guru Honorer
    '8%', // Siswa 7
    '7%', // Siswa 8
    '7%', // Siswa 9
    '5%', // Sarana Baik (dipersempit)
    '5%', // Sarana Rusak (dipersempit)
    '6%', // Prasarana Baik (dipersempit)
    '6%', // Prasarana Rusak (dipersempit)
  ];

  // Helper untuk menjumlahkan lebar kolom (misal: [4, 5, 6] => 15%)
  const sumColWidths = (idxArr: number[]) =>
    idxArr.reduce((sum, idx) => sum + parseFloat(colWidths[idx]), 0) + '%';

  // Label sub-header
  const subHeaderLabels = [
    '',
    '',
    '',
    '',
    'PNS',
    'PPPK',
    'Honorer',
    'Kelas 7',
    'Kelas 8',
    'Kelas 9',
    'Baik',
    'Rusak',
    'Baik',
    'Rusak',
  ];

  // Render table header dua baris (refactor)
  const renderTableHeader = () => (
    <>
      <View style={styles.tableHeaderRow1}>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: colWidths[0],
            borderRightWidth: 1,
          }}
        >
          No
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: colWidths[1],
            borderRightWidth: 1,
          }}
        >
          Nama Sekolah
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: colWidths[2],
            borderRightWidth: 1,
          }}
        >
          NPSN
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: colWidths[3],
            borderRightWidth: 1,
          }}
        >
          Kecamatan
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: sumColWidths([4, 5, 6]),
            borderRightWidth: 1,
          }}
        >
          Total Guru
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: sumColWidths([7, 8, 9]),
            borderRightWidth: 1,
          }}
        >
          Total Siswa
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCell,
            width: sumColWidths([10, 11]),
            borderRightWidth: 1,
          }}
        >
          Total Sarana
        </Text>
        <Text
          style={{
            ...styles.tableHeaderCellNoBorder,
            width: sumColWidths([12, 13]),
          }}
        >
          Total Prasarana
        </Text>
      </View>
      <View style={styles.tableHeaderRow2}>
        {colWidths.map((w, i) => (
          <Text
            key={i}
            style={{
              ...(i === 13
                ? styles.tableHeaderCellNoBorder
                : styles.tableHeaderCell),
              width: w,
              borderRightWidth: i === 13 ? 0 : 1,
            }}
          >
            {subHeaderLabels[i]}
          </Text>
        ))}
      </View>
    </>
  );

  // Tipe baris data sekolah
  type SekolahRow = {
    sekolah: {
      id: string;
      nama_sekolah: string;
      npsn: string;
      kecamatan?: string | null;
    };
    guru: {
      pns: { total: number };
      pppk: { total: number };
      honorer: { total: number };
    };
    siswa: {
      kelas7: { total: number };
      kelas8: { total: number };
      kelas9: { total: number };
    };
    sarana: {
      kondisiBaik: number;
      kondisiRusak: number;
    };
    prasarana: {
      kondisiBaik: number;
      kondisiRusak: number;
    };
  };

  // Render table rows (refactor)
  const renderTableRows = (pageData: SekolahRow[], pageIndex: number) =>
    pageData.map((item, index) => {
      const globalIndex = pageIndex * itemsPerPage + index + 1;
      const isEven = index % 2 === 0;
      const rowData = [
        globalIndex,
        item.sekolah.nama_sekolah,
        item.sekolah.npsn,
        item.sekolah.kecamatan || '-',
        item.guru.pns.total,
        item.guru.pppk.total,
        item.guru.honorer.total,
        item.siswa.kelas7.total,
        item.siswa.kelas8.total,
        item.siswa.kelas9.total,
        item.sarana.kondisiBaik,
        item.sarana.kondisiRusak,
        item.prasarana.kondisiBaik,
        item.prasarana.kondisiRusak,
      ];
      return (
        <View
          key={item.sekolah.id}
          style={[styles.tableRow, ...(isEven ? [styles.tableRowEven] : [])]}
        >
          {rowData.map((cell, i) => (
            <Text
              key={i}
              style={
                i === 1
                  ? { ...styles.tableCellLeft, width: colWidths[i] }
                  : { ...styles.tableCell, width: colWidths[i] }
              }
            >
              {cell}
            </Text>
          ))}
        </View>
      );
    });

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page
          key={pageIndex}
          size="A4"
          orientation="landscape"
          style={styles.page}
        >
          <PDFHeader />
          <Text style={styles.title}>
            Laporan Sarana dan Prasarana SMP Nias Selatan
          </Text>
          {/* Table */}
          <View style={styles.tableContainer}>
            {renderTableHeader()}
            {renderTableRows(pageData, pageIndex)}
          </View>
          <Text style={styles.footer}>
            Halaman {pageIndex + 1} dari {pages.length} | Laporan Sarana dan
            Prasarana SMP Nias Selatan
          </Text>
        </Page>
      ))}
    </Document>
  );
};
