import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createPaginationSlice } from './createPaginationSlice';

function usePaginationSlice() {
  return createPaginationSlice();
}

describe('Pagination Slice – Hybrid (1-based API, 0-based math)', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => usePaginationSlice());

    expect(result.current.state.skip).toBe(0);
    expect(result.current.controller.page).toBe(1); // public API
    expect(result.current.controller.pages).toBe(1);
    expect(result.current.controller.hasPrev).toBe(false);
    expect(result.current.controller.hasNext).toBe(false);
  });

  it('setSkip works and updates page', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => result.current.controller.setTake(10));
    act(() => result.current.controller.setTotalRows(100));

    act(() => result.current.controller.setSkip(20));
    expect(result.current.controller.page).toBe(3); // skip=20, take=10 → pageIndex=2 → page=3
  });

  it('setTake recalculates pages', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => result.current.controller.setTotalRows(100));
    act(() => result.current.controller.setTake(25));

    expect(result.current.controller.pages).toBe(4);
  });

  it('next() moves forward but not past last page', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setTake(10);
      result.current.controller.setTotalRows(30); // pages=3
    });

    act(() => result.current.controller.next());
    expect(result.current.controller.page).toBe(2);

    act(() => result.current.controller.next());
    expect(result.current.controller.page).toBe(3);

    // cannot exceed last page
    act(() => result.current.controller.next());
    expect(result.current.controller.page).toBe(3);
  });

  it('prev() moves backward but not before page 1', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setTake(10);
      result.current.controller.setTotalRows(30);
      result.current.controller.next(); // now on page 2
    });

    act(() => result.current.controller.prev());
    expect(result.current.controller.page).toBe(1);

    act(() => result.current.controller.prev());
    expect(result.current.controller.page).toBe(1); // cannot go lower
  });

  it('first() returns to page 1 regardless of page', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setTotalRows(100);
      result.current.controller.next();
    });

    act(() => result.current.controller.first());
    expect(result.current.controller.page).toBe(1);
    expect(result.current.state.skip).toBe(0);
  });

  it('last() jumps to the final page correctly', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setTake(10);
      result.current.controller.setTotalRows(95); // pages=10
    });

    act(() => result.current.controller.last());
    expect(result.current.controller.page).toBe(10);
  });

  it('jump() moves to a specific 1-based page', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setTake(10);
      result.current.controller.setTotalRows(100); // pages=10
    });

    act(() => result.current.controller.jump(5));
    expect(result.current.controller.page).toBe(5);
  });

  it('jump(<1) clamps to first()', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => result.current.controller.jump(0));
    expect(result.current.controller.page).toBe(1);
  });

  it('jump(>pages) clamps to last()', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setTake(10);
      result.current.controller.setTotalRows(34); // pages=4
    });

    act(() => result.current.controller.jump(99));
    expect(result.current.controller.page).toBe(4);
  });

  it('reset() restores initial state', () => {
    const { result } = renderHook(() => usePaginationSlice());

    act(() => {
      result.current.controller.setSkip(40);
      result.current.controller.setTotalRows(200);
    });

    act(() => result.current.controller.reset());

    expect(result.current.state.skip).toBe(0);
    expect(result.current.state.totalRows).toBe(0);
    expect(result.current.controller.page).toBe(1);
    expect(result.current.controller.pages).toBe(1);
  });

  it('jump() to current page does nothing', () => {
    const { result } = renderHook(() => createPaginationSlice());
    const { controller } = result.current;

    act(() => controller.jump(1)); // same page
    expect(controller.page).toBe(1);
  });
});
