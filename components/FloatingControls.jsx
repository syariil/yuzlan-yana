'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Home,
  Heart,
  Calendar,
  Gift,
  Image as ImageIcon,
  MessageSquare,
  Share2,
  Check,
  Pause,
  Play,
} from 'lucide-react';
import { weddingData } from '@/data/weddingData';

export default function FloatingControls({ isInvitationOpen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (!isInvitationOpen) return;

    const sections = ['hero', 'couple', 'events', 'story', 'gallery', 'gift', 'rsvp'];
    let isTicking = false;

    const handleScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
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
          isTicking = false;
        });
        isTicking = true;
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
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'gift', icon: Gift, label: 'Gift' },
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
      <audio ref={audioRef} src={weddingData.music.src} loop preload="auto" />

      {/* Floating Buttons Right Side (Audio Play/Pause matching Video bottom-right button & Share) */}
      <div className="fixed right-4 bottom-20 z-40 flex flex-col items-center gap-2.5">
        <button
          onClick={handleShare}
          aria-label="Bagikan Undangan"
          className="w-9 h-9 rounded-full bg-white/90 text-wedding-blue-dark flex items-center justify-center shadow-lg border border-wedding-gold/40 active:scale-90 transition-all hover:bg-wedding-blue hover:text-white"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={toggleAudio}
          aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          className="w-10 h-10 rounded-full bg-wedding-blue-dark/90 text-white flex items-center justify-center shadow-xl border-2 border-white/80 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {showCopiedToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 glass-blue text-white px-5 py-2.5 rounded-full text-xs flex items-center gap-2 border border-white/40 shadow-2xl animate-fade-in">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Link undangan berhasil disalin!</span>
        </div>
      )}

      {/* Sticky Bottom Dock Navigation */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xs">
        <div className="glass-blue rounded-full px-3 py-1.5 shadow-xl flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`p-2 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                  isActive
                    ? 'text-wedding-gold-light bg-white/20 scale-105 shadow-sm'
                    : 'text-white/75 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
