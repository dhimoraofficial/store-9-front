# 🛠️ Dynamic Components Schema & Settings Reference Manual

This reference manual documents all customizable schema properties, settings maps, validation constraints, and default/fallback parser actions for the dynamic components in the drag-and-drop page builder workspace.

---

## 📐 Schema Definitions & Key Parameters

Every settings map consists of key-value definitions conforming to the `ComponentSettingsSchema` interface:

*   **`tp` (Type)**:
    *   `"style"`: Maps directly to CSS styles applied to the outer container.
    *   `"prop"`: Standard React component props.
    *   `"multiple"`: Comma-separated or array inputs.
    *   `"map"`: A repeating list of objects structured by sub-fields.
*   **`as` (Alias Target)**: The property name key passed down to the rendering component.
*   **`rgx` (Regex Constraint)**: Input validation rules evaluated inside the editor sidebar.
*   **`opt` (Predefined Options)**: Selectable options displayed as menus.
*   **`group` (Collapsible Category)**: Sidebar panel categorization (e.g., `layout`, `branding`, `style`, `typography`).
*   **`fields`**: Sub-schema definition for nested repeating row items (only applicable for `tp: "map"`).

---

## 🌐 Common Global Settings (`common`)

These layout, spacing, and size controls are available globally to customize component containers. They are parsed and processed by the system's global style mapper.

| Key | Style Target (`as`) | Type | Validation / Options |
| :--- | :--- | :--- | :--- |
| **`p`** | `padding` | `style` | `^\d*\.?\d+(rem)$` |
| **`pL`** | `paddingLeft` | `style` | `^\d*\.?\d+(rem)$` |
| **`pT`** | `paddingTop` | `style` | `^\d*\.?\d+(rem)$` |
| **`pR`** | `paddingRight` | `style` | `^\d*\.?\d+(rem)$` |
| **`pB`** | `paddingBottom` | `style` | `^\d*\.?\d+(rem)$` |
| **`pX`** | `paddingLeft` / `paddingRight` | `style` | `^\d*\.?\d+(rem)$` (Applied as pair) |
| **`pY`** | `paddingTop` / `paddingBottom` | `style` | `^\d*\.?\d+(rem)$` (Applied as pair) |
| **`m`** | `margin` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` |
| **`mL`** | `marginLeft` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` |
| **`mT`** | `marginTop` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` |
| **`mR`** | `marginRight` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` |
| **`mB`** | `marginBottom` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` |
| **`mX`** | `marginLeft` / `marginRight` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` (Applied as pair) |
| **`mY`** | `marginTop` / `marginBottom` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["auto"]` (Applied as pair) |
| **`w`** | `width` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["100%", "fit", "fit-content", "auto"]` |
| **`h`** | `height` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["100%", "fit", "fit-content", "auto"]` |
| **`mw`** | `maxWidth` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["100%", "fit", "fit-content", "none"]` |
| **`mh`** | `maxHeight` | `style` | `^\d*\.?\d+(rem\|px\|%)?$` \| `["100%", "fit", "fit-content", "none"]` |

---

## 📦 Registered Components Reference

The following components are fully registered within `ComponentAllSchemaSettingsMap`.

### 1. Text Block (`text_block`)
Simple textual content container which can act as a standard paragraph or redirect link.
*   **Settings Map**: `ComponentTextBlockSchemaSettingsMap`
*   **Properties**:
    *   `content` (`prop`): Text Content (`name: "Text Content"`, `rgx: ".*"`)
    *   `href` (`prop`): Link URL (Optional) (`name: "Link URL (Optional)"`, `rgx: ".*"`)
*   **Parser Action**:
    *   `content` default: `""`
    *   `href` default: `""`

### 2. Social Links Block (`social_links_block`)
Displays a row of SVG social media icons matching the user's links.
*   **Settings Map**: `ComponentSocialLinksBlockSchemaSettingsMap`
*   **Properties**:
    *   `platforms` (`map`): Social Profiles List (`name: "Social Profiles List"`)
        *   *Nested fields*:
            *   `platform`: Platform Name. Options: `["facebook", "instagram", "twitter", "youtube", "linkedin"]`
            *   `url`: Profile URL. Regex: `.*`
    *   `iconSize` (`prop`, group: `layout`): Icon Size. Options: `["small", "medium", "large"]`
    *   `gap` (`prop`, group: `layout`): Spacing Gap. Options: `["none", "small", "medium", "large"]`
