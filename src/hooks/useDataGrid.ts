import { useContext } from 'react';

import { DataGridContext } from '../context/DataGridContext';
import { DataGridContextType, Identifiable } from '../context/DataGridState';

export function useDataGrid<T extends Identifiable>() {
  const ctx = useContext(DataGridContext);

  if (!ctx) throw new Error('useDataGrid must be used within DataGridProvider');

  return ctx as DataGridContextType<T>;
}
