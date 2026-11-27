import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResortHero } from './ResortHero';

describe('ResortHero', () => {
  it('renders single H1 with official logo, verified rating, and real resort photo switcher', async () => {
    const user = userEvent.setup();
    const onOpenBooking = vi.fn();

    render(<ResortHero onOpenBooking={onOpenBooking} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Palm Bliss Resort/i);
    expect(screen.getByText(/4\.5/)).toBeInTheDocument();
    expect(screen.getByText(/1,043/)).toBeInTheDocument();

    const heroImg = screen.getByRole('img', { name: /Palm Bliss Resort/i });
    expect(heroImg.getAttribute('src')).toContain('/images/hero-evening.jpg');

    await user.click(screen.getByRole('button', { name: /Night Gazebo/i }));
    expect(heroImg.getAttribute('src')).toContain('/images/gazebo-night.jpg');

    await user.click(screen.getByRole('button', { name: /Book Your Stay on WhatsApp/i }));
    expect(onOpenBooking).toHaveBeenCalledWith('Deluxe Room (Garden View)');
  });
});
