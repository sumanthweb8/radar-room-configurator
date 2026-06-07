import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('App — header', () => {
  it('renders app title', () => {
    render(<App />);
    expect(screen.getByText('Radar Room Configurator')).toBeInTheDocument();
  });

  it('shows 0 objects initially', () => {
    render(<App />);
    expect(screen.getByText(/0 object/)).toBeInTheDocument();
  });

  it('3D button is disabled with no objects', () => {
    render(<App />);
    expect(screen.getByText(/3D/)).toBeDisabled();
  });

  it('Export button is disabled with no objects', () => {
    render(<App />);
    expect(screen.getByText(/Export/)).toBeDisabled();
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
    const bedBtn = screen.getByText('Bed');
    await user.click(bedBtn);
    expect(screen.getByText(/1 object/)).toBeInTheDocument();
  });

  it('3D and Export buttons enable after adding object', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    expect(screen.getByText(/3D/)).not.toBeDisabled();
    expect(screen.getByText(/Export/)).not.toBeDisabled();
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

  it('opens properties panel on add', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    // Properties panel shows the type label in lowercase, in a <p> tag
    expect(screen.getAllByText('bed', { exact: true }).length).toBeGreaterThan(0);
  });
});

describe('App — clear objects', () => {
  it('clears all objects on confirm', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValueOnce(true);
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText('Clear'));
    expect(screen.getByText(/0 object/)).toBeInTheDocument();
  });

  it('does NOT clear if confirm cancelled', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValueOnce(false);
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText('Clear'));
    expect(screen.getByText(/1 object/)).toBeInTheDocument();
  });
});

describe('App — 3D viewer', () => {
  it('opens 3D viewer after adding object', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText(/3D/));
    expect(screen.getByTestId('3d-viewer')).toBeInTheDocument();
  });

  it('closes 3D viewer on close button', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText(/3D/));
    await user.click(screen.getByText('Close 3D'));
    expect(screen.queryByTestId('3d-viewer')).not.toBeInTheDocument();
  });
});

describe('App — room config', () => {
  it('shows default room size', () => {
    render(<App />);
    expect(screen.getByText(/4 × 4 m/)).toBeInTheDocument();
  });
});

describe('App — export modal', () => {
  it('opens export modal when objects exist', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Bed'));
    await user.click(screen.getByText(/Export/));
    expect(screen.getByText('Export Config')).toBeInTheDocument();
  });
});
