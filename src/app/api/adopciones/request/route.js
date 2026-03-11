import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const {
      animal_id,
      applicant_name,
      applicant_email,
      applicant_phone,
      applicant_age,
      home_description,
      family_members,
      has_other_pets,
      message,
    } = await request.json();

    if (!applicant_name || !applicant_email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('adoption_requests')
      .insert({
        animal_id,
        applicant_name,
        applicant_email,
        applicant_phone: applicant_phone || '',
        applicant_age: applicant_age || null,
        home_description: home_description || '',
        family_members: family_members || 1,
        has_other_pets: has_other_pets ? true : false,
        message: message || '',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Adoption request error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('adoption_requests')
      .select('*, adopciones(name)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formatted = data.map((r) => ({
      ...r,
      animal_name: r.adopciones?.name || null,
      adopciones: undefined,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
