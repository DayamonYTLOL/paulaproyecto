'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Package, Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function DonacionEspecie() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative blob behind image */}
            <div className="absolute -left-6 -bottom-6 w-[90%] h-[105%] blob-teal blob-morph opacity-70 -z-0" style={{ animationDelay: '6s' }} />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&q=80"
                alt="Donación en especie"
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-primary-500 text-white rounded-xl p-4 shadow-lg z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              <Package className="w-8 h-8" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-accent-500">
              {t.donationInKind.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.donationInKind.subtitle}
            </p>
            <ul className="space-y-3">
              {t.donationInKind.items.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <Heart className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/donacionenespecie"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-colors shadow-lg"
              >
                {t.donationInKind.cta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
