import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder";

/**
 * Default Theme Configuration
 * RGB version
 */
export const defaultThemeConfig: ThemeConfigs = {
    // 1. Core Brand Identity
    primary: 'rgb(26, 26, 26)',
    secondary: 'rgb(197, 168, 128)',
    accent: 'rgb(224, 122, 95)',

    // 2. Semantic Colors
    colorSuccess: 'rgb(16, 185, 129)',
    colorError: 'rgb(239, 68, 68)',
    colorWarning: 'rgb(245, 158, 11)',
    colorInfo: 'rgb(59, 130, 246)',

    // 3. Neutral Palette & Surfaces
    bgApp: 'rgb(250, 250, 250)',
    bgSurface: 'rgb(255, 255, 255)',
    bgNavigation: 'rgb(26, 26, 26)',
    textMain: 'rgb(45, 45, 45)',
    textMuted: 'rgb(122, 122, 122)',
    textInverted: 'rgb(255, 255, 255)',

    // 4. Buttons & Interactive Elements
    btnRadius: '4px',
    btnPaddingBase: '12px 24px',
    btnHoverOpacity: '0.9',

    // 5. Layout & Spatial Scale
    spacingUnit: '4px',
    containerMaxWidth: '1200px',
    gridGutter: '32px',

    // 6. Borders & Elevation
    borderPrimary: 'rgb(235, 235, 235)',
    borderRadiusBase: '4px',
    borderRadiusLarge: '8px',
    shadowSoft: '0 2px 8px rgba(0, 0, 0, 0.05)',
    shadowHard: '0 8px 24px rgba(0, 0, 0, 0.08)',

    // 7. Typography
    fontFamilySans: 'Outfit',
    fontFamilyMono: 'Outfit',
    fontSizeRoot: '16px',
    lineHeightBase: '1.6',
};