*   **Parser Action**:
    *   `platforms` default: `[]` (validated as an Array)
    *   `iconSize` default: `"medium"`
    *   `gap` default: `"small"`

### 3. Link Icon Block (`link_icon_block`)
Renders a Lucide icon alongside a clickable text label.
*   **Settings Map**: `ComponentLinkIconBlockSchemaSettingsMap`
*   **Properties**:
    *   `icon` (`prop`): Lucide Icon Name (`name: "Lucide Icon Name"`, `rgx: "^[A-Z][a-zA-Z0-9]*$"`)
    *   `text` (`prop`): Label Text (`name: "Label Text"`, `rgx: ".*"`)
    *   `href` (`prop`): Link URL (Optional) (`name: "Link URL (Optional)"`, `rgx: ".*"`)
*   **Parser Action**:
    *   `icon` default: `"HelpCircle"`
    *   `text` default: `""`
    *   `href` default: `""`

### 4. Text Carousel (`text_carousel`)
A basic vertical or horizontal scrolling text ticker typically used for reviews or quotes.
*   **Settings Map**: `ComponentTextCarouselBlockSchemaSettingsMap`
*   **Properties**:
    *   `autoplaySpeed` (`prop`): Slide duration in ms (`name: "Auto Slide Speed"`, `rgx: "^[0-9]+$"`)
    *   `slides` (`map`): Carousel Text Slides (`name: "Carousel Text Slides"`)
        *   *Nested fields*:
            *   `text`: Slide Text Content. Regex: `.*`
            *   `href`: Slide Click URL (Optional). Regex: `.*`
*   **Parser Action**:
    *   `autoplaySpeed` default: `3000` (parsed as decimal integer)
    *   `slides` default: `[]`

### 5. Hero Showcase Carousel (`hero_carousel_block`)
A premium, full-featured slider block with support for header badges, background images, titles, descriptions, and CTA pairs.
*   **Settings Map**: `ComponentHeroCarouselBlockSchemaSettingsMap`
*   **Properties**:
    *   `autoplaySpeed` (`prop`): Slide duration in ms (`name: "Auto Slide Speed"`, `rgx: "^[0-9]+$"`)
    *   `showArrows` (`prop`): Show Navigation Arrows. Options: `["true", "false"]`
    *   `showDots` (`prop`): Show Pagination Dots. Options: `["true", "false"]`
    *   `slides` (`map`): Carousel Slides List (`name: "Carousel Slides List"`)
        *   *Nested fields*:
            *   `title`: Heading / Title Text. Regex: `.*`
            *   `subtitle`: Sub-heading / Description. Regex: `.*`
            *   `badgeText`: Category Badge Text (Optional). Regex: `.*`
            *   `bgImage`: Background Image URL (Optional). Regex: `.*`
            *   `primaryCtaText`: Primary Button Text. Regex: `.*`
            *   `primaryCtaUrl`: Primary Button URL. Regex: `.*`
            *   `secondaryCtaText`: Secondary Button Text. Regex: `.*`
            *   `secondaryCtaUrl`: Secondary Button URL. Regex: `.*`
*   **Parser Action**:
    *   `autoplaySpeed` default: `4000` (parsed as decimal integer)
    *   `showArrows` default: `"true"`
    *   `showDots` default: `"true"`
    *   `slides` default: `[]`

### 6. Hero Banner Block (`hero_banner_block`)
Static banner containing title, description, and up to two call-to-action buttons against a custom image backdrop.
*   **Settings Map**: `ComponentHeroBannerBlockSchemaSettingsMap`
*   **Properties**:
    *   `title` (`prop`): Heading / Banner Title (`rgx: ".*"`)
    *   `subtitle` (`prop`): Description Text (`rgx: ".*"`)
    *   `badgeText` (`prop`): Badge Text (`rgx: ".*"`)
    *   `bgImage` (`prop`): Background Image URL (`rgx: ".*"`)
    *   `primaryCtaText` (`prop`): Primary CTA Button Label (`rgx: ".*"`)
    *   `primaryCtaUrl` (`prop`): Primary CTA URL Target (`rgx: ".*"`)
    *   `secondaryCtaText` (`prop`): Secondary CTA Button Label (`rgx: ".*"`)
    *   `secondaryCtaUrl` (`prop`): Secondary CTA URL Target (`rgx: ".*"`)
    *   `height` (`prop`): Banner height in pixels, rems, or % (`rgx: "^\\d*(px|rem|%)?$"`)
