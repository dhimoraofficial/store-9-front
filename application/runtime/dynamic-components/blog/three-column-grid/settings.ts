import { ComponentGlobalSchemaSettingsMapType } from "../../core";

export const ComponentBlogSchemaSettingsMap: ComponentGlobalSchemaSettingsMapType = {
    title: {
        as: "title",
        tp: "prop",
        rgx: ".*"
    },
    subtitle: {
        as: "subtitle",
        tp: "prop",
        rgx: ".*"
    },
    post1_category: { as: "post1_category", tp: "prop", rgx: ".*" },
    post1_title: { as: "post1_title", tp: "prop", rgx: ".*" },
    post1_excerpt: { as: "post1_excerpt", tp: "prop", rgx: ".*" },
    post1_image: { as: "post1_image", tp: "prop", rgx: ".*" },

    post2_category: { as: "post2_category", tp: "prop", rgx: ".*" },
    post2_title: { as: "post2_title", tp: "prop", rgx: ".*" },
    post2_excerpt: { as: "post2_excerpt", tp: "prop", rgx: ".*" },
    post2_image: { as: "post2_image", tp: "prop", rgx: ".*" },

    post3_category: { as: "post3_category", tp: "prop", rgx: ".*" },
    post3_title: { as: "post3_title", tp: "prop", rgx: ".*" },
    post3_excerpt: { as: "post3_excerpt", tp: "prop", rgx: ".*" },
    post3_image: { as: "post3_image", tp: "prop", rgx: ".*" }
};

export function parseBlogComponentSettings(type: string, settings: any) {
    return { ...settings };
}
