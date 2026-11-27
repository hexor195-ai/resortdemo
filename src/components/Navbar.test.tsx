import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders strong framed logo crest and editorial PALM BLISS / RESORT · NADHAVADE lockup', async () => {
    const user = userEvent.setup();
    const onOpenBooking = vi.fn();

    render(<Navbar onOpenBooking={onOpenBooking} />);

    const logoImg = screen.getByRole('img', { name: /Palm Bliss Resort logo/i });
    expect(logoImg.getAttribute('src')).toBe('/images/logo.jpg');

    const brandLink = screen.getByRole('link', { name: /Palm Bliss/i });
    expect(brandLink).toHaveAttribute('href', '#hero-showcase');
    expect(brandLink).toHaveTextContent(/RESORT · NADHAVADE/i);

    await user.click(screen.getByRole('button', { name: /Book Stay/i }));
    expect(onOpenBooking).toHaveBeenCalled();

    const menuBtn = screen.getByRole('button', { name: /Open navigation menu/i });
    await user.click(menuBtn);
    expect(screen.getByRole('navigation', { name: /Mobile/i })).toBeInTheDocument();
  });
});
