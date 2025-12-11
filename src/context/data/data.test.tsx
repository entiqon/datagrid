import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createDataSlice } from './createDataSlice';

type Row = { id: string; value?: string };

function useDataSlice(initial: Row[] = []) {
  return renderHook(() => createDataSlice<Row>(initial));
}

describe('Data Slice (CRUD logic)', () => {
  it('initializes with provided rows', () => {
    const { result } = useDataSlice([{ id: '1' }]);
    expect(result.current.state.rows).toEqual([{ id: '1' }]);
  });

  it('set() replaces all rows', () => {
    const { result, rerender } = useDataSlice([]);
    act(() => result.current.controller.set([{ id: 'x' }]));
    expect(result.current.state.rows).toEqual([{ id: 'x' }]);
  });

  it('append() adds rows to the end', () => {
    const { result } = useDataSlice([{ id: '1' }]);

    act(() => result.current.controller.append([{ id: '2' }, { id: '3' }]));

    expect(result.current.state.rows).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);
  });

  it('update() updates an existing row', () => {
    const { result } = useDataSlice([{ id: '1', value: 'old' }]);

    act(() => {
      result.current.controller.update({ id: '1', value: 'new' });
    });

    expect(result.current.state.rows).toEqual([{ id: '1', value: 'new' }]);
  });

  it('update() does NOT add non-existing rows (covers false branch)', () => {
    const { result } = useDataSlice([{ id: '1', value: 'old' }]);

    act(() => {
      // id "999" does not exist → triggers false branch
      result.current.controller.update({ id: '999', value: 'x' });
    });

    // rows remain unchanged → false path covered
    expect(result.current.state.rows).toEqual([{ id: '1', value: 'old' }]);
  });

  it('remove() deletes a row when id matches', () => {
    const { result } = useDataSlice([{ id: '1' }, { id: '2' }]);

    act(() => result.current.controller.remove('1'));
    expect(result.current.state.rows).toEqual([{ id: '2' }]);
  });

  it("remove() does nothing when id doesn't exist", () => {
    const { result } = useDataSlice([{ id: '1' }]);

    act(() => result.current.controller.remove('999'));
    expect(result.current.state.rows).toEqual([{ id: '1' }]);
  });
});
