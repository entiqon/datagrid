import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import DataGrid from './DataGrid';

describe('DataGrid', () => {
  it('renders without crashing', () => {
    render(<DataGrid />);
    expect(screen.getByText('DataGrid')).toBeInTheDocument();
  });
});
