// file: src/components/datagrid/context/pagination/PaginationController.ts

/**
 * Behavior-only controller for managing pagination state.
 *
 * Provides navigation methods and derived helpers for UI.
 */
export interface PaginationController {
  /** Set number of items to skip */
  setSkip: (n: number) => void;

  /** Set number of items to fetch per page */
  setTake: (n: number) => void;

  /** Set total available rows */
  setTotalRows: (n: number) => void;

  /** Advance to next page */
  next: () => void;

  /** Go back to previous page */
  prev: () => void;

  /** Jump to first page */
  first: () => void;

  /** Jump to last page */
  last: () => void;

  /**
   * Jump to a specific page number (1-based)
   * @param page - Page number to jump to.
   */
  jump: (page: number) => void;

  /** Reset pagination (skip = 0, totalRows = 0) */
  reset: () => void;

  /** Current page index (1-based) */
  page: number;

  /** Total number of pages available */
  pages: number;

  /** Whether next page exists */
  hasNext: boolean;

  /** Whether previous page exists */
  hasPrev: boolean;
}
