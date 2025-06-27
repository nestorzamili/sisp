'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
      <footer id="contact" className="relative bg-background border-t">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto max-w-[1440px] px-6 pt-16 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-bold mb-4 flex items-center">
                  <Image
                    src="/logo-nias-selatan.png"
                    alt="Logo Nias Selatan"
                    width={28}
                    height={28}
                    className="mr-2"
                  />
                  <span className="text-foreground">SISP SMP Nias Selatan</span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Sistem pendataan sarana prasarana resmi dari Dinas Pendidikan
                  Kabupaten Nias Selatan untuk mendukung perencanaan pembangunan
                  pendidikan yang berkualitas.
                </p>
                <div className="flex space-x-3">
                  {[
                    { icon: IconBrandFacebook, href: '#' },
                    { icon: IconBrandTwitter, href: '#' },
                    { icon: IconBrandInstagram, href: '#' },
                    { icon: IconBrandYoutube, href: '#' },
                  ].map(({ icon: Icon, href }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-150 group"
                      aria-label={`Kunjungi halaman ${Icon.name} kami`}
                    >
                      <Icon
                        size={18}
                        className="group-hover:scale-110 transition-transform duration-150"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Menu Cepat
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Beranda', href: '#home' },
                    { label: 'Fitur', href: '#features' },
                    { label: 'Data yang Dikumpulkan', href: '#facilities' },
                    { label: 'Proses', href: '#process' },
                    { label: 'Statistik', href: '#statistics' },
                    { label: 'Kontak', href: '#contact' },
                  ].map(({ label, href }, index) => (
                    <li key={index}>
                      <motion.a
                        href={href}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.15 }}
                        className="text-muted-foreground hover:text-primary transition-colors duration-150 cursor-pointer block"
                        aria-label={`Navigasi ke bagian ${label}`}
                      >
                        {label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Hubungi Kami
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.15 }}
                      className="mt-1 mr-3 text-primary group-hover:text-primary/80"
                    >
                      <IconMapPin size={18} />
                    </motion.div>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      Jalan Arah Lagundri Km. 7 Fanayama Nias Selatan Sumatera
                      Utara 22865
                    </span>
                  </li>
                  <li className="flex items-center group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.15 }}
                      className="mr-3 text-primary group-hover:text-primary/80"
                    >
                      <IconPhone size={18} />
                    </motion.div>
                    <span className="text-muted-foreground">+62 639 21001</span>
                  </li>
                  <li className="flex items-center group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.15 }}
                      className="mr-3 text-primary group-hover:text-primary/80"
                    >
                      <IconMail size={18} />
                    </motion.div>
                    <span className="text-muted-foreground">
                      disdiknisel90@gmail.com
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Info Terbaru
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Dapatkan informasi terbaru mengenai kegiatan pendataan dan
                  pengembangan pendidikan di Nias Selatan.
                </p>
                <div className="flex">
                  {' '}
                  <input
                    type="email"
                    placeholder="Alamat email Anda"
                    className="bg-muted text-foreground px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary w-full border-none text-sm transition-all duration-150"
                    aria-label="Masukkan alamat email untuk newsletter"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-l-none transition-colors duration-150"
                      aria-label="Berlangganan newsletter"
                    >
                      <IconSend size={16} />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <Separator className="bg-border my-8" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="text-muted-foreground text-sm text-center">
                © 2025 Dinas Pendidikan Kabupaten Nias Selatan. Bidang Sarana
                dan Prasarana SMP.
                <div className="mt-1">
                  Powered by{' '}
                  <motion.a
                    href="https://nestorzamili.works/"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="text-primary hover:text-primary/80 transition-colors duration-150 font-medium"
                    aria-label="Kunjungi website Nestor Zamili - Developer"
                  >
                    Nestor Zamili
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
