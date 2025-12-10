// file: src/components/datagrid/context/pagination/createPaginationSlice.ts

import { useState, useMemo } from 'react';
import type { PaginationState } from './PaginationState';
import type { PaginationController } from './PaginationController';

/**
 * Factory creating the Pagination slice for the DataGrid.
 *
 * Provides:
 * - Serializable pagination state (skip, take, totalRows)
 * - Controller methods for page navigation
 * - Derived helper properties for UI
 */
export function createPaginationSlice(initialTake = 10, initialTotalRows = 0) {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(initialTake);
  const [totalRows, setTotalRows] = useState(initialTotalRows);

  const state: PaginationState = { skip, take, totalRows };

  const controller: PaginationController = useMemo(() => {
    const pages = take > 0 ? Math.ceil(totalRows / take) : 1;
    const page = Math.min(Math.floor(skip / take) + 1, pages);

    const next = () => {
      const proposed = skip + take;
      const maxSkip = Math.max(0, totalRows - take);
      setSkip(Math.min(proposed, maxSkip));
    };

    const prev = () => {
      setSkip(Math.max(0, skip - take));
    };

    const first = () => {
      setSkip(0);
    };

    const last = () => {
      const lastSkip = Math.max(0, (pages - 1) * take);
      setSkip(lastSkip);
    };

    const jump = (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > pages) return;
      const newSkip = (pageNumber - 1) * take;
      setSkip(Math.max(0, Math.min(newSkip, totalRows - take)));
    };

    const reset = () => {
      setSkip(0);
      setTotalRows(0);
    };

    return {
      setSkip,
      setTake,
      setTotalRows,
      next,
      prev,
      first,
      last,
      jump,
      reset,
      page,
      pages,
      hasNext: skip + take < totalRows,
      hasPrev: skip > 0,
    };
  }, [skip, take, totalRows]);

  return { state, controller };
}
