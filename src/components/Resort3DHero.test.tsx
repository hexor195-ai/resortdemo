import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Resort3DHero } from './Resort3DHero';
import * as campusScene from '../three/campusScene';

const mockController: campusScene.CampusSceneController = {
  setHotspot: vi.fn(),
  setLighting: vi.fn(),
  zoomBy: vi.fn(),
  resetView: vi.fn(),
  dispose: vi.fn(),
};

describe('Resort3DHero', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockController.setHotspot = vi.fn();
    mockController.setLighting = vi.fn();
    mockController.zoomBy = vi.fn();
    mockController.resetView = vi.fn();
    mockController.dispose = vi.fn();
  });

  it('renders single H1 with verified Google rating and triggers 3D hotspot, zoom, and dusk controls', async () => {
    const user = userEvent.setup();
    vi.spyOn(campusScene, 'createPalmBlissScene').mockReturnValue(mockController);

    const onSelectHotspot = vi.fn();
    const onToggleLighting = vi.fn();
    const onOpenBooking = vi.fn();

    render(
      <Resort3DHero
        activeHotspot="overview"
        onSelectHotspot={onSelectHotspot}
        lightingMode="day"
        onToggleLighting={onToggleLighting}
        onOpenBooking={onOpenBooking}
      />
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Palm Bliss Resort/i);
    expect(screen.getByText(/4\.5/)).toBeInTheDocument();
    expect(screen.getByText(/1,043/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Dining Gazebo/i }));
    expect(onSelectHotspot).toHaveBeenCalledWith('dining');

    await user.click(screen.getByRole('button', { name: /Zoom in 3D view/i }));
    expect(mockController.zoomBy).toHaveBeenCalledWith(0.85);

    await user.click(screen.getByRole('button', { name: /Reset 3D camera/i }));
    expect(mockController.resetView).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /Golden-Hour Dusk/i }));
    expect(onToggleLighting).toHaveBeenCalled();
  });

  it('renders graceful architectural fallback card when WebGL is unavailable', async () => {
    const user = userEvent.setup();
    vi.spyOn(campusScene, 'createPalmBlissScene').mockReturnValue(null);

    const onSelectHotspot = vi.fn();
    const onOpenBooking = vi.fn();

    render(
      <Resort3DHero
        activeHotspot="rooms"
        onSelectHotspot={onSelectHotspot}
        lightingMode="dusk"
        onToggleLighting={vi.fn()}
        onOpenBooking={onOpenBooking}
      />
    );

    const fallbackText = screen.getByText(/Interactive 3D preview unavailable/i);
    expect(fallbackText).toBeInTheDocument();
    expect(fallbackText.closest('.absolute.inset-0')).toBeNull();
    expect(screen.getByRole('button', { name: /Zoom in 3D view/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Zoom out 3D view/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /Book Direct on WhatsApp/i }));
    expect(onOpenBooking).toHaveBeenCalledWith('stay', 'Deluxe Room (Garden View)');
  });
});
