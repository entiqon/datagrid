import { useDataGrid } from './useDataGrid';

export function usePagination() {
  return useDataGrid<any>().pagination;
}
