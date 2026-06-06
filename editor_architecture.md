# Editor Architecture — Mermaid Diagrams

---

## 1. Overall Editor Layout Structure

```mermaid
graph TD
    A["app/editor/layout.tsx\n(Server Component)"] --> B["Fetch Tenant Metadata\ngetTenantMetaData()"]
    B --> C["Validate Route\ngetApplicationPageRender()"]
    C --> D["EditorStoreProvider\n(Redux Provider — wraps children)"]
    D --> E["app/editor/[[...route]]/page.tsx\n(ThemeEditorWorkspace — Client)"]

    E --> F["EditorHeader\n(Toolbar)"]
    E --> G["SidebarLeft\n(Component Tree)"]
    E --> H["CanvasViewport\n(Zoomable Canvas)"]
    E --> I["SidebarRight\n(Inspector Panel)"]
    E --> J["AddComponentDialog\n(Modal)"]
    E --> K["ImportSchemaDialog\n(Modal)"]
```

---

## 2. Redux State Shape

```mermaid
graph LR
    subgraph EditorState["EditorState (bundles/store/editorSlice.ts)"]
        S1["schemas.announcement: ComponentSchema[]"]
        S2["schemas.navbar: ComponentSchema[]"]
        S3["schemas.main: ComponentSchema[]"]
        S4["schemas.footer: ComponentSchema[]"]
        S5["schemas.whatsAppButton: ComponentSchema[]"]
        S6["theme: ThemeConfig | null"]
        S7["selectedNodeId: string | null"]
        S8["activeSection: header | main | footer | global | null"]
        S9["status: idle | loading | saving | failed"]
        S10["tenantInfo: domain, slug, store, tenant"]
    end
```

---

## 3. Editor Data Loading Flow

```mermaid
sequenceDiagram
    participant Layout as layout.tsx (Server)
    participant Page as page.tsx (Client)
    participant Redux as Redux Store
    participant API as /api/schema (API Route)
    participant DB as Database

    Layout->>API: GET /api/components (available component types)
    Layout->>API: GET /api/schema?route=/current-path
    API->>DB: Query layouts + globals + theme
    DB-->>API: JSON schemas
    API-->>Layout: { globals[], pageLayout, theme, allRoutes }
    Layout->>Redux: dispatch(setSchemas({ announcement, navbar, main, footer, ... }))
    Layout->>Redux: dispatch(setTheme(theme.config))
    Redux-->>Page: Re-render with loaded schemas
```

---

## 4. CanvasViewport — Zoomable Canvas Interactions

```mermaid
graph LR
    subgraph Inputs["User Inputs"]
        I1["Ctrl + Scroll Wheel\nor Pinch Trackpad"]
        I2["Scroll / Trackpad Pan"]
        I3["Space + Drag\nor Middle Click Drag"]
        I4["Zoom In/Out Buttons"]
        I5["Fit / Reset Buttons"]
    end

    subgraph State["Canvas State"]
        C1["scale: number (0.15 – 3.0)"]
        C2["position: x, y"]
        C3["isDragging: boolean"]
        C4["isSpacePressed: boolean"]
    end

    I1 --> C1
    I2 --> C2
    I3 --> C2
    I4 --> C1
    I5 --> C1
    I5 --> C2

    C1 --> T["CSS transform: translate(x,y) scale(s)\napplied to inner canvas div"]
    C2 --> T
```

---

## 5. EditorPreviewBuilder — Click-to-Select in Canvas

```mermaid
flowchart TD
    A["EditorPreviewBuilder\nreceives ComponentSchema array"] --> B["For each schema node\nEditorPreviewBuilderContent"]

    B --> C["Resolve component type\nvia COMPONENT_KEY_ALIASES"]
    C --> D["Look up component\nComponentAllSchemaSettingsMap"]
    D --> E["Parse settings\ngetParsedSettings()"]

    E --> F{{"Is selectedNodeId\n=== schema.id ?"}}
    F -- Yes --> G["Apply solid blue outline\n2px solid #3b82f6"]
    F -- No --> H{{"Is hovered ?"}}
    H -- Yes --> I["Apply dashed blue outline\n1.5px dashed #3b82f6"]
    H -- No --> J["No outline"]

    G --> K["Render Component with props"]
    I --> K
    J --> K

    K --> L["onClick → dispatch(selectNode(schema.id))"]
    K --> M["Recursively render children\nas EditorPreviewBuilderContent"]
```

---

## 6. Left Sidebar — Component Tree Actions

