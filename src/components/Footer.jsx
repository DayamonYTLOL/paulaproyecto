'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const menuLinks = [
    { name: t.nav.about, href: '/#nosotros' },
    { name: t.nav.whatWeDo, href: '/#que-hacemos' },
    { name: t.nav.publishPet, href: '/#publicar-mascota' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.faq, href: '/#faq' },
  ];

  return (
    <footer ref={footerRef} className="bg-accent-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="text-lg font-handwritten font-bold">{lang === 'es' ? 'Huellitas' : 'Little Paw Prints'}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">{t.footer.desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4 uppercase text-sm tracking-wider">{t.footer.menu}</h4>
            <ul className="space-y-2">
              {menuLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-secondary-300 transition-colors text-sm">{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-accent-800 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">{t.footer.accessibility}</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
