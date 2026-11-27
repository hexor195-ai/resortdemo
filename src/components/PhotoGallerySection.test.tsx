import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhotoGallerySection } from './PhotoGallerySection';

describe('PhotoGallerySection', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    });
  });

  it('filters photos by category and opens a native lightbox dialog on photo click', async () => {
    const user = userEvent.setup();
    render(<PhotoGallerySection />);

    expect(screen.getAllByRole('button', { name: /View photo:/i })).toHaveLength(8);

    await user.click(screen.getByRole('button', { name: /^Rooms$/i }));
    const roomButtons = screen.getAllByRole('button', { name: /View photo:/i });
    expect(roomButtons).toHaveLength(3);

    await user.click(roomButtons[0]);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Close photo preview/i })).toBeInTheDocument();
  });
});
