import { ComponentBoxSchemaSettingsMap } from ".";
import { ComponentSchemaSettings, valdiateComponentSetting } from "../core";

/**
 * Mutation Engine Core Hook: Iterates recursively over properties to strip out
 * untrusted custom style string data or raw inline attributes while ensuring valid 
 * configurations are cleanly mapped into structural properties or styles.
 */
export function parseBoxComponentSettings(settings: ComponentSchemaSettings): ComponentSchemaSettings {
    // Generate a shallow isolated clone to safely avoid downstream structural data mutations
    let newSettings = { ...settings };
    let finalStyles: React.CSSProperties = { ...(newSettings.style as React.CSSProperties || {}) };

    for (let setting in settings) {
        let settingName = setting;
        let settingValue = settings[setting];
        let settingConfig = (ComponentBoxSchemaSettingsMap as any)?.[settingName];

        const config = Array.isArray(settingConfig) ? settingConfig[0] : settingConfig;

        // CRITICAL VALIDATION CHECK: Run values against white-lists or strict start/end anchored bounds regex arrays.
        // If the property fails or does not match valid configurations, drop it immediately to shield the canvas.
        if (!config || !valdiateComponentSetting(config, settingValue)) {
            continue;
        }

        // Clean out data fields right after validation to maintain optimization cleanups 
        delete newSettings[setting];

        // Route parameter blocks to styles or functional props based on schema specifications
        if (config?.tp === "style") {
            finalStyles = {
                ...finalStyles,
                [config.as]: settingValue
            };
        } else if (config?.tp === "prop") {
            newSettings[config.as] = settingValue;
        }
    }

    // Bind parsed safe clean inline design elements back to the functional settings package
    newSettings.style = finalStyles;
    return newSettings;
}
