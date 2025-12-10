// file: src/components/datagrid/context/focus/createFocusSlice.ts

import { useState, useMemo } from 'react';
import type { Identifiable } from '@contracts';
import type { FocusState } from './FocusState';
import type { FocusController } from './FocusController';

/**
 * Factory creating the Focus slice for the DataGrid.
 *
 * Manages the focused row independent of selection or action state.
 *
 * @template T - Row type extending `Identifiable`.
 */
export function createFocusSlice<T extends Identifiable>() {
  const [row, setRow] = useState<T | null>(null);

  const state: FocusState<T> = { row };

  const controller: FocusController<T> = useMemo(() => {
    return {
      set: (newRow: T | null) => setRow(newRow),
      has: row !== null,
    };
  }, [row]);

  return { state, controller };
}
