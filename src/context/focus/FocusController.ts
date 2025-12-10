// file: src/components/datagrid/context/focus/FocusController.ts

import type { Identifiable } from '@contracts';

/**
 * Behavior-only controller for managing DataGrid focus.
 *
 * Provides methods to set and clear the focused row,
 * along with helpful derived flags for UI.
 */
export interface FocusController<T extends Identifiable> {
  /** Set the focused row */
  set: (row: T | null) => void;

  /** True when a row is currently focused */
  has: boolean;
}