*   **Parser Action**:
    *   `height` default: `"380px"`
    *   Text fields default: `""`

### 7. Hero Search Block (`search_block`)
A minimal inline search form for page headers or hero headers.
*   **Settings Map**: `ComponentSearchBlockSchemaSettingsMap`
*   **Properties**:
    *   `placeholder` (`prop`): Input placeholder hint text (`rgx: ".*"`)
    *   `buttonText` (`prop`): Action button text (`rgx: ".*"`)
*   **Parser Action**:
    *   `placeholder` default: `"Search products..."`
    *   `buttonText` default: `"Find"`

### 8. Technical Specifications Block (`specs_block`)
Lists a matrix of key-value pairs representing product attributes, dimensions, or technical specifications.
*   **Settings Map**: `ComponentSpecsBlockSchemaSettingsMap`
*   **Properties**:
    *   `specList` (`map`): Technical Specification List
        *   *Nested fields*:
            *   `label`: Specification Label. Regex: `.*`
            *   `value`: Specification Value. Regex: `.*`
*   **Parser Action**:
    *   `specList` default: `[]`

### 9. Link Group Block (`link_group_block`)
Organizes sets of relative navigation links under a single common label.
*   **Settings Map**: `ComponentLinkGroupBlockSchemaSettingsMap`
*   **Properties**:
    *   `title` (`prop`): Group Title (`rgx: ".*"`)
    *   `direction` (`prop`): Layout Direction. Options: `["column", "row"]`
*   **Parser Action**:
    *   `title` default: `""`
    *   `direction` default: `"column"`

### 10. Plain Link Block (`link_block`)
Renders a singular, inline text navigation anchor.
*   **Settings Map**: `ComponentLinkBlockSchemaSettingsMap`
*   **Properties**:
    *   `text` (`prop`): Link Display Text (`rgx: ".*"`)
    *   `href` (`prop`): Link URL Target (`rgx: ".*"`)
*   **Parser Action**:
    *   `text` default: `""`
    *   `href` default: `""`

### 11. Layout Box (`box_block`)
A generic layout flex container used to group, align, and size columns, rows, and widgets.
*   **Settings Map**: `ComponentBoxBlockSchemaSettingsMap`
*   **Properties**:
    *   `direction` (`prop`, group: `layout`): Layout Direction. Options: `["column", "row"]`
    *   `width` (`prop`, group: `layout`): Container Width. Options: `["auto", "1", "2", "3", "flex-grow", "flex-1", "full"]` (or custom rem string via regex `^\d+(\.\d+)?rem$`)
    *   `align` (`prop`, group: `layout`): Cross-axis Alignment. Options: `["start", "center", "end", "stretch"]`
    *   `justify` (`prop`, group: `layout`): Main-axis distribution. Options: `["start", "center", "end", "between"]`
    *   `gap` (`prop`, group: `layout`): Inner Gap Spacing. Options: `["none", "small", "medium", "large"]`
    *   `display` (`prop`, group: `layout`): Layout Engine. Options: `["flex", "grid"]`
    *   `gridColumns` (`prop`, group: `layout`): Grid Columns Count. Options: `["1", "2", "3", "4", "5", "6", "12"]` (or custom string via regex `^\d+$`)
    *   `backgroundColor` (`prop`, group: `style`): Custom Background Color. Options: `["transparent", "white", "slate-50", "slate-100", "zinc-900", "primary", "secondary"]`
    *   `padding` (`prop`, group: `style`): Padding Size. Options: `["none", "small", "medium", "large"]`
    *   `hoverEffect` (`prop`, group: `style`): Hover Interaction Effect. Options: `["none", "shadow-raise", "scale-up", "bg-tint"]`
