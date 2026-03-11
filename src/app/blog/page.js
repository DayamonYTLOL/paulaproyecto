'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

const fallbackImages = [
  '/images/Imagen2.jpg',
  '/images/Imagen9.jpg',
  '/images/Imagen8.jpg',
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
    <div className="pt-20">
      {/* Hero */}
      <section className="scrapbook-bg py-20 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="stamp text-accent-500 border-accent-400 text-lg inline-block mb-5">
            BLOG
          </span>
          <h1 className="text-4xl sm:text-5xl font-handwritten font-bold text-accent-600 mb-4">
            Historias & Rescates
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Conoce el día a día de Huellitas Perdidas
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 scrapbook-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 mt-4 font-handwritten text-lg">Cargando publicaciones...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="relative bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-visible">
                    {/* Washi tape */}
                    <div className={`washi-tape ${idx % 3 === 0 ? 'washi-blue' : idx % 3 === 1 ? 'washi-yellow' : 'washi-accent'} -top-3 ${idx % 2 === 0 ? 'left-8 tape-tilt-left' : 'right-8 tape-tilt-right'}`} />
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image_url || fallbackImages[idx % fallbackImages.length]}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = fallbackImages[idx % fallbackImages.length]; }}
                      />
                      {post.category && (
                        <span className="absolute top-3 left-3 bg-accent-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.created_at).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <h2 className="text-lg font-handwritten font-bold text-accent-700 mb-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-primary-500 font-semibold text-sm group-hover:text-primary-600 transition-colors">
                        Leer más <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg font-handwritten">
                Aún no hay publicaciones. ¡Pronto compartiremos historias!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
