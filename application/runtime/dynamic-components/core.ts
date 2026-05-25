// now you have 2 level of customization on elements first style wise
// second setting wise, 

import { checkRegX } from "@/application/utility";
import { CSSProperties } from "react";
import { ComponentBoxSchemaSettings } from "./Box";
import { ComponentTextSchemaSettings } from "./Text";


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
} & ComponentTextSchemaSettings & ComponentBoxSchemaSettings

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
        as: "padding-left",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pT: {
        tp: "style",
        as: "padding-top",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pR: {
        tp: "style",
        as: "padding-right",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pB: {
        tp: "style",
        as: "padding-bottom",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    pX: [
        {
            tp: "style",
            as: "padding-left",
            rgx: "^\\d*\\.?\\d+(rem)$"
        },
        {
            tp: "style",
            as: "padding-right",
            rgx: "^\\d*\\.?\\d+(rem)$"
        }
    ],
    pY: [
        {
            tp: "style",
            as: "padding-top",
            rgx: "^\\d*\\.?\\d+(rem)$"
        },
        {
            tp: "style",
            as: "padding-bottom",
            rgx: "^\\d*\\.?\\d+(rem)$"
        }
    ],

    m: {
        tp: "style",
        as: "margin",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    mL: {
        tp: "style",
        as: "margin-left",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    mT: {
        tp: "style",
        as: "margin-top",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    mR: {
        tp: "style",
        as: "margin-right",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    mB: {
        tp: "style",
        as: "margin-bottom",
        rgx: "^\\d*\\.?\\d+(rem)$"
    },
    mX: [
        {
            tp: "style",
            as: "margin-left",
            rgx: "^\\d*\\.?\\d+(rem)$"
        },
        {
            tp: "style",
            as: "margin-right",
            rgx: "^\\d*\\.?\\d+(rem)$"
        }
    ],
    mY: [
        {
            tp: "style",
            as: "margin-top",
            rgx: "^\\d*\\.?\\d+(rem)$"
        },
        {
            tp: "style",
            as: "margin-bottom",
            rgx: "^\\d*\\.?\\d+(rem)$"
        }
    ],

    w: {
        tp: "style",
        as: "width",
        rgx: "^\\d*\\.?\\d+(rem)$",
        opt: [
            "100%",
            "fit"
        ]
    },
    h: {
        tp: "style",
        as: "height",
        rgx: "^\\d*\\.?\\d+(rem)$",
        opt: [
            "100%",
            "fit"
        ]
    },
    mw: {
        tp: "style",
        as: "max-width",
        rgx: "^\\d*\\.?\\d+(rem)$",
        opt: [
            "100%",
            "fit"
        ]
    },
    mh: {
        tp: "style",
        as: "max-height",
        rgx: "^\\d*\\.?\\d+(rem)$",
        opt: [
            "100%",
            "fit"
        ]
    },
}

export function valdiateComponentSetting(settingConfig: ComponentSettingsSchema, settingValue: string) {
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