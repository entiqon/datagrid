import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createActionSlice } from './createActionSlice';

// A test wrapper that executes the hook in real React
function useTestSlice() {
  return createActionSlice();
}

describe('Action Slice (React State)', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => useTestSlice());
    expect(result.current.state.mode).toBe('idle');
  });

  it('updates mode correctly', () => {
    const { result } = renderHook(() => useTestSlice());

    act(() => {
      result.current.controller.set('create');
    });

    expect(result.current.state.mode).toBe('create');
  });
});
