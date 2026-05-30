import ComponentBuilder from "@/application/runtime/builder/ComponentBuilder";
import { ApplicationLayout, ApplicationRoutes } from "@/application/runtime/pages/type";
import { getProductByHandle, MOCK_PRODUCTS } from "@/application/runtime/db/products";

export default function ProductPageController({
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
    // Extract handle from path route (e.g. /products/premium-cotton-hoodie)
    const path = route.route || "";
    const parts = path.split("/").filter(Boolean);
    const handle = parts[parts.length - 1];

    // Editor fallback context preview
    let productHandle = handle;
    if (productHandle === "<handle>" || !productHandle) {
        productHandle = MOCK_PRODUCTS[0]?.handle || "";
    }

    const product = getProductByHandle(productHandle);

    // Build the evaluation context
    const context = {
        product: product || {
            title: "Product Not Found",
            description: "Please verify the URL or select a valid product handle.",
            price: "0.00",
            compareAtPrice: "0.00",
            image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800",
            images: [],
            badgeText: "Not Found"
        },
        activeVariant: product?.variants[0] || {
            price: "0.00",
            compareAtPrice: "0.00",
            sku: "N-A"
        }
    };

    return <ComponentBuilder schema={layout?._c} context={context} />;
}
