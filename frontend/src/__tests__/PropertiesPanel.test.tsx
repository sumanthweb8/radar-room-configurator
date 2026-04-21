import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertiesPanel } from '../components/PropertiesPanel';
import type { RoomObject, RoomConfig } from '../types';

const room: RoomConfig = { name: 'Room', width: 5, height: 4 };

function makeObject(overrides: Partial<RoomObject> = {}): RoomObject {
  return {
    id: 'abc', type: 'bed', label: 'Bed',
    x: 1, y: 1, width: 1.4, height: 2.0,
    color: '#4299e1', rotation: 0,
    ...overrides,
  };
}

const defaultProps = {
  room,
  dark: true,
  onUpdate: vi.fn(),
  onDelete: vi.fn(),
  onDeselect: vi.fn(),
  adjacentRooms: [],
  onAddAdjacentRoom: vi.fn(),
  onUpdateAdjacentRoom: vi.fn(),
  onRemoveAdjacentRoom: vi.fn(),
};

describe('PropertiesPanel — empty state', () => {
  it('shows nothing selected when no object', () => {
    render(<PropertiesPanel {...defaultProps} object={null} />);
    expect(screen.getByText('Nothing selected')).toBeInTheDocument();
  });
});

describe('PropertiesPanel — object selected', () => {
  it('shows object label', () => {
    render(<PropertiesPanel {...defaultProps} object={makeObject()} />);
    expect(screen.getByDisplayValue('Bed')).toBeInTheDocument();
  });

  it('shows object type', () => {
    render(<PropertiesPanel {...defaultProps} object={makeObject()} />);
    expect(screen.getByText('bed')).toBeInTheDocument();
  });

  it('shows width and height fields', () => {
    render(<PropertiesPanel {...defaultProps} object={makeObject()} />);
    expect(screen.getByDisplayValue('1.4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('shows rotation buttons', () => {
    render(<PropertiesPanel {...defaultProps} object={makeObject()} />);
    expect(screen.getByText('90°')).toBeInTheDocument();
    expect(screen.getByText('180°')).toBeInTheDocument();
    expect(screen.getByText('270°')).toBeInTheDocument();
  });

  it('calls onUpdate when rotation button clicked', async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();
    render(<PropertiesPanel {...defaultProps} object={makeObject()} onUpdate={onUpdate} />);
    await user.click(screen.getByText('90°'));
    expect(onUpdate).toHaveBeenCalledWith({ rotation: 90 });
  });

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<PropertiesPanel {...defaultProps} object={makeObject()} onDelete={onDelete} />);
    await user.click(screen.getByText(/Delete/));
    expect(onDelete).toHaveBeenCalled();
  });

  it('calls onDeselect when ✕ clicked', async () => {
    const onDeselect = vi.fn();
    const user = userEvent.setup();
    render(<PropertiesPanel {...defaultProps} object={makeObject()} onDeselect={onDeselect} />);
    await user.click(screen.getByText('✕'));
    expect(onDeselect).toHaveBeenCalled();
  });

  it('does NOT call onUpdate on every keystroke (commits on blur)', async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();
    render(<PropertiesPanel {...defaultProps} object={makeObject()} onUpdate={onUpdate} />);
    const widthInput = screen.getByDisplayValue('1.4');
    await user.clear(widthInput);
    await user.type(widthInput, '2.0');
    // Not blurred yet — should not have called onUpdate
    expect(onUpdate).not.toHaveBeenCalled();
    fireEvent.blur(widthInput);
    expect(onUpdate).toHaveBeenCalledWith({ width: 2 });
  });

  it('reverts invalid input on blur', async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();
    render(<PropertiesPanel {...defaultProps} object={makeObject()} onUpdate={onUpdate} />);
    const widthInput = screen.getByDisplayValue('1.4');
    await user.clear(widthInput);
    await user.type(widthInput, 'abc');
    fireEvent.blur(widthInput);
    expect(onUpdate).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue('1.4')).toBeInTheDocument();
  });

  it('shows adjacent room section for door near wall', () => {
    const door = makeObject({ type: 'door', x: 2, y: 0, width: 0.9, height: 0.15 });
    render(<PropertiesPanel {...defaultProps} object={door} />);
    expect(screen.getByText(/Room/)).toBeInTheDocument();
  });

  it('shows radar origin info for radar type', () => {
    const radar = makeObject({ type: 'radar', x: 0.5, y: 0.5, width: 0.08, height: 0.08 });
    render(<PropertiesPanel {...defaultProps} object={radar} />);
    expect(screen.getByText(/Radar Origin/i)).toBeInTheDocument();
  });
});
