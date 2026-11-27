import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuestVoicesCarousel } from './GuestVoicesCarousel';

describe('GuestVoicesCarousel', () => {
  beforeEach(() => {
    Element.prototype.scrollBy = vi.fn();
    Element.prototype.scrollTo = vi.fn();
  });

  it('renders accessible carousel semantics, controls, and live slide announcements', async () => {
    const user = userEvent.setup();
    render(<GuestVoicesCarousel />);

    const carouselRegion = screen.getByRole('region', { name: /Guest Voices/i });
    expect(carouselRegion).toHaveAttribute('aria-roledescription', 'carousel');

    const slides = screen.getAllByRole('group');
    const slideElements = slides.filter(
      (el) => el.getAttribute('aria-roledescription') === 'slide'
    );
    expect(slideElements).toHaveLength(4);
    expect(slideElements[0]).toHaveAttribute('aria-label', '1 of 4');

    const markers = screen.getAllByRole('button', { name: /Go to review/i });
    expect(markers[0]).toHaveAttribute('aria-current', 'true');

    await user.click(screen.getByRole('button', { name: /Next review/i }));
    expect(markers[1]).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Review 2 of 4');
  });
});
