// file: src/hooks/useGridEvents.ts

import { useEffect } from 'react';
import type { Identifiable } from '../context/DataGridState';
import { useDataGrid } from './useDataGrid';

export interface DataGridEventsProps<T extends Identifiable> {
  onPageChange?: (page: number, pageSize: number) => void;
  onSortChange?: (sort: any) => void;
  onFilterChange?: (filters: any) => void;
}

export function useGridEvents<T extends Identifiable>({
  onPageChange,
  onSortChange,
  onFilterChange,
}: DataGridEventsProps<T>) {
  const grid = useDataGrid<T>();

  // Pagination event binding – only in server mode
  useEffect(() => {
    if (!onPageChange) return;
    if (grid.mode !== 'server') return;

    const { skip, take } = grid.pagination;
    const page = Math.floor(skip / take);

    onPageChange(page, take);
  }, [grid.mode, grid.pagination.skip, grid.pagination.take, onPageChange]);

  // Sorting & filtering will be implemented later using grid.mode as guard
  return undefined;
}
