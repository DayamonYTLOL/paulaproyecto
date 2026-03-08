'use client';

import { useState, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section id="faq" ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-cream-600 border-cream-500 text-lg inline-block mb-4">
            {t.faq.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 mt-3 mb-4">
            {t.faq.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="space-y-3">
          {t.faq.items.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-cream-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      openIndex === index ? 'text-secondary-500' : 'text-gray-400'
                    }`}
                  />
                  <span
                    className={`font-semibold transition-colors ${
                      openIndex === index ? 'text-secondary-500' : 'text-accent-700'
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-13 text-gray-600 leading-relaxed notebook-lines">
                      <div className="pl-8 py-2">{faq.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
