# @entiqon/datagrid

[![npm version](https://img.shields.io/npm/v/@entiqon/datagrid?color=blue&label=npm)](https://www.npmjs.com/package/@entiqon/datagrid)
![npm downloads](https://img.shields.io/npm/dm/@entiqon/datagrid?color=blue)
![license](https://img.shields.io/github/license/entiqon/datagrid)
![build](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/version.yml?label=versioning)
![release](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/release.yml?label=release)
![release-drafter](https://img.shields.io/github/actions/workflow/status/entiqon/datagrid/release-drafter.yml?label=release-drafter)

A modern, opinionated, and extensible **DataGrid component library** for React.  
Designed for performance, flexibility, and developer experience.

---

## 🚀 Features

- ⚛️ **React-first API**
- 🧠 **Context-driven state management**
- 📄 **Pagination, modes, selection state**
- 🎨 Extensible and customizable architecture
- 🧪 Built with **Vitest + Testing Library**
- 🧹 Clean build pipeline using **tsup**
- 🤖 Automated releases via **Changesets + GitHub Actions**

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

## 🧩 Usage

```tsx
import DataGrid from '@entiqon/datagrid';

export default function App() {
  return <DataGrid />;
}
```

More documentation coming soon as the component evolves.

---

## 🧠 Architecture Overview

The library is structured around:

- `DataGrid` – the main component
- `DataGridProvider` – context provider
- `useDataGrid()` – access grid state
- Hooks for selection, pagination, modes

Tests can be co-located next to components:

```
src/
  datagrid.tsx
  datagrid.test.tsx
  context/
    index.tsx
    index.test.tsx
```

---

## 📚 Roadmap

- 🔧 Column definitions
- 🔍 Sorting & filtering
- 📌 Row actions
- 📦 Virtual scrolling
- 🎨 Theming & styling tokens
- 🛠 Extensive unit + integration tests

---

## 🧪 Development

Run tests:

```bash
npm test
```

Run in watch mode:

```bash
npm run test:watch
```

Build:

```bash
npm run build
```

---

## 🚀 Releases & Versioning

Releases are automated using:

- **Changesets**
- **Release Drafter**
- **GitHub Actions**
- **npm publish on GitHub Release**

To propose a version bump:

```bash
npx changeset
```

---

## 📝 License

MIT © ENTIQON

---

## ⭐ Support the Project

If you find this library useful, consider starring the repository ❤️
