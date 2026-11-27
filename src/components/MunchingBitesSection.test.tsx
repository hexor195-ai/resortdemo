import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MunchingBitesSection } from './MunchingBitesSection';

describe('MunchingBitesSection', () => {
  it('showcases Munching Bites restaurant with real food photography and zero dining booking CTAs', () => {
    render(<MunchingBitesSection />);

    expect(screen.getByRole('heading', { name: /Munching Bites/i })).toBeInTheDocument();
    expect(screen.getByText(/Konkan's Munching Route/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 AM – 11:00 PM/i)).toBeInTheDocument();

    // Ensure dining bookings are completely removed
    expect(screen.queryByRole('button', { name: /Reserve/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Book.*Table/i })).not.toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images.some((img) => img.getAttribute('src')?.includes('/images/food-'))).toBe(true);
  });
});
