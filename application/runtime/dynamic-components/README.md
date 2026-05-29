# Storefront Engine Component Registry: Reference Manual

This document provides a detailed breakdown of the 40+ declarative schema-driven components registered in the storefront engine, categorized by their structural, atomic, interactive, or contextual roles.

---

## 1. Global & Common Settings (Inherited By All Components)

Every dynamic component automatically inherits the **Common Styling Schema** (from `ComponentGlobalSchemaSettingsMap`). These properties map directly to root element CSS styles, utilizing standard responsive design systems.

| Settings Key | Mapping Target (`as`) | Type | Validation Rule / Regex | Description |
|---|---|---|---|---|
| `p` | `padding` | style | `^\d*\\.?\d+(rem)$` | Complete uniform padding. |
| `pT` / `pB` | `padding-top` / `padding-bottom` | style | `^\d*\\.?\d+(rem)$` | Top / bottom padding. |
| `pL` / `pR` | `padding-left` / `padding-right` | style | `^\d*\\.?\d+(rem)$` | Left / right padding. |
| `pX` / `pY` | `padding` (axis-specific) | style | `^\d*\\.?\d+(rem)$` | Axis-grouped padding values. |
| `m` | `margin` | style | `^\d*\\.?\d+(rem\|px\|%)?$` \| `auto` | Complete uniform margin. |
| `mT` / `mB` | `margin-top` / `margin-bottom` | style | `^\d*\\.?\d+(rem\|px\|%)?$` \| `auto` | Top / bottom margin. |
| `mL` / `mR` | `margin-left` / `margin-right` | style | `^\d*\\.?\d+(rem\|px\|%)?$` \| `auto` | Left / right margin. |
| `mX` / `mY` | `margin` (axis-specific) | style | `^\d*\\.?\d+(rem\|px\|%)?$` \| `auto` | Axis-grouped margin values. |
| `w` / `h` | `width` / `height` | style | `^\d*\\.?\d+(rem\|px\|%)?$` \| `100%`, `fit`, `fit-content`, `auto` | Width / height constraints. |
| `mw` / `mh` | `max-width` / `max-height` | style | `^\d*\\.?\d+(rem\|px\|%)?$` \| `100%`, `fit`, `fit-content`, `none` | Maximum width / height caps. |

---

## 2. Structural Layout Containers

Containers dictate flow, nested tracks, overlays, and responsive breakpoints. They strictly act as parent elements containing other layout elements or atoms.

### `flex_box` (Flex Container)
- **Role:** Aligning elements dynamically in a single row or column direction.
- **Customization Settings:**
  - `box-display`: `display` (prop: `block`, `flex`, `grid`, `inline-flex`)
  - `box-direction`: `direction` (prop: `row`, `row-reverse`, `col`, `col-reverse`)
  - `box-justify`: `justifyContent` (style, flex alignments)
  - `box-align`: `alignItems` (style, flex cross-axis alignments)
  - `box-gap`: `gap` (style, e.g. `12px` or `1.5rem`)
  - `box-padding`: `padding` (style, e.g. `12px` or `1.5rem`)
  - `box-bg`: `background` (style, hex/rgba/gradient)
  - `box-radius`: `borderRadius` (style, border-radius token)
  - `box-border`: `border` (style, e.g. `1px solid #e4e4e7`)
  - `box-border-top` / `box-border-bottom`: top/bottom edges specific borders (style)
  - `box-visibility`: `visibility` (prop: `all`, `desktop-only`, `mobile-only`)
  - `box-position`: `position` (style: `relative`, `absolute`, `fixed`, `sticky`)
  - `box-top` / `box-bottom` / `box-left` / `box-right`: offset coordinates (style)
  - `box-transform`: coordinate shifts / scaling (style)
  - `box-overflow-x` / `box-overflow-y`: overflow behavior (style: `hidden`, `visible`, `auto`, `scroll`)
  - `box-scroll-behavior`: smooth scroll configurations (style: `smooth`, `auto`)
  - `box-flex-wrap`: wrap children (style: `wrap`, `nowrap`, `wrap-reverse`)
  - `box-grid-cols`: template columns for grid layout (style)
  - `box-col-span` / `box-row-span`: individual columns/rows spans (style)
  - `box-col-start` / `box-row-start`: individual starting grid track (style)
  - `box-shadow`: shadow intensity effects (style)
  - `box-z-index`: vertical layer hierarchy value (style)
  - `box-cursor`: interactive pointer style (style)
  - `box-flex`: container size allocation shorthand (style)
  - `box-bg-image`: container visual background image (style)
  - `box-bg-size` / `box-bg-position`: background sizing and offset alignments (style)
  - `box-min-height`: explicit minimum height boundary (style)

