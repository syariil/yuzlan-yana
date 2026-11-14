'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Send,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { weddingData } from '@/data/weddingData';
import AnimateReveal from './AnimateReveal';

export default function RsvpSection() {
  const { rsvpPhoto } = weddingData;
  const formRef = useRef(null);

  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  // Pagination & Filter State
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');

  // Form State
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('hadir');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [formFeedback, setFormFeedback] = useState(null);

  // Auto-fill nama dari query param ?to=
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) setName(to.replace(/\+/g, ' '));
    }
  }, []);

  // Fetch data awal
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch('/api/rsvp');
        const json = await res.json();
        if (json.success && json.data) {
          setWishes(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch RSVPs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();

    // Supabase Realtime Subscription jika live database aktif
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel('realtime_rsvps')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'rsvps' },
          (payload) => {
            setWishes((prev) => [payload.new, ...prev]);
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'rsvps' },
          (payload) => {
            setWishes((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  // Submit RSVP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setFormFeedback({
        type: 'error',
        text: 'Nama dan ucapan doa wajib diisi!',
      });
      return;
    }

    setSubmitting(true);
    setFormFeedback(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          attendance,
          guest_count: guestCount,
          message,
        }),
      });

      const json = await res.json();

      if (json.success) {
        // Confetti Celebration
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch (e) {
          // ignore
        }

        // Jika bukan live supabase, update local state
        if (!json.isLive) {
          setWishes((prev) => [json.data, ...prev]);
        }

        setMessage('');
        setFormFeedback({
          type: 'success',
          text: 'Terima kasih atas konfirmasi dan ucapan doanya! 🤍',
        });
      } else {
        throw new Error(json.error || 'Gagal mengirim ucapan');
      }
    } catch (err) {
      setFormFeedback({
        type: 'error',
        text: err.message || 'Terjadi kesalahan jaringan.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Like comment
  const handleLike = async (id) => {
    if (likedMap[id]) return;

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w))
    );

    try {
      await fetch(`/api/rsvp/${id}/like`, { method: 'PATCH' });
    } catch (err) {
      console.log('Error liking:', err);
    }
  };

  const addSticker = (sticker) => {
    setMessage((prev) => (prev ? `${prev} ${sticker}` : sticker));
  };

  const replyTo = (guestAuthor) => {
    setMessage((prev) => `@${guestAuthor} `);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper Initials
  const getInitials = (guestName) => {
    if (!guestName) return 'TU';
    const parts = guestName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return guestName.slice(0, 2).toUpperCase();
  };

  // Filtered & Paginated Wishes
  const filteredWishes = wishes.filter((w) => {
    if (activeFilter === 'all') return true;
    return w.attendance === activeFilter;
  });

  const displayedWishes = filteredWishes.slice(0, visibleCount);

  const hadirCount = wishes.filter((w) => w.attendance === 'hadir').length;
  const raguCount = wishes.filter((w) => w.attendance === 'ragu').length;
  const tidakHadirCount = wishes.filter((w) => w.attendance === 'tidak_hadir').length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount(3);
  };

  return (
    <section id="rsvp" className="bg-wedding-cream text-stone-800 pb-28">
      {/* Photo Header */}
      <div className="relative w-full h-80 sm:h-96 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          src={rsvpPhoto}
          alt="RSVP Couple"
          className="w-full h-full object-cover filter brightness-[0.72]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 flex flex-col items-center justify-end pb-8 px-6 text-center text-white">
          <AnimateReveal y={25} duration={0.7}>
            <h2 className="font-serif text-3xl font-bold tracking-wide">
              RSVP & Wishes
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 font-light mt-1">
              Ucapan Selamat, Doa & Konfirmasi Kehadiran
            </p>
          </AnimateReveal>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 relative z-10">
        {/* Total Wishes Badge */}
        <AnimateReveal y={20} duration={0.6} className="text-center mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white shadow-md border border-wedding-gold/30 text-xs font-semibold text-stone-800 tracking-wider">
            {wishes.length} Doa & Ucapan Masuk
          </span>
        </AnimateReveal>

        {/* Form RSVP */}
        <AnimateReveal y={35} duration={0.75} scale={0.97} className="mb-10">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="luxury-card-light double-gold-border rounded-[32px] p-6 sm:p-7 shadow-lg"
          >
            {/* Input Nama */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold text-stone-800"
              />
            </div>

            {/* Konfirmasi Kehadiran */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendance('hadir')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                    attendance === 'hadir'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('ragu')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                    attendance === 'ragu'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Masih Ragu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('tidak_hadir')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                    attendance === 'tidak_hadir'
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>

            {/* Jumlah Tamu (Jika hadir) */}
            {attendance === 'hadir' && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Jumlah Orang
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold text-stone-800"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                </select>
              </div>
            )}

            {/* Textarea Ucapan */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Tulis Ucapan & Doa
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis ucapan selamat & doa terbaik untuk kedua mempelai..."
                className="w-full p-4 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-wedding-gold text-stone-800 resize-none leading-relaxed"
              />
            </div>

            {/* Pilih Stiker / Emojis */}
            <div className="mb-6 flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-stone-500 font-medium mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-wedding-gold-dark" />
                Stiker:
              </span>
              {['🤲🤍', '💐', '👩‍❤️‍👨', '💍', '✨', '🎉', '🥰'].map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => addSticker(emoji)}
                  className="px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Feedback message */}
            {formFeedback && (
              <div
                className={`p-3 rounded-xl text-xs mb-4 ${
                  formFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {formFeedback.text}
              </div>
            )}

            {/* Tombol Kirim */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-stone-900 text-white font-semibold text-xs tracking-wider uppercase hover:bg-wedding-gold-dark transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-wedding-gold" />
              <span>{submitting ? 'Mengirim Ucapan...' : 'Kirim Ucapan'}</span>
            </button>
          </form>
        </AnimateReveal>

        {/* Filter Kehadiran Tabs */}
        <div className="mb-5 flex items-center justify-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <button
            onClick={() => {
              setActiveFilter('all');
              setVisibleCount(3);
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeFilter === 'all'
                ? 'bg-stone-900 text-white font-semibold shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Semua ({wishes.length})
          </button>
          <button
            onClick={() => {
              setActiveFilter('hadir');
              setVisibleCount(3);
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeFilter === 'hadir'
                ? 'bg-emerald-700 text-white font-semibold shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Hadir ({hadirCount})
          </button>
          <button
            onClick={() => {
              setActiveFilter('ragu');
              setVisibleCount(3);
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeFilter === 'ragu'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Ragu ({raguCount})
          </button>
          <button
            onClick={() => {
              setActiveFilter('tidak_hadir');
              setVisibleCount(3);
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeFilter === 'tidak_hadir'
                ? 'bg-rose-700 text-white font-semibold shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tidak Hadir ({tidakHadirCount})
          </button>
        </div>

        {/* Daftar Ucapan */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-xs text-stone-500 py-6">
              Memuat ucapan...
            </p>
          ) : filteredWishes.length === 0 ? (
            <div className="text-center bg-white rounded-2xl p-6 border border-wedding-gold/20 text-xs text-stone-500">
              Belum ada ucapan untuk kategori ini.
            </div>
          ) : (
            displayedWishes.map((item, idx) => (
              <AnimateReveal
                key={item.id}
                y={25}
                delay={idx < 3 ? idx * 0.08 : 0}
                duration={0.6}
              >
                <div className="luxury-card-light rounded-2xl p-5 shadow-sm text-left hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar Initials with Gold Accent */}
                      <div className="w-8 h-8 rounded-full bg-stone-900 text-wedding-gold text-xs font-bold flex items-center justify-center border border-wedding-gold/40 shadow-sm shrink-0">
                        {getInitials(item.name)}
                      </div>

                      <div>
                        <h4 className="font-serif text-sm font-bold text-stone-900">
                          {item.name}
                        </h4>
                        {/* Attendance Badge */}
                        {item.attendance === 'hadir' && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                            Hadir
                          </span>
                        )}
                        {item.attendance === 'tidak_hadir' && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-rose-700 font-semibold">
                            <XCircle className="w-2.5 h-2.5 text-rose-500" />
                            Tidak Hadir
                          </span>
                        )}
                        {item.attendance === 'ragu' && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-semibold">
                            <HelpCircle className="w-2.5 h-2.5 text-amber-500" />
                            Masih Ragu
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => replyTo(item.name)}
                      className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900 px-2 py-1 rounded-full hover:bg-stone-100 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 text-wedding-gold" />
                      <span>Balas</span>
                    </button>
                  </div>

                  {/* Message Text */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light mb-3 pl-10">
                    {item.message}
                  </p>

                  {/* Footer card: Date & Likes */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-400 pl-10">
                    <span>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Baru saja'}
                    </span>

                    <button
                      onClick={() => handleLike(item.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
                        likedMap[item.id]
                          ? 'text-rose-600 bg-rose-50'
                          : 'text-stone-500 hover:text-rose-500 hover:bg-stone-50'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          likedMap[item.id] ? 'fill-current' : ''
                        }`}
                      />
                      <span>{item.likes || 0}</span>
                    </button>
                  </div>
                </div>
              </AnimateReveal>
            ))
          )}
        </div>

        {/* Tombol "Muat Lebih Banyak" / "Tampilkan Lebih Sedikit" */}
        {filteredWishes.length > 3 && (
          <div className="mt-6 flex justify-center">
            {visibleCount < filteredWishes.length ? (
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-wedding-gold-dark transition-all shadow-md active:scale-95"
              >
                <ChevronDown className="w-4 h-4 text-wedding-gold" />
                <span>
                  Lihat Ucapan Lainnya ({filteredWishes.length - visibleCount} lagi)
                </span>
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider hover:bg-stone-300 transition-all active:scale-95"
              >
                <ChevronUp className="w-4 h-4 text-stone-600" />
                <span>Tampilkan Lebih Sedikit</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
