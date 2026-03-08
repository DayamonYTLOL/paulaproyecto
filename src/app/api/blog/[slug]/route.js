import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request, { params }) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
