import { ComponentGlobalSchemaSettingsMap, valdiateComponentSetting } from "@/application/runtime/dynamic-components/core";

// Converts CamelCase style objects to standard CSS declarations (with shorthand padding-x/y grouping)
export function formatStyleObjectToCss(style: Record<string, any>): string {
    const result: string[] = [];
    const processed = new Set<string>();

    const getVal = (key: string) => {
        const v = style[key];
        return (v !== undefined && v !== null && v !== "") ? String(v) : null;
    };

    // 1. Combine Padding X (paddingLeft + paddingRight)
    const pL = getVal("paddingLeft");
    const pR = getVal("paddingRight");
    if (pL && pL === pR) {
        result.push(`  padding-x: ${pL};`);
        processed.add("paddingLeft");
        processed.add("paddingRight");
    }

    // 2. Combine Padding Y (paddingTop + paddingBottom)
    const pT = getVal("paddingTop");
    const pB = getVal("paddingBottom");
    if (pT && pT === pB) {
        result.push(`  padding-y: ${pT};`);
        processed.add("paddingTop");
        processed.add("paddingBottom");
    }

    // 3. Combine Margin X (marginLeft + marginRight)
    const mL = getVal("marginLeft");
    const mR = getVal("marginRight");
    if (mL && mL === mR) {
        result.push(`  margin-x: ${mL};`);
        processed.add("marginLeft");
        processed.add("marginRight");
    }

    // 4. Combine Margin Y (marginTop + marginBottom)
    const mT = getVal("marginTop");
    const mB = getVal("marginBottom");
    if (mT && mT === mB) {
        result.push(`  margin-y: ${mT};`);
        processed.add("marginTop");
        processed.add("marginBottom");
    }

    // 5. Append all other properties
    for (const [key, val] of Object.entries(style || {})) {
        if (processed.has(key) || val === undefined || val === null || val === "") {
            continue;
        }
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        result.push(`  ${kebabKey}: ${val};`);
    }

    return result.join("\n");
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
        
        if (prop === "padding-x" || prop === "padding-inline") {
            styles["paddingLeft"] = val;
            styles["paddingRight"] = val;
        } else if (prop === "padding-y" || prop === "padding-block") {
            styles["paddingTop"] = val;
            styles["paddingBottom"] = val;
        } else if (prop === "margin-x" || prop === "margin-inline") {
            styles["marginLeft"] = val;
            styles["marginRight"] = val;
        } else if (prop === "margin-y" || prop === "margin-block") {
            styles["marginTop"] = val;
            styles["marginBottom"] = val;
        } else {
            const camelProp = prop.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
            styles[camelProp] = val;
        }
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

    // 1. Check if shorthand padding-x/y or margin-x/y were explicitly written
    let parsedPaddingX: string | null = null;
    let parsedPaddingY: string | null = null;
    let parsedMarginX: string | null = null;
    let parsedMarginY: string | null = null;

    let innerContent = cssText;
    const bracketMatch = cssText.match(/element\s*\{([^}]+)\}/);
    if (bracketMatch) {
        innerContent = bracketMatch[1];
    }
    const shorthandRegex = /([\w-]+)\s*:\s*([^;]+)/g;
    let shMatch;
    while ((shMatch = shorthandRegex.exec(innerContent)) !== null) {
        const prop = shMatch[1].trim();
        const val = shMatch[2].trim();
        if (prop === "padding-x" || prop === "padding-inline") parsedPaddingX = val;
        if (prop === "padding-y" || prop === "padding-block") parsedPaddingY = val;
        if (prop === "margin-x" || prop === "margin-inline") parsedMarginX = val;
        if (prop === "margin-y" || prop === "margin-block") parsedMarginY = val;
    }

    // 2. Also group individual properties if their values are equal
    if (parsedPaddingX === null && parsedStyle.paddingLeft && parsedStyle.paddingLeft === parsedStyle.paddingRight) {
        parsedPaddingX = parsedStyle.paddingLeft;
    }
    if (parsedPaddingY === null && parsedStyle.paddingTop && parsedStyle.paddingTop === parsedStyle.paddingBottom) {
        parsedPaddingY = parsedStyle.paddingTop;
    }
    if (parsedMarginX === null && parsedStyle.marginLeft && parsedStyle.marginLeft === parsedStyle.marginRight) {
        parsedMarginX = parsedStyle.marginLeft;
    }
    if (parsedMarginY === null && parsedStyle.marginTop && parsedStyle.marginTop === parsedStyle.marginBottom) {
        parsedMarginY = parsedStyle.marginTop;
    }

    // Synchronize X/Y shorthand tokens
    if (parsedPaddingX !== null) {
        updatedSettings["pX"] = parsedPaddingX;
        delete updatedSettings["pL"];
        delete updatedSettings["pR"];
        if (updatedSettings.style) {
            delete updatedSettings.style.paddingLeft;
            delete updatedSettings.style.paddingRight;
        }
    }
    if (parsedPaddingY !== null) {
        updatedSettings["pY"] = parsedPaddingY;
        delete updatedSettings["pT"];
        delete updatedSettings["pB"];
        if (updatedSettings.style) {
            delete updatedSettings.style.paddingTop;
            delete updatedSettings.style.paddingBottom;
        }
    }
    if (parsedMarginX !== null) {
        updatedSettings["mX"] = parsedMarginX;
        delete updatedSettings["mL"];
        delete updatedSettings["mR"];
        if (updatedSettings.style) {
            delete updatedSettings.style.marginLeft;
            delete updatedSettings.style.marginRight;
        }
    }
    if (parsedMarginY !== null) {
        updatedSettings["mY"] = parsedMarginY;
        delete updatedSettings["mT"];
        delete updatedSettings["mB"];
        if (updatedSettings.style) {
            delete updatedSettings.style.marginTop;
            delete updatedSettings.style.marginBottom;
        }
    }

    // 3. Build reverse mapping from CSS property alias to token keys (excluding pX/pY/mX/mY which are handled explicitly)
    const aliasToTokenKeys: Record<string, { tokenKey: string; config: any }[]> = {};
    for (const [tokenKey, cfg] of Object.entries(ComponentGlobalSchemaSettingsMap)) {
        if (["pX", "pY", "mX", "mY"].includes(tokenKey)) continue;

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

    // 4. Process all other style declarations written by the user
    for (const [propName, propValue] of Object.entries(parsedStyle)) {
        // Skip individual directions if a shorthand was synchronized
        if (parsedPaddingX !== null && (propName === "paddingLeft" || propName === "paddingRight")) continue;
        if (parsedPaddingY !== null && (propName === "paddingTop" || propName === "paddingBottom")) continue;
        if (parsedMarginX !== null && (propName === "marginLeft" || propName === "marginRight")) continue;
        if (parsedMarginY !== null && (propName === "marginTop" || propName === "marginBottom")) continue;

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

    // 5. Check for deletions: if a global token's style alias is not present in parsedStyle,
    //    we delete that token key from updatedSettings.
    for (const [tokenKey, cfg] of Object.entries(ComponentGlobalSchemaSettingsMap)) {
        if (["pX", "pY", "mX", "mY"].includes(tokenKey)) {
            // Shorthands are deleted if both parts are missing
            const configs = Array.isArray(cfg) ? cfg : [cfg];
            const hasAnyPart = configs.some(c => c?.as && parsedStyle[c.as] !== undefined);
            if (!hasAnyPart && parsedPaddingX === null && parsedPaddingY === null && parsedMarginX === null && parsedMarginY === null) {
                delete updatedSettings[tokenKey];
            }
            continue;
        }

        const configs = Array.isArray(cfg) ? cfg : [cfg];
        for (const c of configs) {
            if (c?.tp === "style" && c.as) {
                if (parsedStyle[c.as] === undefined) {
                    delete updatedSettings[tokenKey];
                }
            }
        }
    }

    // 6. Update the settings.style object with custom non-token overrides
    if (Object.keys(newStyleObject).length > 0) {
        updatedSettings.style = newStyleObject;
    } else {
        delete updatedSettings.style;
    }

    return updatedSettings;
}

// Validates CSS input format and returns a description of the first syntax issue found, or null if valid.
export function validateCss(cssText: string): string | null {
    const trimmed = cssText.trim();
    if (!trimmed) return null;

    // Check wrapper braces
    if (!trimmed.startsWith("element") || !trimmed.includes("{")) {
        return "Must start with 'element { ... }'";
    }
    if (!trimmed.endsWith("}")) {
        return "Missing closing bracket '}'";
    }

    // Extract inside contents
    const openBrace = cssText.indexOf("{");
    const closeBrace = cssText.lastIndexOf("}");
    const body = cssText.substring(openBrace + 1, closeBrace);

    const lines = body.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Skip comments
        if (line.startsWith("/*") || line.startsWith("*") || line.endsWith("*/")) {
            continue;
        }

        // Check for missing colon
        if (!line.includes(":")) {
            return `Line ${i + 2}: Missing colon ':' in declaration`;
        }

        // Check for missing semicolon
        if (!line.endsWith(";")) {
            return `Line ${i + 2}: Declaration must end with a semicolon ';'`;
        }

        const colonIdx = line.indexOf(":");
        const prop = line.substring(0, colonIdx).trim();
        const val = line.substring(colonIdx + 1, line.length - 1).trim();

        if (!prop) {
            return `Line ${i + 2}: Property name is empty`;
        }
        if (!val) {
            return `Line ${i + 2}: Value is empty for property '${prop}'`;
        }
    }

    return null;
}

