'use client';

import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const testimImages = [
  'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=300&q=80',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80',
  'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?w=300&q=80',
];

const tiltAngles = [-2, 1.5, -1];
const tapePositions = ['left-8 -top-3 tape-tilt-left', 'right-8 -top-3 tape-tilt-right', 'left-12 -top-3 tape-tilt-slight-right'];
const tapeColors = ['washi-blue', 'washi-yellow', 'washi-accent'];

export default function Testimonios() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-accent-500 border-accent-400 text-lg inline-block mb-4">
            {t.testimonials.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 mt-3 mb-4">
            {t.testimonials.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {t.testimonials.items.map((testimonio, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50, rotate: tiltAngles[index] * 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: tiltAngles[index] } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              whileHover={{ rotate: 0, scale: 1.03, y: -5 }}
            >
              {/* Washi tape */}
              <div className={`washi-tape ${tapePositions[index]} ${tapeColors[index]}`} />

              <div className="bg-white rounded-sm p-7 shadow-md relative" style={{ transform: `rotate(${tiltAngles[index]}deg)` }}>
                <Quote className="w-10 h-10 text-secondary-200 mb-3" />

                <p className="text-gray-600 leading-relaxed mb-6 font-handwritten text-xl">
                  &ldquo;{testimonio.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="polaroid-sm inline-block" style={{ transform: `rotate(${-tiltAngles[index] * 2}deg)` }}>
                    <img
                      src={testimImages[index]}
                      alt={testimonio.name}
                      className="w-12 h-12 object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-accent-700">{testimonio.name}</p>
                    <p className="text-secondary-500 text-sm font-handwritten text-base">{t.testimonials.adoptiveFamily}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
