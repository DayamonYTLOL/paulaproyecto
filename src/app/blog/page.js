'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const localImages = [
  '/images/Imagen1.jpg',
  '/images/Imagen2.jpg',
  '/images/Imagen3.jpg',
  '/images/Imagen4.jpg',
  '/images/Imagen5.jpg',
  '/images/Imagen6.jpg',
  '/images/Imagen7.jpg',
  '/images/Imagen8.jpg',
  '/images/Imagen9.jpg',
  '/images/Imagen10.jpg',
  '/images/Imagen11.jpg',
  '/images/Imagen12.jpg',
];

const scrapbookLayouts = [
  { rotate: '-rotate-2', top: 'mt-0', size: 'w-52 h-44', tape: 'washi-blue', tapePos: 'left-6 tape-tilt-left' },
  { rotate: 'rotate-1', top: 'mt-8', size: 'w-48 h-40', tape: 'washi-yellow', tapePos: 'right-5 tape-tilt-right' },
  { rotate: '-rotate-1', top: 'mt-2', size: 'w-44 h-36', tape: 'washi-accent', tapePos: 'left-10 tape-tilt-slight-left' },
  { rotate: 'rotate-2', top: 'mt-6', size: 'w-56 h-48', tape: 'washi-blue', tapePos: 'right-8 tape-tilt-slight-right' },
  { rotate: '-rotate-3', top: 'mt-0', size: 'w-48 h-44', tape: 'washi-yellow', tapePos: 'left-4 tape-tilt-left' },
  { rotate: 'rotate-1', top: 'mt-4', size: 'w-44 h-40', tape: 'washi-accent', tapePos: 'right-6 tape-tilt-right' },
];

function TagDecor({ label, color = 'bg-secondary-100 text-secondary-700' }) {
  return (
    <div className={`relative inline-block ${color} rounded-sm px-4 py-2 font-handwritten text-base font-bold shadow`}
      style={{ clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 8% 100%, 0% 50%)' }}>
      {label}
    </div>
  );
}

function StampDecor({ label }) {
  return (
    <div className="inline-block border-4 border-accent-500 text-accent-600 font-handwritten font-bold text-sm px-3 py-1 rotate-6 opacity-80 tracking-widest uppercase">
      {label}
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 min-h-screen" style={{ background: '#f5f0e8' }}>

      {/* Scrapbook header */}
      <div className="relative overflow-hidden py-12 px-4"
        style={{ background: 'linear-gradient(135deg, #e8e0d0 0%, #f0e8d8 50%, #e4ddd0 100%)' }}>
        {/* Torn edge top */}
        <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
          <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L0,20 Q30,8 60,15 Q90,22 120,10 Q150,0 180,12 Q210,22 240,8 Q270,0 300,14 Q330,22 360,8 Q390,0 420,15 Q450,22 480,10 Q510,0 540,12 Q570,22 600,8 Q630,0 660,14 Q690,22 720,8 Q750,0 780,15 Q810,22 840,10 Q870,0 900,12 Q930,22 960,8 Q990,0 1020,14 Q1050,22 1080,8 Q1110,0 1140,15 Q1170,22 1200,10 L1200,0 Z"
              fill="#f5f0e8" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-6 mb-2 flex-wrap">
            <StampDecor label="The Different" />
            <h1 className="text-5xl sm:text-6xl font-handwritten font-bold text-accent-700">
              Historias
            </h1>
            <StampDecor label="Lives" />
          </div>
          <p className="font-handwritten text-gray-500 text-xl mt-2">— rescates, adopciones & vida en la fundación —</p>

          {/* Decorative paw prints */}
          <div className="absolute bottom-2 left-4 text-accent-400 opacity-60">
            <svg viewBox="0 0 60 60" className="w-10 h-10 fill-current">
              <circle cx="15" cy="10" r="6"/><circle cx="30" cy="6" r="6"/><circle cx="45" cy="10" r="6"/>
              <ellipse cx="30" cy="35" rx="14" ry="12"/>
            </svg>
          </div>
          <div className="absolute bottom-4 left-16 text-accent-300 opacity-40">
            <svg viewBox="0 0 60 60" className="w-7 h-7 fill-current">
              <circle cx="15" cy="10" r="6"/><circle cx="30" cy="6" r="6"/><circle cx="45" cy="10" r="6"/>
              <ellipse cx="30" cy="35" rx="14" ry="12"/>
            </svg>
          </div>
        </div>

        {/* Torn edge bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden">
          <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,20 L0,8 Q30,18 60,5 Q90,0 120,12 Q150,20 180,6 Q210,0 240,14 Q270,20 300,6 Q330,0 360,12 Q390,20 420,5 Q450,0 480,14 Q510,20 540,6 Q570,0 600,12 Q630,20 660,6 Q690,0 720,12 Q750,20 780,5 Q810,0 840,14 Q870,20 900,6 Q930,0 960,12 Q990,20 1020,6 Q1050,0 1080,14 Q1110,20 1140,6 Q1170,0 1200,12 L1200,20 Z"
              fill="#f5f0e8" />
          </svg>
        </div>
      </div>

      {/* Scrapbook board */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 mt-4 font-handwritten text-xl">Cargando historias...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-handwritten text-gray-500 text-2xl">Aún no hay historias. ¡Pronto compartiremos!</p>
          </div>
        ) : (
          <>
            {/* Decorative fixed labels */}
            <div className="flex flex-wrap gap-4 mb-8 items-center">
              <TagDecor label="Rescates" color="bg-secondary-100 text-secondary-700" />
              <TagDecor label="On the street" color="bg-cream-200 text-accent-600" />
              <TagDecor label="Sanctuary" color="bg-accent-100 text-accent-700" />
              <div className="ml-auto opacity-50 font-handwritten text-gray-400 text-sm italic">
                {'\'Spini, si sono più lunghi del...\''}
              </div>
            </div>

            {/* Scrapbook masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-0">
              {posts.map((post, idx) => {
                const layout = scrapbookLayouts[idx % scrapbookLayouts.length];
                const imgSrc = post.image_url || localImages[idx % localImages.length];

                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block break-inside-avoid mb-6">
                    <div className={`relative inline-block w-full ${layout.rotate} transition-transform duration-300 hover:rotate-0 hover:scale-105`}>
                      {/* Washi tape */}
                      <div className={`washi-tape ${layout.tape} -top-3 ${layout.tapePos}`} />

                      {/* Polaroid card */}
                      <div className="bg-white shadow-lg" style={{ padding: '10px 10px 40px 10px' }}>
                        <img
                          src={imgSrc}
                          alt={post.title}
                          className={`w-full object-cover ${layout.size}`}
                          onError={(e) => { e.target.src = localImages[idx % localImages.length]; }}
                        />
                      </div>

                      {/* Caption below polaroid */}
                      <div className="mt-1 px-2">
                        <p className="font-handwritten text-accent-700 font-bold text-base leading-tight group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </p>
                        {post.category && (
                          <span className="font-handwritten text-gray-400 text-sm">{post.category}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom decorative strip */}
            <div className="mt-12 flex flex-wrap gap-6 items-end justify-center">
              <StampDecor label="Rescatados" />
              <div className="font-handwritten text-gray-400 text-sm italic max-w-xs text-center">
                Cada historia importa. Cada vida vale.
              </div>
              <StampDecor label="Con amor" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
