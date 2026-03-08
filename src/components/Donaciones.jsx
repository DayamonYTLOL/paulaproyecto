'use client';

import { useRef } from 'react';
import { CreditCard, Building, Smartphone } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const donationIcons = [CreditCard, Building, Smartphone];
const donationKeys = [
  { title: 'card', desc: 'cardDesc', btn: 'cardBtn' },
  { title: 'bank', desc: 'bankDesc', btn: 'bankBtn' },
  { title: 'mobile', desc: 'mobileDesc', btn: 'mobileBtn' },
];

export default function Donaciones() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="donaciones" ref={sectionRef} className="py-24 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"
          animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"
          animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-white rounded-full"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary-300 font-semibold text-sm uppercase tracking-widest">
            {t.donations.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">
            {t.donations.title}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {t.donations.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {donationKeys.map((dk, index) => {
            const Icon = donationIcons[index];
            return (
              <motion.div
                key={dk.title}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                whileHover={{ y: -8, scale: 1.04 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: index * 0.4 }}
                >
                  <Icon className="w-10 h-10 text-primary-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{t.donations[dk.title]}</h3>
                <p className="text-white/70 text-sm mb-6">{t.donations[dk.desc]}</p>
                <motion.button
                  className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.donations[dk.btn]}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