```mermaid
flowchart LR
    subgraph SidebarLeft["SidebarLeft (app/editor/sidebar-left/)"]
        TN["TreeNode.tsx\n(Recursive tree renderer)"]
        IDX["index.tsx\n(Sections: announcement, navbar, main, footer, global)"]
        UT["utils.tsx\n(Tree utilities)"]
    end

    IDX --> TN

    TN --> A1["Click Node → dispatch(selectNode(id))"]
    TN --> A2["Move Up / Down → dispatch(moveNode({ id, direction }))"]
    TN --> A3["Delete → dispatch(deleteNode({ id }))"]
    TN --> A4["Add Child → triggerAddPopup(parentId, section)"]
    TN --> A5["Import JSON → triggerImportPopup(section)"]

    A4 --> D1["AddComponentDialog opens\nUser picks component type"]
    D1 --> A6["dispatch(addNode({ parentId, section, node }))"]
    A5 --> D2["ImportSchemaDialog opens\nUser pastes raw JSON"]
    D2 --> A7["dispatch(setSchemas({ section: parsedSchema }))"]
```

---

## 7. Right Sidebar — Inspector Panel Tabs

```mermaid
graph TD
    subgraph SidebarRight["SidebarRight (app/editor/sidebar-right/)"]
        IDX["index.tsx\n(Tab container)"]
        CS["ComponentSettings.tsx\n(Props editor)"]
        CST["ComponentStyles.tsx\n(Style editor)"]
        CA["ComponentActions.tsx\n(Action wiring)"]
        TS["ThemeSettings.tsx\n(Global theme tokens)"]
    end

    IDX --> CS
    IDX --> CST
    IDX --> CA
    IDX --> TS

    CS --> S1["Edit settings fields\nbased on componentSettingsMap schema"]
    S1 --> S2["Validate via valdiateComponentSetting()"]
    S2 --> S3["dispatch(updateNodeSettings({ id, settings }))"]

    CA --> AC1["Pick action type\ne.g. addToCart, removeFromCart"]
    AC1 --> AC2["Map props → $context.xxx tokens"]
    AC2 --> AC3["dispatch(updateNodeAction({ id, action }))"]

    TS --> T1["Edit token: color, spacing, font, etc."]
    T1 --> T2["dispatch(setTheme(updates))"]
    T2 --> T3["ThemeBuilder writes\nCSS variables onto :root"]
```

---

## 8. Save Flow

```mermaid
sequenceDiagram
    participant User
    participant Page as page.tsx
    participant Redux as Redux Store
    participant API as /api/schema

    User->>Page: Click "Save"
    Page->>Page: Check for validationErrors
    Page->>Redux: dispatch(setStatus("saving"))

    Page->>API: POST /api/schema { key: "announcement", schema: [...] }
    Page->>API: POST /api/schema { key: "navbar", schema: [...] }
    Page->>API: POST /api/schema { key: "footer", schema: [...] }
    Page->>API: POST /api/schema { key: "whatsAppButton", schema: [...] }
    Page->>API: POST /api/schema { key: "theme", schema: { ...themeTokens } }
    Page->>API: POST /api/schema { key: layoutId, type: "custom", schema: main[] }

    alt Page is new (not in DB yet)
        Page->>API: POST /api/schema { key: "route", route: "/path", type: "SP", layout: [...] }
    end

    API-->>Page: 200 OK
    Page->>Redux: dispatch(setStatus("idle"))
    Page->>User: toast.success("Saved!")
```

---

## 9. ComponentSchema Tree Example

```mermaid
graph TD
    ROOT["ComponentSchema root\ntype: box\nid: hero-section"]
    ROOT --> C1["type: text\nid: hero-title\nlabel: 'Welcome'"]
    ROOT --> C2["type: box\nid: hero-cta-row"]
    C2 --> C3["type: button\nid: cta-btn\nlabel: 'Shop Now'\naction: { type: 'addToCart', prop: { pid: '$context.product_id' } }"]
    C2 --> C4["type: link\nid: cta-link\nlabel: 'View More'"]
    ROOT --> C5["type: image\nid: hero-img\nsettings: { src: '/banner.jpg' }"]
```

---

## 10. Full Editor Request Lifecycle

```mermaid
flowchart TD
    A["Browser → GET /editor/about-us"] --> B["Next.js App Router\napp/editor/layout.tsx (Server)"]
    B --> C["getTenantMetaData() → fetch tenant from DB"]
    C --> D{"Tenant found?"}
    D -- No --> E["Render NoSuchStore error"]
    D -- Yes --> F["getApplicationPageRender(route, isEditor: true)"]
    F --> G{"Route type?"}
    G -- not_found --> H["notFound()"]
    G -- redirect --> I["permanentRedirect or redirect()"]
    G -- SP / DP / product --> J["EditorStoreProvider\n(Redux provider with tenantInfo)"]
    J --> K["Render children: ThemeEditorWorkspace"]
    K --> L["loadEditorData() → fetch schemas from /api/schema"]
    L --> M["dispatch(setSchemas + setTheme)"]
    M --> N["EditorPreviewBuilder renders live preview in canvas"]
    N --> O["User edits → Redux state updates → Preview re-renders instantly"]
    O --> P["Click Save → POST to /api/schema → schemas written to DB"]
```
