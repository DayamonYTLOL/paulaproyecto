'use client';

import { useState, useRef } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState('idle');
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !accepted) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setAccepted(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-secondary-300 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-secondary-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-400 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Mail className="w-12 h-12 text-accent-500 mx-auto mb-6" />
        </motion.div>
        <motion.h2
          className="text-3xl sm:text-4xl font-display font-bold text-accent-500 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.newsletter.title}
        </motion.h2>
        <motion.p
          className="text-accent-700/80 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {t.newsletter.subtitle}
        </motion.p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 bg-white/40 backdrop-blur-sm rounded-xl p-6">
            <CheckCircle className="w-6 h-6 text-accent-500" />
            <span className="text-accent-700 font-medium">
              {t.newsletter.success}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="flex-1 px-5 py-3.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 text-accent-800 placeholder-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50"
                required
              />
              <button
                type="submit"
                disabled={!accepted || status === 'loading'}
                className="px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t.newsletter.subscribe}
              </button>
            </div>
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-4 h-4 rounded accent-accent-500"
              />
              <span className="text-accent-700/80 text-sm">
                {t.newsletter.checkbox}
              </span>
            </label>
            {status === 'error' && (
              <p className="text-red-600 text-sm">
                {t.newsletter.error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
