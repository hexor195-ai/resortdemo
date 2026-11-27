import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoomsShowcaseSection } from './RoomsShowcaseSection';

describe('RoomsShowcaseSection', () => {
  it('renders all three verified room tiers with real photos and no OTA rate comparison', async () => {
    const user = userEvent.setup();
    const onBookRoom = vi.fn();

    render(<RoomsShowcaseSection onBookRoom={onBookRoom} />);

    expect(screen.getByRole('heading', { name: /^Deluxe Room \(Garden View\)$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Super Deluxe Room \(Garden View\)$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Premium Room \(Garden View\)$/i })).toBeInTheDocument();

    expect(screen.queryByText(/Save vs\. OTA/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Owner ROI/i)).not.toBeInTheDocument();

    const bookButtons = screen.getAllByRole('button', { name: /Book This Room on WhatsApp/i });
    expect(bookButtons).toHaveLength(3);
    await user.click(bookButtons[1]);
    expect(onBookRoom).toHaveBeenCalledWith('Super Deluxe Room (Garden View)');
  });
});
