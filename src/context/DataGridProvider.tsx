// file: src/context/DataGridProvider.tsx

'use client';

import { ReactNode, useState, useMemo } from 'react';
import { DataGridContext } from './DataGridContext';
import type {
  Identifiable,
  ActionMode,
  DataGridMode,
  Pagination,
  DataGridContextType,
} from './DataGridState';
import { createPaginationActions } from './DataGridActions';

export interface DataGridProviderProps<T extends Identifiable> {
  children: ReactNode;
  initialData?: T[];
  initialTake?: number;
  initialTotalRows?: number;
  mode?: DataGridMode;
}

export function DataGridProvider<T extends Identifiable>({
  children,
  initialData = [],
  initialTake = 10,
  initialTotalRows = 0,
  mode,
}: DataGridProviderProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [currentRow, setCurrentRow] = useState<T | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [actionMode, setActionMode] = useState<ActionMode>(null);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(initialTake);
  const [totalRows, setTotalRows] = useState(initialTotalRows);

  const pagination: Pagination = useMemo(
    () => createPaginationActions(skip, take, totalRows, setSkip, setTake, setTotalRows),
    [skip, take, totalRows]
  );

  const inferredMode: DataGridMode =
    mode ?? (initialTotalRows > initialData.length ? 'server' : 'client');

  const value: DataGridContextType<T> = {
    mode: inferredMode,
    data,
    setData,
    currentRow,
    setCurrentRow,
    selectedRows,
    setSelectedRows,
    actionMode,
    setActionMode,
    pagination,
  };

  return <DataGridContext.Provider value={value}>{children}</DataGridContext.Provider>;
}
