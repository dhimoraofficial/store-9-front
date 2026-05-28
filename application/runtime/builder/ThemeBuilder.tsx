"use client"

import { ReactNode, useEffect, useMemo } from 'react'

export interface ThemeConfigs {
    primary: string
    secondary: string
    accent: string

    colorSuccess: string
    colorError: string
    colorWarning: string
    colorInfo: string

    bgApp: string           // Main page background
    bgSurface: string       // Cards, Modals, Popovers
    bgNavigation: string    // Sidebar or Navbar
    textMain: string        // Primary readability
    textMuted: string       // Secondary labels
    textInverted: string    // Text on dark backgrounds

    btnRadius: string
    btnPaddingBase: string
    btnHoverOpacity: string

    spacingUnit: string     // The base multiplier (e.g., 4px or 8px)
    containerMaxWidth: string
    gridGutter: string

    borderPrimary: string
    borderRadiusBase: string
    borderRadiusLarge: string
    shadowSoft: string
    shadowHard: string

    fontFamilySans: string
    fontFamilyMono: string
    fontSizeRoot: string    // Control base REM size
    lineHeightBase: string
}

export default function ThemeBuilder({ children, themeConfigs }: {
    children: ReactNode,
    themeConfigs: Partial<ThemeConfigs>
}) {
    // Memoize the variable mapping to avoid unnecessary recalculations
    const cssVariables = useMemo(() => {
        const vars: Record<string, string> = {};
        Object.entries(themeConfigs).forEach(([key, value]) => {
            if (value) {
                // Convert camelCase 'brandPrimary' to '--brand-primary'
                const cssVarName = `--${key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}`;
                vars[cssVarName] = String(value);
            }
        });
        return vars;
    }, [themeConfigs]);

    useEffect(() => {
        const root = document.documentElement;

        // Apply all variables to the root element
        Object.entries(cssVariables).forEach(([prop, val]) => {
            root.style.setProperty(prop, val);
        });

        // Clean up or reset if necessary when tenant changes
    }, [cssVariables]);

    return children
}