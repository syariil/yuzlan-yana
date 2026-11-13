// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-id.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial fallback data (sesuai yang ada di video referensi + tambahan ucapan)
export const initialWishes = [
  {
    id: 'mock-1',
    name: 'Ninda',
    attendance: 'hadir',
    guest_count: 2,
    message:
      'MasyaAllah akhirnya ya wak elmaaoo ku, lancar lancar sampai hari H ya wak menjadi keluarga yang sakinah mawaddah dan warahmah Aaaminn 🤲🤍',
    likes: 13,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

