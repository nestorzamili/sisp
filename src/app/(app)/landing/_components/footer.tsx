import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  School,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Send,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4 flex items-center">
                <School className="mr-2" size={28} />
                <span>SISP SMP</span>
              </div>
              <p className="text-gray-400 mb-6">
                Sistem pendataan sarana prasarana resmi dari Dinas Pendidikan
                Kabupaten Nias Selatan untuk mendukung perencanaan pembangunan
                pendidikan yang berkualitas.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#facilities"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Data yang Dikumpulkan
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Proses
                  </a>
                </li>
                <li>
                  <a
                    href="#statistics"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Statistik
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
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
                  <MapPin className="mt-1 mr-3 text-red-500" size={20} />
                  <span className="text-gray-400">
                    Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera
                    Utara 22865
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 text-red-500" size={20} />
                  <span className="text-gray-400">+62 639 21001</span>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 text-red-500" size={20} />
                  <span className="text-gray-400">disdiknisel90@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Info Terbaru</h3>
              <p className="text-gray-400 mb-4">
                Dapatkan informasi terbaru mengenai kegiatan pendataan dan
                pengembangan pendidikan di Nias Selatan.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500 w-full border-none text-sm"
                />
                <Button className="!rounded-button whitespace-nowrap rounded-l-none bg-red-600 hover:bg-red-700 cursor-pointer">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800 my-8" />

          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm text-center">
              © 2025 Dinas Pendidikan Kabupaten Nias Selatan. Hak cipta
              dilindungi undang-undang.
              <div className="mt-1">
                Dibuat oleh{' '}
                <a
                  href="https://nestorzamili.works/"
                  className="text-red-500 hover:underline"
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
