"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ChevronDown, Check, Plus, Trash2, Info, ArrowUp, ArrowDown } from "lucide-react";
import { ComponentSchema } from "@/application/runtime/builder/type";

interface ComponentSettingsProps {
    selectedNode: ComponentSchema;
    componentSettingsMap: any;
    validationErrors: Record<string, string>;
    onUpdateSetting: (settingKey: string, val: any, settingConfig: any) => void;
    onUpdateLabel: (id: string, label: string) => void;
}

function RadixSelect({
    value,
    options,
    onChange,
}: {
    value: string;
    options: string[];
    onChange: (val: string) => void;
}) {
    return (
        <Select.Root value={value || "__none__"} onValueChange={(v) => onChange(v === "__none__" ? "" : v)}>
            <Select.Trigger className="w-full flex items-center justify-between border border-zinc-200 rounded-md px-3 py-2 text-[12px] font-sans font-semibold text-zinc-700 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-950/10 bg-white cursor-pointer hover:border-zinc-300 transition-colors data-[placeholder]:text-zinc-400">
                <Select.Value placeholder="Select option…" />
                <Select.Icon>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={4}
                    className="z-[200] w-[var(--radix-select-trigger-width)] bg-white border border-zinc-200 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden outline-none font-sans"
                >
                    <Select.Viewport className="p-1">
                        <Select.Item
                            value="__none__"
                            className="flex items-center justify-between px-3 py-2 text-[12px] text-zinc-400 font-sans font-medium rounded-md cursor-pointer outline-none hover:bg-zinc-50 data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                        >
                            <Select.ItemText>(None)</Select.ItemText>
                            <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                        </Select.Item>
                        {options.map((v) => (
                            <Select.Item
                                key={v}
                                value={v}
                                className="flex items-center justify-between px-3 py-2 text-[12px] font-sans font-semibold text-zinc-700 rounded-md cursor-pointer outline-none hover:bg-zinc-50 data-[highlighted]:bg-zinc-50 data-[highlighted]:outline-none"
                            >
                                <Select.ItemText>{v}</Select.ItemText>
                                <Select.ItemIndicator><Check className="w-3 h-3 text-zinc-500" /></Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

function InfoTooltip({ description }: { description: string }) {
    return (
        <Tooltip.Provider delayDuration={150}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-600 transition-colors p-0.5 outline-none cursor-pointer flex items-center justify-center shrink-0"
                    >
                        <Info className="w-3.5 h-3.5" />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="top"
                        align="center"
                        sideOffset={5}
                        className="z-[300] max-w-[240px] bg-zinc-950 text-white text-[11px] font-semibold font-sans px-2.5 py-1.5 rounded shadow-lg outline-none"
                    >
                        {description}
                        <Tooltip.Arrow className="fill-zinc-950" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

function SettingLabel({
    labelKey,
    name,
    description,
    descrption,
    className = "text-[11px] font-semibold text-zinc-500 uppercase tracking-wide"
}: {
    labelKey: string;
    name?: string;
    description?: string;
    descrption?: string;
    className?: string;
}) {
    const displayName = name || labelKey.replace(/-/g, " ");
    const tooltipDesc = description || descrption;
    return (
        <div className="flex items-center gap-1.5 select-none">
            <span className={className}>
                {displayName}
            </span>
            {tooltipDesc && <InfoTooltip description={tooltipDesc} />}
        </div>
    );
}

function IsolatedInput({
    value,
    onChange,
    rgx,
    className,
    placeholder
}: {
    value: string;
    onChange: (val: string) => void;
    rgx?: string;
    className?: string;
    placeholder?: string;
}) {
    const [localVal, setLocalVal] = React.useState(value);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        setLocalVal(value);
    }, [value]);

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const checkAndPropagate = (valStr: string) => {
        let isValid = true;
        if (rgx) {
            try {
                const regex = new RegExp(rgx);
                isValid = regex.test(valStr);
            } catch (e) {
                isValid = true;
            }
        }
        if (isValid) {
            onChange(valStr);
        }
    };

    const handleChange = (newVal: string) => {
        setLocalVal(newVal);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            checkAndPropagate(newVal);
        }, 250);
    };

    const handleBlur = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        checkAndPropagate(localVal);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            checkAndPropagate(localVal);
        }
    };

    return (
        <input
            type="text"
            value={localVal}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={className}
            placeholder={placeholder}
        />
    );
}


function MapSettingEditor({
    settingKey,
    config,
    value,
    onChange,
    validationErrors,
}: {
    settingKey: string;
    config: any;
    value: any;
    onChange: (newVal: any) => void;
    validationErrors: Record<string, string>;
}) {
    const items = Array.isArray(value) ? value : [];

    const handleAddItem = () => {
        const newItem: Record<string, any> = {};
        if (config.fields) {
            for (const field of config.fields) {
                if (field.as) {
                    newItem[field.as] = field.tp === "map" ? [] : "";
                }
            }
        }
        onChange([...items, newItem]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    const handleUpdateItemField = (index: number, fieldKey: string, fieldVal: any) => {
        const newItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, [fieldKey]: fieldVal };
            }
            return item;
        });
        onChange(newItems);
    };

    const isNestedConditionMet = (item: any, conditionList: any[]) => {
        if (!conditionList) return true;
        return conditionList.every((cond) => {
            const dependentKey = cond.for;
            const dependentVal = item[dependentKey];
            const valStr = dependentVal !== undefined && dependentVal !== null ? String(dependentVal) : "";
            
            if (cond.opt && Array.isArray(cond.opt)) {
                return cond.opt.map(String).includes(valStr);
            }
            if (cond.val !== undefined) {
                return String(cond.val) === valStr;
            }
            return true;
        });
    };

    return (
        <div className="space-y-3 p-3 bg-zinc-50/50 border border-zinc-200/80 rounded-lg">
            {items.map((item, idx) => (
                <div key={idx} className="bg-white border border-zinc-200 rounded-lg p-3 space-y-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] relative">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 gap-1.5">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex-grow">
                            Item #{idx + 1}
                        </span>
                        {idx > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const newItems = [...items];
                                    const temp = newItems[idx];
                                    newItems[idx] = newItems[idx - 1];
                                    newItems[idx - 1] = temp;
                                    onChange(newItems);
                                }}
                                className="text-zinc-400 hover:text-zinc-700 p-1 hover:bg-zinc-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                title="Move Up"
                            >
                                <ArrowUp className="w-3 h-3" />
                            </button>
                        )}
                        {idx < items.length - 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const newItems = [...items];
                                    const temp = newItems[idx];
                                    newItems[idx] = newItems[idx + 1];
                                    newItems[idx + 1] = temp;
                                    onChange(newItems);
                                }}
                                className="text-zinc-400 hover:text-zinc-700 p-1 hover:bg-zinc-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                title="Move Down"
                            >
                                <ArrowDown className="w-3 h-3" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors cursor-pointer flex items-center justify-center ml-1"
                            title="Remove"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {config.fields?.map((field: any, fIdx: number) => {
                            const fieldKey = field.as;
                            const fieldValue = fieldKey ? (item[fieldKey] ?? "") : "";

                            if (field.condition && !isNestedConditionMet(item, field.condition)) {
                                return null;
                            }

                            if (field.tp === "map") {
                                return (
                                    <div key={fIdx} className="space-y-1.5">
                                        <SettingLabel
                                            labelKey={fieldKey || "Sub List"}
                                            name={field.name}
                                            description={field.description}
                                            descrption={field.descrption}
                                            className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide"
                                        />
                                        <MapSettingEditor
                                            settingKey={`${settingKey}_${idx}_${fieldKey}`}
                                            config={field}
                                            value={item[fieldKey] || []}
                                            onChange={(newVal) => handleUpdateItemField(idx, fieldKey, newVal)}
                                            validationErrors={validationErrors}
                                        />
                                    </div>
                                );
                            }

                            const hasError = !!validationErrors[`${settingKey}_${idx}_${fieldKey}`];

                            let inputNode;
                            if (field.opt && field.rgx) {
                                inputNode = (
                                    <div className={`relative flex items-center bg-white border rounded-md transition-all ${
                                        hasError ? "border-red-300 bg-red-50/30" : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-900/10"
                                    }`}>
                                        <IsolatedInput
                                            value={fieldValue}
                                            onChange={(val) => handleUpdateItemField(idx, fieldKey, val)}
                                            rgx={field.rgx}
                                            className="w-full bg-transparent text-[11px] font-sans font-semibold text-zinc-800 outline-none px-2.5 py-1.5 leading-none"
                                            placeholder={`Enter ${field.name || "value"} or select option…`}
                                        />
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                                <button className="shrink-0 px-2 py-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer outline-none border-l border-zinc-200 rounded-r-md">
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                </button>
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Portal>
                                                <DropdownMenu.Content
                                                    align="end"
                                                    sideOffset={4}
                                                    className="z-[200] min-w-[120px] bg-white border border-zinc-200 rounded-md shadow-lg p-1 outline-none font-sans text-[12px]"
                                                >
                                                    {field.opt.map((optVal: string) => (
                                                        <DropdownMenu.Item
                                                            key={optVal}
                                                            onSelect={() => handleUpdateItemField(idx, fieldKey, optVal)}
                                                            className={`px-3 py-2 rounded-md cursor-pointer outline-none transition-colors ${
                                                                fieldValue === optVal
                                                                    ? "bg-zinc-900 text-white"
                                                                    : "text-zinc-700 hover:bg-zinc-100"
                                                            }`}
                                                        >
                                                            {optVal}
                                                        </DropdownMenu.Item>
                                                    ))}
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    </div>
                                );
                            } else if (field.opt) {
                                inputNode = (
                                    <RadixSelect
                                        value={fieldValue}
                                        options={field.opt}
                                        onChange={(v) => handleUpdateItemField(idx, fieldKey, v)}
                                    />
                                );
                            } else {
                                inputNode = (
                                    <IsolatedInput
                                        value={fieldValue}
                                        onChange={(val) => handleUpdateItemField(idx, fieldKey, val)}
                                        rgx={field.rgx}
                                        className={`w-full border rounded-md px-2.5 py-1.5 text-[11px] font-sans font-semibold outline-none focus:ring-1 focus:border-zinc-400 focus:ring-zinc-950/10 bg-white text-zinc-800 ${
                                            hasError ? "border-red-300 bg-red-50/30" : "border-zinc-200"
                                        }`}
                                        placeholder={`Enter ${field.name || "value"}…`}
                                    />
                                );
                            }

                            // Primitive input
                            return (
                                <div key={fIdx} className="space-y-1">
                                    <SettingLabel
                                        labelKey={fieldKey || "Field"}
                                        name={field.name}
                                        description={field.description}
                                        descrption={field.descrption}
                                        className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide"
                                    />
                                    {inputNode}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddItem}
                className="w-full flex items-center justify-center gap-1 py-2 px-3 border border-dashed border-zinc-300 rounded-lg text-[11px] font-bold text-zinc-500 hover:text-zinc-800 hover:border-zinc-400 bg-white hover:bg-zinc-50/50 transition-all cursor-pointer"
            >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
            </button>
        </div>
    );
}

export default function ComponentSettings({
    selectedNode,
    componentSettingsMap,
    validationErrors,
    onUpdateSetting,
}: ComponentSettingsProps) {
    const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});

    const entry = componentSettingsMap?.[selectedNode.type];
    const settings = entry ? (entry.settings || (entry.name ? null : entry)) : null;

    // Filter settings to only keep prop settings (config.tp !== "style")
    const propSettings = settings
        ? Object.entries(settings).filter(([_, config]: [string, any]) => config.tp !== "style")
        : [];

    const isConditionMet = (conditionList: any[]) => {
        if (!conditionList) return true;
        return conditionList.every((cond) => {
            const dependentKey = cond.for;
            const dependentVal = selectedNode.settings?.[dependentKey];
            const valStr = dependentVal !== undefined && dependentVal !== null ? String(dependentVal) : "";
            
            if (cond.opt && Array.isArray(cond.opt)) {
                return cond.opt.map(String).includes(valStr);
            }
            if (cond.val !== undefined) {
                return String(cond.val) === valStr;
            }
            return true;
        });
    };

    // Filter visible settings based on conditions
    const visibleSettings = propSettings.filter(([_, config]: [string, any]) => {
        return !config.condition || isConditionMet(config.condition);
    });

    // Group settings
    const groups: Record<string, [string, any][]> = {};
    const ungrouped: [string, any][] = [];

    visibleSettings.forEach(([key, config]: [string, any]) => {
        if (config.group) {
            if (!groups[config.group]) {
                groups[config.group] = [];
            }
            groups[config.group].push([key, config]);
        } else {
            ungrouped.push([key, config]);
        }
    });

    const toggleGroup = (groupName: string) => {
        setCollapsedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const renderSettingInput = (key: string, config: any) => {
        const currentVal = selectedNode.settings?.[key] ?? (config.tp === "map" ? [] : "");
        const hasError = !!validationErrors[key];
        return (
            <div key={key} className="space-y-1.5">
                <SettingLabel
                    labelKey={key}
                    name={config.name}
                    description={config.description}
                    descrption={config.descrption}
                    className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide"
                />
                {config.tp === "map" ? (
                    <MapSettingEditor
                        settingKey={key}
                        config={config}
                        value={currentVal}
                        onChange={(newVal) => onUpdateSetting(key, newVal, config)}
                        validationErrors={validationErrors}
                    />
                ) : config.opt && config.rgx ? (
                    <div className={`relative flex items-center bg-white border rounded-md transition-all ${
                        hasError ? "border-red-300 bg-red-50/30" : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-900/10"
                    }`}>
                        <IsolatedInput
                            value={currentVal}
                            onChange={(val) => onUpdateSetting(key, val, config)}
                            rgx={config.rgx}
                            className="w-full bg-transparent text-[12px] font-sans font-semibold text-zinc-800 outline-none px-3 py-2 leading-none"
                            placeholder="Enter value or select option…"
                        />
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="shrink-0 px-2 py-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer outline-none border-l border-zinc-200 rounded-r-md">
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    align="end"
                                    sideOffset={4}
                                    className="z-[200] min-w-[120px] bg-white border border-zinc-200 rounded-md shadow-lg p-1 outline-none font-sans text-[12px]"
                                >
                                    {config.opt.map((optVal: string) => (
                                        <DropdownMenu.Item
                                            key={optVal}
                                            onSelect={() => onUpdateSetting(key, optVal, config)}
                                            className={`px-3 py-2 rounded-md cursor-pointer outline-none transition-colors ${
                                                currentVal === optVal
                                                    ? "bg-zinc-900 text-white"
                                                    : "text-zinc-700 hover:bg-zinc-100"
                                            }`}
                                        >
                                            {optVal}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                ) : config.opt ? (
                    <RadixSelect
                        value={currentVal}
                        options={config.opt}
                        onChange={(v) => onUpdateSetting(key, v, config)}
                    />
                ) : (
                    <IsolatedInput
                        value={currentVal}
                        onChange={(val) => onUpdateSetting(key, val, config)}
                        rgx={config.rgx}
                        className={`w-full border rounded-md px-3 py-2 text-[12px] font-sans font-semibold outline-none focus:ring-1 transition-colors ${hasError
                            ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100 bg-red-50/50 text-red-900"
                            : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-zinc-950/10 bg-white text-zinc-800"
                            }`}
                        placeholder="Enter value…"
                    />
                )}
                {hasError && (
                    <p className="text-[10px] text-red-500 font-medium">{validationErrors[key]}</p>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-5">
            {visibleSettings.length > 0 ? (
                <div className="space-y-4">
                    {/* Render ungrouped settings first */}
                    {ungrouped.map(([key, config]) => renderSettingInput(key, config))}

                    {/* Render grouped settings in collapsible panels */}
                    {Object.entries(groups).map(([groupName, fields]) => {
                        const isCollapsed = collapsedGroups[groupName] ?? false;
                        const capitalizedGroup = groupName.charAt(0).toUpperCase() + groupName.slice(1);
                        return (
                            <div key={groupName} className="border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(groupName)}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-zinc-50 border-b border-zinc-100 hover:bg-zinc-100/60 transition-colors cursor-pointer outline-none"
                                >
                                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                                        {capitalizedGroup} Settings
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isCollapsed ? "-rotate-120" : ""}`} />
                                </button>
                                {!isCollapsed && (
                                    <div className="p-3.5 space-y-4 bg-white">
                                        {fields.map(([key, config]) => renderSettingInput(key, config))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                    </div>
                    <p className="text-[11.5px] text-zinc-400 font-medium">No settings available</p>
                    <p className="text-[10px] text-zinc-300 mt-0.5">Try the Style tab for visual properties</p>
                </div>
            )}
        </div>
    );
}
