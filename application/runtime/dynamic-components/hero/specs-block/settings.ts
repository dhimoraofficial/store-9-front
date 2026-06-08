
export const ComponentSpecsBlockSchemaSettingsMap = {
    specList: {
        as: "specList",
        name: "Technical Specification Key-Value Pairs",
        tp: "map",
        fields: [
            { as: "label", name: "Specification Label (e.g., CPU, RAM)", rgx: ".*" },
            { as: "value", name: "Specification Value (e.g., Core i7, 16GB)", rgx: ".*" }
        ]
    }
};

export function parseSpecsComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.specList = Array.isArray(settings?.specList) ? settings.specList : [];
    return parsed;
}
