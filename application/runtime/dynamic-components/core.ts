// now you have 2 level of customization on elements first style wise
// second setting wise, 

import { checkRegX } from "@/application/utility";
import { CSSProperties } from "react";
import * as Lucide from "lucide-react";

export const LUCIDE_ICON_NAMES = Object.keys(Lucide).filter(key => 
    /^[A-Z][a-zA-Z0-9]*$/.test(key) && 
    (typeof (Lucide as any)[key] === "function" || typeof (Lucide as any)[key] === "object")
);



export type ComponentSchemaSettings = {
    // Basic spacing and layout tokens
    p?: number | string
    pL?: number | string
    pT?: number | string
    pR?: number | string
    pB?: number | string
    pX?: ComponentSettingsSchema[]
    pY?: number | string

    m?: number | string
    mL?: number | string
    mT?: number | string
    mR?: number | string
    mB?: number | string
    mX?: ComponentSettingsSchema[]
    mY?: number | string

    w?: "100%" | number | string
    h?: "100%" | number | string

    mw?: "100%" | number | string
    mh?: "100%" | number | string

    style?: CSSProperties
    [key: string]: any
}

export interface ComponentSettingsSchema {
    /**
     * The type of settings field:
     * - "style": Directly maps to CSS styles (e.g. padding, margin, width).
     * - "prop": Standard component props/options (e.g. text labels, booleans).
     * - "multiple": Custom array/delimited inputs.
     * - "map": A repeating array structure containing nested object rows.
     */
    tp?: "style" | "prop" | "multiple" | "map"

    /**
     * The target key alias this setting maps to when rendering the client component.
     */
    as?: string

    /**
     * Regular expression string constraint used to validate the user input value in the editor.
     */
    rgx?: string

    /**
     * Pre-defined selection choices rendered as a select menu in the editor sidebar.
     */
    opt?: string[]

    /**
     * Prototype map template defining types of properties.
     */
    proto?: Record<string, "string" | "number" | "boolean">

    /**
     * Nested fields configuration used when `tp` is "map" to represent repeating row items.
     */
    fields?: ComponentSettingsSchema[]

    /**
     * Friendly, human-readable display label shown next to the input field in the editor UI.
     */
    name?: string

    /**
     * Detailed description or tooltip explanation displayed on hover to help administrators.
     */
    description?: string

    /**
     * Category group tag name (e.g. "banner", "branding"). 
     * Fields sharing the same group are grouped under collapsible panel folders in the sidebar.
     */
    group?: string

    /**
     * Conditional visibility rule. The field is only displayed in the editor sidebar 
     * if the condition evaluates to true based on other settings' current values.
     */
    condition?: {
        /** The dependent field key to monitor. */
        for: string;
        /** Allowed values (multiple choices). */
        opt?: string[];
        /** A specific single matching value. */
        val?: string;
    }[]
}

export type ComponentGlobalSchemaSettingsMapType = Partial<Record<Partial<keyof ComponentSchemaSettings>, ComponentSettingsSchema | ComponentSettingsSchema[]>>

export const ComponentGlobalSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    p: {
        tp: "style",
        as: "padding",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pL: {
        tp: "style",
        as: "paddingLeft",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pT: {
        tp: "style",
        as: "paddingTop",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pR: {
        tp: "style",
        as: "paddingRight",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pB: {
        tp: "style",
        as: "paddingBottom",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pX: [
        {
            tp: "style",
            as: "paddingLeft",
            rgx: "^\\d*\\.?\\d+(rem)$"
        },
        {
            tp: "style",
            as: "paddingRight",
            rgx: "^\\d*\\.?\\d+(rem)$"
        }
    ],
    pY: [
        {
            tp: "style",
            as: "paddingTop",
            rgx: "^\\d*\\.?\\d+(rem)$"
        },
        {
            tp: "style",
            as: "paddingBottom",
            rgx: "^\\d*\\.?\\d+(rem)$"
        }
    ],

    m: {
        tp: "style",
        as: "margin",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: ["auto"]
    },
    mL: {
        tp: "style",
        as: "marginLeft",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: ["auto"]
    },
    mT: {
        tp: "style",
        as: "marginTop",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: ["auto"]
    },
    mR: {
        tp: "style",
        as: "marginRight",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: ["auto"]
    },
    mB: {
        tp: "style",
        as: "marginBottom",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: ["auto"]
    },
    mX: [
        {
            tp: "style",
            as: "marginLeft",
            rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
            opt: ["auto"]
        },
        {
            tp: "style",
            as: "marginRight",
            rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
            opt: ["auto"]
        }
    ],
    mY: [
        {
            tp: "style",
            as: "marginTop",
            rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
            opt: ["auto"]
        },
        {
            tp: "style",
            as: "marginBottom",
            rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
            opt: ["auto"]
        }
    ],

    w: {
        tp: "style",
        as: "width",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: [
            "100%",
            "fit",
            "fit-content",
            "auto"
        ]
    },
    h: {
        tp: "style",
        as: "height",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: [
            "100%",
            "fit",
            "fit-content",
            "auto"
        ]
    },
    mw: {
        tp: "style",
        as: "maxWidth",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: [
            "100%",
            "fit",
            "fit-content",
            "none"
        ]
    },
    mh: {
        tp: "style",
        as: "maxHeight",
        rgx: "^\\d*\\.?\\d+(rem|px|%)?$",
        opt: [
            "100%",
            "fit",
            "fit-content",
            "none"
        ]
    },
}

export function valdiateComponentSetting(settingConfig: ComponentSettingsSchema, settingValue: any): boolean {
    if (settingConfig?.tp === "map") {
        if (settingValue === undefined || settingValue === null) {
            return true;
        }
        if (!Array.isArray(settingValue)) {
            return false;
        }
        if (!settingConfig.fields) {
            return true;
        }
        for (const item of settingValue) {
            if (typeof item !== "object" || item === null) {
                return false;
            }
            for (const subField of settingConfig.fields) {
                if (subField.tp === "map") {
                    const nestedValue = subField.as ? item[subField.as] : undefined;
                    if (!valdiateComponentSetting(subField, nestedValue)) {
                        return false;
                    }
                } else if (subField.as) {
                    const subValue = item[subField.as];
                    if (!valdiateComponentSetting(subField, subValue)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    const valString = String(settingValue ?? "");
    if (valString === "") {
        return true;
    }

    // Check if it's an icon setting field
    const isIconField = 
        settingConfig?.as === "icon" || 
        settingConfig?.as === "icon-name" || 
        settingConfig?.name?.toLowerCase().includes("icon") ||
        settingConfig?.description?.toLowerCase().includes("icon");

    if (isIconField) {
        const formattedName = valString
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
        const isValidIcon = !!(Lucide as any)[formattedName] || !!(Lucide as any)[valString];
        if (!isValidIcon) {
            return false;
        }
    }

    if (!settingConfig?.rgx && !settingConfig?.opt) {
        return true;
    }
    
    let verification = checkRegX(settingConfig?.rgx, valString)

    if (settingConfig?.opt) {
        verification = verification || settingConfig?.opt?.includes(valString)
    }

    return verification as boolean
}

export function parseGlobalStyle(stylesList: CSSProperties, styleValue: any, settingConfig: ComponentSettingsSchema) {
    (stylesList as any)[settingConfig?.as!] = styleValue
    return stylesList
}