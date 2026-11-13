'use client';

import { useState, useEffect } from 'react';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CoverScreen from '@/components/CoverScreen';
import FloatingControls from '@/components/FloatingControls';
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
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Lock scroll before invitation is opened
  useEffect(() => {
    if (!isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isInvitationOpen]);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
  };

  return (
    <main className="min-h-screen bg-wedding-darker text-stone-900 overflow-x-hidden">
      {/* 1. Cover / Splash Screen (Scroll Lock until opened) */}
      <CoverScreen
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
      />

      {/* 2. Floating Audio Player & Sticky Bottom Dock */}
      <FloatingControls isInvitationOpen={isInvitationOpen} />

      {/* Scroll Progress Bar at Top */}
      {isInvitationOpen && <ScrollProgressBar />}

      {/* Main Content (Mobile-First Container) */}
      <div className="w-full max-w-md mx-auto shadow-2xl relative bg-wedding-darker min-h-screen">
        {/* 3. Hero Section (Dark) */}
        <HeroSection />

        {/* Curve: Dark -> Light */}
        <SectionCurve to="light" />

        {/* 4. Couple Section (Light Cream) */}
        <CoupleSection />

        {/* Curve: Light -> Dark */}
        <SectionCurve to="dark" />

        {/* 5. Holy Verse & Our Story (Dark) */}
        <StorySection />

        {/* 6. Real-time Countdown Timer & Calendar (Dark) */}
        <CountdownSection />

        {/* Curve: Dark -> Light */}
        <SectionCurve to="light" />

        {/* 7. Save The Date (Light Cream) */}
        <EventsSection />

        {/* 9. Gallery Masonry Grid & Lightbox */}
        <GallerySection />

        {/* 10. Wedding Gift (Amplop Digital & Kado Fisik) */}
        <GiftSection />

        {/* Curve: Light -> Dark */}
        <SectionCurve to="dark" />

        {/* 11. Doa Pengantin & Turut Mengundang (Dark) */}
        <PrayerSection />

        {/* Curve: Dark -> Light */}
        <SectionCurve to="light" />

        {/* 12. RSVP & Wishes (Light Cream) */}
        <RsvpSection />

        {/* Curve: Light -> Dark */}
        <SectionCurve to="dark" />

        {/* 13. Footer Section (Dark) */}
        <FooterSection />
      </div>
    </main>
  );
}
