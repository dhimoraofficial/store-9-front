"use client";

import React, { useState, useEffect, useRef } from "react";
import { ComponentSchema } from "@/application/runtime/builder/type";
import { formatStyleObjectToCss, syncCssEditToSettings, getMatchedCSSRules, parseCssToStyleObject } from "./cssParser";
import { getParsedSettings } from "@/application/runtime/dynamic-components/base";
import { Eye, Edit2, Sparkles, Plus, Search } from "lucide-react";

interface DevCssInspectorProps {
    selectedNode: ComponentSchema;
    onUpdateSetting: (settingKey: string, val: any, settingConfig: any) => void;
}

const COMMON_CSS_PROPERTIES = [
    { name: "padding", desc: "Spacing inside element border" },
    { name: "padding-left", desc: "Left padding spacing" },
    { name: "padding-right", desc: "Right padding spacing" },
    { name: "padding-top", desc: "Top padding spacing" },
    { name: "padding-bottom", desc: "Bottom padding spacing" },
    { name: "margin", desc: "Spacing outside element border" },
    { name: "margin-left", desc: "Left margin spacing" },
    { name: "margin-right", desc: "Right margin spacing" },
    { name: "margin-top", desc: "Top margin spacing" },
    { name: "margin-bottom", desc: "Bottom margin spacing" },
    { name: "width", desc: "Width of element" },
    { name: "height", desc: "Height of element" },
    { name: "max-width", desc: "Maximum width limit" },
    { name: "max-height", desc: "Maximum height limit" },
    { name: "color", desc: "Text color" },
    { name: "background-color", desc: "Background color" },
    { name: "background-image", desc: "Background image URL/gradient" },
    { name: "font-size", desc: "Size of the text font" },
    { name: "font-weight", desc: "Weight (thickness) of the font" },
    { name: "border", desc: "Border style, width, and color" },
    { name: "border-radius", desc: "Roundness of borders" },
    { name: "box-shadow", desc: "Shadow effect around element" },
    { name: "display", desc: "Layout display type (flex, block, inline)" },
    { name: "justify-content", desc: "Flexbox horizontal alignment" },
    { name: "align-items", desc: "Flexbox vertical alignment" },
    { name: "gap", desc: "Spacing between grid/flex items" },
    { name: "text-align", desc: "Alignment of inline text" },
    { name: "line-height", desc: "Vertical spacing between text lines" },
    { name: "opacity", desc: "Transparency of element" },
    { name: "cursor", desc: "Mouse pointer type on hover" },
    { name: "transition", desc: "Transition animation details" }
];

export default function DevCssInspector({
    selectedNode,
    onUpdateSetting
}: DevCssInspectorProps) {
    const [cssText, setCssText] = useState("");
    const [matchedRules, setMatchedRules] = useState<{ selector: string; cssText: string }[]>([]);
    
    // Autocomplete State (as-you-type suggestions)
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    
    // Manual search dropdown state
    const [showManualAdd, setShowManualAdd] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const lastNodeIdRef = useRef(selectedNode.id);

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
                completeProperty(suggestions[activeSuggestionIdx]);
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

        // Only trigger suggestions if we are typing a CSS property (before a colon)
        if (!currentLine.includes(":")) {
            const prefixMatch = currentLine.match(/([\w-]+)$/);
            const prefix = prefixMatch ? prefixMatch[1] : "";
            
            if (prefix.length >= 1) {
                const matches = COMMON_CSS_PROPERTIES.filter(
                    p => p.name.startsWith(prefix) && p.name !== prefix
                ).map(p => p.name);
                
                if (matches.length > 0) {
                    setSuggestions(matches);
                    setActiveSuggestionIdx(0);
                    setShowAutocomplete(true);
                    return;
                }
            }
        }
        setShowAutocomplete(false);
    };

    // Completes the typed property with the selected auto-completion choice
    const completeProperty = (propName: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const text = textarea.value;

        // Find the prefix that we are replacing
        const textBeforeCursor = text.substring(0, start);
        const lines = textBeforeCursor.split("\n");
        const currentLine = lines[lines.length - 1] || "";
        const prefixMatch = currentLine.match(/([\w-]+)$/);
        const prefix = prefixMatch ? prefixMatch[1] : "";

        const beforePrefix = textBeforeCursor.substring(0, textBeforeCursor.length - prefix.length);
        const afterCursor = text.substring(start);

        const insertText = `${propName}: `;
        const newText = beforePrefix + insertText + ";" + afterCursor;
        const newCursorPos = beforePrefix.length + insertText.length;

        setCssText(newText);
        setShowAutocomplete(false);

        // Update settings
        const updatedSettings = syncCssEditToSettings(newText, selectedNode.settings || {});
        onUpdateSetting("_entire_settings_", updatedSettings, null);

        // Focus back to input and place cursor right before semicolon
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

    const filteredProperties = COMMON_CSS_PROPERTIES.filter(prop =>
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
                                                    className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors flex flex-col gap-0.5 cursor-pointer outline-none"
                                                >
                                                    <span className="text-[11px] font-mono font-bold text-[#89ddff]">
                                                        {prop.name}
                                                    </span>
                                                    <span className="text-[9px] text-zinc-500 truncate">
                                                        {prop.desc}
                                                    </span>
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
                    <div className="flex items-center px-3 py-1.5 bg-[#12141b] border-b border-white/5 text-[10px] font-mono text-zinc-500 select-none">
                        style.css
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
                            className="absolute left-3 bottom-3 w-52 rounded-md border border-zinc-800 bg-zinc-950 shadow-2xl z-50 divide-y divide-zinc-900/50 max-h-36 overflow-y-auto select-none font-mono text-[10px]"
                        >
                            {suggestions.map((name, idx) => (
                                <div
                                    key={name}
                                    className={`px-2.5 py-1.5 cursor-pointer flex items-center justify-between transition-colors ${
                                        idx === activeSuggestionIdx ? "bg-zinc-900 text-white" : "text-zinc-400"
                                    }`}
                                    onClick={() => completeProperty(name)}
                                >
                                    <span className="text-[#89ddff] font-bold">{name}</span>
                                    {idx === activeSuggestionIdx && (
                                        <span className="text-[8px] bg-zinc-800 text-zinc-500 border border-zinc-700 rounded px-1 shrink-0 scale-90">
                                            Tab
                                        </span>
                                    )}
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
