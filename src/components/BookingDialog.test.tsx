import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingDialog } from './BookingDialog';

describe('BookingDialog', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    });
  });

  it('renders room-stay booking only (no dining booking tab) and builds live WhatsApp link', async () => {
    const user = userEvent.setup();

    render(
      <BookingDialog
        open={true}
        prefill={{ roomTierName: 'Deluxe Room (Garden View)' }}
        onClose={vi.fn()}
      />
    );

    const dialog = document.querySelector('dialog');
    expect(dialog).not.toBeNull();
    expect(dialog).not.toHaveAttribute('role');
    expect(dialog).not.toHaveAttribute('aria-modal');
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(
      screen.getByRole('heading', { level: 2, name: /Direct Room Booking Inquiry/i })
    ).toBeInTheDocument();

    // No dining booking tab or dining inputs
    expect(screen.queryByRole('button', { name: /Restaurant Table/i })).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Dining Date/i)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/Your Name/i), 'Rohan & Meera');

    const waLink = screen.getByRole('link', { name: /Send on WhatsApp/i });
    expect(waLink.getAttribute('href')).toContain('https://wa.me/919404596257?text=');
    expect(decodeURIComponent(waLink.getAttribute('href') || '')).toContain('Rohan & Meera');
  });

  it('appends clipboard fallback textarea inside dialog and checks execCommand result', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });
    const execMock = vi.fn().mockReturnValue(false);
    Object.defineProperty(document, 'execCommand', {
      value: execMock,
      configurable: true,
    });
    const bodyAppendSpy = vi.spyOn(document.body, 'appendChild');

    render(<BookingDialog open={true} prefill={{}} onClose={vi.fn()} />);

    const dialog = document.querySelector('dialog')!;
    const dialogAppendSpy = vi.spyOn(dialog, 'appendChild');
    bodyAppendSpy.mockClear();

    await user.click(screen.getByRole('button', { name: /Copy Inquiry Text/i }));
    expect(execMock).toHaveBeenCalledWith('copy');
    expect(bodyAppendSpy).not.toHaveBeenCalled();
    expect(dialogAppendSpy).toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent(/Unable to copy automatically/i);
  });
});
