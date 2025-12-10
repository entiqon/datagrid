// file: src/components/datagrid/context/data/DataState.ts

import type { Identifiable } from '@contracts';

/**
 * Pure data state for the DataGrid.
 *
 * Holds the list of rows currently displayed or paginated.
 */
export interface DataState<T extends Identifiable> {
  /** Array of row objects */
  rows: T[];
}
