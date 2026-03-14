'use client';

import { useState, useRef } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Contacto() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {status === 'success' ? (
              <motion.div
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-700 mb-2">{t.contact.successTitle}</h3>
                <p className="text-gray-600">{t.contact.successMsg}</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-secondary-500 font-semibold hover:text-secondary-600">
                  {t.contact.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">{t.contact.fullName}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-400 focus:border-transparent outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">{t.contact.emailLabel}</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-400 focus:border-transparent outline-none transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">{t.contact.phoneLabel}</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-400 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">{t.contact.messageLabel}</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-400 focus:border-transparent outline-none transition-all resize-none" required />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto px-8 py-4 bg-secondary-400 hover:bg-secondary-500 text-white rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                  {status === 'loading' ? t.contact.sending : t.contact.send}
                </motion.button>
                {status === 'error' && <p className="text-red-500 text-sm">{t.contact.error}</p>}
              </form>
            )}
          </motion.div>
      </div>
    </section>
  );
}
