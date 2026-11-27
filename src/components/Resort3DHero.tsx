import { useEffect, useRef, useState } from 'react';
import {
  Compass,
  MapPin,
  MessageCircle,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Star,
  Sun,
} from 'lucide-react';
import { CAMPUS_HOTSPOTS, RESORT_INFO, type HotspotId } from '../data/resortData';
import {
  createPalmBlissScene,
  type CampusSceneController,
  type LightingMode,
} from '../three/campusScene';
import type { InquiryType } from '../utils/calculations';

export interface Resort3DHeroProps {
  activeHotspot: HotspotId;
  onSelectHotspot: (id: HotspotId) => void;
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  onOpenBooking: (type: InquiryType, prefillRoom?: string) => void;
}

export function Resort3DHero({
  activeHotspot,
  onSelectHotspot,
  lightingMode,
  onToggleLighting,
  onOpenBooking,
}: Resort3DHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<CampusSceneController | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  const selectedSpot =
    CAMPUS_HOTSPOTS.find((spot) => spot.id === activeHotspot) ?? CAMPUS_HOTSPOTS[0];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const controller = createPalmBlissScene(container, {
      initialHotspot: activeHotspot,
      initialLighting: lightingMode,
      reducedMotion,
    });

    if (!controller) {
      setWebglUnavailable(true);
      return;
    }

    setWebglUnavailable(false);
    controllerRef.current = controller;

    return () => {
      controller.dispose();
      controllerRef.current = null;
    };
    // Initialize WebGL scene once on mount; hotspot & lighting updates use controller methods
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controllerRef.current?.setHotspot(activeHotspot);
  }, [activeHotspot]);

  useEffect(() => {
    controllerRef.current?.setLighting(lightingMode);
  }, [lightingMode]);

  const handlePrimaryBookClick = () => {
    if (activeHotspot === 'dining') {
      onOpenBooking('dining');
      return;
    }
    onOpenBooking('stay', 'Deluxe Room (Garden View)');
  };

  return (
    <section
      id="hero-3d"
      aria-label="Interactive 3D Campus Tour"
      className="relative min-h-[68svh] lg:min-h-[88svh] w-full overflow-hidden bg-[#1b3b2b] text-white"
    >
      {/* 3D Canvas Host */}
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        aria-hidden={webglUnavailable ? 'true' : undefined}
      />

      {/* WebGL Graceful Fallback */}
      {webglUnavailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1b3b2b] via-[#274b38] to-[#5f2a20] p-6">
          <div className="max-w-md rounded-2xl border border-white/20 bg-black/35 p-6 text-center backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Konkan Architectural Preview
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Interactive 3D preview unavailable on this device
            </p>
            <p className="mt-1 text-sm text-white/80">
              Explore our two-story red-laterite cottages, open-air dining gazebo, and direct
              booking rates below.
            </p>
          </div>
        </div>
      )}

      {/* Subtle edge vignette for crisp HUD contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75"
        aria-hidden="true"
      />

      {/* Top Overlay: Brand Headline + Lighting & Zoom Controls */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-6 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:pt-8">
        <div className="max-w-xl rounded-2xl border border-white/20 bg-[#11261b]/75 p-4 shadow-xl backdrop-blur-md sm:p-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-wide text-amber-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-amber-200">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {RESORT_INFO.rating} ({RESORT_INFO.reviewCount.toLocaleString('en-IN')} Google Reviews)
            </span>
            <span className="inline-flex items-center gap-1 text-white/85">
              <MapPin className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
              Nadhavade, Konkan
            </span>
          </div>

          <h1 className="mt-2.5 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Palm Bliss Resort — 3D Campus Tour
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-white/85 sm:text-base">
            Drag to orbit our red-laterite Konkan cottages, open-air dining pavilion, and lush
            courtyard lawns. Compare direct rates against OTAs below.
          </p>
        </div>

        {/* Camera & Atmosphere Toolbar */}
        <div className="flex flex-wrap items-center gap-2 self-start rounded-2xl border border-white/20 bg-[#11261b]/80 p-2 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={onToggleLighting}
            aria-pressed={lightingMode === 'dusk'}
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 sm:text-sm"
          >
            {lightingMode === 'dusk' ? (
              <Sun className="h-4 w-4 text-amber-300" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-amber-300" aria-hidden="true" />
            )}
            <span>{lightingMode === 'dusk' ? 'Switch to Daylight' : 'Golden-Hour Dusk'}</span>
          </button>

          <div className="flex items-center gap-1 border-l border-white/20 pl-2">
            <button
              type="button"
              onClick={() => controllerRef.current?.zoomBy(0.85)}
              aria-label="Zoom in 3D view"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => controllerRef.current?.zoomBy(1.18)}
              aria-label="Zoom out 3D view"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectHotspot('overview');
                controllerRef.current?.resetView();
              }}
              aria-label="Reset 3D camera"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Hotspot Bar & Active Spot Details */}
      <div className="relative z-10 mx-auto mt-14 flex max-w-7xl flex-col gap-3 px-4 pb-6 sm:mt-24 sm:px-6 lg:mt-36">
        {/* Hotspot Selector Pills */}
        <div
          role="group"
          aria-label="3D Resort Tour Hotspots"
          className="flex flex-wrap items-center gap-2"
        >
          {CAMPUS_HOTSPOTS.map((spot) => {
            const isActive = spot.id === activeHotspot;
            return (
              <button
                key={spot.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectHotspot(spot.id)}
                className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  isActive
                    ? 'border-amber-300 bg-[#9e3b2b] text-white shadow-lg'
                    : 'border-white/25 bg-[#11261b]/80 text-white/90 backdrop-blur-md hover:bg-[#1b3b2b]'
                }`}
              >
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{spot.shortLabel}</span>
              </button>
            );
          })}
          {!webglUnavailable && (
            <span className="ml-auto hidden rounded-full bg-black/45 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm sm:inline-block">
              Drag to orbit · Scroll page normally
            </span>
          )}
        </div>

        {/* Active Hotspot Summary Card */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/20 bg-[#faf7f2]/95 p-4 text-[#1e293b] shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:p-5">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9e3b2b]">
              {selectedSpot.subtitle}
            </p>
            <h2 className="mt-0.5 text-xl font-bold text-[#1b3b2b]">{selectedSpot.label}</h2>
            <p className="mt-1 text-sm text-[#475569]">{selectedSpot.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
            <a
              href={selectedSpot.targetSection}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1b3b2b]/25 bg-white px-4 py-2.5 text-sm font-semibold text-[#1b3b2b] transition hover:bg-[#f2ece1]"
            >
              {selectedSpot.ctaLabel}
            </a>
            <button
              type="button"
              onClick={handlePrimaryBookClick}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1b3b2b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#11261b]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Book Direct on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