### `grid_box` (Grid Container)
- **Role:** Grid alignments with row and column tracks.
- **Customization Settings:** Shares same customization parameters as `flex_box`.

### `card_box` (Card/Surface Container)
- **Role:** Surface cards with distinct elevations, borders, and shadows to highlight inner content.
- **Customization Settings:** Shares same customization parameters as `flex_box`.

### `carousel_box` (Carousel/Scroll Window)
- **Role:** Horizontal scrolling window with autoplay snap points, dots, and pagination controls.
- **Customization Settings:**
  - `auto-play`: `autoPlay` (prop: `true`, `false`)
  - `interval-speed`: `intervalSpeed` (prop, numeric ms, e.g., `5000`)
  - `show-arrows`: `showArrows` (prop: `true`, `false`)
  - `show-dots`: `showDots` (prop: `true`, `false`)
  - `overflow-behavior`: `overflowBehavior` (prop: `free-scroll`, `snap-to-slide`)
  - plus box styles: `box-padding`, `box-bg`, `box-radius`, `box-border`

### `modal_box` (Popup Modal Overlay)
- **Role:** Triggerable modal container positioned above the layout with screen dim overlays.
- **Customization Settings:**
  - `time-delay`: `timeDelay` (prop, seconds elapsed before auto-open)
  - `exit-intent`: `exitIntent` (prop: `true`, `false`, triggers when user's cursor leaves view)
  - `scroll-depth`: `scrollDepth` (prop, percentage of vertical page scroll before open)
  - `modal-bg`: `modalBg` (style, hex/rgba color for backdrop/modal body)

### `drawer_box` (Interactive Slide Drawer)
- **Role:** Screen-edge side panel sliding out for navigation overlays, carts, or filters.
- **Customization Settings:**
  - `drawer-position`: `drawerPosition` (prop: `left`, `right`)
  - `drawer-width`: `drawerWidth` (style, size unit, e.g., `350px`, `30%`)

### `accordion_box` (Collapsible Accordion)
- **Role:** Vertically stacked collapsible panels (frequently used for FAQ sections).
- **Customization Settings:**
  - `accordion-allow-multiple`: `allowMultiple` (prop: `true`, `false`, controls multi-panel open state)

### `tabs_box` (Tabbed Switcher Shell)
- **Role:** Tabs-driven panel switching mechanism.
- **Customization Settings:**
  - `tabs-layout`: `tabsLayout` (prop: `horizontal`, `vertical`)

### `sticky_box` (Sticky Container)
- **Role:** Pins itself at page coordinates while user scrolls content.
- **Customization Settings:**
  - `sticky-position`: `stickyPosition` (prop: `top`, `bottom`)

### `split_hero_box` (Split Aspect Hero Box)
- **Role:** Split side-by-side view (typically graphic elements vs call-to-actions text blocks).
- **Customization Settings:**
  - `split-ratio`: `splitRatio` (prop: `50-50`, `60-40`, `40-60`)
  - `split-flip-on-mobile`: `flipOnMobile` (prop: `true`, `false`)

### `stack_box` (Overlapping Stack)
- **Role:** Absolute-overlapping layer container stack (elements layered on z-axis).
- **Customization Settings:**
  - `stack-overlay-color`: `overlayColor` (style, hex/rgba overlay color)

### `masonry_box` (Masonry Matrix)
- **Role:** Dynamic height items masonry grid layout.
- **Customization Settings:**
  - `masonry-columns`: `masonryColumns` (prop, number of columns)

---

## 3. Content Elements & Atoms

Content atoms handle layout visuals, copy, media display, spacers, and decorations.

### `text_block` (Typography Engine)
- **Role:** Configurable text element, from headers to long paragraph text blocks.
- **Customization Settings:**
  - `content`: `content` (prop, text value)
  - `text-element`: `element` (prop: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `strong`)
  - `text-size`: `fontSize` (style, font sizing)
  - `text-weight`: `fontWeight` (style: font weights, now supports `800` & `900`)
  - `text-color`: `color` (style, text hex/var color)
  - `text-align`: `textAlign` (style: alignments)
  - `text-transform`: `textTransform` (style: uppercase/capitalize/lowercase)
  - `text-line-height`: `lineHeight` (style, line height scaling multiplier)
  - `text-spacing`: `letterSpacing` (style, letter-spacing value)
  - `text-overflow`: `overflow` (prop: `clip`, `ellipsis`, `truncate-2-lines`)
  - `text-line-clamp`: `lineClamp` (style, clamps text block to specific number of lines)
  - `text-font-style`: `fontStyle` (style: `normal`, `italic`, `oblique`)
  - `text-font-family`: `fontFamily` (style, custom typeface family)
  - `text-transform-custom`: `transform` (style, skew/rotation coordinates)
  - `text-display`: `display` (style, layout inline displays)
  - `text-hover`: `hoverEffect` (prop: `none`, `underline`, `color-change`)

### `link_block` (Hyperlink tag)
- **Role:** Interactive anchors navigating to pages, sections, or external routes.
- **Customization Settings:**
  - `link-href`: `href` (prop, destination path/URL)
  - `link-target`: `target` (prop: `_self`, `_blank`)
  - `link-title`: `title` (prop, HTML hover title)
  - `link-display`: `display` (prop: display block flow types)
  - `link-padding`: `padding` (style, spacing values)
  - `link-hover-bg`: `hoverBg` (prop: `transparent`, `bg-ghost`, `bg-accent`)
  - `link-hover-color`: `hoverColor` (style, hex color)
  - `link-decoration`: `textDecoration` (style: underline controls)
  - `link-smooth-transition`: `smoothTransition` (prop: `true`, `false`)
  - `link-analytics-id`: `analyticsId` (prop, analytics click hook tracking)
  - `link-flex-shrink`: `flexShrink` (style, prevents link container compression, e.g. `0`)

### `image_block` (Graphic Frame)
- **Role:** Standard graphic component with aspect ratios, cover scaling, and fallback modes.
- **Customization Settings:**
  - `img-src`: `src` (prop, source image URL)
  - `img-alt`: `alt` (prop, alt text description)
  - `img-loading`: `loading` (prop: `lazy`, `eager`)
  - `img-object-fit`: `objectFit` (style: fit modes)
  - `img-aspect-ratio`: `aspectRatio` (style, supports standard aspect ratios and auto)
  - `img-width` / `img-height`: `width` / `height` (style constraints, now supports rem, px, and %)
  - `img-radius`: `borderRadius` (style, border clipping radius, supports rem, px, and %)
  - `img-fallback`: `fallbackSrc` (prop, fallback image URL path)
  - `img-priority`: `priority` (prop: `true`, `false`, next/image eager priorities)

### `button_block` (Action Trigger Button)
- **Role:** Action dispatcher or submission button with hover elevations and loaders.
- **Customization Settings:**
  - `btn-variant`: `variant` (prop: `primary`, `secondary`, `outline`, `ghost`, `icon-only`)
  - `btn-size`: `buttonSize` (prop: sizes)
  - `btn-width`: `width` (style: `auto`, `100%`)
  - `btn-radius`: `borderRadius` (style, button corners radius)
  - `btn-loading`: `loading` (prop: `true`, `false`)
  - `btn-disabled`: `disabled` (prop: `true`, `false`)
  - `btn-bg-override`: `backgroundColor` (style, specific fill override color)
  - `btn-text-color`: `color` (style, button text override color)
  - `btn-elevation`: `boxShadow` (style: shadow intensities)
  - `btn-type`: `type` (prop: `button`, `submit`, `reset`)

### `svg_icon` (Vector Icon)
- **Role:** Lucide/inline system icon helper.
- **Customization Settings:**
  - `icon-name`: `iconName` (prop, key corresponding to Lucide icons map)
  - `icon-size`: `width` (style, icon sizing)
  - `icon-color`: `stroke` (style, path stroke color)
  - `icon-stroke-width`: `strokeWidth` (style, line weights)
  - `icon-fill`: `fill` (style, shape fill modes)
  - `icon-animation`: `animation` (prop: `none`, `spin`, `pulse`, `bounce`)
  - `icon-transition-speed`: `transitionDuration` (style, speed duration ms)
  - `icon-viewbox`: `viewBox` (prop, vector viewBox frame coordinates)
  - `icon-hover-color`: `hoverColor` (prop: `none`, hover class maps)
  - `icon-aria-hidden`: `ariaHidden` (prop: accessibility settings)

### `spacer_block` (Decorative Spacer)
- **Role:** Vertical or horizontal responsive whitespace separator.
- **Customization Settings:**
  - `spacer-height-desktop`: `heightDesktop` (prop, height on desktop, e.g. `40px`)
  - `spacer-height-mobile`: `heightMobile` (prop, height on mobile devices)

### `divider_block` (Content Rule Divider)
- **Role:** Rule separator border with color overrides.
- **Customization Settings:**
  - `divider-thickness`: `thickness` (style, border height, e.g. `2px`)
  - `divider-color`: `color` (style, hex line color)
  - `divider-style`: `dividerStyle` (prop: `solid`, `dashed`, `dotted`)

### `video_block` (Video Media Player)
- **Role:** Embedded video player supporting inline background loops, muted states, and autoplay.
- **Customization Settings:**
  - `video-url`: `src` (prop, source URL)
  - `video-autoplay`: `autoPlay` (prop: `true`, `false`)
  - `video-loop`: `loop` (prop: `true`, `false`)
  - `video-muted`: `muted` (prop: `true`, `false`)

### `rating_block` (Rating Stars Matrix)
- **Role:** Numeric representation mapping to rating stars icons.
- **Customization Settings:**
  - `rating-value`: `ratingValue` (prop, decimal values from `0.0` to `5.0`)
  - `rating-color`: `ratingColor` (style, path stroke/fill hex color)
  - `rating-size`: `ratingSize` (style, star icons scale px)

### `badge_block` (Metadata Status Badge)
- **Role:** Compact pills indicating product tags, stock counts, or status levels.
- **Customization Settings:**
  - `badge-text`: `badgeText` (prop, text inside badge label)
  - `badge-bg`: `backgroundColor` (style, fill hex color)
  - `badge-color`: `color` (style, text hex color)

### `html_block` (HTML Fragment Sandbox)
- **Role:** Custom HTML parser block executing custom scripts or external embed components.
- **Customization Settings:**
  - `html-content`: `htmlContent` (prop, raw HTML script context)
  - `html-sanitize`: `sanitize` (prop: `true`, `false`, checks for malicious script injection)

### `progress_bar_block` (Animated Progress Bar)
- **Role:** Horizontal bar visually showing target achievements (e.g. crowdfunding progress).
- **Customization Settings:**
  - `progress-value`: `progressValue` (prop, current progress value)
  - `progress-max`: `progressMax` (prop, target cap value)
  - `progress-color`: `progressColor` (style, filler bar hex color)

### `map_block` (Static Map Frame)
- **Role:** Static coordinates map embed using latitude/longitude vectors.
- **Customization Settings:**
  - `map-latitude`: `latitude` (prop, coordinate coordinates)
  - `map-longitude`: `longitude` (prop, coordinate coordinates)
  - `map-zoom`: `zoom` (prop, default zoom scale value)

### `price_block` (Price Display Engine)
- **Role:** Formatted currency blocks handling price display and compare price structures.
- **Customization Settings:**
  - `price-amount`: `amount` (prop, primary price decimal value)
  - `price-compare-at`: `compareAt` (prop, discount reference decimal price)
  - `price-currency`: `currency` (prop: `USD`, `NPR`, `INR`, `EUR`)

### `countdown_block` (Countdown Timer)
- **Role:** Running timers highlighting flash deals, with expiry state handling.
- **Customization Settings:**
  - `countdown-target`: `target` (prop, ISO date string)
  - `countdown-on-expiry`: `onExpiry` (prop: `hide`, `show-message`)

---

## 4. Stateful Form Elements & Intake

Form controls capture inputs and forward data context payload to the wrapping context form.

### `form_wrapper` (Functional Form Wrapper)
- **Role:** Form element container grouping child fields and dispatching payloads on submit.
- **Customization Settings:**
  - `form-action`: `action` (prop, redirect destination path or route endpoint)
  - `form-method`: `method` (prop: `GET`, `POST`)
  - `form-layout`: `layout` (prop: layout flow)
  - `form-gap`: `gap` (style, field elements separator gap)
  - `form-autocomplete`: `autoComplete` (prop: autofill toggle)
  - `form-novalidate`: `noValidate` (prop: skip default input verification checks)
  - `form-padding` / `form-bg` / `form-radius`: Styling settings
  - `form-id-hook`: `idHook` (prop, unique ID key used during backend hooks)

### `input_field` / `input_block` (Text Input Field)
- **Role:** Text field capturing emails, password queries, text descriptions, or numbers.
- **Customization Settings:** Shares customization settings with `ComponentInputSchemaSettingsMap` (types, placeholders, validation, etc.).

### `textarea_field` (Long Text Area)
- **Role:** Large text area container mapping multiple line fields (e.g., feedback box).
- **Customization Settings:**
  - `textarea-rows`: `rows` (prop, line count, e.g. `4`)
  - `textarea-placeholder`: `placeholder` (prop, input placeholder text hint)

### `checkbox_field` (Boolean Checkbox)
- **Role:** Boolean switcher fields capturing binary status inputs (e.g., terms agreement).
- **Customization Settings:**
  - `checkbox-checked`: `checked` (prop: `true`, `false`)
  - `checkbox-label`: `label` (prop, field descriptive text)

### `radio_field` (Radio Option Group)
- **Role:** Group of selection items where only one can be checked at any time.
- **Customization Settings:**
  - `radio-options`: `options` (prop, comma-separated option strings)

### `select_field` (Select Option Dropdown)
- **Role:** Expandable select option dropdown menu wrapper.
- **Customization Settings:**
  - `select-options`: `options` (prop, comma-separated dropdown option strings)

### `quantity_selector` (Quantity Selector)
- **Role:** Counter widget displaying plus and minus triggers commonly placed on cart pages.
- **Customization Settings:**
  - `qty-min`: `min` (prop, minimum quantity limit)
  - `qty-max`: `max` (prop, maximum quantity limit)
  - `qty-step`: `step` (prop, step value intervals)

---

## 5. E-Commerce Content Loops & Context Proxies

Context loops bind product catalogs and order details down to nested children elements.

### `product_loop_context` (Product Grid Iterator)
- **Role:** Context block that loops over a catalog collection to render nested product templates.
- **Customization Settings:**
  - `collection-context`: `collectionContext` (prop, handle matching catalog collection)
  - `product-limit`: `limit` (prop, maximum amount of products to fetch)
  - `product-sort`: `sort` (prop: `best-selling`, `price-asc`, `price-desc`, `created-desc`)

### `category_loop_context` (Category Loop Iterator)
- **Role:** Context block iterating collections categories layouts.
- **Customization Settings:**
  - `category-limit`: `limit` (prop, maximum category items count)

### `cart_items_context` (Cart Items Context Loop)
- **Role:** Iterates over items currently added to cart to render details.
- **Customization Settings:**
  - `cart-empty-message`: `emptyMessage` (prop, text fallback displayed when cart contains no items)

### `product_variant_selector` (Variant Option Selector)
- **Role:** Selectors rendering variant size, color, or other material options.
- **Customization Settings:**
  - `selector-style`: `selectorStyle` (prop: `dropdown`, `pills`, `swatches`)

### `product_image_gallery` (Product Image Gallery)
- **Role:** Display container presenting product thumbnails and main graphics.
- **Customization Settings:**
  - `gallery-thumbnails`: `thumbnails` (prop: thumbnail positioning `left`, `right`, `bottom`)
  - `gallery-zoom`: `zoom` (prop: hover magnification toggle `true`, `false`)
