# Dhimora Theme Editor & Layout Engine Refactor

This document details the architectural refactor performed to resolve runtime React Suspense issues and implement a dynamic, database-backed global theme configuration layer within the Shopify-style Theme Editor.

---

## 🛠️ Resolved Issues

### 1. React Rules of Hooks & Suspense Violation (`Icon.tsx`)
- **Problem**: The `AIcon` component was defined as an `async` function components doing `await import("lucide-react")` inside its render path. In React 19 / Next.js 15, asynchronous component rendering on the client returns a raw `Promise`, which throws an uncached promise error and suspends client rendering.
- **Fix**: Refactored `AIcon` into a standard synchronous client component using static wildcard imports from `lucide-react`:
  ```tsx
  import * as Lucide from 'lucide-react';
  
  export default function AIcon({ label, size, color }: IconProps) {
      const ICO = (Lucide as any)?.[label];
      if (!ICO) return null;
      return React.createElement(ICO, { size: size || 16, color });
  }
  ```

---

## 🏗️ New Architectural Implementations

### 1. Dynamic MongoDB Theme Config Layer
- Modified `/app/[[...page]]/engine.ts` to support fully database-backed global theme configs.
- Seeded default theme settings automatically if the collection is empty.
- Updated schema queries to require scope validation:
  - Both `tenantId` and `storeId` are now verified for every MongoDB document lookup and update.
  - An explicit component/layout `type` field is now persisted per document to support granular queries.

### 2. Dual-Panel Inspector Workspace
- Refactored `app/editor/[[...route]]/page.tsx` to clean up the workspace and add a professional, Shopify-style side pane:
  - **Component Options Tab**: Manages settings, labels, ordering, and deletion of the selected layout node.
  - **Global Theme Tab**: Lists brand palettes, surfaces, spacing, borders, buttons, and typography settings with live color swatches and inputs.
- Wrapped the center workspace preview pane in `<ThemeBuilder>` using the live Redux-backed theme state, enabling instant visual updates when properties or theme variables are changed.

---

## 📦 Database Document Schema Design

Layout documents in the MongoDB `layouts` collection are now structured as follows:

```json
{
  "tenantId": "069bacae-67ac-7c54-ab11-a0f05589030d",
  "storeId": "069bacc9-c656-7350-a1da-b120c0a2f42a",
  "key": "navbar",
  "type": "navbar",
  "schema": {
    "id": "navbar_1",
    "type": "box",
    "settings": {},
    "children": []
  }
}
```

- **`key`**: Unique identifier for lookup (e.g., `navbar`, `footer`, `theme`, `page:/`).
- **`type`**: Logical type classification (e.g., `navbar`, `footer`, `global`, `theme`, `SP`, `DP`).
- **`schema`**: JSON component tree or theme parameter settings object.
