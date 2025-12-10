// file: src/datagrid/context/actions/createActionSlice.ts

import { useState, useMemo } from 'react';

import type { ActionMode, Identifiable } from '@contracts';
import type { ActionState } from './ActionState';
import type { ActionController } from './ActionController';

/**
 * Factory creating the Action slice for the DataGrid.
 *
 * Provides:
 * - Serializable action state (`mode`, `payload`)
 * - Controller functions to mutate the action
 * - Derived boolean helpers for UI
 *
 * This slice is self-contained and can be mounted inside
 * the DataGridProvider or independently for testing.
 *
 * @template T - Row type extending `Identifiable`.
 */
export function createActionSlice<T extends Identifiable>() {
  /**
   * Pure action state.
   */
  const [state, setState] = useState<ActionState<T>>({
    mode: 'idle',
    payload: null,
  });

  /**
   * Behavior controlling the action state.
   * Includes computed flags.
   */
  const controller: ActionController<T> = useMemo(
    () => ({
      set: (mode: ActionMode, payload?: T | T[] | null) => {
        setState({ mode, payload: payload ?? null });
      },

      reset: () => {
        setState({ mode: 'idle', payload: null });
      },

      is: {
        create: state.mode === 'create',
        update: state.mode === 'update',
        delete: state.mode === 'delete',
        import: state.mode === 'import',
        reload: state.mode === 'reload',
        idle: state.mode === 'idle',
      },
    }),
    [state.mode, state.payload]
  );

  return {
    /** Action state */
    state,

    /** State controller and derived helpers */
    controller,
  };
}
