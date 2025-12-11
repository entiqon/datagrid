/**
 * @file: src/components/datagrid/context/selection/createSelectionSlice.ts
 */

import { useState, useMemo } from 'react';
import type { Identifiable } from '@contracts';
import type { SelectionState } from './SelectionState';
import type { SelectionController } from './SelectionController';

/**
 * Factory creating the Selection slice for the DataGrid.
 *
 * Manages selected row identifiers and exposes behavior
 * for multi-select workflows. Everything is ID-based.
 *
 * @template T - Row type extending `Identifiable`.
 */
export function createSelectionSlice<T extends Identifiable>() {
  const [ids, setIds] = useState<Array<T['id']>>([]);

  const state: SelectionState<T> = { ids };

  const controller: SelectionController<T> = useMemo(() => {
    const select = (id: T['id']) => {
      setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    const deselect = (id: T['id']) => {
      setIds((prev) => prev.filter((x) => x !== id));
    };

    const toggle = (id: T['id']) => {
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    const clear = () => setIds([]);

    const set = (newIds: Array<T['id']>) => {
      const unique = Array.from(new Set(newIds));
      setIds(unique);
    };

    const selectMany = (newIds: Array<T['id']>) => {
      if (!newIds.length) return;
      setIds((prev) => {
        const merged = new Set<T['id']>(prev);
        for (const id of newIds) merged.add(id);
        return Array.from(merged);
      });
    };

    const deselectMany = (removeIds: Array<T['id']>) => {
      if (!removeIds.length) return;
      setIds((prev) => prev.filter((id) => !removeIds.includes(id)));
    };

    const selectAll = (allIds: Array<T['id']>) => {
      const unique = Array.from(new Set(allIds));
      setIds(unique);
    };

    const isSelected = (id: T['id']) => ids.includes(id);

    const count = ids.length;
    const isEmpty = count === 0;
    const hasSelection = count > 0;

    return {
      select,
      deselect,
      toggle,
      clear,
      set,
      selectMany,
      deselectMany,
      selectAll,
      isSelected,
      count,
      isEmpty,
      hasSelection,
    };
  }, [ids]);

  return { state, controller };
}
