'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const PawSvg = ({ color = 'white' }) => (
  <svg viewBox="0 0 100 100" fill={color}>
    <circle cx="35" cy="20" r="12" />
    <circle cx="65" cy="20" r="12" />
    <circle cx="20" cy="45" r="12" />
    <circle cx="80" cy="45" r="12" />
    <ellipse cx="50" cy="65" rx="25" ry="20" />
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url('/images/hero-rescue2.avif')",
          y: bgY,
        }}
      />
      {/* Blue-tinted overlay for more blue feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900/75 via-secondary-800/50 to-accent-700/45" />

      {/* Floating paw prints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 animate-paw-float-1 opacity-20"><PawSvg color="#86C5FF" /></div>
        <div className="absolute top-40 right-20 w-12 h-12 animate-paw-float-2 opacity-15"><PawSvg color="#F8E6A0" /></div>
        <div className="absolute bottom-32 right-16 w-20 h-20 animate-paw-float-1 opacity-20" style={{ animationDelay: '3s' }}><PawSvg color="#86C5FF" /></div>
        <div className="absolute bottom-48 left-1/4 w-14 h-14 animate-paw-float-2 opacity-15" style={{ animationDelay: '5s' }}><PawSvg color="#F8E6A0" /></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 animate-paw-float-1 opacity-15" style={{ animationDelay: '7s' }}><PawSvg /></div>
      </div>

      {/* Scrapbook decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-10 washi-tape washi-yellow tape-tilt-right w-32 h-7 opacity-40" />
        <div className="absolute bottom-20 left-8 washi-tape washi-blue tape-tilt-left w-28 h-7 opacity-30" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-handwritten font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t.hero.title1}{' '}
          <span className="text-cream-200">{t.hero.titleHighlight}</span>:
          <br />
          <span className="text-secondary-200">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-400 hover:bg-secondary-500 text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-xl shadow-secondary-500/30 hover:shadow-secondary-500/50 hover:-translate-y-1 hover:scale-105"
          >
            {t.hero.cta}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  );
}
