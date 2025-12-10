# @entiqon/datagrid

[![npm version](https://img.shields.io/npm/v/@entiqon/datagrid)](https://www.npmjs.com/package/@entiqon/datagrid)
[![npm downloads](https://img.shields.io/npm/dm/@entiqon/datagrid)](https://www.npmjs.com/package/@entiqon/datagrid)
[![license](https://img.shields.io/github/license/entiqon/datagrid)](https://github.com/entiqon/datagrid/blob/main/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/publish.yml?branch=main)
![release-drafter](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/release-drafter.yml?label=release-drafter)

A modern, typed, and extensible **DataGrid library for React**, focused on clean architecture, context-driven state, and a UI-agnostic design that allows consumers to implement their own table or grid renderer.

This version (**0.2.3**) introduces consistent naming, improved barrel exports, and better separation between provider, component, and view renderer.

---

## 🚀 Features

- ⚛️ **React-first API**
- 🧠 **Context-driven state architecture**
- 🧩 **DataGridProvider** with optional external control
- 🧭 **Modes system (`DataGridMode`)** for workflows
- 📄 **Pagination, selection & events**
- 🎨 UI-agnostic: render any table component (`DataGridView` provided as optional abstraction)
- 🧪 Vitest + Testing Library included
- 🤖 Automated versioning + releases using **Changesets + GitHub Actions**

---

## 📦 Installation

```bash
npm install @entiqon/datagrid
```

or

```bash
yarn add @entiqon/datagrid
```

---

# 🧩 Basic Usage

```tsx
import DataGrid, { DataGridView } from '@entiqon/datagrid';

export default function App() {
  return (
    <DataGrid columns={columns} data={rows}>
      <DataGridView />
    </DataGrid>
  );
}
```

`DataGrid` initializes state, pagination, mode handling, and event dispatchers.

`DataGridView` is an optional UI abstraction — you can replace it with **your own table implementation**.

---

# 🧠 Architecture Overview

The library follows a clean, layered structure:

```
src/
├── DataGrid.tsx            # Main component (default export)
├── DataGridView.tsx        # Optional table abstraction
├── DataGridMode.ts         # Mode system
├── context/
│   ├── DataGridContext.tsx
│   ├── DataGridProvider.tsx
│   ├── DataGridActions.ts
│   └── DataGridState.ts
└── hooks/
    ├── useDataGrid.ts
    ├── useDataGridEvents.ts
    └── usePagination.ts
```

### Core Elements

#### **DataGrid (default export)**

- Initializes provider
- Wires state, pagination, events, and modes
- Accepts any UI renderer via children

#### **DataGridProvider**

Use this if you need full control outside the component.

```tsx
<DataGridProvider columns={columns} data={rows}>
  <CustomGridRenderer />
</DataGridProvider>
```

#### **Hooks**

| Hook                  | Purpose                            |
| --------------------- | ---------------------------------- |
| `useDataGrid()`       | Access grid state & actions        |
| `useDataGridEvents()` | Event registration & listeners     |
| `usePagination()`     | Exposes pagination state & setters |

#### **DataGridMode**

Now renamed to avoid collisions.

```ts
type DataGridMode = 'create' | 'update' | 'delete' | 'import' | 'reload' | null;
```

---

# 🧭 Roadmap

- 🔧 Column definitions & schemas
- 🔍 Sorting, filtering, and search state
- 📌 Row actions API
- 📦 Virtual scrolling
- 🎨 Theme abstraction
- 🛠 Additional unit + integration tests
- 📘 Full professional documentation (post-1.0)

---

# 🧪 Development

### Run tests

```bash
npm test
```

### Watch mode

```bash
npm run test:watch
```

### Build

```bash
npm run build
```

---

# 🚀 Versioning & Releases (Changesets)

This project uses:

- **Changesets** for versioning
- **GitHub Actions** for automated publishing
- **Release Drafter** for GitHub Release Notes

### ➤ Creating a changeset

```bash
npx changeset
```

Choose patch / minor / major, describe your change, and a markdown file will appear in:

```
.changeset/*.md
```

### ➤ Publishing (CI)

When merged into `main`, CI:

- Runs `changeset version`
- Updates `CHANGELOG.md`
- Bumps `package.json`
- Creates the GitHub Release draft
- Publishes to npm

---

# 📝 License

MIT © ENTIQON

---

If you find this library useful, consider starring the repository ❤️
