'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Home,
  Heart,
  Calendar,
  Gift,
  Image as ImageIcon,
  MessageSquare,
  Music,
  Share2,
  Check,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { weddingData } from '@/data/weddingData';

export default function FloatingControls({ isInvitationOpen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const audioRef = useRef(null);

  // Play audio when invitation is opened
  useEffect(() => {
    if (isInvitationOpen && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [isInvitationOpen]);

  // ScrollSpy: Otomatis mendeteksi section mana yang aktif saat di-scroll
  useEffect(() => {
    if (!isInvitationOpen) return;

    const sections = ['hero', 'couple', 'events', 'gift', 'gallery', 'rsvp'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInvitationOpen]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback error:', err));
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `The Wedding of ${weddingData.bride.nickname} & ${weddingData.groom.nickname}`,
          text: `Undangan Pernikahan ${weddingData.bride.fullName} & ${weddingData.groom.fullName}`,
          url,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2500);
    }
  };

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'couple', icon: Heart, label: 'Couple' },
    { id: 'events', icon: Calendar, label: 'Event' },
    { id: 'gift', icon: Gift, label: 'Gift' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'rsvp', icon: MessageSquare, label: 'Wishes' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isInvitationOpen) return null;

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={weddingData.music.src} loop preload="auto" />

      {/* Floating Buttons Right Side (Audio & Share) */}
      <div className="fixed right-4 bottom-24 z-40 flex flex-col items-center gap-2.5">
        {/* Share Button */}
        <button
          onClick={handleShare}
          aria-label="Bagikan Undangan"
          className="w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center shadow-xl border border-wedding-gold/30 active:scale-90 transition-all hover:text-wedding-gold hover:border-wedding-gold"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Audio Player Disc Button with Equalizer Effect */}
        <button
          onClick={toggleAudio}
          aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          className={`w-11 h-11 rounded-full glass-dark text-wedding-gold flex items-center justify-center shadow-2xl border active:scale-95 transition-all relative ${
            isPlaying
              ? 'border-wedding-gold shadow-[0_0_15px_rgba(197,168,128,0.4)] ring-2 ring-wedding-gold/20'
              : 'border-white/20 opacity-80'
          }`}
        >
          {isPlaying ? (
            <div className="flex items-end justify-center gap-0.5 h-4 w-4">
              <span className="w-0.5 bg-wedding-gold rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-0.5 bg-wedding-gold rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
              <span className="w-0.5 bg-wedding-gold rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Share Toast Feedback */}
      {showCopiedToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 glass-dark text-white px-5 py-2.5 rounded-full text-xs flex items-center gap-2 border border-wedding-gold shadow-2xl animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Link undangan berhasil disalin!</span>
        </div>
      )}

      {/* Sticky Bottom Dock Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm">
        <div className="glass-dark rounded-full px-3 py-2 shadow-2xl border border-wedding-gold/30 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`p-2.5 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                  isActive
                    ? 'text-wedding-gold bg-white/15 scale-110 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-wedding-gold shadow-[0_0_8px_#c5a880]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
