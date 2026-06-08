# Dynamic Components Structure Guidelines

This directory contains the dynamic components used by the drag-and-drop page builder. When creating or modifying dynamic components, follow the structure and patterns below.

---

## 📁 Directory Structure

Every dynamic component must be organized into its own folder under the appropriate category directory (e.g., `content/`, `layout/`, `navbar/`, `hero/`, `footer/`, `ecommerce/`, `blog/`).

Inside the component folder, the code **must** be broken down into three files:

```text
[component-name]/
├── Component.tsx      # The visual React component (or ClientComponent.tsx if it uses state/hooks)
├── settings.ts        # Schema settings maps, default settings, and fallback parser
└── index.ts           # Registry configuration entry (no redundant exports)
```

---

## 📄 File Details

### 1. `settings.ts`
This file defines the custom settings available to the user in the right sidebar panel of the editor.

- **`ComponentSchemaSettingsMap`**: A key-value map defining property names, groups, labels, descriptions, and option menus or regex validation constraints.
- **`parseSettings`**: A parser function that applies default values and formats props.
- **`ComponentDefaultChildrensMap`** (Optional): A plain array of nodes (`ComponentSchema` dicts) pre-seeded when adding the component. Do not use slot layout keys unless there are multiple complex layout variants.

```typescript
import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentCustomSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    color: {
        as: "color",
        tp: "style",
        group: "design",
        name: "Text Color",
        description: "Pick custom text color."
    }
};

export function parseComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    if (!parsed.color) parsed.color = "#000000";
    return parsed;
}
```

### 2. `Component.tsx` (or `ClientComponent.tsx`)
This file renders the actual user-facing component.

- It must receive the parsed props (e.g., `color`, `style`, `children`) directly.
- It must apply the `style` prop to ensure user customization overlays work.
- It must render standard `children` (using Radix UI or native React elements) if it supports child components.

```tsx
import React from "react";

export default function CustomComponent({
    color,
    style,
    children
}: {
    color?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}) {
    return (
        <div style={{ color, ...style }}>
            {children}
        </div>
    );
}
```

### 3. `index.ts`
This file registers the component in the builder workspace.

- **Rule**: Do not add redundant exports (`export { default } from "./Component"` or `export { ... } from "./settings"`) unless specifically needed. Only export the registry registry entry.
- Define a `ComponentRegistryEntry` object that links the Component and Settings.

```typescript
import { ComponentRegistryEntry } from "../../type";
import Component from "./Component";
import { ComponentCustomSettingsMap, parseComponentSettings } from "./settings";

export const ACustomComponent: ComponentRegistryEntry = {
    acceptsChildren: true,
    name: "Custom Component Label",
    icon: "HelpCircle", // Lucide icon name
    category: "content",
    desc: "A short description of this component's purpose.",
    settings: ComponentCustomSettingsMap,
    parse: parseComponentSettings,
    component: Component,
    allowedChildren: ["text_block"]
};
```

---

## 🛠️ Key Design Patterns

1. **Radix UI Core**: Always use Radix UI Themes and Primitives as the core layout system for maximum consistency, accessibility, and high visual standards.
2. **Standard Children instead of Slots**: Avoid hardcoding fixed child rendering slots. Instead, use nested `children` layouts. Structure templates with flexible layout wrappers (like `box_block`) to house child blocks.
3. **Array-of-Dicts Default Children**: Ensure any `defaultChildren` maps represent a flat list (array) of children objects that can be parsed recursively.
