import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentFooterSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    theme: {
        as: "theme",
        tp: "prop",
        group: "layout",
        name: "Footer Theme Mode",
        description: "Pick the background color theme (light, dark, or slate) for the footer.",
        opt: ["light", "dark", "slate"]
    },
    copyright: {
        as: "copyright",
        tp: "prop",
        group: "layout",
        name: "Copyright Notice Text",
        description: "The copyright notice text displayed at the bottom of the footer.",
        rgx: ".*"
    },
    // Column 1
    col1Width: {
        as: "col1Width",
        tp: "prop",
        group: "column_1",
        name: "Column 1 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col1Align: {
        as: "col1Align",
        tp: "prop",
        group: "column_1",
        name: "Column 1 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Column 2
    col2Width: {
        as: "col2Width",
        tp: "prop",
        group: "column_2",
        name: "Column 2 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col2Align: {
        as: "col2Align",
        tp: "prop",
        group: "column_2",
        name: "Column 2 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Column 3
    col3Width: {
        as: "col3Width",
        tp: "prop",
        group: "column_3",
        name: "Column 3 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col3Align: {
        as: "col3Align",
        tp: "prop",
        group: "column_3",
        name: "Column 3 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Column 4
    col4Width: {
        as: "col4Width",
        tp: "prop",
        group: "column_4",
        name: "Column 4 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col4Align: {
        as: "col4Align",
        tp: "prop",
        group: "column_4",
        name: "Column 4 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Column 5
    col5Width: {
        as: "col5Width",
        tp: "prop",
        group: "column_5",
        name: "Column 5 Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    col5Align: {
        as: "col5Align",
        tp: "prop",
        group: "column_5",
        name: "Column 5 Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Bottom Left
    bottomLeftWidth: {
        as: "bottomLeftWidth",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Left Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomLeftAlign: {
        as: "bottomLeftAlign",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Left Alignment",
        opt: ["start", "center", "end", "between"]
    },
    // Bottom Right
    bottomRightWidth: {
        as: "bottomRightWidth",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Right Width",
        opt: ["auto", "1", "2", "3", "flex-grow", "flex-1"]
    },
    bottomRightAlign: {
        as: "bottomRightAlign",
        tp: "prop",
        group: "bottom_bar",
        name: "Bottom Right Alignment",
        opt: ["start", "center", "end", "between"]
    },
    mobileGridColumns: {
        as: "mobileGridColumns",
        tp: "prop",
        group: "responsive",
        name: "Mobile Grid Columns",
        description: "Specify if footer columns lay out in a single-column list or a 2-column grid on mobile viewports.",
        opt: ["1", "2"]
    },
    mobileAlignment: {
        as: "mobileAlignment",
        tp: "prop",
        group: "responsive",
        name: "Mobile Content Alignment",
        description: "Align footer contents on mobile viewports (inherit desktop alignment or force center/left).",
        opt: ["inherit", "center", "left"]
    }
};

export function parseFooterComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };

    // Fallbacks
    if (!parsed.theme) parsed.theme = "light";
    if (!parsed.copyright) parsed.copyright = `© ${new Date().getFullYear()} Generation Nepal. All rights reserved.`;

    if (!parsed.col1Width) parsed.col1Width = "flex-grow";
    if (!parsed.col1Align) parsed.col1Align = "start";
    if (!parsed.col2Width) parsed.col2Width = "auto";
    if (!parsed.col2Align) parsed.col2Align = "start";
    if (!parsed.col3Width) parsed.col3Width = "auto";
    if (!parsed.col3Align) parsed.col3Align = "start";
    if (!parsed.col4Width) parsed.col4Width = "flex-grow";
    if (!parsed.col4Align) parsed.col4Align = "start";
    if (!parsed.col5Width) parsed.col5Width = "auto";
    if (!parsed.col5Align) parsed.col5Align = "start";

    if (!parsed.bottomLeftWidth) parsed.bottomLeftWidth = "auto";
    if (!parsed.bottomLeftAlign) parsed.bottomLeftAlign = "start";
    if (!parsed.bottomRightWidth) parsed.bottomRightWidth = "auto";
    if (!parsed.bottomRightAlign) parsed.bottomRightAlign = "end";

    if (!parsed.mobileGridColumns) parsed.mobileGridColumns = "1";
    if (!parsed.mobileAlignment) parsed.mobileAlignment = "inherit";

    return parsed;
}
