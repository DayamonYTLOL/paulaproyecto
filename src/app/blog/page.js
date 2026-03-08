'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Conoce las historias de nuestros rescates y el día a día en la fundación
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 mt-4">Cargando publicaciones...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  {post.image_url && (
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {post.category && (
                        <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.created_at).toLocaleDateString('es-CO')}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary-500 font-semibold text-sm hover:text-primary-600 transition-colors"
                    >
                      Leer más <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Aún no hay publicaciones. ¡Pronto compartiremos historias!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
