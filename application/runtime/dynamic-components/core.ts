// now you have 2 level of customization on elements first style wise
// second setting wise, 

import { checkRegX } from "@/application/utility";
import { CSSProperties } from "react";


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
    tp: "style" | "prop"
    as: string
    rgx?: string
    opt?: string[]
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

export function valdiateComponentSetting(settingConfig: ComponentSettingsSchema, settingValue: string) {
    if (!settingConfig?.rgx && !settingConfig?.opt) {
        return true;
    }
    let verification = checkRegX(settingConfig?.rgx, settingValue)

    if (settingConfig?.opt) {
        verification = verification || settingConfig?.opt?.includes(settingValue)
    }

    return verification
}

export function parseGlobalStyle(stylesList: CSSProperties, styleValue: any, settingConfig: ComponentSettingsSchema) {
    if (valdiateComponentSetting(settingConfig, styleValue)) {
        (stylesList as any)[settingConfig?.as] = styleValue
    }

    return stylesList
}