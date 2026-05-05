import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Stub Three.js renderer (needs WebGL)
vi.mock('../components/Room3DViewer', () => ({
  Room3DViewer: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="3d-viewer">
      <button onClick={onClose}>Close 3D</button>
    </div>
  ),
}));

beforeEach(() => {
  // Each test starts with a fresh house (no carry-over from localStorage).
  window.localStorage.clear();
});

describe('App — header', () => {
  it('renders app title', () => {
    render(<App />);
    expect(screen.getByText('Radar Room Configurator')).toBeInTheDocument();
  });

  it('shows 0 objects initially', () => {
    render(<App />);
    expect(screen.getByText(/0 objects/)).toBeInTheDocument();
  });

  it('3D button is disabled with no objects', () => {
    render(<App />);
    expect(screen.getByText(/⬡ 3D/)).toBeDisabled();
  });

  it('Export button is disabled with no objects', () => {
    render(<App />);
    expect(screen.getByText(/^↓ Export$/)).toBeDisabled();
  });

  it('Clear button not visible with no objects', () => {
    render(<App />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  it('Import button is always visible', () => {
    render(<App />);
    expect(screen.getByText(/Import/)).toBeInTheDocument();
  });

  it('dark mode toggles on sun/moon click', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByText('☀️');
    await user.click(toggle);
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
});

describe('App — adding objects', () => {
  it('adds bed to canvas and shows 1 object', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    expect(screen.getByText(/1 objects/)).toBeInTheDocument();
  });

  it('3D and Export buttons enable after adding object', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    expect(screen.getByText(/⬡ 3D/)).not.toBeDisabled();
    expect(screen.getByText(/^↓ Export$/)).not.toBeDisabled();
  });

  it('shows Clear button after adding object', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('object count increments per add', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText('Sofa'));
    await user.click(screen.getByText('Door'));
    expect(screen.getByText(/3 objects/)).toBeInTheDocument();
  });
});

describe('App — clear objects', () => {
  it('clears all objects on confirm', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValueOnce(true);
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText('Clear'));
    expect(screen.getByText(/0 objects/)).toBeInTheDocument();
  });

  it('does NOT clear if confirm cancelled', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValueOnce(false);
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText('Clear'));
    expect(screen.getByText(/1 objects/)).toBeInTheDocument();
  });
});

describe('App — 3D viewer', () => {
  it('opens 3D viewer after adding object', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText(/⬡ 3D/));
    expect(screen.getByTestId('3d-viewer')).toBeInTheDocument();
  });

  it('closes 3D viewer on close button', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText(/⬡ 3D/));
    await user.click(screen.getByText('Close 3D'));
    expect(screen.queryByTestId('3d-viewer')).not.toBeInTheDocument();
  });
});

describe('App — room config', () => {
  it('shows default room size in active-room header', () => {
    render(<App />);
    expect(screen.getByText(/4 × 4 m/)).toBeInTheDocument();
  });
});

describe('App — export modal', () => {
  it('opens export modal when objects exist', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText(/^↓ Export$/));
    expect(screen.getByText(/board/i)).toBeInTheDocument();
  });
});

describe('App — multi-room rail', () => {
  it('shows the default Room 1 tab', () => {
    render(<App />);
    expect(screen.getByText('Room 1')).toBeInTheDocument();
  });

  it('+ Add room creates a second room and switches active', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('+ Add room'));
    expect(screen.getByText('Room 2')).toBeInTheDocument();
    // active room indicator: header should reflect active room name
    expect(screen.getByText(/active: Room 2/)).toBeInTheDocument();
  });

  it('switching tabs changes the active room', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('+ Add room')); // Room 2 active
    await user.click(screen.getByText('Room 1'));     // back to Room 1
    expect(screen.getByText(/active: Room 1/)).toBeInTheDocument();
  });
});

describe('App — Metaroom-import wiring', () => {
  it('appends one room per item in MetaroomImportResponse.rooms', async () => {
    // Import the api module then mock its function so the modal's call hits our stub.
    const api = await import('../api');
    const spy = vi.spyOn(api, 'importMetaroom').mockResolvedValue({
      floor: { name: 'Floor 0', width: 8, height: 10 },
      rooms: [
        { name: 'Room A', width: 3, height: 2, objects: [] },
        { name: 'Room B', width: 4, height: 3, objects: [] },
      ],
    });

    const user = userEvent.setup();
    render(<App />);
    // Open import modal, drop a fake PDF, click Parse.
    await user.click(screen.getByText(/Import/));
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const pdf = new File([new Uint8Array([0x25, 0x50, 0x44, 0x46])], 'scan.pdf', { type: 'application/pdf' });
    await user.upload(input, pdf);
    await user.click(screen.getByText(/Parse PDF & Import/));

    // Spy was called and both rooms appear in the rail.
    expect(spy).toHaveBeenCalled();
    expect(await screen.findByText('Room A')).toBeInTheDocument();
    expect(screen.getByText('Room B')).toBeInTheDocument();
    spy.mockRestore();
  });
});
