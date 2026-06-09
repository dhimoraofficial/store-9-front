import { ComponentAllSchemaSettingsMap } from ".";
import { ComponentGlobalSchemaSettingsMap, ComponentSchemaSettings, parseGlobalStyle, valdiateComponentSetting } from "./core";
import { BaseTypes } from "./type";
import { ComponentSchema } from "@/application/runtime/builder/type";

// ---------------------------------------------------------------------------
// Reverse-lookup map: CSS property name → canonical token key
// Built once from ComponentGlobalSchemaSettingsMap.
// e.g. "paddingLeft" → "pL",  "maxWidth" → "mw",  "padding" → "p"
// ---------------------------------------------------------------------------
const cssAliasToTokenKey: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    for (const [tokenKey, cfg] of Object.entries(ComponentGlobalSchemaSettingsMap)) {
        const configs = Array.isArray(cfg) ? cfg : [cfg];
        for (const c of configs) {
            if (c?.as && !map[c.as]) {
                map[c.as] = tokenKey; // first mapping wins (e.g. paddingLeft → pL, not pX)
            }
        }
    }
    return map;
})();

// ---------------------------------------------------------------------------
// Normalize a single node's settings object.
// Any key that is a CSS alias (e.g. "maxWidth") AND whose value validates
// against the corresponding global token's regex is rewritten to the token key
// (e.g. "mw").  The original CSS-name key is removed to avoid duplication.
// Keys that are already token keys (e.g. "pX") are left untouched.
// ---------------------------------------------------------------------------
function normalizeNodeSettings(settings: Record<string, any>): Record<string, any> {
    const normalized: Record<string, any> = { ...settings };

    for (const [key, value] of Object.entries(settings)) {
        // Already a known token key → skip
        if (ComponentGlobalSchemaSettingsMap[key]) continue;

        const tokenKey = cssAliasToTokenKey[key];
        if (!tokenKey) continue; // not a known CSS alias → skip

        // Only promote if the token key isn't already set in the manifest
        if (normalized[tokenKey] !== undefined) continue;

        // Validate the value against the global token's config regex
        const tokenCfg = ComponentGlobalSchemaSettingsMap[tokenKey];
        if (!tokenCfg) continue;
        const configs = Array.isArray(tokenCfg) ? tokenCfg : [tokenCfg];
        const passes = configs.some(c => valdiateComponentSetting(c, value));
        if (!passes) continue;

        // Promote: write the token key, remove the CSS alias key
        normalized[tokenKey] = value;
        delete normalized[key];
    }

    return normalized;
}

// ---------------------------------------------------------------------------
// Recursively walk a ComponentSchema tree and normalize every node's settings.
// Call this once after loading a manifest — before dispatching setSchemas.
// ---------------------------------------------------------------------------
export function normalizeSchemaSettings(nodes: ComponentSchema[]): ComponentSchema[] {
    return nodes.map(node => ({
        ...node,
        settings: node.settings ? normalizeNodeSettings(node.settings) : node.settings,
        children: node.children ? normalizeSchemaSettings(node.children) : node.children,
    }));
}


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

    const entry = ComponentAllSchemaSettingsMap[type] as any;
    if (entry && typeof entry.parse === "function") {
        // Snapshot the style object accumulated by global + generic parsers.
        // Component-specific parsers that start with `const parsed: any = {}`
        // will silently drop it — we merge it back after so global tokens
        // (pL → paddingLeft, mL → marginLeft, etc.) always survive.
        const preservedStyle = parsedSettings.style ? { ...parsedSettings.style as any } : undefined;

        parsedSettings = entry.parse(type, parsedSettings);

        // Re-apply preserved style, letting the component's own style (if any) win
        if (preservedStyle) {
            parsedSettings.style = {
                ...preservedStyle,
                ...((parsedSettings.style as any) || {}),
            };
        }
    }

    return parsedSettings;
}