import { renderHook } from '@testing-library/react';

import { DataGridProvider } from '@context/DataGridProvider';
import {
  useActions,
  useCurrentRow,
  useData,
  useDataGrid,
  useFocus,
  useGridMode,
  usePagination,
  useSelection,
} from '@hooks';
function wrapper({ children }: any) {
  return <DataGridProvider initialRows={[]}>{children}</DataGridProvider>;
}

describe('Hook smoke tests', () => {
  const hooks = [
    useActions,
    useCurrentRow,
    useData,
    useDataGrid,
    useFocus,
    useGridMode,
    usePagination,
    useSelection,
  ];

  hooks.forEach((hook) => {
    it(`executes ${hook.name} without crashing`, () => {
      const { result } = renderHook(() => hook(), { wrapper });
      expect(result.current).toBeDefined();
    });
  });

  it('throws error if used outside provider', () => {
    expect(() => renderHook(() => useDataGrid())).toThrow();
  });
});
