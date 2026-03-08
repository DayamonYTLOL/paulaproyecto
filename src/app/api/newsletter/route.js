import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from('newsletter')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      if (!existing.active) {
        await supabase.from('newsletter').update({ active: true }).eq('email', email);
      }
      return NextResponse.json({ success: true, message: 'Ya estás suscrito' });
    }

    const { error } = await supabase.from('newsletter').insert({ email });
    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Error al suscribirse' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('newsletter')
      .select('*')
      .eq('active', true)
      .order('subscribed_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
