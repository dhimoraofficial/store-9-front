import { ComponentButtonSchemaSettingsMap } from ".";
import { ComponentSchemaSettings, valdiateComponentSetting } from "../core";

export function parseButtonComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    let newSettings = { ...settings };
    let finalStyles: React.CSSProperties = { ...(newSettings.style as React.CSSProperties || {}) };

    for (let setting in settings) {
        let settingName = setting;
        let settingValue = settings[setting];
        let settingConfig = (ComponentButtonSchemaSettingsMap as any)?.[settingName];

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue;
        }

        delete newSettings[setting];

        if (config?.tp === "style") {
            const styleKey = config.as;
            let val = settingValue;
            if (styleKey === "boxShadow") {
                const shadows: Record<string, string> = {
                    none: "none",
                    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                };
                val = shadows[settingValue] || "none";
            }
            finalStyles = {
                ...finalStyles,
                [styleKey]: val
            };
        } else if (config?.tp === "prop") {
            newSettings[config.as] = settingValue;
        }
    }

    newSettings.style = finalStyles;
    return newSettings;
}
