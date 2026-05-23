import { ComponentSchemaSettings, ComponentSchemaSettingsMap } from "../builder/settings";
import { BaseTypes } from "./type";

// settings parser for button, like button-type, onCLick
function parseBoxComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {

    return settings
}

// settings parser for global compoennts, like width height
function parseGobalComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {

    return settings
}

// the gloabl router that routes all compoennts
export function getParsedSettings(type: BaseTypes, settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let parsedSettings: ComponentSchemaSettings = parseGobalComponentSettings(settings) as ComponentSchemaSettings;

    if (type === "box") {
        parsedSettings = parseBoxComponentSettings(settings)
    }

    return parsedSettings
}