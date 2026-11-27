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

  it('opens native modal dialog without redundant ARIA modal attributes and builds live WhatsApp link', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <BookingDialog
        open={true}
        prefill={{
          type: 'stay',
          roomTierName: 'Deluxe Room (Garden View)',
          nights: 2,
          estimatedDirectRate: 2392,
        }}
        onClose={onClose}
      />
    );

    const dialog = document.querySelector('dialog');
    expect(dialog).not.toBeNull();
    expect(dialog).not.toHaveAttribute('role');
    expect(dialog).not.toHaveAttribute('aria-modal');
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    const nameInput = screen.getByLabelText(/Your Name/i);
    await user.type(nameInput, 'Rohan & Meera');

    const waLink = screen.getByRole('link', { name: /Send on WhatsApp/i });
    expect(waLink.getAttribute('href')).toContain('https://wa.me/919404596257?text=');
    expect(decodeURIComponent(waLink.getAttribute('href') || '')).toContain('Rohan & Meera');

    await user.click(screen.getByRole('button', { name: /Restaurant Table/i }));
    expect(screen.getByLabelText(/Dining Date/i)).toBeInTheDocument();
  });

  it('copies inquiry text and announces confirmation in polite status region', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(
      <BookingDialog
        open={true}
        prefill={{ type: 'dining' }}
        onClose={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /Copy Inquiry Text/i }));
    expect(writeText).toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent(/Inquiry copied to clipboard/i);
  });
});
