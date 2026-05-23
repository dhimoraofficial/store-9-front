import { ComponentBoxSchemaSettingsMap } from "./box"
import {
    ComponentTextSchemaSettings,
    ComponentTextSchemaSettingsMap
} from "./text"

export type ComponentSchemaSettings = {
    // Basic spacing and layout tokens
    p?: number
    pL?: number
    pT?: number
    pR?: number
    pB?: number
    pX?: number
    pY?: number

    m?: number
    mL?: number
    mT?: number
    mR?: number
    mB?: number
    mX?: number
    mY?: number

    w?: "full" | number
    h?: "full" | number

    mw?: "full" | number
    mh?: "full" | number
} & ComponentTextSchemaSettings

export const ComponentSchemaSettingsMap = {
    common: {
        p: {
            tp: "style",
            as: "padding",
            rgx: "\d"
        },
        pL: {
            tp: "style",
            as: "padding-left",
            rgx: "\d"
        },
        pT: {
            tp: "style",
            as: "padding-top",
            rgx: "\d"
        },
        pR: {
            tp: "style",
            as: "padding-right",
            rgx: "\d"
        },
        pB: {
            tp: "style",
            as: "padding-bottom",
            rgx: "\d"
        },
        pX: [
            {
                tp: "style",
                as: "padding-left",
                rgx: "\d"
            },
            {
                tp: "style",
                as: "padding-right",
                rgx: "\d"
            }
        ],
        pY: [
            {
                tp: "style",
                as: "padding-top",
                rgx: "\d"
            },
            {
                tp: "style",
                as: "padding-bottom",
                rgx: "\d"
            }
        ],

        m: {
            tp: "style",
            as: "margin",
            rgx: "\d"
        },
        mL: {
            tp: "style",
            as: "margin-left",
            rgx: "\d"
        },
        mT: {
            tp: "style",
            as: "margin-top",
            rgx: "\d"
        },
        mR: {
            tp: "style",
            as: "margin-right",
            rgx: "\d"
        },
        mB: {
            tp: "style",
            as: "margin-bottom",
            rgx: "\d"
        },
        mX: [
            {
                tp: "style",
                as: "margin-left",
                rgx: "\d"
            },
            {
                tp: "style",
                as: "margin-right",
                rgx: "\d"
            }
        ],
        mY: [
            {
                tp: "style",
                as: "margin-top",
                rgx: "\d"
            },
            {
                tp: "style",
                as: "margin-bottom",
                rgx: "\d"
            }
        ],

        w: {
            tp: "style",
            as: "width",
            rgx: "\d",
            opt: [
                "full",
                "fit"
            ]
        },
        h: {
            tp: "style",
            as: "height",
            rgx: "\d",
            opt: [
                "full",
                "fit"
            ]
        },
        mw: {
            tp: "style",
            as: "max-width",
            rgx: "\d",
            opt: [
                "full",
                "fit"
            ]
        },
        mh: {
            tp: "style",
            as: "max-height",
            rgx: "\d",
            opt: [
                "full",
                "fit"
            ]
        },
    },

    text: ComponentTextSchemaSettingsMap,

    box: ComponentBoxSchemaSettingsMap,
}