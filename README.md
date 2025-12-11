# @entiqon/datagrid

[![npm version](https://img.shields.io/npm/v/@entiqon/datagrid)](https://www.npmjs.com/package/@entiqon/datagrid)
[![npm downloads](https://img.shields.io/npm/dm/@entiqon/datagrid)](https://www.npmjs.com/package/@entiqon/datagrid)
![GitHub License](https://img.shields.io/github/license/entiqon/datagrid?style=flat-square)
![publish](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/publish.yml?label=publish)
![release-drafter](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/release-drafter.yml?label=release-drafter)
![Tests](https://github.com/entiqon/datagrid/actions/workflows/test.yml/badge.svg)
![Coverage](https://img.shields.io/endpoint?url=https://entiqon.github.io/datagrid/coverage.json)

A modern, typed, and extensible **DataGrid library for React**, built on:

- Context-driven modular state
- Controller/state slices
- A UI-agnostic design that lets you provide your own table component
- A rich hook API for interaction, pagination, selection, mode control, and events

This version (**0.3.x**) introduces a fully modular architecture with context slices, a unified provider, and new hooks.

---

# 🚀 Features

- ⚛️ **React-first API**
- 🧠 **Context-driven state slices** (data, actions, pagination, selection, focus, mode)
- 🧩 **DataGridProvider** with external control support
- 🎛 **Full hook suite** for granular access & composition
- 🎨 **UI-agnostic**: renderer is fully under your control
- 🧪 Built-in **Vitest + React Testing Library**
- 🤖 Automated releases with **Changesets + GitHub Actions**
- 📦 Tree-shakable ES modules

---

# 📦 Installation

```bash
npm install @entiqon/datagrid
```

or

```bash
yarn add @entiqon/datagrid
```

---

# 🧩 Usage Overview

## **1. High-Level API — `DataGrid` Component**

```tsx
import DataGrid, { DataGridView } from '@entiqon/datagrid';

export default function App() {
  return (
    <DataGrid data={rows} columns={columns}>
      <DataGridView />
    </DataGrid>
  );
}
```

---

## **2. Low-Level API — `DataGridProvider`**

```tsx
import { DataGridProvider } from '@entiqon/datagrid';

export default function App() {
  return (
    <DataGridProvider data={rows} columns={columns}>
      <CustomGrid />
    </DataGridProvider>
  );
}
```

---

# 🎛 Hook API

## **`useData()`**

```ts
const { rows, setRows, updateRow, removeRow } = useData();
```

## **`useActions()`**

```ts
const { refresh, reload } = useActions();
```

## **`usePagination()`**

```ts
const { page, pageSize, total, next, prev, setPage } = usePagination();
```

## **`useSelection()`**

```tsx
const { selected, toggle, clear, selectAll } = useSelection();
```

## **`useFocus()`**

```ts
const { focusedRow, setFocusedRow } = useFocus();
```

## **`useGridMode()`**

```ts
const { mode, setMode, isCreate, isUpdate } = useGridMode();
```

## **`useCurrentRow()`**

```ts
const { current } = useCurrentRow();
```

## **`useGridEvents()`**

```ts
useGridEvents({
  onRowClick(row) {},
  onSelectionChange(selected) {},
});
```

## **`useDataGrid()` — Unified hook**

```ts
const { data, actions, pagination, selection, focus, mode } = useDataGrid();
```

---

# 🔧 Example: Pagination UI

```tsx
const { page, next, prev } = usePagination();
```

---

# 🔍 Example: Row Selection

```tsx
const { selected, toggle } = useSelection();
```

---

# 🧭 Example: CRUD Workflow Using `useGridMode`

```tsx
const { mode, setMode, isCreate } = useGridMode();
```

---

# 🎨 Example: Custom Grid Renderer

```tsx
export function MyGrid() {
  const { data } = useData();
  const { selected } = useSelection();
}
```

---

# ⚙️ TypeScript Path Aliases

```json
{
  "paths": {
    "@context/*": ["src/context/*"],
    "@contracts": ["src/contracts/index.ts"],
    "@hooks": ["src/hooks/index.ts"]
  }
}
```

---

# 🧪 Development

```bash
npm test
npm run test:watch
npm run build
```

---

# 🚀 Versioning & Releases

- Changesets
- GitHub Actions

---

# 📝 License

MIT © ENTIQON
