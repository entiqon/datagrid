// file: src/components/datagrid/context/data/createDataSlice.ts

import { useState, useMemo } from 'react';
import type { Identifiable } from '@contracts';
import type { DataState } from './DataState';
import type { DataController } from './DataController';

/**
 * Factory creating the Data slice for the DataGrid.
 *
 * Manages the collection of row objects, with basic
 * CRUD-like operations used by DataGrid actions.
 *
 * @template T - Row type extending `Identifiable`.
 */
export function createDataSlice<T extends Identifiable>(initialRows: T[] = []) {
  const [rows, setRows] = useState<T[]>(initialRows);

  const state: DataState<T> = { rows };

  const controller: DataController<T> = useMemo(() => {
    const set = (newRows: T[]) => setRows(newRows);

    const update = (newRow: T) => {
      setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
    };

    const remove = (id: T['id']) => {
      setRows((prev) => prev.filter((r) => r.id !== id));
    };

    const append = (newRows: T[]) => {
      setRows((prev) => [...prev, ...newRows]);
    };

    return { set, update, remove, append };
  }, []);

  return { state, controller };
}
