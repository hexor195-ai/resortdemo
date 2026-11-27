import { useEffect, useRef, useState } from 'react';
import { BedDouble, Check, Copy, MessageCircle, Phone, X } from 'lucide-react';
import { RESORT_INFO, ROOM_TIERS } from '../data/resortData';
import { buildWhatsAppStayUrl, formatWhatsAppStayMessage } from '../utils/calculations';

export interface BookingPrefill {
  roomTierName?: string;
}

export interface BookingDialogProps {
  open: boolean;
  prefill: BookingPrefill;
  onClose: () => void;
}

function addDaysIso(baseDate: Date, days: number): string {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function BookingDialog({ open, prefill, onClose }: BookingDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [roomTierName, setRoomTierName] = useState(
    prefill.roomTierName || ROOM_TIERS[0].name
  );
  const [checkInDate, setCheckInDate] = useState(() => addDaysIso(new Date(), 3));
  const [checkOutDate, setCheckOutDate] = useState(() => addDaysIso(new Date(), 5));
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    if (prefill.roomTierName) {
      setRoomTierName(prefill.roomTierName);
    }
    setCopyStatus('');
  }, [prefill, open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };
    dialog.addEventListener('close', handleClose);

    let cleanupBackdrop = () => {};
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) dialog.close();
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      cleanupBackdrop = () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      cleanupBackdrop();
    };
  }, [onClose]);

  const inquiryPayload = {
    guestName,
    guestPhone,
    checkInDate,
    checkOutDate,
    guests,
    roomTierName,
    notes,
  };

  const whatsappUrl = buildWhatsAppStayUrl(inquiryPayload);
  const messagePreview = formatWhatsAppStayMessage(inquiryPayload);

  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(messagePreview);
      } else {
        const host = dialogRef.current ?? document.body;
        const textarea = document.createElement('textarea');
        textarea.value = messagePreview;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        host.appendChild(textarea);
        textarea.select();
        const copied = typeof document.execCommand === 'function' && document.execCommand('copy');
        host.removeChild(textarea);
        if (!copied) {
          throw new Error('Copy command failed');
        }
      }
      setCopyStatus('Inquiry copied to clipboard');
    } catch {
      setCopyStatus('Unable to copy automatically — please copy from the preview box.');
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="booking-dialog-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="m-auto w-[calc(100%-1.5rem)] max-w-2xl rounded-3xl border border-[#123724]/20 bg-[#faf9f5] p-0 text-[#1e293b] shadow-2xl"
    >
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-[#123724]/10 bg-[#123724] px-6 py-5 text-white">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#a3e66f]">
              <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Palm Bliss Resort Front Desk</span>
            </p>
            <h2 id="booking-dialog-title" className="mt-1 text-2xl font-bold text-white">
              Direct Room Booking Inquiry
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close booking dialog"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-name" className="block text-xs font-bold uppercase text-[#475569]">
                Your Name
              </label>
              <input
                id="booking-name"
                type="text"
                autoComplete="name"
                autoFocus
                placeholder="e.g., Aarav Sharma"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-xs font-bold uppercase text-[#475569]">
                Mobile Number (Optional)
              </label>
              <input
                id="booking-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98..."
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="booking-room" className="block text-xs font-bold uppercase text-[#475569]">
                Room Category
              </label>
              <select
                id="booking-room"
                value={roomTierName}
                onChange={(e) => setRoomTierName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              >
                {ROOM_TIERS.map((tier) => (
                  <option key={tier.id} value={tier.name}>
                    {tier.name} ({tier.sizeSqFt} sq.ft.)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="booking-checkin" className="block text-xs font-bold uppercase text-[#475569]">
                Check-in Date ({RESORT_INFO.checkIn})
              </label>
              <input
                id="booking-checkin"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              />
            </div>

            <div>
              <label htmlFor="booking-checkout" className="block text-xs font-bold uppercase text-[#475569]">
                Check-out Date ({RESORT_INFO.checkOut})
              </label>
              <input
                id="booking-checkout"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              />
            </div>

            <div>
              <label htmlFor="booking-guests" className="block text-xs font-bold uppercase text-[#475569]">
                Guests
              </label>
              <input
                id="booking-guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value) || 1)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              />
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-xs font-bold uppercase text-[#475569]">
                Special Request (Optional)
              </label>
              <input
                id="booking-notes"
                type="text"
                placeholder="e.g., Ground floor room, extra bed"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#123724]/20 bg-white px-3.5 py-2.5 text-sm text-[#1e293b]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#123724]/15 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#123724]">
                WhatsApp Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-[#f1f5ec] px-2.5 py-1 text-xs font-semibold text-[#123724] transition hover:bg-[#e1ebd6]"
              >
                {copyStatus ? (
                  <Check className="h-3.5 w-3.5 text-[#123724]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>Copy Inquiry Text</span>
              </button>
            </div>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#334155]">
              {messagePreview}
            </pre>
            <p className="mt-1 text-xs font-medium text-[#123724]" role="status" aria-live="polite">
              {copyStatus}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#123724] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1b4d32]"
            >
              <MessageCircle className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
              <span>Send on WhatsApp ({RESORT_INFO.phoneDisplay})</span>
            </a>

            <a
              href={RESORT_INFO.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#9e3b2b] bg-white px-5 py-3 text-sm font-bold text-[#9e3b2b] transition hover:bg-[#faf9f5]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call {RESORT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
