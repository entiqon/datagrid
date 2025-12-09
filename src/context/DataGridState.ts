// file: src/context/DataGridState.ts

// Rows must be identifiable for selection, editing, etc.
export interface Identifiable {
  id: string | number;
}

// Represents CRUD and non-CRUD actions
export type ActionMode = 'create' | 'update' | 'delete' | 'import' | 'reload' | null;

// Data loading / processing mode
export type DataGridMode = 'client' | 'server';

export interface Pagination {
  skip: number;
  take: number;
  totalRows: number;
  setSkip: (value: number) => void;
  setTake: (value: number) => void;
  setTotalRows: (value: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export interface DataGridContextType<T extends Identifiable> {
  mode: DataGridMode;

  data: T[];
  setData: (rows: T[]) => void;

  currentRow: T | null;
  setCurrentRow: (row: T | null) => void;

  selectedRows: T[];
  setSelectedRows: (rows: T[]) => void;

  actionMode: ActionMode;
  setActionMode: (mode: ActionMode) => void;

  pagination: Pagination;
}
