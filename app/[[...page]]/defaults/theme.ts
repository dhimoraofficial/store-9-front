import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder";

/**
 * Default Theme Configuration
 * Elegant, minimalist color palette designed for high-end fashion and lifestyle storefronts.
 */
export const defaultThemeConfig: ThemeConfigs = {
    // 1. Core Brand Identity
    primary: '#1A1A1A',      // Elegant Charcoal Black
    secondary: '#C5A880',    // Warm Rose Gold/Beige
    accent: '#E07A5F',       // Muted Terracotta

    // 2. Semantic Colors
    colorSuccess: '#10B981',      // Emerald Green
    colorError: '#EF4444',        // High-Visibility Red
    colorWarning: '#F59E0B',      // Amber
    colorInfo: '#3B82F6',         // Information Blue

    // 3. Neutral Palette & Surfaces
    bgApp: '#FAFAFA',             // Warm White/Off-white background
    bgSurface: '#FFFFFF',         // Pure White
    bgNavigation: '#1A1A1A',      // Charcoal Black Nav
    textMain: '#2D2D2D',          // Very Dark Grey
    textMuted: '#7A7A7A',         // Slate Muted Grey
    textInverted: '#FFFFFF',      // White text

    // 4. Buttons & Interactive Elements
    btnRadius: '4px',             // Minimalist sharp-rounded borders
    btnPaddingBase: '12px 24px',
    btnHoverOpacity: '0.9',

    // 5. Layout & Spatial Scale
    spacingUnit: '4px',           // 4px base
    containerMaxWidth: '1200px',
    gridGutter: '32px',           // Generous fashion-grade margins

    // 6. Borders & Elevation
    borderPrimary: '#EBEBEB',     // Soft grey border
    borderRadiusBase: '4px',
    borderRadiusLarge: '8px',
    shadowSoft: '0 2px 8px rgba(0, 0, 0, 0.05)',
    shadowHard: '0 8px 24px rgba(0, 0, 0, 0.08)',

    // 7. Typography
    fontFamilySans: 'Outfit',     // Fashion Sans Serif
    fontFamilyMono: 'Outfit',
    fontSizeRoot: '16px',
    lineHeightBase: '1.6',
};
