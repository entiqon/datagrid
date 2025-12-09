// file: src/context/DataGridActions.ts

import type { Pagination } from './DataGridState';

export function createPaginationActions(
  skip: number,
  take: number,
  totalRows: number,
  setSkip: (n: number) => void,
  setTake: (n: number) => void,
  setTotalRows: (n: number) => void
): Pagination {
  const nextPage = () => {
    const proposed = skip + take;

    if (totalRows > 0) {
      const maxSkip = Math.max(0, totalRows - take);
      setSkip(Math.min(proposed, maxSkip));
    } else {
      // if totalRows unknown (0), just advance
      setSkip(Math.max(0, proposed));
    }
  };

  const prevPage = () => {
    setSkip(Math.max(0, skip - take));
  };

  const reset = () => {
    setSkip(0);
    setTotalRows(0);
  };

  return {
    skip,
    take,
    totalRows,
    setSkip,
    setTake,
    setTotalRows,
    nextPage,
    prevPage,
    reset,
  };
}
