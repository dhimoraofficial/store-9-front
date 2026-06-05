import ComponentBuilder from "@/application/runtime/builder/ComponentBuilder";
import { ApplicationLayout, ApplicationRoutes } from "@/application/runtime/pages/type";
import { getCategoryByHandle, MOCK_CATEGORIES } from "@/application/runtime/db/categories";

export default function CategoryPageController({
    layout,
    route,
    tenant,
    store
}: {
    layout: ApplicationLayout;
    route: ApplicationRoutes;
    tenant: string;
    store: string;
}) {
    const path = route.route || "";
    const parts = path.split("/").filter(Boolean);
    const handle = parts[parts.length - 1];

    // Editor fallback
    let categoryHandle = handle;
    if (categoryHandle === "<handle>" || !categoryHandle) {
        categoryHandle = MOCK_CATEGORIES[0]?.handle || "";
    }

    const category = getCategoryByHandle(categoryHandle);

    const context = {
        category: category || {
            name: "Collection Not Found",
            description: "Please verify the URL or select a valid category handle."
        }
    };

    return <ComponentBuilder schema={layout?._c} context={context} />;
}
