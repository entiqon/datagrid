import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createSelectionSlice } from './createSelectionSlice';

type Row = { id: string; name?: string };

function useSelectionSlice() {
  return createSelectionSlice<Row>();
}

describe('Selection Slice (React State, ID-based)', () => {
  it('initializes with empty selection', () => {
    const { result } = renderHook(() => useSelectionSlice());

    expect(result.current.state.ids).toEqual([]);
    expect(result.current.controller.count).toBe(0);
    expect(result.current.controller.isEmpty).toBe(true);
    expect(result.current.controller.hasSelection).toBe(false);
  });

  it('select() adds an id and ignores duplicates', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => {
      result.current.controller.select('a');
      result.current.controller.select('a');
    });

    expect(result.current.state.ids).toEqual(['a']);
    expect(result.current.controller.isSelected('a')).toBe(true);
    expect(result.current.controller.count).toBe(1);
  });

  it('deselect() removes an id if present', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => {
      result.current.controller.select('a');
      result.current.controller.deselect('a');
    });

    expect(result.current.state.ids).toEqual([]);
    expect(result.current.controller.isSelected('a')).toBe(false);
    expect(result.current.controller.count).toBe(0);
  });

  it('toggle() toggles selection correctly', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => result.current.controller.toggle('x'));
    expect(result.current.controller.isSelected('x')).toBe(true);
    expect(result.current.controller.count).toBe(1);

    act(() => result.current.controller.toggle('x'));
    expect(result.current.controller.isSelected('x')).toBe(false);
    expect(result.current.controller.count).toBe(0);
  });

  it('set() replaces the selection and de-duplicates ids', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => {
      result.current.controller.set(['a', 'b', 'a']);
    });

    expect(result.current.state.ids).toEqual(['a', 'b']);
    expect(result.current.controller.count).toBe(2);

    act(() => {
      result.current.controller.set(['z']);
    });

    expect(result.current.state.ids).toEqual(['z']);
    expect(result.current.controller.count).toBe(1);
  });

  it('selectMany() merges ids with existing selection', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => {
      result.current.controller.set(['a']);
      result.current.controller.selectMany(['a', 'b', 'c']);
    });

    expect(result.current.state.ids).toEqual(['a', 'b', 'c']);
    expect(result.current.controller.count).toBe(3);
  });

  it('deselectMany() removes multiple ids at once', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => {
      result.current.controller.set(['a', 'b', 'c', 'd']);
      result.current.controller.deselectMany(['b', 'd', 'x']);
    });

    expect(result.current.state.ids).toEqual(['a', 'c']);
    expect(result.current.controller.count).toBe(2);
  });

  it('selectAll() replaces the selection with given ids (deduped)', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => {
      result.current.controller.select('old');
      result.current.controller.selectAll(['1', '2', '2']);
    });

    expect(result.current.state.ids).toEqual(['1', '2']);
    expect(result.current.controller.count).toBe(2);
  });

  it('clear() resets selection and derived flags', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => result.current.controller.set(['a', 'b']));
    expect(result.current.controller.isEmpty).toBe(false);
    expect(result.current.controller.hasSelection).toBe(true);

    act(() => result.current.controller.clear());

    expect(result.current.state.ids).toEqual([]);
    expect(result.current.controller.isEmpty).toBe(true);
    expect(result.current.controller.hasSelection).toBe(false);
  });

  it('isSelected() works for selected and non-selected ids', () => {
    const { result } = renderHook(() => useSelectionSlice());

    act(() => result.current.controller.set(['foo']));

    expect(result.current.controller.isSelected('foo')).toBe(true);
    expect(result.current.controller.isSelected('bar')).toBe(false);
  });

  it('selectMany([]) does nothing', () => {
    const { result } = renderHook(() => createSelectionSlice());
    act(() => result.current.controller.selectMany([]));
    expect(result.current.state.ids).toEqual([]);
  });

  it('deselectMany([]) does nothing', () => {
    const { result } = renderHook(() => createSelectionSlice());
    act(() => result.current.controller.deselectMany([]));
    expect(result.current.state.ids).toEqual([]);
  });

  it('selectAll([]) clears selection', () => {
    const { result } = renderHook(() => createSelectionSlice());
    act(() => result.current.controller.set(['a', 'b']));
    act(() => result.current.controller.selectAll([]));
    expect(result.current.state.ids).toEqual([]);
  });
});
