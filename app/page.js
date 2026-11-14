'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CoverScreen from '@/components/CoverScreen';
import FloatingControls from '@/components/FloatingControls';
import FallingPetals from '@/components/FallingPetals';
import SectionCurve from '@/components/SectionCurve';
import HeroSection from '@/components/HeroSection';
import CoupleSection from '@/components/CoupleSection';
import StorySection from '@/components/StorySection';
import CountdownSection from '@/components/CountdownSection';
import EventsSection from '@/components/EventsSection';
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
    <main className="min-h-screen bg-wedding-darker text-stone-900 overflow-x-hidden">
      {/* 0. Preloader Screen — Mendownload semua data & foto terlebih dahulu */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* 1. Cover / Splash Screen (Scroll Lock until opened) */}
      <CoverScreen
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
      />

      {/* 2. Floating Audio Player & Sticky Bottom Dock */}
      <FloatingControls isInvitationOpen={isInvitationOpen} />

      {/* 3. Scroll Progress Bar at Top */}
      {isInvitationOpen && <ScrollProgressBar />}

      {/* 4. Falling Petals — tampil setelah undangan dibuka (ringan & anggun) */}
      <FallingPetals count={10} active={isInvitationOpen} />

      {/* Main Content (Mobile-First Container) */}
      <div className="w-full max-w-md mx-auto shadow-2xl relative bg-wedding-darker min-h-screen">
        {/* Hero Section (Dark) */}
        <HeroSection />

        {/* Curve: Dark -> Light */}
        <SectionCurve to="light" />

        {/* Couple Section (Light Cream) */}
        <CoupleSection />

        {/* Curve: Light -> Dark */}
        <SectionCurve to="dark" />

        {/* Holy Verse & Our Story (Dark) */}
        <StorySection />

        {/* Real-time Countdown Timer & Calendar (Dark) */}
        <CountdownSection />

        {/* Curve: Dark -> Light */}
        <SectionCurve to="light" />

        {/* Save The Date (Light Cream) */}
        <EventsSection />

        {/* Gallery Masonry Grid & Lightbox */}
        <GallerySection />

        {/* Wedding Gift */}
        <GiftSection />

        {/* Curve: Light -> Dark */}
        <SectionCurve to="dark" />

        {/* Doa Pengantin & Turut Mengundang (Dark) */}
        <PrayerSection />

        {/* Curve: Dark -> Light */}
        <SectionCurve to="light" />

        {/* RSVP & Wishes (Light Cream) */}
        <RsvpSection />

        {/* Curve: Light -> Dark */}
        <SectionCurve to="dark" />

        {/* Footer Section (Dark) */}
        <FooterSection />
      </div>
    </main>
  );
}
