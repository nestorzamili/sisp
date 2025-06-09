export type Step1Data = {
  namaSekolah: string;
  npsn: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  alamatSekolah: string;
  kecamatan: string;
};

export type Step2Data = {
  guruPnsLaki: string;
  guruPnsPerempuan: string;
  guruPpppLaki: string;
  guruPpppPerempuan: string;
  guruGttLaki: string;
  guruGttPerempuan: string;
};

export type Step3Data = {
  rombelKelas7: string;
  rombelKelas8: string;
  rombelKelas9: string;
  siswaKelas7Laki: string;
  siswaKelas7Perempuan: string;
  siswaKelas8Laki: string;
  siswaKelas8Perempuan: string;
  siswaKelas9Laki: string;
  siswaKelas9Perempuan: string;
};

export type Step4Data = {
  ruangKelasTotal: string;
  ruangKelasBaik: string;
  ruangKelasRusak: string;
  perpustakaanTotal: string;
  perpustakaanBaik: string;
  perpustakaanRusak: string;
  ruangKepalaSekolahKondisi: string;
  ruangKepalaSekolahKeterangan?: string;
  ruangGuruKondisi: string;
  ruangGuruKeterangan?: string;
  aulaPertemuanKondisi: string;
  aulaPertemuanKeterangan?: string;
  laboratoriumIpaKondisi: string;
  laboratoriumIpaKeterangan?: string;
  laboratoriumBahasaKondisi: string;
  laboratoriumBahasaKeterangan?: string;
  laboratoriumTikKondisi: string;
  laboratoriumTikKeterangan?: string;
};

export type Step5Data = {
  mejaKursiSiswaTotal: string;
  mejaKursiSiswaBaik: string;
  mejaKursiSiswaRusak: string;
  komputerTotal: string;
  komputerBaik: string;
  komputerRusak: string;
  toiletSiswaTotal: string;
  toiletSiswaBaik: string;
  toiletSiswaRusak: string;
  toiletGuruTotal: string;
  toiletGuruBaik: string;
  toiletGuruRusak: string;
  prasaranaLainnya?: Array<{
    nama: string;
    jumlah: string;
    kondisi: string;
  }>;
};

export type Step6Data = {
  kebutuhanPrioritas: string;
};

export type Step7Data = {
  lampiran?: Array<{
    jenisLampiran: string;
    namaFile: string;
    keterangan: string;
    file?: File;
  }>;
};
