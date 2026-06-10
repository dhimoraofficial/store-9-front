"use client";

import React, { useState, useEffect, useRef } from "react";
import { ComponentSchema } from "@/application/runtime/builder/type";
import { formatStyleObjectToCss, syncCssEditToSettings, getMatchedCSSRules, parseCssToStyleObject, validateCss } from "./cssParser";
import { getParsedSettings } from "@/application/runtime/dynamic-components/base";
import { Eye, Edit2, Sparkles, Plus, Search, AlertTriangle } from "lucide-react";

interface DevCssInspectorProps {
    selectedNode: ComponentSchema;
    onUpdateSetting: (settingKey: string, val: any, settingConfig: any) => void;
    styleSettings?: [string, any][];
}

const COMMON_CSS_PROPERTIES = [
    // Spacing & Box Model
    { name: "padding", desc: "Spacing inside element border" },
    { name: "padding-x", desc: "Horizontal padding spacing (left + right)" },
    { name: "padding-y", desc: "Vertical padding spacing (top + bottom)" },
    { name: "padding-left", desc: "Left padding spacing" },
    { name: "padding-right", desc: "Right padding spacing" },
    { name: "padding-top", desc: "Top padding spacing" },
    { name: "padding-bottom", desc: "Bottom padding spacing" },
    { name: "padding-inline", desc: "Horizontal padding spacing (logical inline)" },
    { name: "padding-block", desc: "Vertical padding spacing (logical block)" },
    { name: "margin", desc: "Spacing outside element border" },
    { name: "margin-x", desc: "Horizontal margin spacing (left + right)" },
    { name: "margin-y", desc: "Vertical margin spacing (top + bottom)" },
    { name: "margin-left", desc: "Left margin spacing" },
    { name: "margin-right", desc: "Right margin spacing" },
    { name: "margin-top", desc: "Top margin spacing" },
    { name: "margin-bottom", desc: "Bottom margin spacing" },
    { name: "margin-inline", desc: "Horizontal margin spacing (logical inline)" },
    { name: "margin-block", desc: "Vertical margin spacing (logical block)" },
    
    // Sizing
    { name: "width", desc: "Width of element" },
    { name: "height", desc: "Height of element" },
    { name: "max-width", desc: "Maximum width limit" },
    { name: "max-height", desc: "Maximum height limit" },
    { name: "min-width", desc: "Minimum width limit" },
    { name: "min-height", desc: "Minimum height limit" },
    { name: "box-sizing", desc: "Include padding/border in width/height (border-box)" },

    // Display & Layout
    { name: "display", desc: "Layout behavior (flex, grid, block, inline, none)" },
    { name: "position", desc: "Positioning method (relative, absolute, fixed, sticky)" },
    { name: "top", desc: "Offset from top edge" },
    { name: "bottom", desc: "Offset from bottom edge" },
    { name: "left", desc: "Offset from left edge" },
    { name: "right", desc: "Offset from right edge" },
    { name: "z-index", desc: "Stacking order of elements" },
    { name: "overflow", desc: "Clip or scroll content overflow" },
    { name: "overflow-x", desc: "Horizontal overflow behavior" },
    { name: "overflow-y", desc: "Vertical overflow behavior" },
    { name: "visibility", desc: "Show or hide element without layout removal" },

    // Flexbox
    { name: "flex-direction", desc: "Direction of flex items (row, column)" },
    { name: "flex-wrap", desc: "Wrap flex items onto new lines" },
    { name: "flex", desc: "Shorthand for grow, shrink, and basis" },
    { name: "flex-grow", desc: "Grow factor of flex item" },
    { name: "flex-shrink", desc: "Shrink factor of flex item" },
    { name: "flex-basis", desc: "Initial size of flex item" },
    { name: "gap", desc: "Spacing between grid/flex items" },
    { name: "row-gap", desc: "Spacing between flex/grid rows" },
    { name: "column-gap", desc: "Spacing between flex/grid columns" },

    // Grid
    { name: "grid-template-columns", desc: "Column structure of grid layout" },
    { name: "grid-template-rows", desc: "Row structure of grid layout" },
    { name: "grid-column", desc: "Grid column start/end span" },
    { name: "grid-row", desc: "Grid row start/end span" },

    // Alignment
    { name: "justify-content", desc: "Align items along main axis (flex-start, center, space-between)" },
    { name: "align-items", desc: "Align items along cross axis (center, flex-end, stretch)" },
    { name: "align-self", desc: "Override align-items for a single item" },
    { name: "justify-items", desc: "Justify content inside grid cells" },
    { name: "justify-self", desc: "Override justify-items for a single cell" },
    { name: "place-items", desc: "Shorthand for align-items and justify-items" },

    // Typography
    { name: "color", desc: "Text color" },
    { name: "font-family", desc: "Font face stack (sans-serif, system-ui)" },
    { name: "font-size", desc: "Size of text font" },
    { name: "font-weight", desc: "Font weight/thickness (bold, 400, 500)" },
    { name: "font-style", desc: "Style of font (italic, normal)" },
    { name: "line-height", desc: "Spacing between text lines" },
    { name: "text-align", desc: "Horizontal text alignment (left, center, right, justify)" },
    { name: "text-transform", desc: "Case capitalization (uppercase, lowercase, capitalize)" },
    { name: "text-decoration", desc: "Decorations like underline or line-through" },
    { name: "letter-spacing", desc: "Spacing between characters" },
    { name: "white-space", desc: "Wrap behavior (nowrap, pre-wrap)" },
    { name: "text-overflow", desc: "Truncate overflow text (ellipsis)" },

    // Background & Borders
    { name: "background-color", desc: "Background color value" },
    { name: "background-image", desc: "Background image URL or gradient" },
    { name: "background-size", desc: "Background scaling (cover, contain)" },
    { name: "background-position", desc: "Background focal placement (center, top left)" },
    { name: "background-repeat", desc: "Background tiling (repeat, no-repeat)" },
    { name: "border", desc: "Shorthand for border width, style, and color" },
    { name: "border-radius", desc: "Rounded corners (px, %, rem)" },
    { name: "border-width", desc: "Width of element border" },
    { name: "border-style", desc: "Style of border (solid, dashed, none)" },
    { name: "border-color", desc: "Color of border" },
    { name: "border-top", desc: "Top border properties" },
    { name: "border-bottom", desc: "Bottom border properties" },
    { name: "border-left", desc: "Left border properties" },
    { name: "border-right", desc: "Right border properties" },
    { name: "outline", desc: "Outline focus border outside element edge" },

    // Effects & Animations
    { name: "box-shadow", desc: "Drop shadow effect around element border" },
    { name: "opacity", desc: "Opacity transparency fraction (0 to 1)" },
    { name: "transition", desc: "Animation speed and curve curves (all 0.2s ease)" },
    { name: "transform", desc: "Rotate, scale, skew, or translate layout" },
    { name: "transform-origin", desc: "Origin anchor point for transforms" },
    { name: "filter", desc: "Visual effects (blur, brightness, drop-shadow)" },
    { name: "backdrop-filter", desc: "Frosted glass filter styling for behind the element" },
    { name: "animation", desc: "Keyframe animation assignment" },

    // Interactivity
    { name: "cursor", desc: "Pointer indicator style on hover (pointer, default)" },
    { name: "user-select", desc: "Allow or prevent text highlight select (none)" },
    { name: "pointer-events", desc: "Block or capture mouse hover clicks (none, auto)" },
    { name: "will-change", desc: "Inform browser of upcoming animations for GPU performance" }
];

