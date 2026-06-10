import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentFAQBlockSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: {
        as: "title",
        tp: "prop",
        name: "Section Title (Optional)",
        rgx: ".*"
    },
    question: {
        as: "question",
        tp: "prop",
        name: "Question Text",
        rgx: ".*"
    },
    answer: {
        as: "answer",
        tp: "prop",
        name: "Answer Text",
        rgx: ".*"
    },
    variant: {
        as: "variant",
        tp: "prop",
        name: "Layout Style Variant",
        opt: ["default", "minimal", "bordered", "soft"]
    }
};

export function parseFAQBlockComponentSettings(type: string, settings: any) {
    const parsed = { ...settings };
    parsed.title = settings?.title ?? "";
    parsed.question = settings?.question ?? "";
    parsed.answer = settings?.answer ?? "";
    parsed.variant = settings?.variant ?? "default";
    
    return parsed;
}