*   **Parser Action**:
    *   `direction` default: `"column"`
    *   `width` default: `"auto"`
    *   `align` default: `"start"`
    *   `justify` default: `"start"`
    *   `gap` default: `"medium"`
    *   `backgroundColor` default: `"transparent"`
    *   `padding` default: `"none"`
    *   `display` default: `"flex"`
    *   `gridColumns` default: `"1"`
    *   `hoverEffect` default: `"none"`

### 11b. Bounded Container (`container_block`)
A bounded, customizable layout block that supports maximum width constraints and horizontal auto-centering.
*   **Settings Map**: `ComponentContainerBlockSchemaSettingsMap`
*   **Properties**:
    *   `direction` (`prop`, group: `layout`): Layout Direction. Options: `["column", "row"]`
    *   `width` (`prop`, group: `layout`): Container Width. Options: `["auto", "1", "2", "3", "flex-grow", "flex-1", "full"]` (or custom rem string via regex `^\d+(\.\d+)?rem$`)
    *   `maxWidth` (`prop`, group: `layout`): Max Width. Options: `["var(--container-max-width)"]` (or custom CSS width/variable via regex `^(\d+(\.\d+)?(px|rem|em|%)|var\(--[a-zA-Z0-9-]+\))$`)
    *   `mxAuto` (`prop`, group: `layout`): Center Align. Options: `["true", "false"]`
    *   `align` (`prop`, group: `layout`): Cross-axis Alignment. Options: `["start", "center", "end", "stretch"]`
    *   `justify` (`prop`, group: `layout`): Main-axis distribution. Options: `["start", "center", "end", "between"]`
    *   `gap` (`prop`, group: `layout`): Inner Gap Spacing. Options: `["none", "small", "medium", "large"]`
    *   `display` (`prop`, group: `layout`): Layout Engine. Options: `["flex", "grid"]`
    *   `gridColumns` (`prop`, group: `layout`): Grid Columns Count. Options: `["1", "2", "3", "4", "5", "6", "12"]` (or custom string via regex `^\d+$`)
    *   `backgroundColor` (`prop`, group: `style`): Custom Background Color. Options: `["transparent", "white", "slate-50", "slate-100", "zinc-900", "primary", "secondary"]`
    *   `padding` (`prop`, group: `style`): Padding Size. Options: `["none", "small", "medium", "large"]`
    *   `hoverEffect` (`prop`, group: `style`): Hover Interaction Effect. Options: `["none", "shadow-raise", "scale-up", "bg-tint"]`
*   **Parser Action**:
    *   `direction` default: `"column"`
    *   `width` default: `"auto"`
    *   `maxWidth` default: `"var(--container-max-width)"`
    *   `mxAuto` default: `"true"`
    *   `align` default: `"stretch"`
    *   `justify` default: `"start"`
    *   `gap` default: `"medium"`
    *   `backgroundColor` default: `"transparent"`
    *   `padding` default: `"none"`
    *   `display` default: `"flex"`
    *   `gridColumns` default: `"1"`
    *   `hoverEffect` default: `"none"`

### 12. Brand Logo Block (`logo_block`)
Displays brand graphics and names inside top headers or page footers.
*   **Settings Map**: `ComponentLogoBlockSchemaSettingsMap`
*   **Properties**:
    *   `logoSrc` (`prop`): Store Logo Image URL (`rgx: ".*"`)
    *   `logoHeight` (`prop`): Logo Height Bound (`rgx: "^\\d*(px|rem|%)?$"`)
    *   `brandName` (`prop`): Brand Name (`rgx: ".*"`)
    *   `brandSlogan` (`prop`): Brand Slogan Tagline (`rgx: ".*"`)
*   **Parser Action**:
    *   `logoSrc` default: `""`
    *   `logoHeight` default: `"40px"`
    *   `brandName` default: `"Generation Nepal"`
    *   `brandSlogan` default: `"CURATED POWER GEAR"`

### 13. Search Bar Block (`search_bar_block`)
Standard search input field used primarily in header layouts.
*   **Settings Map**: `ComponentSearchBarBlockSchemaSettingsMap`
*   **Properties**:
    *   `placeholder` (`prop`): Search Input Hint Text (`rgx: ".*"`)
    *   `maxWidth` (`prop`): Desktop max width restriction. Options: `["small", "medium", "large", "full"]`
