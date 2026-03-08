'use client';

import { useRef } from 'react';
import { Heart, Smile, Shield, Search, HelpingHand, Star, Users, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const adoptIcons = [Heart, Smile, Shield, Search];
const rescueIcons = [HelpingHand, Star, Users, Sparkles];

const adoptColors = [
  'bg-secondary-100 text-secondary-600',
  'bg-cream-200 text-accent-600',
  'bg-secondary-50 text-secondary-500',
  'bg-cream-100 text-accent-500',
];
const rescueColors = [
  'bg-accent-50 text-accent-600',
  'bg-cream-200 text-secondary-600',
  'bg-secondary-100 text-secondary-500',
  'bg-accent-100 text-accent-500',
];

function ReasonCard({ icon: Icon, title, desc, colorClass, index, isInView, tiltClass }) {
  return (
    <motion.div
      className={`relative bg-white rounded-2xl p-5 shadow-md border border-gray-100 ${tiltClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-handwritten text-lg font-bold text-accent-700 mb-1">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function WhyAdoptRescue() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();
  const w = t.whyAdoptRescue;

  return (
    <section ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

        {/* === WHY ADOPT === */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: polaroid image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative inline-block">
              <div className="washi-tape washi-blue -top-3 left-12 tape-tilt-slight-left" />
              <div className="polaroid" style={{ transform: 'rotate(-2deg)', maxWidth: '360px' }}>
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=700&q=80"
                  alt="Perro adoptado feliz"
                  className="w-full h-64 object-cover"
                />
                <p className="font-handwritten text-center text-gray-400 text-lg mt-1">¡Hogar dulce hogar!</p>
              </div>
              {/* Sticker */}
              <motion.div
                className="absolute -bottom-6 -right-4 bg-secondary-400 text-white rounded-full w-20 h-20 flex items-center justify-center sticker shadow-lg"
                style={{ transform: 'rotate(8deg)' }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <span className="font-handwritten text-sm font-bold text-center leading-tight px-2">¡Adopta!</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: text + reason cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="stamp text-secondary-600 border-secondary-400 text-lg inline-block mb-4">
                {w.adoptTag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-handwritten font-bold text-accent-600 mb-4">
                {w.adoptTitle}
              </h2>
              <div className="notebook-lines p-5 mb-8">
                <p className="text-gray-600 leading-relaxed">{w.adoptDesc}</p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {w.adoptReasons.map((r, i) => (
                <ReasonCard
                  key={i}
                  icon={adoptIcons[i]}
                  title={r.title}
                  desc={r.desc}
                  colorClass={adoptColors[i]}
                  index={i}
                  isInView={isInView}
                  tiltClass={i % 2 === 0 ? 'tape-tilt-slight-left' : 'tape-tilt-slight-right'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* === WHY RESCUE === */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text + reason cards (reversed order on desktop) */}
          <div className="lg:order-1 order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="stamp text-accent-600 border-accent-400 text-lg inline-block mb-4">
                {w.rescueTag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-handwritten font-bold text-accent-600 mb-4">
                {w.rescueTitle}
              </h2>
              <div className="notebook-lines p-5 mb-8">
                <p className="text-gray-600 leading-relaxed">{w.rescueDesc}</p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {w.rescueReasons.map((r, i) => (
                <ReasonCard
                  key={i}
                  icon={rescueIcons[i]}
                  title={r.title}
                  desc={r.desc}
                  colorClass={rescueColors[i]}
                  index={i}
                  isInView={isInView}
                  tiltClass={i % 2 === 0 ? 'tape-tilt-slight-right' : 'tape-tilt-slight-left'}
                />
              ))}
            </div>
          </div>

          {/* Right: polaroid image */}
          <motion.div
            className="relative flex justify-center lg:order-2 order-1"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative inline-block">
              <div className="washi-tape washi-yellow -top-3 right-10 tape-tilt-slight-right" />
              <div className="polaroid" style={{ transform: 'rotate(2deg)', maxWidth: '360px' }}>
                <img
                  src="https://images.unsplash.com/photo-1494947665470-20322015e3a8?w=700&q=80"
                  alt="Perro en la calle"
                  className="w-full h-64 object-cover"
                />
                <p className="font-handwritten text-center text-gray-400 text-lg mt-1">Esperando una mano</p>
              </div>
              {/* Pushpin */}
              <div className="pushpin-blue absolute -top-2 right-4" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
