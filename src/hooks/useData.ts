// file: src/hooks/useData.ts

'use client';

import { useDataGrid } from './useDataGrid';
import type { Identifiable } from '@contracts';

/**
 * Access DataGrid row manipulation API.
 *
 * Provides:
 * - rows: T[]
 * - set(rows)
 * - update(row)
 * - remove(id)
 * - append(rows)
 */
export function useData<T extends Identifiable>() {
  return useDataGrid<T>().data;
}
