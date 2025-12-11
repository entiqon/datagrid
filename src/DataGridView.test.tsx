import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import DataGridView from './DataGridView';
import { DataGridProvider } from './context';

describe('DataGridView', () => {
  it('renders empty dataset', () => {
    const { container } = render(
      <DataGridProvider initialRows={[]}>
        <DataGridView />
      </DataGridProvider>
    );

    expect(container).toBeTruthy();
  });

  it('renders safely when no rows', () => {
    const { container } = render(
      <DataGridProvider initialRows={[]}>
        <DataGridView />
      </DataGridProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
