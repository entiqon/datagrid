// file: src/components/datagrid/context/selection/SelectionState.ts

import type { Identifiable } from '@contracts';

/**
 * Pure selection state for the DataGrid.
 *
 * Holds the list of selected row identifiers.
 */
export interface SelectionState<T extends Identifiable> {
  /** Selected row identifiers */
  ids: Array<T['id']>;
}
