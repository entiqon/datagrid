// file: src/DataGridView.tsx

'use client';

import { useMemo } from 'react';
import { useDataGrid } from './hooks/useDataGrid';
import type { Identifiable } from './context/DataGridState';
import { useGridEvents, DataGridEventsProps } from './hooks/useGridEvents';

export type DataGridViewProps<T extends Identifiable> = DataGridEventsProps<T>;

export default function DataGridView<T extends Identifiable>(
  props: DataGridViewProps<T>
) {
  // Wire external events (only meaningful in server mode)
  useGridEvents<T>(props);

  const grid = useDataGrid<T>();
  const { mode, data, pagination } = grid;

  const visibleRows = useMemo(() => {
    if (mode === 'client') {
      const start = pagination.skip;
      const end = start + pagination.take;
      return data.slice(start, end);
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
