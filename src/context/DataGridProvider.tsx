// file: src/context/DataGridProvider.tsx

'use client';

import { ReactNode } from 'react';
import type { Identifiable, DataGridMode } from '@contracts';

import { DataGridContext, type DataGridContextValue } from './DataGridContext';

// slice factories
import { createActionSlice } from './actions';
import { createPaginationSlice } from './pagination';
import { createSelectionSlice } from './selection';
import { createFocusSlice } from './focus';
import { createDataSlice } from './data';

export interface DataGridProviderProps<T extends Identifiable> {
  children: ReactNode;
  initialRows?: T[];
  mode?: DataGridMode;
}

/**
 * Low-level provider that wires all DataGrid slices into a single context.
 *
 * This component is intended to be used internally by the high-level
 * <DataGrid /> wrapper, not directly by consumers.
 */
export function DataGridProvider<T extends Identifiable>({
  children,
  initialRows = [],
  mode = 'client',
}: DataGridProviderProps<T>) {
  const dataSlice = createDataSlice<T>(initialRows);
  const actionSlice = createActionSlice<T>();
  const paginationSlice = createPaginationSlice();
  const selectionSlice = createSelectionSlice<T>();
  const focusSlice = createFocusSlice<T>();

  const value: DataGridContextValue<T> = {
    data: { ...dataSlice.state, ...dataSlice.controller },
    actions: { ...actionSlice.state, ...actionSlice.controller },
    pagination: { ...paginationSlice.state, ...paginationSlice.controller },
    selection: { ...selectionSlice.state, ...selectionSlice.controller },
    focus: { ...focusSlice.state, ...focusSlice.controller },
    mode,
  };

  return <DataGridContext.Provider value={value}>{children}</DataGridContext.Provider>;
}
