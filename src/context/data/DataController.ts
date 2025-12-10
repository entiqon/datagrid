// file: src/components/datagrid/context/data/DataController.ts

import type { Identifiable } from '@contracts';

/**
 * Behavior-only controller for DataGrid row management.
 *
 * Provides mutation utilities for setting or updating rows.
 */
export interface DataController<T extends Identifiable> {
  /** Replace all rows */
  set: (rows: T[]) => void;

  /** Update a single row by ID */
  update: (row: T) => void;

  /** Remove a single row by ID */
  remove: (id: T['id']) => void;

  /** Append new rows (merge) */
  append: (rows: T[]) => void;
}
