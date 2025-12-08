// file: src/context/index.tsx

'use client';

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

export type Mode = 'create' | 'update' | 'delete' | 'import' | 'reload' | null;

export interface Identifiable {
  id: string | number;
}

export interface Pagination {
  skip: number;
  take: number;
  totalRows: number;
  setSkip: (n: number) => void;
  setTake: (n: number) => void;
  setTotalRows: (n: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export interface DataGridContextType<D extends Identifiable> {
  data: D[];
  setData: (rows: D[]) => void;

  currentRow: D | null;
  setCurrentRow: (row: D | null) => void;

  selectedRows: D[];
  setSelectedRows: (rows: D[]) => void;

  mode: Mode;
  setMode: (mode: Mode) => void;

  pagination: Pagination;
}

const DataGridContext = createContext<DataGridContextType<any> | undefined>(undefined);
DataGridContext.displayName = 'DataGridContext';

export interface DataGridProviderProps<D extends Identifiable> {
  children: ReactNode;
  initialData?: D[];
  initialTake?: number;
  initialTotalRows?: number;
}

/**
 * Standalone reusable provider.
 * Each DataTable gets isolation by placing its own provider.
 */
export function DataGridProvider<D extends Identifiable>({
                                                            children,
                                                            initialData = [],
                                                            initialTake = 10,
                                                            initialTotalRows = 0,
                                                          }: DataGridProviderProps<D>) {
  const [data, setData] = useState<D[]>(initialData);
  const [mode, setMode] = useState<Mode>(null);
  const [currentRow, setCurrentRow] = useState<D | null>(null);
  const [selectedRows, setSelectedRows] = useState<D[]>([]);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(initialTake);
  const [totalRows, setTotalRows] = useState(initialTotalRows);

  const nextPage = useCallback(() => {
    setSkip((prev) => Math.min(prev + take, Math.max(0, totalRows - take)));
  }, [take, totalRows]);

  const prevPage = useCallback(() => {
    setSkip((prev) => Math.max(0, prev - take));
  }, [take]);

  const reset = useCallback(() => {
    setSkip(0);
    setTotalRows(0);
  }, []);

  const pagination = useMemo<Pagination>(
    () => ({
      skip,
      take,
      totalRows,
      setSkip,
      setTake,
      setTotalRows,
      nextPage,
      prevPage,
      reset,
    }),
    [skip, take, totalRows, nextPage, prevPage, reset]
  );

  const value: DataGridContextType<D> = {
    data,
    setData,
    mode,
    setMode,
    currentRow,
    setCurrentRow,
    selectedRows,
    setSelectedRows,
    pagination,
  };

  return <DataGridContext.Provider value={value}>{children}</DataGridContext.Provider>;
}

export function useDataGrid<D extends Identifiable>() {
  const ctx = useContext(DataGridContext);
  if (!ctx) throw new Error('useDataGrid must be used within DataGridProvider');
  return ctx as DataGridContextType<D>;
}

export function useMode() {
  const { mode, setMode } = useDataGrid<any>();

  return {
    mode,
    setMode,
    isCreate: mode === 'create',
    isUpdate: mode === 'update',
    isDelete: mode === 'delete',
    isImport: mode === 'import',
    isReload: mode === 'reload',
    isIdle: mode === null,
  };
}

export function usePagination() {
  const { pagination } = useDataGrid<any>();
  return pagination;
}

export function isCurrent<D extends Identifiable>(a: D | null, b: D | null) {
  return !!a && !!b && a.id === b.id;
}
