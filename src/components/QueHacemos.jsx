'use client';

import { useRef } from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  Users,
  Home,
  Network,
  ShoppingBag,
  Building2,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const icons = [ShieldCheck, HeartHandshake, GraduationCap, Users, Home, Network, ShoppingBag, Building2];

const cardImages = [
  'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&q=80',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
  'https://images.unsplash.com/photo-1450778869180-cfd0586e7b6b?w=400&q=80',
  'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&q=80',
  'https://images.unsplash.com/photo-1583337130417-13571c40b8e0?w=400&q=80',
  'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?w=400&q=80',
  'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80',
];

const tilts = [3, -2, 2.5, -3, 1.5, -2.5, 3, -1.5];
const tapeColorClasses = ['washi-blue', 'washi-yellow', 'washi-accent', 'washi-blue', 'washi-yellow', 'washi-accent', 'washi-blue', 'washi-yellow'];

export default function QueHacemos() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="que-hacemos" ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden torn-edge-bottom bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-secondary-600 border-secondary-400 text-lg inline-block mb-4">
            {t.whatWeDo.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600">
            {t.whatWeDo.title}
          </h2>
        </motion.div>

        {/* Services - alternating polaroid rows */}
        <div className="space-y-24">
          {t.whatWeDo.services.map((service, index) => {
            const Icon = icons[index];
            const num = String(index + 1).padStart(2, '0');
            const isEven = index % 2 === 0;
            const tilt = tilts[index];

            return (
              <motion.div
                key={num}
                className="grid lg:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Polaroid image */}
                <motion.div
                  className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  initial={{ opacity: 0, rotate: tilt * 2 }}
                  whileInView={{ opacity: 1, rotate: tilt }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                >
                  <div className={`washi-tape ${tapeColorClasses[index]} -top-3 ${isEven ? 'left-10' : 'right-10'} ${isEven ? 'tape-tilt-slight-left' : 'tape-tilt-slight-right'}`} />
                  <div className="polaroid inline-block" style={{ transform: `rotate(${tilt}deg)` }}>
                    <img
                      src={cardImages[index]}
                      alt={service.title}
                      className="w-full h-56 sm:h-64 object-cover"
                    />
                    <p className="font-handwritten text-center text-gray-400 text-lg mt-1">{num}</p>
                  </div>
                </motion.div>

                {/* Text side with notebook lines */}
                <motion.div
                  className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <span className="text-6xl font-handwritten font-bold text-secondary-200 block mb-1 select-none">
                    {num}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-secondary-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-handwritten font-bold text-accent-700">
                      {service.title}
                    </h3>
                  </div>
                  <div className="notebook-lines p-4">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