// Design System / global.css Custom properties to suggest inside var(--...) values
const DESIGN_SYSTEM_VARIABLES = [
    { name: "--ui-accent", desc: "Primary Brand Accent Color (Light Blue / Purple)" },
    { name: "--ui-accent-2", desc: "Secondary Brand Accent Color (Teal / Mint)" },
    { name: "--ui-text", desc: "Main Text Color" },
    { name: "--ui-text-muted", desc: "Muted Helper Text Color" },
    { name: "--ui-app-bg", desc: "Main Application Background Color" },
    { name: "--ui-surface", desc: "Translucent Surface Background" },
    { name: "--ui-surface-strong", desc: "Solid Box Surface Background" },
    { name: "--ui-border", desc: "Soft border divider color" },
    { name: "--ui-border-strong", desc: "High contrast border divider color" },
    { name: "--border-radius-large", desc: "Large Border Radius (1rem)" },
    { name: "--border-radius-base", desc: "Base Border Radius (0.75rem)" },
    { name: "--btn-radius", desc: "Button Border Radius (0.65rem)" },
];

export default function DevCssInspector({
    selectedNode,
    onUpdateSetting,
    styleSettings = []
}: DevCssInspectorProps) {
    const [cssText, setCssText] = useState("");
    const validationError = React.useMemo(() => validateCss(cssText), [cssText]);
    const [matchedRules, setMatchedRules] = useState<{ selector: string; cssText: string }[]>([]);
    
    // Autocomplete State (as-you-type suggestions)
    const [suggestions, setSuggestions] = useState<{
        name: string;
        isValue: boolean;
        isVar?: boolean;
        desc?: string;
        isSchema?: boolean;
        parentProp?: string;
    }[]>([]);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    
    // Manual search dropdown state
    const [showManualAdd, setShowManualAdd] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const lastNodeIdRef = useRef(selectedNode.id);

    // 1. Extract schema properties from styleSettings prop
    const schemaProperties = React.useMemo(() => {
        const list: { name: string; desc: string; options?: string[]; config: any; key: string }[] = [];
        
        for (const [key, cfg] of styleSettings) {
            const configs = Array.isArray(cfg) ? cfg : [cfg];
            for (const config of configs) {
                if (config?.as) {
                    const kebabName = config.as.replace(/([A-Z])/g, "-$1").toLowerCase();
                    const options = config.opt || [];
                    const optDesc = options.length > 0 ? ` (Options: ${options.join(", ")})` : "";
                    
                    list.push({
                        name: kebabName,
                        desc: `${config.tp === "prop" ? "Component Prop" : "Style Token"}: ${key}${optDesc}`,
                        options: options.length > 0 ? options : undefined,
                        config,
                        key
                    });
                }
            }
        }
        return list;
    }, [styleSettings]);

    // 2. Extract currently applied style properties from selectedNode.settings.style
    const appliedProperties = React.useMemo(() => {
        const list: { name: string; desc: string }[] = [];
        const style = selectedNode.settings?.style || {};
        
        for (const [key, value] of Object.entries(style)) {
            // Convert camelCase to kebab-case
            const kebabName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
            list.push({
                name: kebabName,
                desc: `Currently Applied Value: ${value}`
            });
        }
        return list;
    }, [selectedNode.settings?.style]);

    // 3. Combine default CSS properties, schema properties, and currently applied custom properties
    const combinedProperties = React.useMemo(() => {
        const map = new Map<string, { name: string; desc: string; options?: string[]; isSchema?: boolean }>();
        
        // Load common defaults
        for (const prop of COMMON_CSS_PROPERTIES) {
            map.set(prop.name, { ...prop });
        }
        
        // Merge active schema configs (overriding defaults if matched)
        for (const prop of schemaProperties) {
            map.set(prop.name, {
                name: prop.name,
                desc: prop.desc,
                options: prop.options,
                isSchema: true
            });
        }

        // Merge currently applied custom styles (overriding metadata if matched)
        for (const prop of appliedProperties) {
            const existing = map.get(prop.name);
            map.set(prop.name, {
                name: prop.name,
                desc: existing ? `${existing.desc} | ${prop.desc}` : prop.desc,
                options: existing?.options,
                isSchema: existing?.isSchema
            });
        }
        
        return Array.from(map.values());
    }, [schemaProperties, appliedProperties]);

    // Synchronize CSS text from all resolved/computed settings
    useEffect(() => {
        const isDifferentNode = lastNodeIdRef.current !== selectedNode.id;
        lastNodeIdRef.current = selectedNode.id;

        const isFocused = typeof document !== "undefined" && document.activeElement === textareaRef.current;
        if (isDifferentNode || !isFocused) {
            try {
                // Deep clone settings to avoid mutation errors on frozen Redux state objects
                const clonedSettings = JSON.parse(JSON.stringify(selectedNode.settings || {}));
                const parsed = getParsedSettings(selectedNode.type, clonedSettings);
                const styleObj = parsed.style || {};
                const formatted = formatStyleObjectToCss(styleObj);
                setCssText(formatted ? `element {\n${formatted}\n}` : `element {\n  /* Add custom styles here */\n}`);
            } catch (err) {
                console.error("Error formatting node styles:", err);
            }
        }
    }, [selectedNode.id, selectedNode.settings, selectedNode.type]);

    // Retrieve active stylesheet rules targeting this element from DOM
    useEffect(() => {
        if (typeof window === "undefined") return;

        const findElement = () => {
            try {
                const escapedId = CSS.escape(selectedNode.id);
                const wrapper = document.querySelector(`[data-node-id="${escapedId}"]`);
                const element = (wrapper?.firstElementChild || wrapper) as HTMLElement | null;
                if (element) {
                    const rules = getMatchedCSSRules(element);
                    setMatchedRules(rules);
                }
            } catch (err) {
                console.error("Error querying matching CSS rules:", err);
            }
        };

        // Query element styles after render loop settles
        const timer = setTimeout(findElement, 100);
        return () => clearTimeout(timer);
    }, [selectedNode.id, selectedNode.settings]);

    // Close suggestions dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowManualAdd(false);
            }
            if (
                textareaRef.current &&
                !textareaRef.current.contains(e.target as Node) &&
                (!autocompleteRef.current || !autocompleteRef.current.contains(e.target as Node))
            ) {
                setShowAutocomplete(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Intercept Arrow keys, Enter, and Tab inside the textarea for Autocomplete selection
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showAutocomplete && suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveSuggestionIdx(prev => (prev + 1) % suggestions.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveSuggestionIdx(prev => (prev - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                handleSelectSuggestion(suggestions[activeSuggestionIdx]);
            } else if (e.key === "Escape") {
                e.preventDefault();
                setShowAutocomplete(false);
            }
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setCssText(val);

        // Synchronize edited CSS text back to settings tokens + custom styles
        const updatedSettings = syncCssEditToSettings(val, selectedNode.settings || {});
        onUpdateSetting("_entire_settings_", updatedSettings, null);

        // Check for VS Code-style autocomplete as-you-type
        const start = e.target.selectionStart;
        const textBeforeCursor = val.substring(0, start);
        const lines = textBeforeCursor.split("\n");
        const currentLine = lines[lines.length - 1] || "";

        // Case A: Autocompleting a value (contains a colon)
        if (currentLine.includes(":")) {
            const parts = currentLine.split(":");
            const propPart = parts[0].trim();
            const valuePart = parts[1] || "";

            // Don't show options if a semicolon is already appended
            if (valuePart.includes(";")) {
                setShowAutocomplete(false);
                return;
            }

            // A.1: Check if typing a CSS Custom Variable wrapper: var(--...
            const varMatch = valuePart.match(/var\((--[\w-]*)$/);
            if (varMatch) {
                const varPrefix = varMatch[1];
                const matchedVars = DESIGN_SYSTEM_VARIABLES.filter(
                    v => v.name.startsWith(varPrefix) && v.name !== varPrefix
                );

                if (matchedVars.length > 0) {
                    setSuggestions(matchedVars.map(v => ({
                        name: v.name,
                        isValue: true,
                        isVar: true,
                        desc: v.desc,
                        isSchema: false
                    })));
                    setActiveSuggestionIdx(0);
                    setShowAutocomplete(true);
                    return;
                }
            }

            // A.2: Otherwise suggest standard schema values if configured
            const camelProp = propPart.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
            const matchedSchema = schemaProperties.find(
                p => p.name === propPart || p.name.replace(/-([a-z])/g, (_, char) => char.toUpperCase()) === camelProp
            );

            if (matchedSchema && matchedSchema.options) {
                const valPrefix = valuePart.trim();
                const matchedOptions = matchedSchema.options.filter(
                    opt => opt.toLowerCase().startsWith(valPrefix.toLowerCase()) && opt !== valPrefix
                );

                if (matchedOptions.length > 0) {
                    setSuggestions(matchedOptions.map(opt => ({
                        name: opt,
                        isValue: true,
                        parentProp: matchedSchema.name,
                        isSchema: true
                    })));
                    setActiveSuggestionIdx(0);
                    setShowAutocomplete(true);
                    return;
                }
            }
        } 
        // Case B: Autocompleting a CSS property (no colon typed yet)
        else {
            const prefixMatch = currentLine.match(/([\w-]+)$/);
            const prefix = prefixMatch ? prefixMatch[1] : "";
            
            if (prefix.length >= 1) {
                const matches = combinedProperties.filter(
                    p => p.name.startsWith(prefix) && p.name !== prefix
                );
                
                if (matches.length > 0) {
                    setSuggestions(matches.map(p => ({
                        name: p.name,
                        isValue: false,
                        desc: p.desc,
                        isSchema: p.isSchema
                    })));
                    setActiveSuggestionIdx(0);
                    setShowAutocomplete(true);
                    return;
                }
            }
        }
        setShowAutocomplete(false);
    };

    // Completes selection (either property name or value option)
    const handleSelectSuggestion = (suggestion: {
        name: string;
        isValue: boolean;
        isVar?: boolean;
        parentProp?: string;
    }) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const text = textarea.value;

        const textBeforeCursor = text.substring(0, start);
        const lines = textBeforeCursor.split("\n");
        const currentLine = lines[lines.length - 1] || "";
        const beforeLine = textBeforeCursor.substring(0, textBeforeCursor.length - currentLine.length);
        const afterCursor = text.substring(start);

        let newLine = currentLine;
        let newCursorPos = start;

        if (suggestion.isValue) {
            // Completing a value
            const parts = currentLine.split(":");
            const propPart = parts[0];
            const valuePart = parts[1] || "";
            
            let completedValue = suggestion.name;
            if (suggestion.isVar) {
                // Find where var(-- started and replace it with var(--variable-name)
                const varStartIdx = valuePart.lastIndexOf("var(");
                if (varStartIdx !== -1) {
                    completedValue = valuePart.substring(0, varStartIdx) + `var(${suggestion.name})`;
                }
            }

            const hasSemicolon = afterCursor.trim().startsWith(";");
            const suffix = hasSemicolon ? "" : ";";
            
            newLine = `${propPart}: ${completedValue.trim()}${suffix}`;
            newCursorPos = beforeLine.length + newLine.length;
            
            const adjustedAfter = hasSemicolon 
                ? afterCursor.substring(afterCursor.indexOf(";") + 1)
                : afterCursor;
                
            const newText = beforeLine + newLine + adjustedAfter;
            setCssText(newText);
            
            // Sync to settings
            const updatedSettings = syncCssEditToSettings(newText, selectedNode.settings || {});
            onUpdateSetting("_entire_settings_", updatedSettings, null);
        } else {
            // Completing a property name
            const prefixMatch = currentLine.match(/([\w-]+)$/);
            const prefix = prefixMatch ? prefixMatch[1] : "";
            const beforePrefix = currentLine.substring(0, currentLine.length - prefix.length);
            
            newLine = `${beforePrefix}${suggestion.name}: `;
            newCursorPos = beforeLine.length + newLine.length;
            
            const newText = beforeLine + newLine + ";" + afterCursor;
            setCssText(newText);
            
            // Sync to settings
            const updatedSettings = syncCssEditToSettings(newText, selectedNode.settings || {});
            onUpdateSetting("_entire_settings_", updatedSettings, null);
        }

        setShowAutocomplete(false);

        // Return focus and restore cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 50);
    };

    // Formats and cleans the CSS text
    const handlePrettify = () => {
        try {
            const styleObj = parseCssToStyleObject(cssText);
            const formatted = formatStyleObjectToCss(styleObj);
            const pretty = formatted ? `element {\n${formatted}\n}` : `element {\n  /* Add custom styles here */\n}`;
            setCssText(pretty);

            const updatedSettings = syncCssEditToSettings(pretty, selectedNode.settings || {});
            onUpdateSetting("_entire_settings_", updatedSettings, null);
        } catch (err) {
            console.error("Error prettifying CSS:", err);
        }
    };

    // Inserts a selected property from manual helper dropdown
    const insertProperty = (propName: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        const insertText = `  ${propName}: `;
        let newText = text;
        let newCursorPos = start;

        // Find the position of the closing bracket }
        const closingBracketIndex = text.lastIndexOf("}");
        
        if (closingBracketIndex !== -1 && (start > closingBracketIndex || start === 0)) {
            // Insert inside the closing bracket
            const before = text.substring(0, closingBracketIndex);
            const after = text.substring(closingBracketIndex);
            const needsNewline = !before.endsWith("\n");
            const indent = needsNewline ? "\n" : "";
            
            newText = before + indent + insertText + ";\n" + after;
            newCursorPos = before.length + indent.length + insertText.length;
        } else {
            // Insert at the cursor position
            const before = text.substring(0, start);
            const after = text.substring(end);
            newText = before + insertText + ";" + after;
            newCursorPos = start + insertText.length;
        }

        setCssText(newText);
        setShowManualAdd(false);
        setSearchQuery("");

        // Update settings
        const updatedSettings = syncCssEditToSettings(newText, selectedNode.settings || {});
        onUpdateSetting("_entire_settings_", updatedSettings, null);

        // Put focus and cursor right before the semicolon
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 50);
    };

    const filteredProperties = combinedProperties.filter(prop =>
        prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-zinc-50/50 font-sans select-none divide-y divide-zinc-200/60 overflow-y-auto">
            {/* Custom CSS (Editable) */}
            <div className="p-4 flex flex-col min-h-[320px] shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                        <Edit2 className="w-3 h-3 text-zinc-500" />
                        Custom CSS Overrides
                    </span>
                    
                    <div className="flex items-center gap-2">
                        {/* Prettify Button */}
                        <button
                            onClick={handlePrettify}
                            title="Format CSS (Prettify)"
                            className="p-1.5 rounded bg-white hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer select-none outline-none flex items-center justify-center shadow-xs"
                        >
                            <Sparkles className="w-3 h-3" />
                        </button>

                        {/* Search Helper Button container */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowManualAdd(!showManualAdd)}
                                className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer select-none outline-none shadow-xs"
                            >
                                <Plus className="w-3 h-3" />
                                Add Property
                            </button>

                            {/* Search Helper Dropdown */}
                            {showManualAdd && (
                                <div className="absolute right-0 mt-1.5 w-60 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl z-50 overflow-hidden flex flex-col">
                                    <div className="p-2 border-b border-zinc-900 flex items-center gap-1.5 bg-zinc-900/40">
                                        <Search className="w-3 h-3 text-zinc-500 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Search property..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-transparent text-[11px] text-zinc-200 outline-none border-none placeholder:text-zinc-600"
                                            autoFocus
                                        />
                                    </div>
                                    
                                    <div className="max-h-48 overflow-y-auto py-1 divide-y divide-zinc-900/30 scrollbar-thin scrollbar-thumb-zinc-800">
                                        {filteredProperties.length === 0 ? (
                                            <div className="px-3 py-2 text-[10px] text-zinc-600 italic">
                                                No properties matched
                                            </div>
                                        ) : (
                                            filteredProperties.map((prop) => (
                                                <button
                                                    key={prop.name}
                                                    onClick={() => insertProperty(prop.name)}
                                                    className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors flex items-center justify-between cursor-pointer outline-none"
                                                >
                                                    <div className="flex flex-col gap-0.5 min-w-0">
                                                        <span className="text-[11px] font-mono font-bold text-[#89ddff]">
                                                            {prop.name}
                                                        </span>
                                                        <span className="text-[9px] text-zinc-500 truncate">
                                                            {prop.desc}
                                                        </span>
                                                    </div>
                                                    {prop.isSchema && (
                                                        <span className="text-[7.5px] bg-[#c792ea]/20 text-[#c792ea] border border-[#c792ea]/30 rounded px-1 shrink-0 scale-90">
                                                            Schema
                                                        </span>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 rounded-lg overflow-hidden border border-zinc-200/80 bg-[#0d0f14] shadow-sm flex flex-col min-h-[200px] relative">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#12141b] border-b border-white/5 text-[10px] font-mono text-zinc-500 select-none">
                        <span>style.css</span>
                        {validationError && (
                            <div className="flex items-center gap-1 text-amber-500 font-sans font-medium" title={validationError}>
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate max-w-[180px]">{validationError}</span>
                            </div>
                        )}
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={cssText}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1 w-full bg-transparent p-3 text-[11.5px] font-mono leading-relaxed outline-none resize-none text-[#a9ffaf] placeholder:text-zinc-700"
                        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}
                        spellCheck={false}
                    />

                    {/* VS Code Style Autocomplete Suggestions Overlay */}
                    {showAutocomplete && suggestions.length > 0 && (
                        <div
                            ref={autocompleteRef}
                            className="absolute left-3 bottom-3 w-56 rounded-md border border-zinc-800 bg-zinc-950 shadow-2xl z-50 divide-y divide-zinc-900/50 max-h-40 overflow-y-auto select-none font-mono text-[10px]"
                        >
                            {suggestions.map((item, idx) => (
                                <div
                                    key={`${item.name}-${idx}`}
                                    className={`px-2.5 py-1.5 cursor-pointer flex items-center justify-between transition-colors ${
                                        idx === activeSuggestionIdx ? "bg-zinc-900 text-white" : "text-zinc-400"
                                    }`}
                                    onClick={() => handleSelectSuggestion(item)}
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className={`${item.isValue ? "text-[#f78c6c]" : "text-[#89ddff]"} font-bold`}>
                                            {item.name}
                                        </span>
                                        {item.desc && (
                                            <span className="text-[8px] text-zinc-600 truncate max-w-[160px]">
                                                {item.desc}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {item.isSchema && (
                                            <span className="text-[7.5px] bg-[#c792ea]/20 text-[#c792ea] border border-[#c792ea]/30 rounded px-1 scale-90">
                                                Schema
                                            </span>
                                        )}
                                        {idx === activeSuggestionIdx && (
                                            <span className="text-[8px] bg-zinc-800 text-zinc-500 border border-zinc-700 rounded px-1 scale-90">
                                                Tab
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Matcher stylesheet reference (Read-only) */}
            <div className="p-4 flex flex-col min-h-[220px] overflow-hidden shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-zinc-500" />
                    Applied Stylesheet Rules
                </span>
                
                <div className="flex-1 rounded-lg overflow-hidden border border-zinc-200/80 bg-zinc-900 shadow-sm flex flex-col">
                    <div className="flex items-center px-3 py-1.5 bg-zinc-950 border-b border-white/5 text-[10px] font-mono text-zinc-500 select-none">
                        stylesheets.css (Read-only)
                    </div>
                    
                    <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] text-zinc-300 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
                        {matchedRules.length === 0 ? (
                            <div className="text-zinc-500 italic text-center py-4 font-sans text-xs">
                                No active stylesheet rules found for this element.
                            </div>
                        ) : (
                            matchedRules.map((rule, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="text-[#ffcb6b] font-bold">{rule.selector} {"{"}</div>
                                    {rule.cssText.split(";").map((line, lIdx) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return null;
                                        const [prop, val] = trimmed.split(":");
                                        return (
                                            <div key={lIdx} className="pl-4 text-zinc-400">
                                                <span className="text-[#89ddff]">{prop}</span>: <span className="text-[#f78c6c]">{val}</span>;
                                            </div>
                                        );
                                    })}
                                    <div className="text-[#ffcb6b] font-bold">{"}"}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
