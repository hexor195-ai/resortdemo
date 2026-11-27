import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { HERO_SLIDES, RESORT_INFO } from '../data/resortData';
import { assetUrl } from '../utils/assetUrl';

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
      {/* Mobile: clean unobstructed landscape photo frame; Desktop (lg+): full-bleed background */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        <img
          src={assetUrl(currentSlide.src)}
          alt={currentSlide.alt}
          className="h-full w-full object-cover object-center transition-opacity duration-500"
        />

        {/* Subtle gradient on mobile so photo stays bright and clear; deeper editorial gradient on desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0b2115]/60 via-transparent to-[#0b2115]/35 lg:from-[#0b2115]/90 lg:via-[#123724]/20 lg:to-[#0b2115]/45"
          aria-hidden="true"
        />

        {/* Mobile-only unobtrusive photo title caption at bottom-left of image */}
        <div className="pointer-events-none absolute inset-x-3 bottom-2.5 z-10 flex items-center justify-between lg:hidden">
          <span className="rounded-full bg-[#0b2115]/75 px-2.5 py-1 text-[11px] font-semibold text-[#d4f7b5] backdrop-blur-sm">
            {currentSlide.title}
          </span>
          <span className="rounded-full bg-[#0b2115]/75 px-2 py-0.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
            {slideIndex + 1} / {HERO_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Unified Top Rating & Prev/Next Strip (sits in top corners of photo on mobile & desktop) */}
      <div className="pointer-events-none absolute inset-x-0 top-3 z-20 mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:top-10">
        <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#123724]/85 px-3 py-1.5 text-xs font-semibold backdrop-blur-md lg:gap-2 lg:px-3.5">
          <span className="inline-flex items-center gap-1 text-amber-300">
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span>
              {RESORT_INFO.rating} ({RESORT_INFO.reviewCount.toLocaleString('en-IN')}
              <span className="hidden sm:inline"> Google Reviews</span>)
            </span>
          </span>
          <span className="text-white/40" aria-hidden="true">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-white/95">
            <MapPin className="hidden h-3.5 w-3.5 text-[#a3e66f] sm:inline" aria-hidden="true" />
            <span className="truncate">
              Nadhavade<span className="hidden sm:inline">, Sindhudurg</span>
            </span>
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 lg:gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous resort photo"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#123724]/80 text-white backdrop-blur-md transition hover:bg-[#1b4d32] lg:h-11 lg:w-11"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next resort photo"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#123724]/80 text-white backdrop-blur-md transition hover:bg-[#1b4d32] lg:h-11 lg:w-11"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-6 pt-3 sm:px-6 lg:min-h-[84dvh] lg:py-10">

        {/* Editorial Content + Photo Switcher (ordered for mobile-first clarity) */}
        <div className="mt-3 flex flex-col gap-4 lg:mt-24 lg:gap-6">
          <div className="order-2 max-w-2xl lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6bae3b]/55 bg-[#1b4d32]/85 px-3 py-1 backdrop-blur-md">
              <img
                src={assetUrl(RESORT_INFO.logoSrc)}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7"
              />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4f7b5]">
                Official Konkan Retreat
              </span>
            </div>

            <h1 className="type-hero mt-3 text-white drop-shadow-md">
              Palm Bliss <em className="font-medium italic text-[#d4f7b5]">Resort</em>
            </h1>
            <p className="mt-2.5 max-w-[54ch] text-sm leading-relaxed text-white/90 sm:text-base lg:mt-3 lg:text-lg">
              Peaceful red-laterite garden cottages in Nadhavade’s lush greenery — paired with
              coastal flavors and warm family dining at{' '}
              <strong className="font-semibold text-[#d4f7b5]">Munching Bites</strong>.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:mt-5">
              <button
                type="button"
                onClick={() => onOpenBooking('Deluxe Room (Garden View)')}
                className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#6bae3b] px-5 py-3 text-sm font-bold text-[#0e2618] shadow-lg transition hover:bg-[#7cc449] sm:w-auto sm:text-base"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Book Your Stay on WhatsApp</span>
              </button>
              <a
                href={RESORT_INFO.phoneHref}
                className="hidden min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 bg-[#123724]/80 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-[#1b4d32] sm:inline-flex sm:text-base"
              >
                <Phone className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
                <span>Call {RESORT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Photo Switcher Strip: horizontal pill row below photo on mobile; editorial bar on desktop */}
          <div className="order-1 flex flex-col justify-between gap-3 lg:order-2 lg:flex-row lg:items-center lg:rounded-2xl lg:border lg:border-white/15 lg:bg-[#0e291b]/82 lg:px-4 lg:py-3 lg:backdrop-blur-md">
            <div className="hidden min-w-0 lg:block">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#a3e66f]">
                Viewing: {currentSlide.title}
              </p>
              <p className="truncate text-xs text-white/80">{currentSlide.caption}</p>
            </div>

            <div
              role="group"
              aria-label="Switch resort hero photograph"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
              style={{ scrollbarWidth: 'none' }}
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === slideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSlideIndex(idx)}
                    className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-2 py-1.5 pr-3 text-left text-xs font-semibold transition lg:min-w-0 lg:p-1.5 lg:pr-2.5 ${
                      isActive
                        ? 'border-[#a3e66f] bg-[#6bae3b] text-[#0e2618] shadow-sm'
                        : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <img
                      src={assetUrl(slide.src)}
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-9 shrink-0 rounded-lg object-cover"
                    />
                    <span className="whitespace-nowrap lg:truncate">{slide.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
