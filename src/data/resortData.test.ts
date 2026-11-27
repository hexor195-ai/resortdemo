import { describe, expect, it } from 'vitest';
import {
  GALLERY_PHOTOS,
  HERO_SLIDES,
  MUNCHING_BITES_INFO,
  RESORT_INFO,
  ROOM_TIERS,
} from './resortData';

describe('resortData', () => {
  it('preserves verified Palm Bliss Resort contact, logo, and review details', () => {
    expect(RESORT_INFO.name).toBe('PALM BLISS RESORT');
    expect(RESORT_INFO.logoSrc).toBe('/images/logo.jpg');
    expect(RESORT_INFO.phoneDisplay).toBe('094045 96257');
    expect(RESORT_INFO.whatsappNumber).toBe('919404596257');
    expect(RESORT_INFO.rating).toBe(4.5);
    expect(RESORT_INFO.reviewCount).toBe(1043);
    expect(RESORT_INFO.excludedAmenities).toContain('No swimming pool');
  });

  it('defines Munching Bites restaurant details and real local resort photography', () => {
    expect(MUNCHING_BITES_INFO.name).toBe('Munching Bites');
    expect(MUNCHING_BITES_INFO.fullName).toContain("Konkan's Munching Route");
    expect(MUNCHING_BITES_INFO.hours).toContain('7:00 AM');
    expect(HERO_SLIDES.length).toBeGreaterThanOrEqual(4);
    expect(GALLERY_PHOTOS.every((p) => p.src.startsWith('/images/'))).toBe(true);
    expect(ROOM_TIERS.map((r) => r.id)).toEqual(['deluxe', 'super-deluxe', 'premium']);
    expect(ROOM_TIERS.every((r) => r.imageSrc.startsWith('/images/'))).toBe(true);
  });
});
