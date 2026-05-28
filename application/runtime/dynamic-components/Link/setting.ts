import { ComponentLinkSchemaSettingsMap } from ".";
import { ComponentSchemaSettings, valdiateComponentSetting } from "../core";

export function parseLinkComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let newSettings = { ...settings };
    let finalStyles: React.CSSProperties = { ...(newSettings.style as React.CSSProperties || {}) };

    for (let setting in settings) {
        let settingName = setting;
        let settingValue = settings[setting];
        let settingConfig = (ComponentLinkSchemaSettingsMap as any)?.[settingName];

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue;
        }

        delete newSettings[setting];

        if (config?.tp === "style") {
            const styleKey = config.as === "hoverColor" ? "--hover-color" : config.as;
            finalStyles = {
                ...finalStyles,
                [styleKey]: settingValue
            };
        } else if (config?.tp === "prop") {
            newSettings[config.as] = settingValue;
        }
    }

    newSettings.style = finalStyles;
    return newSettings;
}
