// file: src/hooks/useDataGrid.ts

'use client';

import { useContext } from 'react';
import { DataGridContext, type DataGridContextValue } from '@context';
import type { Identifiable } from '@contracts';

/**
 * Root hook to access the DataGrid context value.
 *
 * All higher-level hooks (usePagination, useActions, etc.)
 * should be built on top of this hook.
 */
export function useDataGrid<T extends Identifiable>() {
  const ctx = useContext(DataGridContext);

  if (!ctx) {
    throw new Error('useDataGrid must be used inside <DataGridProvider>');
  }

  return ctx as DataGridContextValue<T>;
}
