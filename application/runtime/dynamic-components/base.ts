import { ComponentAllSchemaSettingsMap } from ".";
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
                    [config.as!]: settingValue
                };
            } else if (config?.tp === "prop" || config?.tp === "map") {
                newSettings[config.as!] = settingValue;
            }
        }
    }

    newSettings.style = finalStyles;
    return newSettings;
}

// the gloabl router that routes all compoennts
export function getParsedSettings(type: BaseTypes, settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let parsedSettings: ComponentSchemaSettings = parseGlobalComponentSettings(settings) as ComponentSchemaSettings;
    parsedSettings = parseGenericComponentSettings(type, parsedSettings);

    const entry = ComponentAllSchemaSettingsMap[type];
    if (entry && "parse" in entry && typeof entry.parse === "function") {
        parsedSettings = entry.parse(type, parsedSettings);
    }

    return parsedSettings;
}