*   **Parser Action**:
    *   `placeholder` default: `"Search products..."`
    *   `maxWidth` default: `"medium"`

### 14. Navigation Utilities Block (`nav_utilities_block`)
Renders interactive client icon buttons (Wishlist, Cart, and Account actions).
*   **Settings Map**: `ComponentNavUtilitiesBlockSchemaSettingsMap`
*   **Properties**:
    *   `wishlistShow` (`prop`): Show Wishlist Icon. Options: `["true", "false"]`
    *   `cartShow` (`prop`): Show Cart Icon. Options: `["true", "false"]`
    *   `accountShow` (`prop`): Show Account Icon. Options: `["true", "false"]`
    *   `iconSize` (`prop`): Icon Size model. Options: `["small", "medium", "large"]`
*   **Parser Action**:
    *   `wishlistShow` default: `false` (evaluated as Boolean)
    *   `cartShow` default: `false` (evaluated as Boolean)
    *   `accountShow` default: `false` (evaluated as Boolean)
    *   `iconSize` default: `"medium"`

### 15. Ecommerce Announcement Bar (`announcement_bar_ecommerce`)
Sticky promotional banner at the very top of pages.
*   **Settings Map**: `ComponentAnnouncementBarSchemaSettingsMap`
*   **Properties**:
    *   `layout` (`prop`, group: `layout`): Layout Column Split. Options: `["1-column", "3-column"]`
    *   `theme` (`prop`, group: `theme`): Color Mode. Options: `["pri", "sec", "bg"]`
    *   `fontSize` (`prop`, group: `typography`): Text size. Options: `["xs", "sm", "base"]`
    *   `fontWeight` (`prop`, group: `typography`): Text weight. Options: `["normal", "medium", "semibold", "bold"]`
    *   `height` (`prop`, group: `layout`): Banner Height (`rgx: "^\\d*(px|rem|%)?$"`)
    *   `mobileShow` (`prop`, group: `layout`): Display on Mobile. Options: `["true", "false"]`
*   **Parser Action**:
    *   `layout` default: `"3-column"`
    *   `theme` default: `"pri"`
    *   `fontSize` default: `"xs"`
    *   `fontWeight` default: `"normal"`
    *   `height` default: `"36px"`
    *   `mobileShow` default: `"true"`

### 16. Ecommerce Footer Block (`footer_ecommerce`)
The bottom content footer layout.
*   **Settings Map**: `ComponentFooterSchemaSettingsMap`
*   **Properties**:
    *   `theme` (`prop`, group: `layout`): Theme mode selection. Options: `["light", "dark", "slate"]`
    *   `copyright` (`prop`, group: `layout`): Copyright legal string (`rgx: ".*"`)
    *   `mobileGridColumns` (`prop`, group: `responsive`): Columns on mobile. Options: `["1", "2"]`
    *   `mobileAlignment` (`prop`, group: `responsive`): Alignment on mobile. Options: `["inherit", "center", "left"]`
*   **Parser Action**:
    *   `theme` default: `"light"`
    *   `copyright` default: `"© [CurrentYear] Generation Nepal. All rights reserved."`
    *   `mobileGridColumns` default: `"1"`
    *   `mobileAlignment` default: `"inherit"`

### 17. Ecommerce Navbar Block (`navbar_ecommerce`)
Main navigation header bar.
*   **Settings Map**: `ComponentNavbarSchemaSettingsMap`
*   **Properties**:
    *   `layoutVariant` (`prop`, group: `layout`): Navbar Layout Arrangement. Options: `["single-row", "double-row", "glassmorphic-sticky"]`
    *   `activeIndicator` (`prop`, group: `layout`): Active nav link highlight style. Options: `["none", "underline", "pill"]`
    *   `backgroundColor` (`prop`, group: `branding`): Navbar BG CSS value (`rgx: ".*"`)
    *   `hoverStyle` (`prop`, group: `branding`): Navigation hover effect. Options: `["text-primary", "glow-bg", "scale-up", "slide-underline"]`
    *   `enableGlassmorphism` (`prop`, group: `branding`): Enable Backdrop Blur filter. Options: `["true", "false"]`
    *   `mobileTriggerAlign` (`prop`, group: `responsive`): Hamburger alignment. Options: `["left", "right"]`
    *   `mobileLogoAlign` (`prop`, group: `responsive`): Mobile logo alignment. Options: `["left", "center"]`
    *   `mobileSearchPosition` (`prop`, group: `responsive`): Search placement. Options: `["header", "drawer", "hidden"]`
    *   `mobileUtilitiesPosition` (`prop`, group: `responsive`): Utility placement. Options: `["header", "drawer", "hidden"]`
