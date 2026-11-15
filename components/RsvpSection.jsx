'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Send,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { CornerFloral, BackgroundWatermark } from './FloralOrnaments';
import AnimateReveal from './AnimateReveal';

const ITEMS_PER_PAGE = 4;

export default function RsvpSection() {
  const formRef = useRef(null);

  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('hadir');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [formFeedback, setFormFeedback] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to) setName(to.replace(/\+/g, ' '));
    }
  }, []);

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
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch (err) {
          // ignore
        }

        if (!json.isLive) {
          setWishes((prev) => [json.data, ...prev]);
        }

        setMessage('');
        setCurrentPage(1);
        setFormFeedback({
          type: 'success',
          text: 'Terima kasih atas konfirmasi dan ucapan doanya!',
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

  const totalPages = Math.max(1, Math.ceil(wishes.length / ITEMS_PER_PAGE));
  const paginatedWishes = wishes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section
      id="rsvp"
      className="py-14 px-5 royal-blue-bg text-stone-800 relative z-10 overflow-hidden"
    >
      <div className="max-w-md mx-auto">
        {/* Warm Cream Rounded Card inside Maroon Section (Video 00:55 - 00:57) */}
        <div className="royal-white-card rounded-[38px] p-6 sm:p-8 relative overflow-hidden">
          <CornerFloral position="top-left" />
          <CornerFloral position="top-right" />
          <CornerFloral position="bottom-left" />
          <CornerFloral position="bottom-right" />
          <BackgroundWatermark />

          <div className="relative z-10">
            {/* Header */}
            <AnimateReveal
              variant="zoom"
              scale={0.2}
              duration={0.95}
              className="text-center mb-6"
            >
              <h2 className="font-script text-4xl sm:text-5xl text-wedding-blue mb-1">
                Ucapan &amp; Doa
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-700">
                Berikan ucapan harapan dan doa kepada kedua mempelai
              </p>
            </AnimateReveal>

            {/* RSVP Form */}
            <AnimateReveal variant="zoom" scale={0.22} duration={0.95} delay={0.08}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5 mb-7">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#fffdf9] border border-wedding-gold/40 focus:outline-none focus:ring-1 focus:ring-wedding-blue text-stone-800"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Berikan Ucapan & Doa"
                    className="w-full p-3.5 rounded-xl text-xs sm:text-sm bg-[#fffdf9] border border-wedding-gold/40 focus:outline-none focus:ring-1 focus:ring-wedding-blue text-stone-800 resize-none leading-relaxed"
                  />
                </div>

                {/* Konfirmasi Kehadiran Buttons */}
                <div>
                  <p className="text-xs font-semibold text-stone-700 mb-2">
                    Konfirmasi Kehadiran ?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendance('hadir')}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all border ${
                        attendance === 'hadir'
                          ? 'bg-wedding-blue text-white border-wedding-blue shadow-sm'
                          : 'bg-[#fffdf9] text-stone-700 border-wedding-gold/40 hover:bg-stone-50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Hadir</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('tidak_hadir')}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all border ${
                        attendance === 'tidak_hadir'
                          ? 'bg-wedding-blue text-white border-wedding-blue shadow-sm'
                          : 'bg-[#fffdf9] text-stone-700 border-wedding-gold/40 hover:bg-stone-50'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Tidak Hadir</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('ragu')}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all border ${
                        attendance === 'ragu'
                          ? 'bg-wedding-blue text-white border-wedding-blue shadow-sm'
                          : 'bg-[#fffdf9] text-stone-700 border-wedding-gold/40 hover:bg-stone-50'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Ragu</span>
                    </button>
                  </div>
                </div>

                {attendance === 'hadir' && (
                  <div>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#fffdf9] border border-wedding-gold/40 focus:outline-none focus:ring-1 focus:ring-wedding-blue text-stone-700"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                {formFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs ${
                      formFeedback.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {formFeedback.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-wedding-blue hover:bg-wedding-blue-dark text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50 border border-wedding-gold/40"
                >
                  <Send className="w-3.5 h-3.5 text-wedding-gold-light" />
                  <span>{submitting ? 'Mengirim...' : 'Kirim'}</span>
                </button>
              </form>
            </AnimateReveal>

            {/* Divider */}
            <div className="h-[1px] w-full bg-wedding-gold/30 mb-4" />

            {/* Wishes List (Video 00:56 - 00:57) */}
            <div className="space-y-3 text-left">
              {loading ? (
                <p className="text-center text-xs text-stone-500 py-6">
                  Memuat ucapan...
                </p>
              ) : wishes.length === 0 ? (
                <p className="text-center text-xs text-stone-500 py-6">
                  Jadilah yang pertama memberikan ucapan &amp; doa.
                </p>
              ) : (
                paginatedWishes.map((item, idx) => (
                  <AnimateReveal
                    key={item.id}
                    variant="zoom"
                    scale={0.3}
                    delay={idx * 0.06}
                    duration={0.85}
                  >
                    <div className="bg-[#fffdf9] rounded-2xl p-4 border border-wedding-gold/40 shadow-sm">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <h4 className="font-sans text-xs sm:text-sm font-bold text-wedding-blue">
                          {item.name}
                        </h4>

                        {item.attendance === 'hadir' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-wedding-blue text-white text-[10px] font-semibold">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Hadir
                          </span>
                        )}
                        {item.attendance === 'tidak_hadir' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-500 text-white text-[10px] font-semibold">
                            <XCircle className="w-2.5 h-2.5" />
                            Tidak Hadir
                          </span>
                        )}
                        {item.attendance === 'ragu' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px] font-semibold">
                            <HelpCircle className="w-2.5 h-2.5" />
                            Masih Ragu
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed mb-2">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Baru saja'}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleLike(item.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors ${
                            likedMap[item.id]
                              ? 'text-rose-600 bg-rose-50'
                              : 'text-stone-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart
                            className={`w-3 h-3 ${
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

            {/* Numbered Pagination (← 1 / 3 →) */}
            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2 text-xs">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg text-stone-700 hover:bg-wedding-blue-soft disabled:opacity-40"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="font-serif font-semibold text-stone-700 px-2">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg text-stone-700 hover:bg-wedding-blue-soft disabled:opacity-40"
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
