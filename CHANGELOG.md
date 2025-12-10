# @entiqon/datagrid

## 0.3.0

### Minor Changes

- e581a61: Introduce modular DataGrid architecture with new context slices and hook API.

## 0.2.3

### Patch Changes

- 952140e: Stabilize architecture for DataGrid v0.2.3:
  - Rename Mode → DataGridMode
  - Add DataGridView abstraction
  - Improve barrel exports
  - Clarify provider/component separation
  - Internal consistency refactor

## 0.2.3

### Patch Changes

- Renamed `Mode` → `ActionMode` to avoid collisions and determine how the component will act.
- Added `DataGridMode` to identify the kind of data loading and how handle it
- Added `DataGridView` as optional UI abstraction
- Cleaned and corrected barrel exports
- Improved separation between `DataGrid` and `DataGridProvider`
- Internal refactors for naming consistency and simplified architecture

## 0.2.0

### Minor Changes

- 6c29ef2: Initial setup and release pipeline configuration

## 0.1.1

### Patch Changes

- Initial release of the datagrid package
