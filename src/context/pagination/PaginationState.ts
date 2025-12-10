// file: src/components/datagrid/context/pagination/PaginationState.ts

/**
 * Pure pagination state for the DataGrid.
 *
 * Represents the window of data currently visible in the grid.
 */
export interface PaginationState {
  /** Number of items skipped before the current page */
  skip: number;

  /** Number of items fetched per page */
  take: number;

  /** Total number of rows available on server/client */
  totalRows: number;
}
