'use client';

import { useRef } from 'react';
import {
  Eye, ShieldCheck, MapPin, HandHeart,
  Dog, Lock, Stethoscope, Camera,
  Building2, Phone, ShieldAlert, Activity,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const phaseIcons = [
  [Eye, ShieldCheck, MapPin, HandHeart],
  [Dog, Lock, Stethoscope, Camera],
  [Building2, Phone, ShieldAlert, Activity],
];

const phaseColors = [
  { bg: 'bg-secondary-50', border: 'border-secondary-300', icon: 'text-secondary-500', accent: 'bg-secondary-400', number: 'text-secondary-300' },
  { bg: 'bg-cream-50', border: 'border-cream-400', icon: 'text-cream-600', accent: 'bg-cream-500', number: 'text-cream-300' },
  { bg: 'bg-accent-50', border: 'border-accent-300', icon: 'text-accent-500', accent: 'bg-accent-500', number: 'text-accent-200' },
];

const tapeStyles = [
  'washi-blue tape-tilt-slight-left',
  'washi-yellow tape-tilt-slight-right',
  'washi-accent tape-tilt-slight-left',
];

export default function RescueGuide() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  let stepCounter = 0;

  return (
    <section ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-accent-500 border-accent-400 text-lg inline-block mb-4">
            {t.rescueGuide.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600">
            {t.rescueGuide.title}
          </h2>
        </motion.div>

        {/* Phases */}
        <div className="space-y-20">
          {t.rescueGuide.phases.map((phase, phaseIdx) => {
            const colors = phaseColors[phaseIdx];
            const icons = phaseIcons[phaseIdx];

            return (
              <motion.div
                key={phaseIdx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
              >
                {/* Phase title with washi tape */}
                <div className="relative inline-block mb-10">
                  <div className={`washi-tape ${tapeStyles[phaseIdx]} -top-3 left-4 w-36`} />
                  <h3 className="text-2xl sm:text-3xl font-handwritten font-bold text-accent-700 bg-white px-6 py-3 shadow-sm inline-block"
                    style={{ transform: `rotate(${phaseIdx % 2 === 0 ? -1 : 1}deg)` }}
                  >
                    {phase.name}
                  </h3>
                </div>

                {/* Steps grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {phase.steps.map((step, stepIdx) => {
                    stepCounter++;
                    const globalStep = stepCounter;
                    const Icon = icons[stepIdx];
                    const tilt = (stepIdx % 2 === 0 ? -1.5 : 1.5) * (phaseIdx % 2 === 0 ? 1 : -1);

                    return (
                      <motion.div
                        key={stepIdx}
                        className="relative"
                        initial={{ opacity: 0, y: 30, rotate: tilt * 2 }}
                        whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: stepIdx * 0.1 }}
                        whileHover={{ rotate: 0, scale: 1.04, y: -5 }}
                      >
                        <div className={`${colors.bg} border ${colors.border} rounded-sm p-5 shadow-md relative`}
                          style={{ transform: `rotate(${tilt}deg)` }}
                        >
                          {/* Step number */}
                          <span className={`absolute top-3 right-3 text-4xl font-bold ${colors.number} select-none font-handwritten`}>
                            {String(globalStep).padStart(2, '0')}
                          </span>

                          {/* Icon */}
                          <div className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center mb-3`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          {/* Content */}
                          <h4 className="font-bold text-accent-700 text-sm mb-2 pr-8">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
