/**
 * @file: src/DataGridView.tsx
 */

'use client';

import { useMemo } from 'react';
import { useDataGrid } from '@hooks/useDataGrid';
import type { Identifiable } from '@contracts';

export default function DataGridView<T extends Identifiable>() {
  const grid = useDataGrid<T>();
  const { mode, data, pagination } = grid;

  const visibleRows = useMemo(() => {
    if (mode === 'client') {
      const start = pagination.skip;
      const end = start + pagination.take;
      return data.rows.slice(start, end);
    }
    // In server mode, assume `data` already reflects the correct page
    return data;
  }, [mode, data, pagination.skip, pagination.take]);

  // TODO: Replace with real table/grid markup
  return (
    <div>
      <pre>{JSON.stringify(visibleRows, null, 2)}</pre>
    </div>
  );
}
