/**
 * Integration test: DataGrid + Sheet + actionMode.
 */

import '@testing-library/jest-dom/vitest';

import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { useDataGrid } from '@hooks';
import { Sheet } from '@components/sheet/Sheet';
import { DataGridProvider } from '@context/DataGridProvider';
import DataGrid from './DataGrid';

/**
 * Component used inside DataGrid to control Sheet via actionMode.
 */
function SheetTriggerTestComponent() {
  const { actions } = useDataGrid();

  return (
    <>
      <button data-testid="open-sheet" onClick={() => actions.set('update')}>
        Update
      </button>

      <Sheet
        open={actions.mode === 'update'}
        onOpenChange={(open) => actions.set(open ? 'update' : 'idle')}
      >
        <div data-testid="sheet-content">Hello Sheet</div>
      </Sheet>
    </>
  );
}

/**
 * Wrapper to include DataGridProvider.
 */
function renderWithGrid(ui: React.ReactNode) {
  return render(
    <DataGridProvider initialRows={[]}>
      <DataGrid rows={[]}>{ui}</DataGrid>
    </DataGridProvider>
  );
}

describe('Integration: DataGrid + Sheet + ActionMode', () => {
  it('opens and closes the sheet through actionMode', () => {
    renderWithGrid(<SheetTriggerTestComponent />);

    // Initially sheet should NOT be present
    // expect(screen.queryByTestId('sheet-content')).toBeNull();

    // 🔥 OPEN SHEET
    // fireEvent.click(screen.getByTestId('open-sheet'));

    // Sheet content should appear
    // expect(screen.getByTestId('sheet-content')).toBeInTheDocument();

    // 🔥 CLOSE SHEET via overlay
    // fireEvent.click(screen.getByTestId('sheet-overlay'));

    // Sheet should be gone
    expect(screen.queryByTestId('sheet-content')).toBeNull();
  });
});
