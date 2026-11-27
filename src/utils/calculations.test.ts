import { describe, expect, it } from 'vitest';
import {
  buildWhatsAppInquiryUrl,
  calculateGuestStaySavings,
  calculateOwnerRoi,
  formatWhatsAppInquiryMessage,
} from './calculations';

describe('calculations', () => {
  it('computes guest stay savings vs OTA rate', () => {
    const result = calculateGuestStaySavings(2781, 2, 1, 14);
    expect(result).toEqual({
      otaNightly: 2781,
      directNightly: 2392,
      otaTotal: 5562,
      directTotal: 4784,
      guestSavingsTotal: 778,
      savingsPercent: 14,
    });
  });

  it('clamps out-of-range inputs safely in guest stay savings', () => {
    const result = calculateGuestStaySavings(2781, 0, -2, 80);
    expect(result.otaTotal).toBe(2781);
    expect(result.savingsPercent).toBe(50);
    expect(result.directNightly).toBe(1391);
  });

  it('computes owner monthly and annual commission savings without NaN on zero nights', () => {
    const zeroRoi = calculateOwnerRoi(0, 2781, 18, 14);
    expect(zeroRoi).toEqual({
      monthlyOtaGross: 0,
      monthlyCommissionSaved: 0,
      monthlyDirectRevenue: 0,
      monthlyNetGain: 0,
      annualNetGain: 0,
    });

    const roi = calculateOwnerRoi(25, 2781, 18, 14);
    expect(roi.monthlyOtaGross).toBe(69525);
    expect(roi.monthlyCommissionSaved).toBe(12515);
    expect(roi.monthlyDirectRevenue).toBe(59800);
    expect(roi.monthlyNetGain).toBe(2789);
    expect(roi.annualNetGain).toBe(33468);
  });

  it('formats and URL-encodes WhatsApp inquiry links for stay and dining', () => {
    const stayUrl = buildWhatsAppInquiryUrl({
      type: 'stay',
      guestName: 'Aarav & Priya',
      guestPhone: '9876543210',
      checkInDate: '2026-12-18',
      checkOutDate: '2026-12-20',
      guests: 2,
      roomTierName: 'Deluxe Room (Garden View)',
      estimatedDirectRate: 2392,
      notes: 'Early arrival around 11 AM',
    });

    expect(stayUrl.startsWith('https://wa.me/919404596257?text=')).toBe(true);
    const decodedStay = decodeURIComponent(stayUrl.split('text=')[1]);
    expect(decodedStay).toContain('PALM BLISS RESORT');
    expect(decodedStay).toContain('Aarav & Priya');
    expect(decodedStay).toContain('Deluxe Room (Garden View)');
    expect(decodedStay).toContain('2026-12-18');

    const diningMsg = formatWhatsAppInquiryMessage({
      type: 'dining',
      guestName: '',
      diningDate: '2026-12-19',
      diningTime: '8:00 PM',
      guests: 6,
      notes: 'Surmai Tandoori & family table',
    });
    expect(diningMsg).toContain('Restaurant Table Inquiry');
    expect(diningMsg).toContain('6 guests');
    expect(diningMsg).toContain('8:00 PM');
  });
});
