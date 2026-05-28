import { parseBoxComponentSettings } from "./Box/setting";
import { parseTextComponentSettings } from "./Text/setting";
import { parseLinkComponentSettings } from "./Link/setting";
import { parseButtonComponentSettings } from "./Button/setting";
import { parseImageComponentSettings } from "./Image/setting";
import { parseInputComponentSettings } from "./Input/setting";
import { parseIconComponentSettings } from "./Icon/setting";
import { parseFormComponentSettings } from "./Form/setting";
import { parseCarouselBoxComponentSettings } from "./CarouselBox/setting";
import { ComponentAllSchemaSettingsMap } from "./main";
import { ComponentGlobalSchemaSettingsMap, ComponentSchemaSettings, parseGlobalStyle, valdiateComponentSetting } from "./core";
import { BaseTypes } from "./type";

// settings parser for button, like button-type, onCLick
function parseGlobalComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    const newSettings: ComponentSchemaSettings = { ...(settings || {}) }

    for (let setting in (settings || {})) {
        let settingName = setting
        let settingValue = settings[setting]
        let settingConfig = ComponentGlobalSchemaSettingsMap?.[settingName]

        if (!settingConfig) {
            continue
        }

        const configs = Array.isArray(settingConfig) ? settingConfig : [settingConfig];

        let isValid = false;
        for (const config of configs) {
            if (config && valdiateComponentSetting(config, settingValue)) {
                isValid = true;
            }
        }

        if (!isValid) {
            continue;
        }

        // delete the field after the use, so that unwamted things are never used
        delete newSettings[setting]

        for (const config of configs) {
            if (config?.tp === "style") {
                newSettings.style = parseGlobalStyle((newSettings.style || {}), settingValue, config)
            }
        }

        continue
    }

    return newSettings
}

// Generic fallback parser for new layout and loop contexts
function parseGenericComponentSettings(type: string, settings: ComponentSchemaSettings): ComponentSchemaSettings {
    const entry = ComponentAllSchemaSettingsMap[type];
    if (!entry) return settings;
    const settingsMap = ("settings" in entry) ? entry.settings : entry;

    let newSettings = { ...settings };
    let finalStyles: React.CSSProperties = { ...(newSettings.style as React.CSSProperties || {}) };

    for (let setting in settings) {
        let settingName = setting;
        let settingValue = settings[setting];
        let settingConfig = (settingsMap as any)?.[settingName];

        if (!settingConfig) {
            continue;
        }

        const configs = Array.isArray(settingConfig) ? settingConfig : [settingConfig];

        let isValid = false;
        for (const config of configs) {
            if (config && valdiateComponentSetting(config, settingValue)) {
                isValid = true;
            }
        }

        if (!isValid) {
            continue;
        }

        delete newSettings[setting];

        for (const config of configs) {
            if (config?.tp === "style") {
                finalStyles = {
                    ...finalStyles,
                    [config.as]: settingValue
                };
            } else if (config?.tp === "prop") {
                newSettings[config.as] = settingValue;
            }
        }
    }

    newSettings.style = finalStyles;
    return newSettings;
}

// the gloabl router that routes all compoennts
export function getParsedSettings(type: BaseTypes, settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let parsedSettings: ComponentSchemaSettings = parseGlobalComponentSettings(settings) as ComponentSchemaSettings;

    if (type === "box" || type === "flex_box" || type === "grid_box" || type === "card_box") {
        parsedSettings = parseBoxComponentSettings(parsedSettings);
    } else if (type === "carousel_box") {
        parsedSettings = parseCarouselBoxComponentSettings(parsedSettings);
    } else if (type === "text" || type === "text_block") {
        parsedSettings = parseTextComponentSettings(parsedSettings);
    } else if (type === "link" || type === "link_block") {
        parsedSettings = parseLinkComponentSettings(parsedSettings);
    } else if (type === "button" || type === "button_block") {
        parsedSettings = parseButtonComponentSettings(parsedSettings);
    } else if (type === "image" || type === "image_block") {
        parsedSettings = parseImageComponentSettings(parsedSettings);
    } else if (type === "input" || type === "search_query" || type === "input_block" || type === "input_field") {
        parsedSettings = parseInputComponentSettings(parsedSettings);
    } else if (type === "icon" || type === "svg_icon") {
        parsedSettings = parseIconComponentSettings(parsedSettings);
    } else if (type === "form" || type === "form_wrapper") {
        parsedSettings = parseFormComponentSettings(parsedSettings);
    } else {
        parsedSettings = parseGenericComponentSettings(type, parsedSettings);
    }

    return parsedSettings;
}