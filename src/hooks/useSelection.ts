// file: src/hooks/useSelection.ts

'use client';

import { useDataGrid } from './useDataGrid';
import type { Identifiable } from '@contracts';

/**
 * Access DataGrid selection state & controller.
 *
 * Supports toggling, clearing, selecting all, and inspecting
 * selected IDs or selection counts.
 */
export function useSelection<T extends Identifiable>() {
  return useDataGrid<T>().selection;
}
