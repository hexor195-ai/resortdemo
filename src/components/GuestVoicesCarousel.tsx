import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { GUEST_REVIEWS, RESORT_INFO } from '../data/resortData';

export function GuestVoicesCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [liveStatus, setLiveStatus] = useState('');
  const pendingTargetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);

  const total = GUEST_REVIEWS.length;

  const scrollToSlide = (nextIndex: number) => {
    const wrapped = (nextIndex + total) % total;
    pendingTargetRef.current = wrapped;
    setActiveIndex(wrapped);
    setLiveStatus(`Review ${wrapped + 1} of ${total}`);

    const track = trackRef.current;
    if (!track) return;
    const child = track.children[wrapped] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const getNearestSlideIndex = (): number => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length === 0) return 0;
      let nearest = 0;
      let minDist = Infinity;
      children.forEach((el, idx) => {
        const dist = Math.abs(el.offsetLeft - track.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          nearest = idx;
        }
      });
      return nearest;
    };

    const handleSettled = () => {
      const settled = getNearestSlideIndex();
      pendingTargetRef.current = null;
      setActiveIndex(settled);
    };

    const handleScroll = () => {
      if (pendingTargetRef.current !== null) return;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setActiveIndex(getNearestSlideIndex());
      });

      const supportsScrollEnd = 'onscrollend' in Element.prototype;
      if (!supportsScrollEnd) {
        if (scrollTimerRef.current) globalThis.clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = globalThis.setTimeout(handleSettled, 150);
      }
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    track.addEventListener('scrollend', handleSettled);
    return () => {
      track.removeEventListener('scroll', handleScroll);
      track.removeEventListener('scrollend', handleSettled);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    };
  }, []);

  return (
    <section
      id="guest-voices"
      aria-roledescription="carousel"
      aria-label="Guest Voices"
      className="border-t border-[#1b3b2b]/10 bg-[#1b3b2b] py-16 text-white lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>
                {RESORT_INFO.rating} / 5 across {RESORT_INFO.reviewCount.toLocaleString('en-IN')}{' '}
                Google Reviews ({RESORT_INFO.ratingBreakdown.fiveStarPct}% 5-Star)
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Families &amp; Travelers Love Most
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSlide(activeIndex - 1)}
              aria-label="Previous review"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(activeIndex + 1)}
              aria-label="Next review"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="Guest review slides"
          className="carousel-track mt-8"
        >
          {GUEST_REVIEWS.map((review, index) => (
            <article
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              className="w-full shrink-0 scroll-ml-0 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm md:w-[calc(50%-0.625rem)]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-200">
                  {review.topic}
                </span>
                <div className="flex items-center gap-0.5 text-amber-300" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
              </div>

              <Quote className="mt-4 h-6 w-6 text-amber-300/60" aria-hidden="true" />
              <p className="mt-2 text-base leading-relaxed text-white/95">“{review.quote}”</p>
              <p className="mt-4 text-xs font-semibold text-white/75">
                {review.guestName} · {review.tripType}
              </p>
            </article>
          ))}
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {liveStatus}
        </p>

        <nav aria-label="Choose a review" className="mt-6 flex items-center justify-center gap-2">
          {GUEST_REVIEWS.map((review, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={review.id}
                type="button"
                aria-label={`Go to review ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => scrollToSlide(index)}
                className={`min-h-6 min-w-6 cursor-pointer rounded-full p-1 transition ${
                  isActive ? 'w-9 bg-amber-400 ring-2 ring-white' : 'w-6 bg-white/30 hover:bg-white/55'
                }`}
              />
            );
          })}
        </nav>
      </div>
    </section>
  );
}
