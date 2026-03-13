'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { name: t.nav.about, href: '/#nosotros' },
    { name: t.nav.whatWeDo, href: '/#que-hacemos' },
    { name: t.nav.adopt, href: '/adopcion' },
    { name: t.nav.publishPet, href: '/#publicar-mascota' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.psychAnalysis, href: '/analisis-psicologico' },
    { name: t.nav.faq, href: '/#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="Huellitas Perdidas"
              width={48}
              height={48}
              className="w-12 h-12 object-contain drop-shadow"
            />
            <span
              className={`text-xl font-handwritten font-bold transition-colors ${
                scrolled ? 'text-accent-500' : 'text-white'
              }`}
            >
              Huellitas Perdidas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-accent-700 hover:text-secondary-500 hover:bg-secondary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className={`ml-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                scrolled
                  ? 'text-accent-600 hover:bg-secondary-50 border border-accent-200'
                  : 'text-white/90 hover:bg-white/10 border border-white/30'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <Link
              href="/#contacto"
              className="ml-2 px-5 py-2.5 bg-secondary-400 hover:bg-secondary-500 text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-lg shadow-secondary-500/25 hover:shadow-secondary-500/40"
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLang}
              className={`p-2 rounded-lg text-sm font-semibold flex items-center gap-1 ${
                scrolled ? 'text-accent-600' : 'text-white'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              className="p-2 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-xl border-t px-4 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-accent-700 hover:text-secondary-500 hover:bg-secondary-50 rounded-lg font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setIsOpen(false)}
            className="block mx-4 mt-4 px-5 py-3 bg-secondary-400 hover:bg-secondary-500 text-white rounded-full text-center font-semibold transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
