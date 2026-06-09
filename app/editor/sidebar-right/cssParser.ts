import { ComponentGlobalSchemaSettingsMap, valdiateComponentSetting } from "@/application/runtime/dynamic-components/core";

// Converts CamelCase style objects to standard CSS declarations
export function formatStyleObjectToCss(style: Record<string, any>): string {
    return Object.entries(style || {})
        .filter(([_, val]) => val !== undefined && val !== null && val !== "")
        .map(([key, val]) => {
            const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
            return `  ${kebabKey}: ${val};`;
        })
        .join("\n");
}

// Parses standard CSS declaration strings back into a CamelCase style object
export function parseCssToStyleObject(cssText: string): Record<string, string> {
    const styles: Record<string, string> = {};
    
    // Extract everything between element { and } if braces are present
    let innerContent = cssText;
    const bracketMatch = cssText.match(/element\s*\{([^}]+)\}/);
    if (bracketMatch) {
        innerContent = bracketMatch[1];
    }

    const declarationRegex = /([\w-]+)\s*:\s*([^;]+)/g;
    let match;
    while ((match = declarationRegex.exec(innerContent)) !== null) {
        const prop = match[1].trim();
        const val = match[2].trim();
        const camelProp = prop.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        styles[camelProp] = val;
    }
    
    return styles;
}

// Helper to gather active stylesheet rules targeting a DOM element
export function getMatchedCSSRules(element: HTMLElement): { selector: string; cssText: string }[] {
    const matched: { selector: string; cssText: string }[] = [];
    if (!element) return matched;

    // Recursive helper to look inside media rules
    const walkRules = (rules: CSSRuleList) => {
        for (const rule of Array.from(rules)) {
            if (rule instanceof CSSStyleRule) {
                // Ignore extremely broad selectors
                if (rule.selectorText === "*" || rule.selectorText === "body" || rule.selectorText === "html") {
                    continue;
                }
                try {
                    if (element.matches(rule.selectorText)) {
                        matched.push({
                            selector: rule.selectorText,
                            cssText: rule.style.cssText
                        });
                    }
                } catch (err) {
                    // Invalid selectors might throw error in matches
                }
            } else if (rule instanceof CSSMediaRule) {
                try {
                    if (window.matchMedia(rule.media.mediaText).matches) {
                        walkRules(rule.cssRules);
                    }
                } catch (err) {
                    // Ignore security or parsing errors inside media rules
                }
            }
        }
    };

    // Scan all active stylesheets
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            const rules = sheet.cssRules || sheet.rules;
            if (rules) {
                walkRules(rules);
            }
        } catch (e) {
            // Ignore cross-origin stylesheet errors
        }
    }

    return matched;
}

export function syncCssEditToSettings(cssText: string, currentSettings: Record<string, any>): Record<string, any> {
    const updatedSettings = JSON.parse(JSON.stringify(currentSettings || {}));
    const parsedStyle = parseCssToStyleObject(cssText);
    
    // We will build a new custom style object for non-token properties
    const newStyleObject: Record<string, any> = {};

    // 1. Build reverse mapping from CSS property alias to token keys
    const aliasToTokenKeys: Record<string, { tokenKey: string; config: any }[]> = {};
    for (const [tokenKey, cfg] of Object.entries(ComponentGlobalSchemaSettingsMap)) {
        const configs = Array.isArray(cfg) ? cfg : [cfg];
        for (const c of configs) {
            if (c?.as) {
                if (!aliasToTokenKeys[c.as]) {
                    aliasToTokenKeys[c.as] = [];
                }
                aliasToTokenKeys[c.as].push({ tokenKey, config: c });
            }
        }
    }

    // 2. Process all style declarations written by the user
    for (const [propName, propValue] of Object.entries(parsedStyle)) {
        const tokenMatches = aliasToTokenKeys[propName];
        
        if (tokenMatches) {
            // Check if it matches any global token's regex/options
            let matchedToken = false;
            for (const { tokenKey, config } of tokenMatches) {
                if (valdiateComponentSetting(config, propValue)) {
                    updatedSettings[tokenKey] = propValue;
                    matchedToken = true;
                    // Remove from style override since it's saved in token key
                    if (updatedSettings.style) {
                        delete (updatedSettings.style as any)[propName];
                    }
                    break;
                }
            }
            if (!matchedToken) {
                // If it doesn't match any token validator, save as custom style override
                newStyleObject[propName] = propValue;
                // Delete the token settings to avoid conflict
                for (const { tokenKey } of tokenMatches) {
                    delete updatedSettings[tokenKey];
                }
            }
        } else {
            // Not a global token alias → goes into custom style object
            newStyleObject[propName] = propValue;
        }
    }

    // 3. Check for deletions: if a global token's style alias is not present in parsedStyle,
    //    we delete that token key from updatedSettings.
    for (const [tokenKey, cfg] of Object.entries(ComponentGlobalSchemaSettingsMap)) {
        const configs = Array.isArray(cfg) ? cfg : [cfg];
        for (const c of configs) {
            if (c?.tp === "style" && c.as) {
                if (parsedStyle[c.as] === undefined) {
                    delete updatedSettings[tokenKey];
                }
            }
        }
    }

    // 4. Update the settings.style object with custom non-token overrides
    if (Object.keys(newStyleObject).length > 0) {
        updatedSettings.style = newStyleObject;
    } else {
        delete updatedSettings.style;
    }

    return updatedSettings;
}
