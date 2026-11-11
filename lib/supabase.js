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
  {
    id: 'mock-2',
    name: 'Yanti & Suami',
    attendance: 'tidak_hadir',
    guest_count: 0,
    message:
      'Selamat menempuh hidup baru kakak 👩‍❤️‍👨 Semoga menjadi keluarga yang sakinah mawaddah warahmah. Semoga segera diberi momongan yang soleh dan solehah. Aamiin Yaa Allah 🤲',
    likes: 10,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'mock-3',
    name: 'Dimas Aditya, S.T.',
    attendance: 'hadir',
    guest_count: 1,
    message:
      'Barakallahu lakum! Selamat bro Riyan dan Yunita! Semoga acaranya dilancarkan dari akad sampai resepsi selesai. Siap hadir meramaikan! 🥳🎉',
    likes: 8,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    id: 'mock-4',
    name: 'Siti Rahmawati & Keluarga',
    attendance: 'hadir',
    guest_count: 3,
    message:
      'Happy wedding Yunita & Riyan! Bahagia selalu selamanya, langgeng sampai maut memisahkan. Aamiin ya rabbal alamin 💐💍',
    likes: 6,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'mock-5',
    name: 'Fajar Nugraha',
    attendance: 'ragu',
    guest_count: 1,
    message:
      'Selamat ya kalian berdua! Masih usahakan cuti di kantor, semoga bisa hadir menyapa langsung. Doa terbaik untuk kalian berdua! ✨',
    likes: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
  },
  {
    id: 'mock-6',
    name: 'Keluarga Besar Bpk. Handoko',
    attendance: 'hadir',
    guest_count: 2,
    message:
      'Selamat menempuh babak kehidupan yang baru. Semoga Allah SWT senantiasa melimpahkan berkah cinta dan keharmonisan di dalam rumah tangga kalian berdua 🤲🤍',
    likes: 12,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

