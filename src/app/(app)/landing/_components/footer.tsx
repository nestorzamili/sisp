import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMapPin,
  IconPhone,
  IconMail,
  IconSend,
} from '@tabler/icons-react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-100 pt-16 pb-8">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4 flex items-center">
                <Image
                  src="/logo-nias-selatan.png"
                  alt="Logo Nias Selatan"
                  width={28}
                  height={28}
                  className="mr-2"
                />
                <span>SISPS Nias Selatan</span>
              </div>
              <p className="text-slate-400 mb-6">
                Sistem pendataan sarana prasarana resmi dari Dinas Pendidikan
                Kabupaten Nias Selatan untuk mendukung perencanaan pembangunan
                pendidikan yang berkualitas.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                >
                  <IconBrandFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                >
                  <IconBrandTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                >
                  <IconBrandInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                >
                  <IconBrandYoutube size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#facilities"
                    className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Data yang Dikumpulkan
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Proses
                  </a>
                </li>
                <li>
                  <a
                    href="#statistics"
                    className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Statistik
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                  >
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <IconMapPin className="mt-1 mr-3 text-primary" size={20} />
                  <span className="text-slate-400">
                    Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera
                    Utara 22865
                  </span>
                </li>
                <li className="flex items-center">
                  <IconPhone className="mr-3 text-primary" size={20} />
                  <span className="text-slate-400">+62 639 21001</span>
                </li>
                <li className="flex items-center">
                  <IconMail className="mr-3 text-primary" size={20} />
                  <span className="text-slate-400">
                    disdiknisel90@gmail.com
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Info Terbaru</h3>
              <p className="text-slate-400 mb-4">
                Dapatkan informasi terbaru mengenai kegiatan pendataan dan
                pengembangan pendidikan di Nias Selatan.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="bg-slate-800 text-slate-100 px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full border-none text-sm"
                />
                <Button className="btn-primary rounded-l-none">
                  <IconSend size={16} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-800 my-8" />

          <div className="flex flex-col items-center">
            <div className="text-slate-400 text-sm text-center">
              © 2025 Dinas Pendidikan Kabupaten Nias Selatan. Hak cipta
              dilindungi undang-undang.
              <div className="mt-1">
                Dibuat oleh{' '}
                <a
                  href="https://nestorzamili.works/"
                  className="text-primary hover:underline"
                >
                  Nestor Zamili
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
