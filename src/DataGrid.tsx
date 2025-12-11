// file: src/components/DataGrid.tsx

import { ReactNode } from 'react';

import { DataGridProvider } from '@context';
import type { Identifiable } from '@contracts';
import { DataGridDialogManager, EmptyState } from '@components';

interface DataGridProps<T extends Identifiable> {
  rows: T[];
  children?: ReactNode;
}

export default function DataGrid<T extends Identifiable>({
  rows,
  children,
}: DataGridProps<T>) {
  if (!rows || rows.length === 0) {
    return (
      <EmptyState
        context={{
          onCreate: () => console.log('onCreate'),
          onImport: () => console.log('onImport'),
          learnMoreLink: '/',
        }}
      />
    );
  }

  return (
    <DataGridProvider<T> initialRows={rows}>
      {children}

      <DataGridDialogManager
        onSubmit={() => console.log('Form submitted!')}
        renderForm={() => <>FormDialog</>}
      />
    </DataGridProvider>
  );
}
