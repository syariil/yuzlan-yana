-- ============================================================
-- SQL SKEMA UNTUK UNDANGAN PERNIKAHAN DIGITAL (SUPABASE)
-- Jalankan kode ini di: Supabase Dashboard -> SQL Editor
-- ============================================================

-- 1. Buat Tabel RSVP & Ucapan
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'ragu', 'tidak_hadir')),
    guest_count INT DEFAULT 1,
    message TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Keamanan (Row Level Policies)
-- Izinkan siapapun membaca ucapan
DROP POLICY IF EXISTS "Allow public read" ON public.rsvps;
CREATE POLICY "Allow public read" 
ON public.rsvps FOR SELECT 
TO anon, authenticated 
USING (true);

-- Izinkan siapapun mengirim RSVP & ucapan baru
DROP POLICY IF EXISTS "Allow public insert" ON public.rsvps;
CREATE POLICY "Allow public insert" 
ON public.rsvps FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Izinkan siapapun menambah jumlah likes pada ucapan
DROP POLICY IF EXISTS "Allow public update likes" ON public.rsvps;
CREATE POLICY "Allow public update likes" 
ON public.rsvps FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- 4. Aktifkan Fitur Realtime Supabase untuk tabel rsvps
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'rsvps'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvps;
  END IF;
END $$;

-- 5. Data Dummy Awal (Opsional)
INSERT INTO public.rsvps (name, attendance, guest_count, message, likes)
VALUES
('Ninda', 'hadir', 2, 'MasyaAllah akhirnya ya wak elmaaoo ku, lancar lancar sampai hari H ya wak menjadi keluarga yang sakinah mawaddah dan warahmah Aaaminn 🤲🤍', 13),
('Yanti & Suami', 'tidak_hadir', 0, 'Selamat menempuh hidup baru kakak 👩‍❤️‍👨 Semoga menjadi keluarga yang sakinah mawaddah warahmah. Semoga segera diberi momongan yang soleh dan solehah. Aamiin Yaa Allah 🤲', 10);

