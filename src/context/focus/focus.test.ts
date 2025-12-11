import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createFocusSlice } from './createFocusSlice';

type Row = { id: string; value?: string };

function useFocusSlice() {
  return renderHook(() => createFocusSlice<Row>());
}

describe('Focus Slice (React State)', () => {
  it('initializes with no focused row', () => {
    const { result } = useFocusSlice();

    expect(result.current.state.row).toBeNull();
    expect(result.current.controller.has).toBe(false);
  });

  it('set() assigns a focused row', () => {
    const { result } = useFocusSlice();
    const row = { id: '1', value: 'A' };

    act(() => {
      result.current.controller.set(row);
    });

    expect(result.current.state.row).toEqual(row);
    expect(result.current.controller.has).toBe(true);
  });

  it('set(null) clears focused row', () => {
    const { result } = useFocusSlice();

    act(() => result.current.controller.set({ id: '1' }));
    expect(result.current.controller.has).toBe(true);

    act(() => result.current.controller.set(null));
    expect(result.current.state.row).toBeNull();
    expect(result.current.controller.has).toBe(false);
  });

  it('has reflects correct boolean after each update', () => {
    const { result } = useFocusSlice();

    // start null
    expect(result.current.controller.has).toBe(false);

    // set row
    act(() => result.current.controller.set({ id: 'x' }));
    expect(result.current.controller.has).toBe(true);

    // clear row
    act(() => result.current.controller.set(null));
    expect(result.current.controller.has).toBe(false);
  });
});
