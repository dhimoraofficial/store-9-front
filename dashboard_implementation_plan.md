# Revised Plan: Shopify-like Theme Editor & MongoDB Schema API

This plan outlines the architecture for a Shopify-inspired layout editor, with schemas loaded from a local MongoDB instance and managed via a Redux store.

---

## 1. Architecture Overview
The Next.js app will act as a layout and editing layer for the tenant. It will load, edit, and save schema configurations from MongoDB, while the main server handles the core e-commerce features.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       Shopify-like Layout Editor                               │
├───────────────────────────────────┬──────────────────────────────────┬─────────────────────────┤
│ LEFT PANEL: SECTIONS              │ CENTER PANEL: LIVE PREVIEW       │ RIGHT PANEL: INSPECTOR  │
│                                   │                                  │                         │
│ ▼ HEADER                          │ ┌──────────────────────────────┐ │ ▼ Box (Selected)        │
│   - Announcement                  │ │ Announcement Banner          │ │                         │
│   - Navbar                        │ ├──────────────────────────────┤ │ ┌─ COMMON SETTINGS ───┐ │
│                                   │ │                              │ │ │ Padding: 1rem       │ │
│ ▼ MAIN                            │ │ Navbar                       │ │ │ Margin: 0.5rem      │ │
│   - Home Banner                   │ │                              │ │ └─────────────────────┘ │
│   - Product Grid                  │ ├──────────────────────────────┤ │ ┌─ BOX SETTINGS ──────┐ │
│                                   │ │                              │ │ │ Box Type: Container │ │
│ ▼ FOOTER                          │ │ Page Content (Main)          │ │ └─────────────────────┘ │
│   - Navigation Links              │ │                              │ │                         │
│                                   │ ├──────────────────────────────┤ │                         │
│ ▼ GLOBAL                          │ │ Footer                       │ │                         │
│   - WhatsApp Button               │ └──────────────────────────────┘ │                         │
│                                   │                                  │                         │
└───────────────────────────────────┴──────────────────────────────────┴─────────────────────────┘
```

---

## 2. MongoDB Schema Storage Layer
We will introduce a database helper module (`application/runtime/db/mongo.ts`) to connect to MongoDB and query the layout schemas.

### Collection: `layouts`
Each document represents a layout or global component schema:
```typescript
interface LayoutDocument {
    tenantId: string;   // e.g., "generation-nepal"
    key: string;        // "navbar" | "footer" | "announcement" | "whatsAppButton" | "page:/" | "page:/about"
    schema: ComponentSchema | ComponentSchema[]; // The layout tree
}
```

### Strict Engine Loading (`app/[[...page]]/engine.ts`):
* The page render functions (`getApplicationPageRender` and `getAppGlobalComponent`) will query MongoDB for the corresponding schema key.
* If the schema is not found, or MongoDB is unreachable, it will **raise a strict not-found error** (no fallbacks to static hardcoded files).

---

## 3. Next.js API Endpoints
We will create Next.js App Router route handlers to support the editor:

* **GET `/api/schema?key=<key>`**:
  * Fetches the active schema tree from MongoDB.
* **POST `/api/schema`**:
  * Body: `{ key: string, schema: ComponentSchema | ComponentSchema[] }`
  * Saves or updates the schema tree in MongoDB.
* **GET `/api/components`**:
  * Returns the categorized customization settings from `ComponentAllSchemaSettingsMap` (defined in `main.ts`) for dynamic UI rendering.

### Calling Conventions
API calls will use the project's default client request utility `APP_API` imported from `@/application/providers/api` (which configures path prefixes, tokens, and standard JSON headers):
```typescript
import { APP_API } from "@/application/providers/api";

export async function saveSchema(key: string, schema: any) {
    return await APP_API.POST(`/api/schema`, { key, schema });
}
```

---

## 4. State Management (Redux Store)
We will introduce Redux Toolkit to manage the workspace state of the theme editor. This coordinates the state updates across all panels.

### Slice State Structure (`editorSlice.ts`):
```typescript
interface EditorState {
    schemas: {
        announcement: ComponentSchema | null;
        navbar: ComponentSchema | null;
        main: ComponentSchema[];
        footer: ComponentSchema | null;
        whatsAppButton: ComponentSchema | null;
    };
    selectedNodeId: string | null;
    activeSection: 'header' | 'main' | 'footer' | 'global';
    status: 'idle' | 'loading' | 'saving' | 'failed';
    error: string | null;
}
```

---

## 5. Theme Editor UI Layout (`/editor/[[...route]]`)

### Left Panel (Sections & theme-style Adding)
Displays the site structure split into 4 parts:
1. **Header** (Announcement, Navbar)
2. **Main** (Current page body layout elements)
3. **Footer** (Footer layout)
4. **Global** (WhatsApp Button, etc.)

* **theme-style Block Addition**:
  * Next to each component node and section, we display an "+ Add Block/Section" button.
  * Clicking this button opens a theme-style popup displaying all available components registered in `AppComponents`.
  * Selecting a component appends or inserts it under the target parent.

### Center Panel (Live Site Preview)
* Renders the complete site layout (`Announcement` + `Navbar` + `Main Page Layout` + `Footer` + `Global components`) based on the active Redux store state.
* Includes interactive click-to-select borders: hovering over an element shows its outline, and clicking it sets `selectedNodeId` in the Redux store.

### Right Panel (Component Property Inspector & Validation)
Loads the configuration settings for the selected component from `ComponentAllSchemaSettingsMap`.
1. **Common Settings**: Margin, padding, dimensions.
2. **Component Settings**: Special options (e.g. `box-tp` for `box` components).
3. **Inputs and Validation**:
   * If a setting defines `opt` (options), render a `<select>` dropdown.
   * Otherwise, render a text `<input>`.
   * For validation, run the input through the core validator (e.g., `valdiateComponentSetting`).
   * If validation fails, display a red validation error message and prevent saving.

---

## 6. Sequence of Implementation Tasks
1. **Dependency Installation**: Install `mongodb`, `@reduxjs/toolkit`, and `react-redux`.
2. **MongoDB Client**: Create `application/runtime/db/mongo.ts`.
3. **Engine Update**: Modify `app/[[...page]]/engine.ts` to fetch layout schemas exclusively from MongoDB.
4. **API Endpoints**: Implement Next.js `/api/schema` and `/api/components` routes.
5. **Redux Store Setup**: Create the Redux provider and slice definitions.
6. **Workspace Shell**: Build the split-pane theme editor interface.
7. **Interactive Tree & Preview**: Link tree nodes, theme-style component popups, and the live renderer.
8. **Form & Validation Inspector**: Set up the dynamic form fields with pattern/options validation.
