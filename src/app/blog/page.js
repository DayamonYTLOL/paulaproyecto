'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

const localImages = [
  '/images/Imagen1.jpg',
  '/images/Imagen2.jpg',
  '/images/Imagen3.jpg',
  '/images/Imagen6.jpg',
  '/images/Imagen7.jpg',
  '/images/Imagen8.jpg',
  '/images/Imagen10.jpg',
  '/images/Imagen11.jpg',
  '/images/Imagen12.jpg',
];

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

      {/* ── SCRAPBOOK HERO ── full-width image exactly as designed */}
      <div className="relative w-full">
        <img
          src="/images/scrapbook-bg.png"
          alt="Scrapbook - The Different Lives"
          className="w-full object-cover"
          style={{ maxHeight: '90vh', objectPosition: 'top' }}
        />
        {/* subtle gradient at bottom to blend into content */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, #f5f0e8)' }} />
      </div>

      {/* ── BLOG POSTS below the scrapbook ── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">

        {/* Section title */}
        <div className="text-center mb-10 -mt-2">
          <span className="inline-block border-4 border-accent-500 text-accent-600 font-handwritten font-bold text-sm px-4 py-1 tracking-widest uppercase"
            style={{ transform: 'rotate(-1deg)', display: 'inline-block' }}>
            Publicaciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-handwritten font-bold text-accent-700 mt-3">
            Historias & Rescates
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 mt-4 font-handwritten text-xl">Cargando historias...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-handwritten text-gray-500 text-2xl">Aún no hay publicaciones. ¡Pronto compartiremos!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
            {posts.map((post, idx) => {
              const tilts = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0', '-rotate-1'];
              const tapes = ['washi-blue', 'washi-yellow', 'washi-accent'];
              const tapePositions = ['left-6 tape-tilt-left', 'right-5 tape-tilt-right', 'left-10 tape-tilt-slight-left'];
              const tilt = tilts[idx % tilts.length];
              const tape = tapes[idx % tapes.length];
              const tapePos = tapePositions[idx % tapePositions.length];
              const imgSrc = post.image_url || localImages[idx % localImages.length];

              return (
                <Link key={post.id} href={`/blog/${post.slug}`}
                  className="group block break-inside-avoid mb-8">
                  <div className={`relative ${tilt} transition-transform duration-300 hover:rotate-0 hover:scale-102 cursor-pointer`}>
                    {/* Washi tape */}
                    <div className={`washi-tape ${tape} -top-3 ${tapePos}`} />
                    {/* Polaroid */}
                    <div className="bg-white shadow-xl" style={{ padding: '8px 8px 36px 8px' }}>
                      <img
                        src={imgSrc}
                        alt={post.title}
                        className="w-full h-44 object-cover"
                        onError={(e) => { e.target.src = localImages[idx % localImages.length]; }}
                      />
                    </div>
                    {/* Info below polaroid */}
                    <div className="mt-2 px-1">
                      <p className="font-handwritten font-bold text-accent-700 text-base leading-tight group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </p>
                      {post.excerpt && (
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        {post.category && (
                          <span className="text-xs font-semibold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-primary-500 text-xs font-semibold mt-1 group-hover:text-primary-600">
                        Leer más <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
