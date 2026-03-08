'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function BlogPreview() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden torn-edge-top bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-handwritten font-bold text-accent-600 mb-4">
            {t.blogPreview.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.blogPreview.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, rotate: -4 }}
            animate={isInView ? { opacity: 1, rotate: -2 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <div className="washi-tape washi-blue -top-3 right-10 tape-tilt-right" />
            <div className="polaroid" style={{ transform: 'rotate(-2deg)' }}>
              <img
                src="https://images.unsplash.com/photo-1583337130417-13571c40b8e0?w=800&q=80"
                alt="Historias de rescate"
                className="w-full h-72 object-cover"
              />
              <p className="font-handwritten text-center text-gray-400 text-lg mt-1">Nuestras historias</p>
            </div>
          </motion.div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="notebook-lines p-4">
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.blogPreview.p1}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                {t.blogPreview.p2}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-400 hover:bg-secondary-500 text-white rounded-full font-semibold transition-colors"
              >
                {t.blogPreview.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
