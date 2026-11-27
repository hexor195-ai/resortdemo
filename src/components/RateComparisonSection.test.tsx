import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RateComparisonSection } from './RateComparisonSection';

describe('RateComparisonSection', () => {
  it('displays verified room tiers, illustrative OTA rates, and updates savings dynamically', async () => {
    const user = userEvent.setup();
    const onLocateRoomsIn3D = vi.fn();
    const onBookDirectStay = vi.fn();

    render(
      <RateComparisonSection
        onLocateRoomsIn3D={onLocateRoomsIn3D}
        onBookDirectStay={onBookDirectStay}
      />
    );

    expect(screen.getByRole('button', { name: /^Deluxe Room/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Super Deluxe Room/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Premium Room/i })).toBeInTheDocument();
    expect(screen.getByText(/illustrative Google Hotels snapshot/i)).toBeInTheDocument();
    expect(screen.getAllByText(/₹2,781/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /^Super Deluxe Room/i }));
    expect(screen.getAllByText(/₹3,500/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /Book This Direct Rate on WhatsApp/i }));
    expect(onBookDirectStay).toHaveBeenCalledWith('Super Deluxe Room (Garden View)', 2, 3010);

    await user.click(screen.getByRole('button', { name: /Locate Rooms in 3D/i }));
    expect(onLocateRoomsIn3D).toHaveBeenCalled();
  });

  it('switches to Owner ROI View and handles zero room-nights without NaN', async () => {
    const user = userEvent.setup();

    render(
      <RateComparisonSection
        onLocateRoomsIn3D={vi.fn()}
        onBookDirectStay={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /Owner ROI View/i }));
    expect(screen.getByText(/Monthly OTA Commission Saved/i)).toBeInTheDocument();

    const nightsSlider = screen.getByLabelText(/Monthly Direct Room-Nights/i);
    fireEvent.change(nightsSlider, { target: { value: '0' } });

    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/₹0/).length).toBeGreaterThan(0);

    fireEvent.change(nightsSlider, { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Typical OTA Commission %/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Direct Website Guest Discount %/i), {
      target: { value: '25' },
    });

    expect(screen.queryByText(/₹-/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/-₹/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Direct discount exceeds OTA commission/i)).toBeInTheDocument();
  });
});
