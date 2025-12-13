'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-nias-selatan.png"
                alt="Logo Nias Selatan"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">Dinas Pendidikan</span>
                <span className="text-sm text-muted-foreground">Kab. Nias Selatan</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Platform resmi pendataan dan monitoring sarana prasarana sekolah untuk pemerataan kualitas pendidikan.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6">Menu Utama</h4>
            <ul className="space-y-4 text-muted-foreground">
              {['Beranda', 'Fitur', 'Statistik', 'Kontak'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold mb-6">Informasi</h4>
            <ul className="space-y-4 text-muted-foreground">
              {['Panduan Penggunaan', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">Kontak</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Jl. Arah Lagundri Km. 7, Fanayama, Nias Selatan</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(0639) 21001</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>disdik@niasselatankab.go.id</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Dinas Pendidikan Nias Selatan. All rights reserved.</p>
          <p>
            Developed by <span className="font-medium text-foreground">Nestor Zamili</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
