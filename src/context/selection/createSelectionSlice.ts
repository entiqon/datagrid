// file: src/components/datagrid/context/selection/createSelectionSlice.ts

import { useState, useMemo } from 'react';
import type { Identifiable } from '@contracts';
import type { SelectionState } from './SelectionState';
import type { SelectionController } from './SelectionController';

/**
 * Factory creating the Selection slice for the DataGrid.
 *
 * Manages selected row identifiers and exposes behavior
 * for multi-select workflows.
 *
 * @template T - Row type extending `Identifiable`.
 */
export function createSelectionSlice<T extends Identifiable>() {
  const [ids, setIds] = useState<Array<T['id']>>([]);

  const state: SelectionState<T> = { ids };

  const controller: SelectionController<T> = useMemo(() => {
    const toggle = (id: T['id']) => {
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    const clear = () => setIds([]);

    const isSelected = (id: T['id']) => ids.includes(id);

    const set = (newIds: Array<T['id']>) => setIds(newIds);

    const selectAll = (rows: T[]) => {
      setIds(rows.map((r) => r.id));
    };

    return {
      toggle,
      clear,
      isSelected,
      set,
      selectAll,
      count: ids.length,
      isEmpty: ids.length === 0,
      hasSelection: ids.length > 0,
    };
  }, [ids]);

  return { state, controller };
}
