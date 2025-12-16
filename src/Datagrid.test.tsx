import '@testing-library/jest-dom';

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DataGrid from './DataGrid';

// Mock useActions so dialog is OPEN
vi.mock('@hooks', () => ({
  useActions: () => ({
    mode: 'create',
    reset: vi.fn(),
    set: vi.fn(),
  }),
}));

describe('DataGrid', () => {
  it('renders empty state when no rows', () => {
    render(<DataGrid rows={[]} />);

    expect(screen.getByText('There are no rows to display.')).toBeInTheDocument();
  });

  it('does not render children when empty', () => {
    render(
      <DataGrid rows={[]}>
        <div data-testid="child" />
      </DataGrid>
    );
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('renders children when rows exist', () => {
    render(
      <DataGrid rows={[{ id: 1 }]}>
        <div data-testid="child" />
      </DataGrid>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders DataGridDialogManager when rows exist', () => {
    render(<DataGrid rows={[{ id: 1 }]} />);
    expect(screen.getByText('FormDialog')).toBeInTheDocument();
  });
});
