'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const images = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
  'https://images.unsplash.com/photo-1450778869180-cfd0586e7b6b?w=600&q=80',
  'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80',
];
const dates = ['2024-12-15', '2024-12-10', '2024-12-05'];

export default function Noticias() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t, lang } = useLanguage();

  const newsTilts = [-2, 1.5, -1];
  const newsTapes = ['washi-yellow', 'washi-blue', 'washi-accent'];

  return (
    <section id="noticias" ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-secondary-600 border-secondary-400 text-lg inline-block mb-4">
            {t.news.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 mt-3 mb-4">
            {t.news.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.news.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {t.news.items.map((noticia, index) => (
            <motion.article
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50, rotate: newsTilts[index] * 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: newsTilts[index] } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ rotate: 0, y: -5, scale: 1.03 }}
            >
              {/* Washi tape */}
              <div className={`washi-tape ${newsTapes[index]} -top-3 left-8 tape-tilt-slight-${index % 2 === 0 ? 'left' : 'right'}`} />

              <div className="polaroid" style={{ transform: `rotate(${newsTilts[index]}deg)` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={images[index]}
                    alt={noticia.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-secondary-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {noticia.category}
                  </span>
                </div>
                <div className="pt-3 pb-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-3 h-3" />
                    <span className="font-handwritten text-base">{new Date(dates[index]).toLocaleDateString(lang === 'es' ? 'es-VE' : 'en-US')}</span>
                  </div>
                  <h3 className="text-base font-bold text-accent-700 mb-2">
                    {noticia.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    {noticia.excerpt}
                  </p>
                  <Link
                    href={`/blog/${index + 1}`}
                    className="inline-flex items-center gap-1 text-secondary-500 font-semibold text-sm hover:text-secondary-600 transition-colors"
                  >
                    {t.news.readMore} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
