import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { HERO_SLIDES, RESORT_INFO } from '../data/resortData';

export interface ResortHeroProps {
  onOpenBooking: (prefillRoom?: string) => void;
}

export function ResortHero({ onOpenBooking }: ResortHeroProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[slideIndex] ?? HERO_SLIDES[0];

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="hero-showcase"
      aria-label="Palm Bliss Resort Showcase"
      className="relative overflow-hidden bg-[#123724] text-white"
    >
      {/* Full-bleed Actual Resort Photograph */}
      <div className="relative min-h-[72svh] w-full lg:min-h-[84svh]">
        <img
          src={currentSlide.src}
          alt={currentSlide.alt}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        />

        {/* Editorial dark botanical gradient overlay for crisp text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d2418]/92 via-[#123724]/45 to-[#0d2418]/60"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-between px-4 py-8 sm:px-6 lg:min-h-[84svh] lg:py-12">
          {/* Top Brand & Rating Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/20 bg-[#123724]/80 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                {RESORT_INFO.rating} ({RESORT_INFO.reviewCount.toLocaleString('en-IN')} Google
                Reviews)
              </span>
              <span className="text-white/40" aria-hidden="true">
                |
              </span>
              <span className="inline-flex items-center gap-1 text-white/95">
                <MapPin className="h-3.5 w-3.5 text-[#a3e66f]" aria-hidden="true" />
                Nadhavade, Sindhudurg
              </span>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous resort photo"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#123724]/75 text-white backdrop-blur-md transition hover:bg-[#1b4d32]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next resort photo"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#123724]/75 text-white backdrop-blur-md transition hover:bg-[#1b4d32]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Main Hero Content & Photo Switcher */}
          <div className="mt-12 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-[#6bae3b]/50 bg-[#6bae3b]/20 px-3.5 py-2 backdrop-blur-md">
                <img
                  src={RESORT_INFO.logoSrc}
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 rounded-lg object-cover shadow"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4f7b5]">
                  Official Konkan Retreat
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
                Palm Bliss Resort
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                Peaceful red-laterite garden cottages nestled in Nadhavade’s lush greenery — paired
                with coastal flavors and warm family dining at{' '}
                <strong className="text-[#d4f7b5]">Munching Bites</strong>.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Deluxe Room (Garden View)')}
                  className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-xl bg-[#6bae3b] px-6 py-3 text-sm font-bold text-[#0e2618] shadow-lg transition hover:bg-[#7cc449] sm:text-base"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  <span>Book Your Stay on WhatsApp</span>
                </button>
                <a
                  href={RESORT_INFO.phoneHref}
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/35 bg-[#123724]/80 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-[#1b4d32] sm:text-base"
                >
                  <Phone className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
                  <span>Call {RESORT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Interactive Real-Photo Switcher Card */}
            <div className="rounded-3xl border border-white/20 bg-[#123724]/85 p-4 shadow-2xl backdrop-blur-md lg:col-span-5 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#a3e66f]">
                Real Property View
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">{currentSlide.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                {currentSlide.caption}
              </p>

              <div
                role="group"
                aria-label="Switch resort hero photograph"
                className="mt-4 grid grid-cols-2 gap-2"
              >
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === slideIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSlideIndex(idx)}
                      className={`min-h-10 cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                        isActive
                          ? 'border-[#a3e66f] bg-[#6bae3b] text-[#0e2618]'
                          : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {slide.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
