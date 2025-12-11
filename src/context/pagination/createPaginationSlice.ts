import { useState, useMemo } from 'react';
import type { PaginationState } from './PaginationState';
import type { PaginationController } from './PaginationController';

/**
 * Pagination slice for DataGrid.
 *
 * INTERNAL MODEL:
 *   - skip is 0-based
 *   - pageIndex = skip / take (0-based)
 *
 * PUBLIC API:
 *   - page is 1-based (pageIndex + 1)
 */
export function createPaginationSlice(initialTake = 10, initialTotalRows = 0) {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(initialTake);
  const [totalRows, setTotalRows] = useState(initialTotalRows);

  const state: PaginationState = { skip, take, totalRows };

  const controller = useMemo<PaginationController>(() => {
    const pageIndex = Math.floor(skip / take); // INTERNAL
    const page = pageIndex + 1; // PUBLIC 1-based
    const pages = Math.max(1, Math.ceil(totalRows / take));

    const next = () => {
      const newSkip = skip + take;
      if (newSkip < totalRows) setSkip(newSkip);
    };

    const prev = () => {
      const newSkip = skip - take;
      if (newSkip >= 0) setSkip(newSkip);
    };

    const first = () => setSkip(0);

    const last = () => {
      const remainder = totalRows % take;
      const lastSkip = remainder === 0 ? totalRows - take : totalRows - remainder;
      setSkip(Math.max(0, lastSkip));
    };

    const jump = (pageNumber: number) => {
      if (pageNumber <= 1) return first();
      if (pageNumber >= pages) return last();

      // convert 1-based → internal 0-based
      const targetSkip = (pageNumber - 1) * take;
      setSkip(targetSkip);
    };

    const reset = () => {
      setSkip(0);
      setTotalRows(0);
    };

    return {
      /** state setters */
      setSkip,
      setTake,
      setTotalRows,

      /** navigation */
      next,
      prev,
      first,
      last,
      jump,
      reset,

      /** derived public values */
      page, // 1-based
      pages,
      hasNext: pageIndex < pages - 1,
      hasPrev: pageIndex > 0,
    };
  }, [skip, take, totalRows]);

  return { state, controller };
}
