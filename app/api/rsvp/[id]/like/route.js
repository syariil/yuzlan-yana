// app/api/rsvp/[id]/like/route.js
import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    if (isSupabaseConfigured && supabase && !id.startsWith('mock-') && !id.startsWith('local-')) {
      // Ambil current likes dulu
      const { data: current, error: getError } = await supabase
        .from('rsvps')
        .select('likes')
        .eq('id', id)
        .single();

      if (getError) throw getError;

      const newLikes = (current?.likes || 0) + 1;

      const { data, error } = await supabase
        .from('rsvps')
        .update({ likes: newLikes })
        .eq('id', id)
        .select();

      if (error) throw error;

      return NextResponse.json({ success: true, data: data[0] });
    }

    // Jika local / mock
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error updating like:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

