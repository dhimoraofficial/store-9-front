import { ThemeConfigs } from "@/application/runtime/builder/ThemeBuilder"
import { ComponentSchema } from "@/application/runtime/builder/type"
import { AppGlobalsComponents } from "@/application/runtime/globals"
import { AppRoutes } from "@/application/runtime/pages/route.type"
import { ApplicationLayout, ApplicationRoutes } from "@/application/runtime/pages/type"

export async function getApplicationPageRender({ route }: {
    route: string
}): Promise<{
    pageLayout: ApplicationLayout | null,
    pageRoute: ApplicationRoutes | null
}> {
    // get the current page route config
    const CurrentPageRoute = AppRoutes?.find(_x => _x.route === route)
    if (!CurrentPageRoute) {
        return {
            pageLayout: null,
            pageRoute: {
                type: "not_found",
            }
        }
    }

    if (typeof CurrentPageRoute?.layout === "object") {
        // destructure to avoid mutating the original route object
        const { layout: pageLayout, ...routeWithoutLayout } = CurrentPageRoute

        return {
            pageLayout: {
                id: CurrentPageRoute?.type,
                _c: pageLayout
            },
            pageRoute: routeWithoutLayout as ApplicationRoutes
        }
    }

    // return the page metadata
    return {
        pageRoute: null,
        pageLayout: null,
    }
}


export async function getAppGlobalComponent(componentID: string): Promise<ComponentSchema | ComponentSchema[]> {
    if (componentID !== "ALL_OTHERS") {
        return (AppGlobalsComponents?.[componentID] || {}) as ComponentSchema
    }

    let exclude = ["announcement", "navbar", "footer", "not_found"]
    let returnData: any[] = []
    for (let _p in AppGlobalsComponents) {
        if (!exclude?.includes(_p)) {
            returnData.push(AppGlobalsComponents?.[_p])
        }
    }

    return returnData as ComponentSchema[]
}


export async function getTenantThemeConfig({ tenantID, storeID }: { tenantID?: string, storeID?: string } = {}): Promise<ThemeConfigs> {
    return {
        // 1. Core Brand Identity
        primary: '#0F172A',      // Deep Navy - Professional & Authoritative
        secondary: '#3B82F6',    // Bright Blue - Clear Action/Primary
        accent: '#8B5CF6',       // Violet - For highlights or "Pro" features

        // 2. Semantic Colors
        colorSuccess: '#10B981',      // Emerald Green
        colorError: '#EF4444',        // High-Visibility Red
        colorWarning: '#F59E0B',      // Amber
        colorInfo: '#3B82F6',         // Information Blue

        // 3. Neutral Palette & Surfaces
        bgApp: '#F8FAFC',             // Light Grey/Blue - Reduces eye strain
        bgSurface: '#FFFFFF',         // Pure White - Clean content containers
        bgNavigation: '#0F172A',      // Dark Nav - Classic professional sidebar
        textMain: '#1E293B',          // Slate 800 - High legibility
        textMuted: '#64748B',         // Slate 500 - Secondary info
        textInverted: '#FFFFFF',      // White text on dark backgrounds

        // 4. Buttons & Interactive Elements
        btnRadius: '6px',             // Modern, slightly rounded
        btnPaddingBase: '10px 20px',
        btnHoverOpacity: '0.9',

        // 5. Layout & Spatial Scale
        spacingUnit: '4px',           // 4px base (8px, 16px, 24px increments)
        containerMaxWidth: '1280px',
        gridGutter: '24px',

        // 6. Borders & Elevation
        borderPrimary: '#E2E8F0',     // Subtle slate borders
        borderRadiusBase: '8px',      // Component rounding
        borderRadiusLarge: '12px',    // Card/Modal rounding
        shadowSoft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        shadowHard: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

        // 7. Typography
        fontFamilySans: 'Roboto',
        fontFamilyMono: 'Roboto',
        fontSizeRoot: '16px',
        lineHeightBase: '1.5',
    }
}