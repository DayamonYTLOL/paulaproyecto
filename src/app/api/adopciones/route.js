import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('adopciones')
      .select('*')
      .eq('status', 'disponible')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Adopciones fetch error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, species, breed, age, gender, size, description, image_url } =
      await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('adopciones')
      .insert({
        name,
        species: species || 'perro',
        breed: breed || '',
        age: age || '',
        gender: gender || '',
        size: size || '',
        description: description || '',
        image_url: image_url || '',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create animal error:', error);
    return NextResponse.json({ error: 'Error al crear registro' }, { status: 500 });
  }
}