*   **Parser Action**:
    *   `enableGlassmorphism` default: `false` (evaluated as Boolean)
    *   `layoutVariant` default: `"single-row"`
    *   `activeIndicator` default: `"none"`
    *   `hoverStyle` default: `"text-primary"`
    *   `backgroundColor` default: `""`
    *   `mobileTriggerAlign` default: `"right"`
    *   `mobileLogoAlign` default: `"left"`
    *   `mobileSearchPosition` default: `"drawer"`
    *   `mobileUtilitiesPosition` default: `"header"`

### 18. Rich Text Block (`rich_text_block`)
An advanced text element with support for customizable variants, theme colors, transformations, and weight styling.
*   **Settings Map**: `ComponentRichTextBlockSchemaSettingsMap`
*   **Properties**:
    *   `content` (`prop`): Text Content (`name: "Text Content"`, `rgx: ".*"`)
    *   `href` (`prop`): Link URL (Optional) (`name: "Link URL (Optional)"`, `rgx: ".*"`)
    *   `variant` (`prop`): Text Variant / Element type (`name: "Text Variant / Element type"`, `opt: ["body", "caption", "overline", "h6"]`)
    *   `color` (`style`): Text Color Theme (`name: "Text Color Theme"`, `opt: ["primary", "secondary", "muted", "accent"]`)
    *   `transform` (`style`): Text Transformation (`name: "Text Transformation"`, `opt: ["none", "uppercase", "capitalize"]`)
    *   `weight` (`style`): Text Font Weight (`name: "Text Font Weight"`, `opt: ["400", "500", "600", "700"]`)
    *   `lineHeight` (`style`): Line Height (`name: "Line Height"`, `opt: ["tight", "snug", "normal", "relaxed"]`)
    *   `letterSpacing` (`style`): Letter Spacing (`name: "Letter Spacing"`, `opt: ["tighter", "normal", "wider", "tracking-widest"]`)
    *   `responsiveSize` (`prop`): Responsive Font Sizes (`name: "Responsive Font Sizes"`, type: `map`, fields: `mobileSize`, `tabletSize`, `desktopSize`)
*   **Parser Action**:
    *   `content` default: `""`
    *   `href` default: `""`
    *   `variant` default: `"body"`
    *   `lineHeight` mapped to numeric value (`tight` -> `1.25`, `snug` -> `1.375`, `normal` -> `1.5`, `relaxed` -> `1.625`).
    *   `letterSpacing` mapped to numeric em (`tighter` -> `-0.05em`, `normal` -> `0em`, `wider` -> `0.05em`, `tracking-widest` -> `0.15em`).
    *   `responsiveSize` values used to dynamically inject viewport-specific media query styles.

### 18b. Image Block (`image_block`)
A premium image container with object-fit and aspect-ratio sizing controls, replacing legacy image logo workarounds.
*   **Settings Map**: `ComponentImageBlockSchemaSettingsMap`
*   **Properties**:
    *   `src` (`prop`, group: `media`): Image Source URL (`name: "Image Source URL"`, `rgx: ".*"`)
    *   `alt` (`prop`, group: `media`): Alternative Text (`name: "Alternative Text"`, `rgx: ".*"`)
    *   `objectFit` (`style`, group: `media`): Object Fit (`name: "Object Fit"`, `opt: ["contain", "cover", "fill"]`)
    *   `aspectRatio` (`style`, group: `media`): Aspect Ratio (`name: "Aspect Ratio"`, `opt: ["square", "video", "auto", "4/3"]`)
*   **Parser Action**:
    *   `src` default: `"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"`
    *   `alt` default: `"Asset image"`
    *   `aspectRatio` mapped to CSS values (`square` -> `1 / 1`, `video` -> `16 / 9`, `auto` -> `auto`, `4/3` -> `4 / 3`).

