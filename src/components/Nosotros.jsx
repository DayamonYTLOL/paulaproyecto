'use client';

import { useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Nosotros() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="nosotros" ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header + Polaroid image */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="stamp text-accent-500 border-accent-400 text-lg inline-block mb-5">
                {t.about.tag}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 leading-tight">
                {t.about.title}
              </h2>
            </motion.div>

            {/* Polaroid image with washi tape */}
            <motion.div
              className="relative mt-10 inline-block"
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: -3 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
            >
              <div className="washi-tape washi-blue -top-3 left-10 tape-tilt-slight-left" />
              <div className="polaroid" style={{ transform: 'rotate(-3deg)' }}>
                <img
                  src="/images/Imagen3.jpg"
                  alt="Cachorros en la calle"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <p className="font-handwritten text-center text-gray-500 text-lg mt-1">Nuestros peluditos</p>
              </div>
            </motion.div>

            {/* Stat sticker */}
            <motion.div
              className="inline-flex items-center gap-3 bg-cream-200 rounded-full px-5 py-3 mt-6 sticker ml-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7, type: 'spring', stiffness: 200 }}
              style={{ transform: 'rotate(2deg)' }}
            >
              <Heart className="w-6 h-6 text-secondary-500 fill-secondary-300" />
              <span className="text-xl font-handwritten font-bold text-accent-600">200,000 {t.about.statsLabel}</span>
            </motion.div>
          </div>

          {/* Right: Text content with notebook lines */}
          <div>
            <motion.div
              className="notebook-lines p-6 space-y-5 text-gray-600 leading-relaxed text-base"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </motion.div>

            {/* Second polaroid */}
            <motion.div
              className="relative mt-8 inline-block ml-auto"
              initial={{ opacity: 0, rotate: 5 }}
              animate={isInView ? { opacity: 1, rotate: 3 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              style={{ float: 'right' }}
            >
              <div className="washi-tape washi-yellow -top-3 right-8 tape-tilt-right" />
              <div className="polaroid" style={{ transform: 'rotate(3deg)', maxWidth: '320px' }}>
                <img
                  src="/images/Imagen11.jpg"
                  alt="Perro esperando en la calle"
                  className="w-full h-56 object-cover"
                />
                <p className="font-handwritten text-center text-gray-500 text-lg mt-1">Felices juntos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
