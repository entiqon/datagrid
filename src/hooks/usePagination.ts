// file: src/hooks/usePagination.ts

'use client';

import { useDataGrid } from './useDataGrid';

/**
 * Access DataGrid pagination state & controller.
 *
 * @returns Pagination API (skip, take, page, pages, next, prev, etc.)
 */
export function usePagination() {
  return useDataGrid().pagination;
}
