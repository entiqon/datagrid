/**
 * @file: src/components/datagrid/context/selection/SelectionController.ts
 */

import type { Identifiable } from '@contracts';

/**
 * Behavior-only controller for managing selected row identifiers.
 *
 * All operations are ID-based; rows are handled at a higher level
 * (e.g. DataGridView) and mapped to IDs before calling these methods.
 */
export interface SelectionController<T extends Identifiable> {
  /** Select a single ID (no-op if already selected) */
  select: (id: T['id']) => void;

  /** Deselect a single ID (no-op if not selected) */
  deselect: (id: T['id']) => void;

  /** Toggle selection state of a single ID */
  toggle: (id: T['id']) => void;

  /** Replace the entire selection with the given IDs */
  set: (ids: Array<T['id']>) => void;

  /** Add many IDs to the selection (merged, de-duplicated) */
  selectMany: (ids: Array<T['id']>) => void;

  /** Remove many IDs from the selection */
  deselectMany: (ids: Array<T['id']>) => void;

  /** Clear all selected IDs */
  clear: () => void;

  /** Convenience alias: replaces selection with provided IDs */
  selectAll: (ids: Array<T['id']>) => void;

  /** Check if a given ID is currently selected */
  isSelected: (id: T['id']) => boolean;

  /** Total number of selected IDs */
  count: number;

  /** True when no IDs are selected */
  isEmpty: boolean;

  /** True when at least one ID is selected */
  hasSelection: boolean;
}
