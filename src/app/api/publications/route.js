import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Publications fetch error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { type, first_name, last_name, pet_name, where_found, contact_number, description, image_url } =
      await request.json();

    if (!first_name || !last_name || !pet_name || !where_found || !contact_number) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('publications')
      .insert({
        type: type || 'lost',
        first_name,
        last_name,
        pet_name,
        where_found,
        contact_number,
        description: description || '',
        image_url: image_url || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Publication create error:', error);
    return NextResponse.json(
      { error: 'Error al crear la publicación' },
      { status: 500 }
    );
  }
}
