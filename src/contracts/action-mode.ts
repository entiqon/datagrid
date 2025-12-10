/**
 * Describes the current user-initiated action within the DataGrid.
 *
 * "idle" replaces the old `null` state so that `ActionMode` is a purely
 * string-based union, which improves type safety and avoids nullable checks.
 */
export type ActionMode = 'idle' | 'create' | 'update' | 'delete' | 'import' | 'reload';
