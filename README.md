<h1 align="center">@entiqon/datagrid</h1>
<p align="center">A modular, typed, UI‑agnostic DataGrid engine for React</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@entiqon/datagrid"  alt="npm"/>
  <img src="https://github.com/entiqon/datagrid/actions/workflows/test.yml/badge.svg"  alt="test"/>
  <img src="https://img.shields.io/endpoint?url=https://entiqon.github.io/datagrid/coverage.json"  alt="coverage"/>
  <img src="https://img.shields.io/npm/l/@entiqon/datagrid"  alt="license"/>
</p>

---

# Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
  - High-level API
  - Full Control API
- [API Reference](#api-reference)
- [Examples](#examples)
- [Testing Guide](#testing-guide)
- [TypeScript Guide](#typescript-guide)
- [FAQ](#faq)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [License](#license)

---

# Introduction

`@entiqon/datagrid` is a modern, highly typed, and UI‑agnostic React DataGrid engine that provides complete state management, dialog orchestration, and interaction flows through modular **slices** and **controllers**.

It does _not_ impose a UI. You decide how to render your grid, rows, and dialogs.

---

# Features

- Modular slices: `data`, `actions`, `pagination`, `selection`, `focus`, `mode`
- Typed controllers for predictable mutation
- Unified hook API: `useDataGrid()`
- UI‑agnostic render model
- Built‑in sheet dialogs (create/update/delete/import)
- Fully testable architecture (~100% coverage)
- Zero external UI dependencies
- Tree‑shakable ESM

---

# Architecture

```
DataGridProvider
 ├── Data Slice          (rows, set, update, append, remove)
 ├── Action Slice        (mode, reset, set)
 ├── Pagination Slice    (page, skip/take, next, prev, jump)
 ├── Selection Slice     (ids, toggle, clear, selectAll)
 ├── Focus Slice         (focusedRow)
 └── Mode Slice          (isCreate, isUpdate, etc.)
```

All slices plug into the unified context accessed through:

```ts
const grid = useDataGrid();
```

---

# Installation

```bash
npm install @entiqon/datagrid
```

---

# Usage

## High‑level API (opinionated)

```tsx
<DataGrid rows={[{ id: 1, name: 'Row' }]} />
```

Automatically:

- initializes provider
- injects dialog manager
- renders "No data" when empty

---

## Full Control API

```tsx
<DataGridProvider initialRows={rows}>
  <MyGridView />

  <DataGridDialogManager onSubmit={saveRow} renderForm={MyForm} />
</DataGridProvider>
```

Use this for:

- custom layouts
- custom editing UIs
- advanced workflows

---

# API Reference

### `DataGridProvider`

Wraps all context slices.

```tsx
<DataGridProvider initialRows={rows}>...</DataGridProvider>
```

### `useDataGrid()`

Unified grid access:

```ts
const { data, actions, pagination, selection, focus, mode } = useDataGrid();
```

### Individual Hooks

- `useData()`
- `useActions()`
- `usePagination()`
- `useSelection()`
- `useFocus()`
- `useGridMode()`
- `useCurrentRow()`

### Components

- `DataGrid` (opinionated wrapper)
- `DataGridDialogManager`
- `Sheet`, `SheetHeader`, `SheetContent`, `SheetFooter`

---

# Examples

## Custom Grid Renderer

```tsx
function MyGridView() {
  const { data, selection, actions } = useDataGrid();

  return (
    <ul>
      {data.rows.map((row) => (
        <li key={row.id}>
          <input
            type="checkbox"
            checked={selection.ids.includes(row.id)}
            onChange={() => selection.toggle(row.id)}
          />
          {row.name}
          <button onClick={() => actions.set('update')}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## Custom Form for Dialog Manager

```tsx
function MyForm({ onSubmit, onCancel }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input placeholder="Name" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
```

---

# Testing Guide

### Rendering with provider

```tsx
render(
  <DataGridProvider initialRows={[{ id: 1 }]}>
    <MyGridView />
  </DataGridProvider>
);
```

### Testing slices with React Testing Library

```tsx
const { result } = renderHook(() => useData());
act(() => result.current.append([{ id: 2 }]));
expect(result.current.rows.length).toBe(2);
```

### Testing Sheet

```tsx
fireEvent.keyDown(window, { key: 'Escape' });
expect(onOpenChange).toHaveBeenCalledWith(false);
```

---

# TypeScript Guide

### Declare your row type

```ts
interface Row extends Identifiable {
  name: string;
  age: number;
}
```

### Use generics on provider

```tsx
<DataGridProvider<Row> initialRows={rows}>
```

### Strongly typed controllers

```ts
const { update } = useData<Row>();
update({ id: 1, name: 'John', age: 20 });
```

---

# FAQ

### Does DataGrid render a table?

No. You provide the UI.

### Can I replace the Sheet dialog system?

Yes — you can disable it and use your own.

### Does it support server-side pagination?

Yes — via `pagination.setTotalRows()` and custom fetch logic.

### Does it work with SSR?

Yes — no browser globals are used.

---

# Roadmap

- [ ] Column definitions API
- [ ] Sorting engine
- [ ] Filtering engine
- [ ] Row virtualization
- [ ] Remote data adapters
- [ ] Column resizing and dragging

---

# Changelog

See GitHub Releases (automatically maintained by Release Drafter).

---

# License

MIT © ENTIQON
