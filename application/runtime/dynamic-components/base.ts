import { parseBoxComponentSettings } from "./Box";
import { ComponentGlobalSchemaSettingsMap, ComponentSchemaSettings, parseGlobalStyle, valdiateComponentSetting } from "./core";
import { BaseTypes } from "./type";

// settings parser for button, like button-type, onCLick
function parseGlobalComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    const newSettings: ComponentSchemaSettings = { ...(settings || {}) }

    for (let setting in (settings || {})) {
        let settingName = setting
        let settingValue = settings[setting]
        let settingConfig = ComponentGlobalSchemaSettingsMap?.[settingName]

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        // validate the compoennt vlaue against regx or options avaible,
        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue
        }

        // delete the field after the use, so that unwamted things are never used
        // NOTE: here if the prop like style or any html tags are used than thesea re also remvoed
        // so when you upgrade system like allow user to add custom style than think of improvemnt
        delete newSettings[setting]


        if (config?.tp === "style") {
            newSettings.style = parseGlobalStyle((newSettings.style || {}), settingValue, config)
        }

        // well none of the component can have common settings, eg href have no use in button 
        // so, nothing like global setting, will apply if needed after 

        continue
    }

    return newSettings
}


// the gloabl router that routes all compoennts
export function getParsedSettings(type: BaseTypes, settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let parsedSettings: ComponentSchemaSettings = parseGlobalComponentSettings(settings) as ComponentSchemaSettings;

    if (type === "box") {
        parsedSettings = parseBoxComponentSettings(parsedSettings)
    }

    return parsedSettings
}