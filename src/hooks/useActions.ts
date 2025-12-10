// file: src/hooks/useActions.ts

'use client';

import { useDataGrid } from './useDataGrid';
import type { Identifiable } from '@contracts';

/**
 * Access DataGrid action mode state & controller.
 *
 * @returns Actions API (mode, payload, set, reset, etc.)
 */
export function useActions<T extends Identifiable>() {
  return useDataGrid<T>().actions;
}
