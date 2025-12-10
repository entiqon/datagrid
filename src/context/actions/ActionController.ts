// file: src/datagrid/context/actions/ActionController.ts

import type { ActionMode, Identifiable } from '@contracts';

/**
 * Behavior-only controller for DataGrid actions.
 *
 * Exposes methods to mutate the action state and derive useful flags.
 *
 * @template T - Row type extending `Identifiable`.
 */
export interface ActionController<T extends Identifiable> {
  /**
   * Set the active action mode and optional payload.
   *
   * @param mode - New action mode.
   * @param payload - Optional contextual row(s).
   */
  set: (mode: ActionMode, payload?: T | T[] | null) => void;

  /**
   * Reset action mode to "idle" and clear the payload.
   */
  reset: () => void;

  /**
   * Convenience booleans for UI rendering.
   */
  is: {
    /** `true` if mode === "create" */
    create: boolean;

    /** `true` if mode === "update" */
    update: boolean;

    /** `true` if mode === "delete" */
    delete: boolean;

    /** `true` if mode === "import" */
    import: boolean;

    /** `true` if mode === "reload" */
    reload: boolean;

    /** `true` if mode === "idle" */
    idle: boolean;
  };
}
