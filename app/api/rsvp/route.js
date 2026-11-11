// app/api/rsvp/route.js
import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, initialWishes } from '@/lib/supabase';

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const wishes = data && data.length > 0 ? data : initialWishes;

      const stats = {
        total: wishes.length,
        hadir: wishes.filter((w) => w.attendance === 'hadir').length,
        ragu: wishes.filter((w) => w.attendance === 'ragu').length,
        tidakHadir: wishes.filter((w) => w.attendance === 'tidak_hadir').length,
      };

      return NextResponse.json({
        success: true,
        data: wishes,
        stats,
        isLive: true,
      });
    }

    // Fallback Mock Mode
    const stats = {
      total: initialWishes.length,
      hadir: initialWishes.filter((w) => w.attendance === 'hadir').length,
      ragu: initialWishes.filter((w) => w.attendance === 'ragu').length,
      tidakHadir: initialWishes.filter((w) => w.attendance === 'tidak_hadir').length,
    };

    return NextResponse.json({
      success: true,
      data: initialWishes,
      stats,
      isLive: false,
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, attendance, guest_count, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: 'Nama dan ucapan wajib diisi!' },
        { status: 400 }
      );
    }

    const newEntry = {
      name: name.trim(),
      attendance: attendance || 'hadir',
      guest_count: parseInt(guest_count, 10) || 1,
      message: message.trim(),
      likes: 0,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('rsvps')
        .insert([newEntry])
        .select();

      if (error) throw error;

      return NextResponse.json(
        { success: true, data: data[0], isLive: true },
        { status: 201 }
      );
    }

    // Fallback Mock
    const localEntry = {
      ...newEntry,
      id: 'local-' + Date.now(),
    };

    return NextResponse.json(
      { success: true, data: localEntry, isLive: false },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

