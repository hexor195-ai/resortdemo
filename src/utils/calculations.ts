import { RESORT_INFO } from '../data/resortData';

export interface StayInquiryInput {
  guestName: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests: number;
  roomTierName?: string;
  notes?: string;
}

export function formatWhatsAppStayMessage(input: StayInquiryInput): string {
  const cleanName = input.guestName.trim() || 'Guest';
  const safeGuests = Math.max(1, Math.round(Number.isFinite(input.guests) ? input.guests : 1));

  const lines: string[] = [
    `Hello ${RESORT_INFO.name} team,`,
    '',
    '*Room Booking Inquiry*',
    `Name: ${cleanName}`,
  ];

  if (input.guestPhone?.trim()) {
    lines.push(`Phone: ${input.guestPhone.trim()}`);
  }

  if (input.roomTierName?.trim()) {
    lines.push(`Room Category: ${input.roomTierName.trim()}`);
  }

  if (input.checkInDate || input.checkOutDate) {
    lines.push(
      `Dates: ${input.checkInDate || 'Flexible'} to ${input.checkOutDate || 'Flexible'}`
    );
  }

  lines.push(`Guests: ${safeGuests} ${safeGuests === 1 ? 'guest' : 'guests'}`);

  if (input.notes?.trim()) {
    lines.push(`Notes: ${input.notes.trim()}`);
  }

  lines.push('', 'Please confirm room availability and tariff. Thank you!');
  return lines.join('\n');
}

export function buildWhatsAppStayUrl(input: StayInquiryInput): string {
  const message = formatWhatsAppStayMessage(input);
  return `https://wa.me/${RESORT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
