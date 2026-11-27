import { describe, expect, it } from 'vitest';
import { CAMPUS_HOTSPOTS, RESORT_INFO, ROOM_TIERS } from './resortData';

describe('resortData', () => {
  it('preserves verified Palm Bliss Resort contact and review details', () => {
    expect(RESORT_INFO.name).toBe('PALM BLISS RESORT');
    expect(RESORT_INFO.phoneDisplay).toBe('094045 96257');
    expect(RESORT_INFO.whatsappNumber).toBe('919404596257');
    expect(RESORT_INFO.rating).toBe(4.5);
    expect(RESORT_INFO.reviewCount).toBe(1043);
    expect(RESORT_INFO.excludedAmenities).toContain('No swimming pool');
  });

  it('defines the three verified room tiers and four 3D campus hotspots', () => {
    expect(ROOM_TIERS.map((r) => r.id)).toEqual(['deluxe', 'super-deluxe', 'premium']);
    expect(CAMPUS_HOTSPOTS.map((h) => h.id)).toEqual(['overview', 'rooms', 'dining', 'courtyard']);
  });
});
