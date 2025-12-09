// file: src/DataGrid.tsx

'use client';

import DataGridView from './DataGridView';
import { DataGridProvider } from './context/DataGridProvider';
import type { Identifiable, DataGridMode } from './context/DataGridState';
import type { DataGridEventsProps } from './hooks/useGridEvents';

export interface DataGridProps<T extends Identifiable> extends DataGridEventsProps<T> {
  data: T[];
  initialTake?: number;
  initialTotalRows?: number;
  mode?: DataGridMode;
}

export default function DataGrid<T extends Identifiable>({
  data,
  initialTake = 10,
  initialTotalRows = data.length,
  mode,
  ...events
}: DataGridProps<T>) {
  return (
    <DataGridProvider<T>
      initialData={data}
      initialTake={initialTake}
      initialTotalRows={initialTotalRows}
      mode={mode}
    >
      <DataGridView<T> {...events} />
    </DataGridProvider>
  );
}
