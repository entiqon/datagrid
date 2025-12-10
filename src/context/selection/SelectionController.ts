// file: src/components/datagrid/context/selection/SelectionController.ts

import type { Identifiable } from '@contracts';

/**
 * Behavior-only controller for DataGrid row selection.
 *
 * Provides mutation utilities and derived helpers for UI.
 */
export interface SelectionController<T extends Identifiable> {
  /** Toggle selection of a row */
  toggle: (id: T['id']) => void;

  /** Select a specific set of IDs */
  set: (ids: Array<T['id']>) => void;

  /** Clear all selected rows */
  clear: () => void;

  /** Check if a row is selected */
  isSelected: (id: T['id']) => boolean;

  /** Select all rows from the provided list */
  selectAll: (rows: T[]) => void;

  /** Number of selected rows */
  count: number;

  /** True if no rows are selected */
  isEmpty: boolean;

  /** True if at least one row is selected */
  hasSelection: boolean;
}
