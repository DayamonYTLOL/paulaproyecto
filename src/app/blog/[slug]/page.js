'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/blog/${params.slug}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Publicación no encontrada</h1>
        <Link
          href="/blog"
          className="text-primary-500 hover:text-primary-600 font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Image */}
      {post.image_url && (
        <div className="relative h-[400px]">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {post.category && (
            <span className="flex items-center gap-1 bg-primary-50 text-primary-600 px-3 py-1 rounded-full font-medium">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-8">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
