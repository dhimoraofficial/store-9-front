import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Code2, X, Upload, Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface ImportSchemaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    importSection: "announcement" | "navbar" | "footer" | "main" | null;
    currentSchema: any;
    onApplySchema: (parsedSchema: any[]) => void;
}

export default function ImportSchemaDialog({
    open,
    onOpenChange,
    importSection,
    currentSchema,
    onApplySchema
}: ImportSchemaDialogProps) {
    const [importJsonText, setImportJsonText] = useState("");
    const [importError, setImportError] = useState<string | null>(null);
    const [activeImportTab, setActiveImportTab] = useState("import");
    const [copied, setCopied] = useState(false);

    // Reset state on dialog open/close
    useEffect(() => {
        if (open) {
            setImportJsonText("");
            setImportError(null);
            setActiveImportTab("import");
            setCopied(false);
        }
    }, [open]);

    const handleImportSchema = () => {
        if (!importSection) return;
        try {
            const parsed = JSON.parse(importJsonText);
            if (!Array.isArray(parsed)) {
                setImportError("Schema must be a JSON array of ComponentSchema objects.");
                return;
            }
            // Basic validation check
            for (let i = 0; i < parsed.length; i++) {
                const item = parsed[i];
                if (!item.id || !item.type) {
                    setImportError(`Item at index ${i} is missing required 'id' or 'type' fields.`);
                    return;
                }
            }
            onApplySchema(parsed);
            setShowSuccessToast();
            onOpenChange(false);
        } catch (e: any) {
            setImportError(`Malformed JSON: ${e.message}`);
        }
    };

    const setShowSuccessToast = () => {
        const sectionDisplayName = importSection === "navbar"
            ? "header/navbar"
            : importSection === "main"
                ? "template layout"
                : importSection ? importSection.replace("_", " ") : "layout";
        toast.success(`Successfully imported schema for ${sectionDisplayName}!`);
    };

    const handleCopyCurrentSchema = () => {
        navigator.clipboard.writeText(JSON.stringify(currentSchema, null, 4));
        setCopied(true);
        toast.success("Current schema copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrettifyJson = () => {
        try {
            const parsed = JSON.parse(importJsonText);
            setImportJsonText(JSON.stringify(parsed, null, 2));
            setImportError(null);
        } catch (e: any) {
            setImportError(`Cannot prettify — invalid JSON: ${e.message}`);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-zinc-900/10 backdrop-blur-[2px] z-[100] transition-all" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[500px] h-[460px] rounded-2xl border border-zinc-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden z-[100] outline-none transition-all font-sans">

                    {/* Unified Header */}
                    <div className="px-5.5 py-4 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-white">
                        <div>
                            <Dialog.Title className="text-[13.5px] font-bold text-zinc-900 flex items-center gap-1.5 leading-none">
                                <Code2 className="w-4 h-4 text-zinc-500 shrink-0" />
                                {importSection === "navbar"
                                    ? "Header / Navbar Schema"
                                    : importSection === "main"
                                        ? "Template Layout Schema"
                                        : importSection ? (importSection.charAt(0).toUpperCase() + importSection.slice(1).replace("_", " ") + " Schema") : "Schema Manager"}
                            </Dialog.Title>
                            <p className="text-[10.5px] text-zinc-400 font-medium mt-1.5 leading-none font-sans">JSON Import & Export Manager</p>
                        </div>
                        <Dialog.Close asChild>
                            <button className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-md hover:bg-zinc-50 transition-colors cursor-pointer outline-none">
                                <X className="w-4 h-4" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Tabs content */}
                    <Tabs.Root value={activeImportTab} onValueChange={setActiveImportTab} className="flex-1 flex flex-col min-h-0 bg-white p-5">
                        {/* Sliding segment tabs */}
                        <Tabs.List className="flex bg-zinc-100 p-1 rounded-lg gap-1 shrink-0 max-w-[200px] mb-3">
                            <Tabs.Trigger
                                value="import"
                                className={`flex-1 py-1 text-[11.5px] font-bold rounded-md transition-all cursor-pointer outline-none ${activeImportTab === "import"
                                    ? "bg-white text-zinc-900 shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-500"
                                    }`}
                            >
                                Import
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="export"
                                className={`flex-1 py-1 text-[11.5px] font-bold rounded-md transition-all cursor-pointer outline-none ${activeImportTab === "export"
                                    ? "bg-white text-zinc-900 shadow-sm"
                                    : "text-zinc-400 hover:text-zinc-500"
                                    }`}
                            >
                                Export
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* Import Content */}
                        <Tabs.Content value="import" className="flex-1 min-h-0 flex flex-col outline-none">
                            <div className="mb-3 flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200/50 rounded-lg text-amber-900 text-[10.5px] leading-relaxed">
                                <svg className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                                <div>
                                    Importing custom schema will completely overwrite the existing layout.
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 rounded-lg border border-zinc-200 bg-[#0c0d12] overflow-hidden flex flex-col shadow-inner">
                                <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#11131a] border-b border-zinc-900/60 select-none">
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${importJsonText ? (importError ? "bg-rose-500 animate-pulse" : "bg-emerald-500") : "bg-zinc-600"}`} />
                                        <span className="text-[10px] font-mono text-zinc-500">layout_schema.json</span>
                                    </div>
                                    <button
                                        onClick={handlePrettifyJson}
                                        disabled={!importJsonText.trim()}
                                        className="text-[9px] font-mono font-bold text-zinc-500 hover:text-zinc-200 bg-zinc-900/80 hover:bg-zinc-700/80 px-2 py-0.5 rounded transition-colors cursor-pointer outline-none disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        ✦ Prettify
                                    </button>
                                </div>
                                <textarea
                                    value={importJsonText}
                                    onChange={(e) => {
                                        setImportJsonText(e.target.value);
                                        setImportError(null);
                                    }}
                                    placeholder={`[\n  {\n    "id": "example_id",\n    "type": "box",\n    "settings": {},\n    "children": []\n  }\n]`}
                                    className="flex-1 w-full bg-transparent font-mono text-[11px] text-[#89ddff] p-4 resize-none outline-none leading-relaxed overflow-y-auto placeholder:text-zinc-700"
                                />
                                {importError && (
                                    <div className="mx-4 mb-4 p-2.5 bg-rose-950/60 border border-rose-900/70 rounded-md text-rose-200 text-[10.5px] font-mono leading-normal shadow-sm">
                                        {importError}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-3 shrink-0">
                                <p className="text-[10px] text-zinc-400">
                                    {importJsonText.trim() ? `${importJsonText.trim().length} chars` : "Paste JSON above"}
                                </p>
                                <div className="flex gap-2">
                                    <Dialog.Close asChild>
                                        <button className="px-3.5 py-1.5 border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-md text-[11.5px] font-bold active:scale-[0.98] transition-all cursor-pointer">
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <button
                                        onClick={handleImportSchema}
                                        disabled={!importJsonText.trim()}
                                        className="px-4 py-1.5 bg-zinc-950 hover:bg-zinc-900 text-white rounded-md text-[11.5px] font-bold border border-zinc-950 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1 disabled:opacity-35 disabled:pointer-events-none shadow-sm"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        Apply Schema
                                    </button>
                                </div>
                            </div>
                        </Tabs.Content>

                        {/* Export Content */}
                        <Tabs.Content value="export" className="flex-1 min-h-0 flex flex-col outline-none">
                            <div className="mb-2.5 text-[11px] text-zinc-400 leading-normal">
                                Copy this JSON schema code to back up your current layout configuration.
                            </div>

                            <div className="flex-1 min-h-0 rounded-lg border border-zinc-200 bg-[#0c0d12] overflow-hidden flex flex-col shadow-sm">
                                <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#11131a] border-b border-zinc-900/60 select-none">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                                        <span className="text-[10px] font-mono text-zinc-400">layout_schema_backup.json</span>
                                    </div>
                                    <span className="text-[8.5px] font-mono font-bold text-zinc-600 bg-zinc-900/80 px-1.5 py-0.5 rounded">READ ONLY</span>
                                </div>
                                <pre className="flex-1 w-full bg-transparent font-mono text-[11px] text-[#c3e88d] p-4 overflow-y-auto leading-relaxed select-all">
                                    {currentSchema ? JSON.stringify(currentSchema, null, 4) : ""}
                                </pre>
                            </div>

                            <div className="flex items-center justify-between mt-3 shrink-0">
                                <p className="text-[10px] text-zinc-400 font-mono">
                                    {currentSchema ? `${JSON.stringify(currentSchema).length} chars` : ""}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopyCurrentSchema}
                                        className={`px-4 py-1.5 text-[11.5px] font-bold active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1 rounded-md border shadow-sm ${copied
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-zinc-950 hover:bg-zinc-900 text-white border-zinc-950"
                                            }`}
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copied ? "Copied!" : "Copy Schema"}
                                    </button>
                                    <Dialog.Close asChild>
                                        <button className="px-3.5 py-1.5 border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-md text-[11.5px] font-bold active:scale-[0.98] transition-all cursor-pointer">
                                            Close
                                        </button>
                                    </Dialog.Close>
                                </div>
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
