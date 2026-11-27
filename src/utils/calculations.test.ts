import { describe, expect, it } from 'vitest';
import {
  buildWhatsAppStayUrl,
  formatWhatsAppStayMessage,
} from './calculations';

describe('stay WhatsApp inquiry helpers', () => {
  it('formats and URL-encodes room stay inquiry links cleanly', () => {
    const stayUrl = buildWhatsAppStayUrl({
      guestName: 'Aarav & Priya',
      guestPhone: '9876543210',
      checkInDate: '2026-12-18',
      checkOutDate: '2026-12-20',
      guests: 2,
      roomTierName: 'Deluxe Room (Garden View)',
      notes: 'Early arrival around 11 AM',
    });

    expect(stayUrl.startsWith('https://wa.me/919404596257?text=')).toBe(true);
    const decodedStay = decodeURIComponent(stayUrl.split('text=')[1]);
    expect(decodedStay).toContain('PALM BLISS RESORT');
    expect(decodedStay).toContain('Aarav & Priya');
    expect(decodedStay).toContain('Deluxe Room (Garden View)');
    expect(decodedStay).toContain('2026-12-18');
  });

  it('handles blank optional fields and invalid guest counts safely', () => {
    const msg = formatWhatsAppStayMessage({
      guestName: '   ',
      guests: 0,
      roomTierName: 'Super Deluxe Room (Garden View)',
    });

    expect(msg).toContain('Name: Guest');
    expect(msg).toContain('Guests: 1 guest');
    expect(msg).toContain('Super Deluxe Room (Garden View)');
    expect(msg).not.toContain('Restaurant');
  });
});
