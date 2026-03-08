import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, slug, excerpt, content, image_url, category } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Título, slug y contenido son requeridos' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title, slug,
        excerpt: excerpt || '',
        content,
        image_url: image_url || '',
        category: category || '',
        published: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Blog post create error:', error);
    return NextResponse.json({ error: 'Error al crear el post' }, { status: 500 });
  }
}
