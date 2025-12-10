// file: src/hooks/useGridMode.ts

'use client';

import { useDataGrid } from './useDataGrid';

/**
 * Access the DataGrid operating mode (client/server).
 */
export function useGridMode() {
  return useDataGrid().mode;
}
