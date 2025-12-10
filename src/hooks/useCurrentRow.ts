// file: src/hooks/useCurrentRow.ts

'use client';

import { useFocus } from './useFocus';
import type { Identifiable } from '@contracts';

/**
 * Returns the currently focused row.
 *
 * This is a convenience selector that extracts `focus.row`
 * from the DataGrid state.
 *
 * @example
 * const row = useCurrentRow();
 * if (row) {
 *   console.log("Currently focused:", row.id);
 * }
 */
export function useCurrentRow<T extends Identifiable>() {
  const focus = useFocus<T>();
  return focus.row;
}
