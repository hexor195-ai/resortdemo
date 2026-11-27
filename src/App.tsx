import { useEffect, useRef, useState } from 'react';
import { BookingDialog, type BookingPrefill } from './components/BookingDialog';
import { DiningShowcase } from './components/DiningShowcase';
import { FooterAndFloatingBar } from './components/FooterAndFloatingBar';
import { GuestVoicesCarousel } from './components/GuestVoicesCarousel';
import { KonkanAndAmenities } from './components/KonkanAndAmenities';
import { Navbar } from './components/Navbar';
import { RateComparisonSection } from './components/RateComparisonSection';
import { Resort3DHero } from './components/Resort3DHero';
import type { HotspotId } from './data/resortData';
import type { LightingMode } from './three/campusScene';
import type { InquiryType } from './utils/calculations';

export function App() {
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');
  const [activeHotspot, setActiveHotspot] = useState<HotspotId>('overview');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill>({ type: 'stay' });
  const [showBackTo3D, setShowBackTo3D] = useState(false);

  const heroWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = heroWrapperRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackTo3D(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const toggleLighting = () => {
    setLightingMode((prev) => (prev === 'day' ? 'dusk' : 'day'));
  };

  const locateIn3D = (hotspot: HotspotId) => {
    setActiveHotspot(hotspot);
    heroWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openBooking = (type: InquiryType, prefillRoom?: string) => {
    setBookingPrefill({
      type,
      roomTierName: prefillRoom,
    });
    setBookingOpen(true);
  };

  const handleBookDirectStay = (
    roomTierName: string,
    nights: number,
    estimatedDirectRate: number
  ) => {
    setBookingPrefill({
      type: 'stay',
      roomTierName,
      nights,
      estimatedDirectRate,
    });
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1e293b]">
      <Navbar
        lightingMode={lightingMode}
        onToggleLighting={toggleLighting}
        onOpenBooking={(type) => openBooking(type)}
      />

      <main id="main-content">
        <div ref={heroWrapperRef}>
          <Resort3DHero
            activeHotspot={activeHotspot}
            onSelectHotspot={setActiveHotspot}
            lightingMode={lightingMode}
            onToggleLighting={toggleLighting}
            onOpenBooking={openBooking}
          />
        </div>

        <RateComparisonSection
          onLocateRoomsIn3D={() => locateIn3D('rooms')}
          onBookDirectStay={handleBookDirectStay}
        />

        <DiningShowcase
          onLocateGazeboIn3D={() => locateIn3D('dining')}
          onReserveTable={() => openBooking('dining')}
        />

        <KonkanAndAmenities onLocateCourtyardIn3D={() => locateIn3D('courtyard')} />

        <GuestVoicesCarousel />
      </main>

      <FooterAndFloatingBar
        showBackTo3D={showBackTo3D}
        onBackTo3D={() => locateIn3D('overview')}
        onOpenBooking={(type) => openBooking(type)}
      />

      <BookingDialog
        open={bookingOpen}
        prefill={bookingPrefill}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}

export default App;