---

## 🔮 Available/Unregistered Components

The following components have settings schemas defined but are not included in the main registry list `ComponentAllSchemaSettingsMap`.

### 19. Ecommerce - Product Grid (`AEcommerceProductGridComponent`)
*   **Category**: `ecommerce`
*   **Settings Map**: `ComponentContainerSchemaSettingsMap`
*   **Properties**:
    *   `containerName` (`prop`): Section Name / Header Title (`rgx: ".*"`)
    *   `shortSubtitle` (`prop`): Subtitle text (`rgx: ".*"`)
    *   `fetchData` (`prop`): Target data filter query (`opt: ["featured"]`, `rgx: "^(category:.*)|(featured)$"`)
    *   `viewAllHref` (`prop`): Link URL for the "View All" CTA (`rgx: ".*"`)
    *   `autoScroll` (`prop`): Carousel scroll action switch. Options: `["true", "false"]`
    *   `layoutType` (`prop`): Core layout view mode. Options: `["grid", "horizontal"]`
    *   `size` (`prop`): Row item span count. Options: `["1", "2", "3", "4"]`
    *   `headerAlignment` (`prop`): Grid Header alignment. Options: `["start", "center", "between"]`
*   **Parser Action**:
    *   `autoScroll` default: `false` (evaluated as Boolean)
    *   `layoutType` default: `"grid"`
    *   `size` default: `"4"`
    *   `headerAlignment` default: `"between"`

### 20. Blog - Three Column Grid (`ABlogThreeColumnGridComponent`)
*   **Category**: `blog`
*   **Settings Map**: `ComponentBlogSchemaSettingsMap`
*   **Properties**:
    *   `title` (`prop`): Section main title (`rgx: ".*"`)
    *   `subtitle` (`prop`): Section sub-title (`rgx: ".*"`)
    *   `post[1-3]_category` (`prop`): Category label for posts 1, 2, and 3 (`rgx: ".*"`)
    *   `post[1-3]_title` (`prop`): Title header text for posts 1, 2, and 3 (`rgx: ".*"`)
    *   `post[1-3]_excerpt` (`prop`): Excerpt snippet for posts 1, 2, and 3 (`rgx: ".*"`)
    *   `post[1-3]_image` (`prop`): Cover image URL source for posts 1, 2, and 3 (`rgx: ".*"`)
*   **Parser Action**:
    *   Outputs the settings object exactly as-is (`{ ...settings }`) without specific default values.

### 21. Hero - Setup Banner (`AHeroSetupBannerComponent`)
*   **Category**: `hero`
*   **Settings Map**: `ComponentHeroSchemaSettingsMap`
*   **Properties**:
    *   `theme` (`prop`, group: `theme`): Theme mode color mode. Options: `["pri", "sec", "bg"]`
    *   `height` (`prop`, group: `layout`): Height of banner container (`rgx: "^\\d*(px|rem|%)?$"`)
    *   `layoutStructure` (`prop`, group: `layout`): Layout Geometry Model. Options: `["split", "stack", "full-bleed"]`
    *   `mobileShow` (`prop`, group: `layout`): Visible on mobile. Options: `["true", "false"]`
    *   `leftWidth` (`prop`, group: `left_slot`): Left Column Span Share (0-12). Options: `["0" through "12"]`
    *   `leftAlign` (`prop`, group: `left_slot`): Left Column Content Alignment. Options: `["start", "center", "end", "between"]`
    *   `rightWidth` (`prop`, group: `right_slot`): Right Column Span Share (0-12). Options: `["0" through "12"]`
    *   `rightAlign` (`prop`, group: `right_slot`): Right Column Content Alignment. Options: `["start", "center", "end", "between"]`
*   **Parser Action**:
    *   `theme` default: `"pri"`
    *   `height` default: `"auto"`
    *   `layoutStructure` default: `"split"`
    *   `mobileShow` default: `"true"`
    *   `leftWidth` default: `"6"`
    *   `leftAlign` default: `"start"`
    *   `rightWidth` default: `"6"`
    *   `rightAlign` default: `"start"`
