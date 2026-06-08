import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentBoxBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    direction: {
        as: "direction",
        tp: "prop",
        group: "layout",
        name: "Layout Direction",
        description: "Stack children vertically (column) or lay them out horizontally (row).",
        opt: ["column", "row"]
    },
    width: {
        as: "width",
        tp: "prop",
        group: "layout",
        name: "Column Width",
        description: "Define the relative width of this container.",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1", "full"],
        rgx: "^\\d+(\\.\\d+)?rem$"
    },
    align: {
        as: "align",
        tp: "prop",
        group: "layout",
        name: "Content Alignment",
        description: "Align items along the cross axis (start, center, end, stretch).",
        opt: ["start", "center", "end", "stretch"]
    },
    justify: {
        as: "justify",
        tp: "prop",
        group: "layout",
        name: "Justify Content",
        description: "Distribute space along the main axis (start, center, end, between).",
        opt: ["start", "center", "end", "between"]
    },
    gap: {
        as: "gap",
        tp: "prop",
        group: "layout",
        name: "Inner Gap Spacing",
        description: "Spacing between direct children.",
        opt: ["none", "small", "medium", "large"]
    },
    display: {
        as: "display",
        tp: "prop",
        group: "layout",
        name: "Layout Engine",
        description: "Choose between flexbox or grid layout engine.",
        opt: ["flex", "grid"]
    },
    gridColumns: {
        as: "gridColumns",
        tp: "prop",
        group: "layout",
        name: "Grid Columns Count",
        description: "Number of grid column tracks (only active when display is grid).",
        opt: ["1", "2", "3", "4", "5", "6", "12"],
        rgx: "^\\d+$"
    },
    hoverEffect: {
        as: "hoverEffect",
        tp: "prop",
        group: "style",
        name: "Hover Interaction Effect",
        description: "Interactive visual transition on hover.",
        opt: ["none", "shadow-raise", "scale-up", "bg-tint"]
    },
    backgroundColor: {
        as: "backgroundColor",
        tp: "prop",
        group: "style",
        name: "Custom Background Color",
        description: "Background color of the column.",
        opt: ["transparent", "white", "slate-50", "slate-100", "zinc-900", "primary", "secondary"]
    },
    padding: {
        as: "padding",
        tp: "prop",
        group: "style",
        name: "Padding Size",
        description: "Internal padding spacing.",
        opt: ["none", "small", "medium", "large"]
    }
};

export function parseBoxBlockComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };

    // Map legacy box-* settings keys
    if (parsed["box-direction"]) {
        parsed.direction = parsed["box-direction"] === "col" ? "column" : parsed["box-direction"];
        delete parsed["box-direction"];
    }
    if (parsed["box-align"]) {
        parsed.align = parsed["box-align"];
        delete parsed["box-align"];
    }
    if (parsed["box-justify"]) {
        parsed.justify = parsed["box-justify"] === "space-between" ? "between" : parsed["box-justify"];
        delete parsed["box-justify"];
    }
    if (parsed["box-gap"]) {
        const legacyGap = parsed["box-gap"];
        if (legacyGap === "1rem" || legacyGap === "1.25rem") {
            parsed.gap = "large";
        } else if (legacyGap === "0.5rem" || legacyGap === "8px" || legacyGap === "4px") {
            parsed.gap = "small";
        } else if (legacyGap === "none" || legacyGap === "0") {
            parsed.gap = "none";
        } else {
            parsed.gap = "medium";
        }
        delete parsed["box-gap"];
    }

    // Normalize direct values
    if (parsed.direction === "col") parsed.direction = "column";
    if (parsed.justify === "space-between") parsed.justify = "between";

    if (!parsed.direction) parsed.direction = "column";
    if (!parsed.width) parsed.width = "auto";
    if (!parsed.align) parsed.align = "start";
    if (!parsed.justify) parsed.justify = "start";
    if (!parsed.gap) parsed.gap = "medium";
    if (!parsed.backgroundColor) parsed.backgroundColor = "transparent";
    if (!parsed.padding) parsed.padding = "none";
    if (!parsed.display) parsed.display = "flex";
    if (!parsed.gridColumns) parsed.gridColumns = "1";
    if (!parsed.hoverEffect) parsed.hoverEffect = "none";

    return parsed;
}
