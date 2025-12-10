// file: src/hooks/useFocus.ts

'use client';

import { useDataGrid } from './useDataGrid';
import type { Identifiable } from '@contracts';

/**
 * Access DataGrid focus state & controller.
 *
 * Focus is independent of selection and is used by
 * keyboard navigation and row-level interactions.
 */
export function useFocus<T extends Identifiable>() {
  return useDataGrid<T>().focus;
}
