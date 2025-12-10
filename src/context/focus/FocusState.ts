// file: src/components/datagrid/context/focus/FocusState.ts

import type { Identifiable } from '@contracts';

/**
 * Pure focus state for the DataGrid.
 *
 * Represents the row that is currently in focus
 * (e.g., clicked, navigated, highlighted).
 */
export interface FocusState<T extends Identifiable> {
  /** The focused row, or null when none is focused. */
  row: T | null;
}
