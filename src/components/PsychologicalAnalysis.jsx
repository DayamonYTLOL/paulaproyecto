'use client';

import { useRef } from 'react';
import { Brain, BookOpen, Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

// Each image shown exactly once, at paragraph indices 1, 3, 5
const imageAtParagraph = {
  1: { src: '/images/Imagen10.jpg', captionKey: 'imageCaption1', tilt: -2, tape: 'washi-blue', align: 'justify-center', tapeSide: 'left-10 tape-tilt-slight-left' },
  3: { src: '/images/Imagen12.jpg', captionKey: 'imageCaption2', tilt: 2.5, tape: 'washi-yellow', align: 'justify-end', tapeSide: 'right-8 tape-tilt-right' },
  5: { src: '/images/Imagen11.jpg', captionKey: 'imageCaption3', tilt: -1.5, tape: 'washi-accent', align: 'justify-center', tapeSide: 'left-10 tape-tilt-slight-left' },
};

export default function PsychologicalAnalysis() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();
  const p = t.psychologicalAnalysis;

  return (
    <section ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-accent-500 border-accent-400 text-lg inline-block mb-5">
            {p.tag}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 leading-tight mb-4">
            {p.title}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-handwritten">
            {p.subtitle}
          </p>
        </motion.div>

        {/* Essay content with interspersed polaroid images */}
        <div className="space-y-10">
          {p.paragraphs.map((para, i) => {
            const img = imageAtParagraph[i];

            return (
              <div key={i}>
                {/* Paragraph */}
                <motion.div
                  className="notebook-lines p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                >
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{para}</p>
                </motion.div>

                {/* Polaroid inserted after specific paragraphs — each image used exactly once */}
                {img && (
                  <motion.div
                    className={`relative mt-8 mb-4 flex ${img.align}`}
                    initial={{ opacity: 0, rotate: img.tilt * 2 }}
                    animate={isInView ? { opacity: 1, rotate: img.tilt } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                  >
                    <div className="relative inline-block">
                      <div className={`washi-tape ${img.tape} -top-3 ${img.tapeSide}`} />
                      <div className="polaroid" style={{ transform: `rotate(${img.tilt}deg)`, maxWidth: '320px' }}>
                        <img
                          src={img.src}
                          alt={p[img.captionKey]}
                          className="w-full h-52 object-cover"
                        />
                        <p className="font-handwritten text-center text-gray-400 text-base mt-1">{p[img.captionKey]}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer accent bar */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-300 to-transparent" />
          <div className="flex items-center gap-3 bg-cream-100 border border-cream-300 rounded-full px-5 py-2 sticker">
            <Brain className="w-5 h-5 text-accent-500" />
            <span className="font-handwritten text-accent-600 font-bold text-lg">Huellitas</span>
            <Heart className="w-4 h-4 text-secondary-400 fill-secondary-300" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-300 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
