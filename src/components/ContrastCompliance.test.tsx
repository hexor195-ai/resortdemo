import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MunchingBitesSection } from './MunchingBitesSection';
import { KonkanAndAmenities } from './KonkanAndAmenities';

describe('Contrast compliance on category labels', () => {
  it('uses >= 4.5:1 dark bronze (#8a5a18) instead of low-contrast #b47b2b on white cards', () => {
    const { container: diningDom } = render(<MunchingBitesSection />);
    const { container: konkanDom } = render(<KonkanAndAmenities />);

    expect(diningDom.innerHTML).not.toContain('#b47b2b');
    expect(konkanDom.innerHTML).not.toContain('#b47b2b');
    expect(diningDom.innerHTML).toContain('#8a5a18');
    expect(konkanDom.innerHTML).toContain('#8a5a18');
  });
});
