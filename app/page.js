'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CoverScreen from '@/components/CoverScreen';
import FloatingControls from '@/components/FloatingControls';
import FallingPetals from '@/components/FallingPetals';
import HeroSection from '@/components/HeroSection';
import CoupleSection from '@/components/CoupleSection';
import EventsSection from '@/components/EventsSection';
import StorySection from '@/components/StorySection';
import GallerySection from '@/components/GallerySection';
import GiftSection from '@/components/GiftSection';
import PrayerSection from '@/components/PrayerSection';
import RsvpSection from '@/components/RsvpSection';
import FooterSection from '@/components/FooterSection';

export default function WeddingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Lock scroll saat loading ATAU sebelum undangan dibuka
  useEffect(() => {
    if (isLoading || !isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading, isInvitationOpen]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#dfe8f2] text-stone-800 overflow-x-hidden">
      {/* 0. Preloader Screen — Mendownload semua data & foto terlebih dahulu */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 1. Cover / Splash Screen (Video 00:03 - 00:09) */}
      <CoverScreen isOpen={isInvitationOpen} onOpen={handleOpenInvitation} />

      {/* 2. Floating Audio Player & Sticky Bottom Dock */}
      <FloatingControls isInvitationOpen={isInvitationOpen} />

      {/* 3. Scroll Progress Bar at Top */}
      {isInvitationOpen && <ScrollProgressBar />}

      {/* 4. Falling Blue & Cream Petals — tampil setelah undangan dibuka */}
      <FallingPetals count={10} active={isInvitationOpen} />

      {/* Main Content (Mobile-First Container following exact Video Reference flow) */}
      <div className="w-full max-w-md mx-auto shadow-2xl relative ivory-bg min-h-screen">
        {/* Slide 1: Hero Castle & Gate Opening (Video 00:10 - 00:29) */}
        <div className="snap-section justify-between">
          <HeroSection isInvitationOpen={isInvitationOpen} />
        </div>

        {/* Slide 2: With Love, QS Ar-Rum 21 & Couple Oval Floral Frames (Video 00:30 - 00:39) */}
        <div className="snap-section justify-center">
          <CoupleSection />
        </div>

        {/* Slide 3: Save The Date Banner, Countdown & White Arch Card on Dusty Blue (Video 00:40 - 00:44) */}
        <div className="snap-section justify-center">
          <EventsSection />
        </div>

        {/* Slide 4: Love Story on Ivory Floral Frame (Video 00:45 - 00:49) */}
        <div className="snap-section justify-center">
          <StorySection />
        </div>

        {/* Slide 5: Galeri Foto 2-Column Rounded Grid & Lightbox (Video 00:50 - 00:53) */}
        <div className="snap-section justify-center">
          <GallerySection />
        </div>

        {/* Slide 6: Amplop Digital White Card on Dusty Blue (Video 00:54) */}
        <div className="snap-section justify-center">
          <GiftSection />
        </div>

        {/* Slide 7: Doa Pengantin White Card on Dusty Blue */}
        <div className="snap-section justify-center">
          <PrayerSection />
        </div>

        {/* Slide 8: Ucapan & Doa (RSVP + Paginated Wishes) on Dusty Blue (Video 00:55 - 00:57) */}
        <div className="snap-section justify-center">
          <RsvpSection />
        </div>

        {/* Slide 9: Closing Oval Frame, Bouquet & Blue Credit Bar (Video 00:58 - 01:02) */}
        <div className="snap-section justify-between">
          <FooterSection />
        </div>
      </div>
    </main>
  );
}
