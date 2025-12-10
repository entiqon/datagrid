// file: src/DataGridTypes.ts

/**
 * Minimal contract for rows managed by the DataGrid.
 *
 * Any record rendered in the grid must provide a stable `id` that can be used
 * for selection, updates, and deletes.
 */
export interface Identifiable {
  id: string | number;
}
