import { RESORT_INFO } from '../data/resortData';

export interface StaySavingsResult {
  otaNightly: number;
  directNightly: number;
  otaTotal: number;
  directTotal: number;
  guestSavingsTotal: number;
  savingsPercent: number;
}

export interface OwnerRoiResult {
  monthlyOtaGross: number;
  monthlyCommissionSaved: number;
  monthlyDirectRevenue: number;
  monthlyNetGain: number;
  annualNetGain: number;
}

export type InquiryType = 'stay' | 'dining';

export interface BookingInquiryInput {
  type: InquiryType;
  guestName: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  diningDate?: string;
  diningTime?: string;
  guests: number;
  roomTierName?: string;
  notes?: string;
  estimatedDirectRate?: number;
}

const clamp = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

export function calculateGuestStaySavings(
  otaNightly: number,
  nights: number,
  rooms: number,
  directDiscountPct: number
): StaySavingsResult {
  const safeOta = Math.max(0, Math.round(Number.isFinite(otaNightly) ? otaNightly : 0));
  const safeNights = Math.max(1, Math.round(Number.isFinite(nights) ? nights : 1));
  const safeRooms = Math.max(1, Math.round(Number.isFinite(rooms) ? rooms : 1));
  const clampedDiscount = clamp(directDiscountPct, 0, 50);

  const directNightly = Math.round(safeOta * (1 - clampedDiscount / 100));
  const otaTotal = safeOta * safeNights * safeRooms;
  const directTotal = directNightly * safeNights * safeRooms;
  const guestSavingsTotal = Math.max(0, otaTotal - directTotal);

  return {
    otaNightly: safeOta,
    directNightly,
    otaTotal,
    directTotal,
    guestSavingsTotal,
    savingsPercent: Math.round(clampedDiscount),
  };
}

export function calculateOwnerRoi(
  monthlyRoomNights: number,
  avgOtaRate: number,
  otaCommissionPct: number,
  directDiscountPct: number
): OwnerRoiResult {
  const safeRoomNights = Math.max(0, Math.round(Number.isFinite(monthlyRoomNights) ? monthlyRoomNights : 0));
  const safeRate = Math.max(0, Math.round(Number.isFinite(avgOtaRate) ? avgOtaRate : 0));

  if (safeRoomNights === 0 || safeRate === 0) {
    return {
      monthlyOtaGross: 0,
      monthlyCommissionSaved: 0,
      monthlyDirectRevenue: 0,
      monthlyNetGain: 0,
      annualNetGain: 0,
    };
  }

  const clampedCommission = clamp(otaCommissionPct, 0, 40);
  const clampedDiscount = clamp(directDiscountPct, 0, 50);

  const monthlyOtaGross = safeRoomNights * safeRate;
  const monthlyCommissionSaved = Math.round(monthlyOtaGross * (clampedCommission / 100));
  const monthlyOtaNetPayout = Math.round(monthlyOtaGross * (1 - clampedCommission / 100));

  const directNightly = Math.round(safeRate * (1 - clampedDiscount / 100));
  const monthlyDirectRevenue = safeRoomNights * directNightly;
  const monthlyNetGain = monthlyDirectRevenue - monthlyOtaNetPayout;
  const annualNetGain = monthlyNetGain * 12;

  return {
    monthlyOtaGross,
    monthlyCommissionSaved,
    monthlyDirectRevenue,
    monthlyNetGain,
    annualNetGain,
  };
}

export function formatWhatsAppInquiryMessage(input: BookingInquiryInput): string {
  const cleanName = input.guestName.trim() || 'Guest';
  const safeGuests = Math.max(1, Math.round(Number.isFinite(input.guests) ? input.guests : 1));
  const lines: string[] = [
    `Hello ${RESORT_INFO.name} team,`,
    '',
    input.type === 'stay'
      ? '*Direct Room Inquiry (Official Website)*'
      : '*Restaurant Table Inquiry (Multicuisine Pavilion)*',
    `Name: ${cleanName}`,
  ];

  if (input.guestPhone?.trim()) {
    lines.push(`Phone: ${input.guestPhone.trim()}`);
  }

  if (input.type === 'stay') {
    if (input.roomTierName?.trim()) {
      lines.push(`Room Preference: ${input.roomTierName.trim()}`);
    }
    if (input.checkInDate || input.checkOutDate) {
      lines.push(
        `Dates: ${input.checkInDate || 'Flexible'} to ${input.checkOutDate || 'Flexible'}`
      );
    }
    lines.push(`Guests: ${safeGuests} ${safeGuests === 1 ? 'guest' : 'guests'}`);
    if (input.estimatedDirectRate && input.estimatedDirectRate > 0) {
      lines.push(
        `Direct Website Quote: ₹${Math.round(input.estimatedDirectRate).toLocaleString('en-IN')}/night`
      );
    }
  } else {
    lines.push(`Dining Date: ${input.diningDate || 'Today / Flexible'}`);
    if (input.diningTime?.trim()) {
      lines.push(`Preferred Time: ${input.diningTime.trim()}`);
    }
    lines.push(`Party Size: ${safeGuests} ${safeGuests === 1 ? 'guest' : 'guests'}`);
  }

  if (input.notes?.trim()) {
    lines.push(`Notes: ${input.notes.trim()}`);
  }

  lines.push('', 'Please confirm availability. Thank you!');
  return lines.join('\n');
}

export function buildWhatsAppInquiryUrl(input: BookingInquiryInput): string {
  const message = formatWhatsAppInquiryMessage(input);
  return `https://wa.me/${RESORT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
