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
    }
};

export function parseFAQBlockComponentSettings(type: string, settings: any) {
    const parsed: any = {};
    parsed.title = settings?.title ?? "";
    parsed.question = settings?.question ?? "";
    parsed.answer = settings?.answer ?? "";
    
    return parsed;
}
