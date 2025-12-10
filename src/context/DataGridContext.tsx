// file: src/context/DataGridContext.tsx

'use client';

import { createContext } from 'react';
import type { Identifiable, DataGridMode } from '@contracts';

// Slice types
import type { ActionState, ActionController } from './actions';
import type { PaginationState, PaginationController } from './pagination';
import type { SelectionState, SelectionController } from './selection';
import type { FocusState, FocusController } from './focus';
import type { DataState, DataController } from './data';

/**
 * Combined API for the Actions slice.
 *
 * Includes both the serialized state (mode, payload)
 * and controller methods (set, reset, is).
 */
export interface ActionsApi<T extends Identifiable>
  extends ActionState<T>,
    ActionController<T> {}

/**
 * Combined API for the Pagination slice.
 *
 * Exposes pagination state (skip, take, totalRows)
 * along with utilities to navigate pages (next, prev, first, last, jump).
 */
export interface PaginationApi extends PaginationState, PaginationController {}

/**
 * Combined API for the Selection slice.
 *
 * Includes the list of selected IDs and helpers such as toggle,
 * selectAll, clear, and derived helpers (count, isEmpty, hasSelection).
 */
export interface SelectionApi<T extends Identifiable>
  extends SelectionState<T>,
    SelectionController<T> {}

/**
 * Combined API for the Focus slice.
 *
 * Exposes the currently focused row and helper flags.
 */
export interface FocusApi<T extends Identifiable>
  extends FocusState<T>,
    FocusController<T> {}

/**
 * Combined API for the Data slice.
 *
 * Includes the row list and methods for updating, removing,
 * or appending new rows.
 */
export interface DataApi<T extends Identifiable>
  extends DataState<T>,
    DataController<T> {}

/**
 * The full DataGrid context value composed of all slices.
 *
 * Each domain (actions, pagination, selection, focus, data)
 * merges its state and controller into a single flattened API.
 *
 * @template T - Row type extending `Identifiable`.
 */
export interface DataGridContextValue<T extends Identifiable> {
  /** CRUD-like row manipulation and collection helpers */
  data: DataApi<T>;

  /** User-driven actions such as create, update, delete, etc. */
  actions: ActionsApi<T>;

  /** Pagination state & controller for page navigation */
  pagination: PaginationApi;

  /** Selection state & controller for multi-row workflows */
  selection: SelectionApi<T>;

  /** Focus state & controller used by keyboard/navigation logic */
  focus: FocusApi<T>;

  /** The operating mode of the DataGrid (client or server) */
  mode: DataGridMode;
}

/**
 * Internal React context instance for the DataGrid.
 *
 * This context is populated by `<DataGridProvider>` and consumed
 * via the `useDataGrid` hook (and slice-specific hooks).
 *
 * Consumers should never interact with this context directly.
 */
export const DataGridContext = createContext<DataGridContextValue<any> | null>(null);
