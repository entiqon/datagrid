// file: src/datagrid/context/actions/ActionState.ts

import type { ActionMode, Identifiable } from '@contracts';

/**
 * Pure state describing the active DataGrid action.
 *
 * @template T - Row type extending `Identifiable`.
 *
 * This state is serializable and contains:
 * - the current action mode (create, update, delete, etc.)
 * - the contextual payload for that action (single or multiple rows)
 */
export interface ActionState<T extends Identifiable> {
  /**
   * Current action mode.
   */
  mode: ActionMode;

  /**
   * Contextual payload.
   * - Single row for update/delete
   * - Multiple rows for bulk delete/edit
   * - `null` when no payload exists
   */
  payload: T | T[] | null;
}
