/*
 * Entiqon Labs
 * Copyright(c) 2017 Entiqon Labs
 * www.entiqon.dev/datagrid
 * MIT Licensed
 */

// file: src/index.ts

// DataGrid component
import DataGrid from './DataGrid';

export default DataGrid;

// components
export { default as DataGridView } from './DataGridView';

// Provider
export { DataGridProvider } from './context/DataGridProvider';

// Core hooks
export { useDataGrid } from './hooks/useDataGrid';
export { useGridEvents } from './hooks/useGridEvents';
export { usePagination } from './hooks/usePagination';

// Core types
export type {
  Identifiable,
  ActionMode,
  DataGridMode,
  Pagination,
  DataGridContextType,
} from './context/DataGridState';

// Low-level helpers
export * from './context/DataGridActions';
