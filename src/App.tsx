import { useState } from 'react';
import { BookingDialog, type BookingPrefill } from './components/BookingDialog';
import { FooterAndFloatingBar } from './components/FooterAndFloatingBar';
import { GuestVoicesCarousel } from './components/GuestVoicesCarousel';
import { KonkanAndAmenities } from './components/KonkanAndAmenities';
import { MunchingBitesSection } from './components/MunchingBitesSection';
import { Navbar } from './components/Navbar';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ResortHero } from './components/ResortHero';
import { RoomsShowcaseSection } from './components/RoomsShowcaseSection';

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill>({});

  const openRoomBooking = (roomTierName?: string) => {
    setBookingPrefill({ roomTierName });
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1e293b]">
      <Navbar onOpenBooking={() => openRoomBooking()} />

      <main id="main-content">
        <ResortHero onOpenBooking={openRoomBooking} />
        <RoomsShowcaseSection onBookRoom={(roomName) => openRoomBooking(roomName)} />
        <MunchingBitesSection />
        <PhotoGallerySection />
        <KonkanAndAmenities />
        <GuestVoicesCarousel />
      </main>

      <FooterAndFloatingBar onOpenBooking={() => openRoomBooking()} />

      <BookingDialog
        open={bookingOpen}
        prefill={bookingPrefill}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}

export default App;
