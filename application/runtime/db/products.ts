export interface ProductVariant {
    id: string;
    price: string;
    compareAtPrice?: string;
    sku: string;
    options: Record<string, string>;
}

export interface Product {
    id: string;
    handle: string;
    title: string;
    description: string;
    price: string;
    compareAtPrice?: string;
    image: string;
    images: string[];
    options: {
        name: string;
        values: string[];
    }[];
    variants: ProductVariant[];
    badgeText?: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "prod-1",
        handle: "premium-cotton-hoodie",
        title: "Premium Coasdasdastton Hoodie",
        description: "An exceptionally soft, heavyweight organic cotton fleece hoodie. Features a double-lined hood, kangaroo pocket, ribbed cuffs, and a modern relaxed silhouette. Made in Nepal from organic cotton.",
        price: "4500.00",
        compareAtPrice: "5500.00",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"
        ],
        badgeText: "Best Seller",
        options: [
            { name: "Size", values: ["XS", "S", "M", "L"] },
            { name: "Color", values: ["Charcoal", "Sage", "Sand"] }
        ],
        variants: [
            { id: "v1-xs-charcoal", price: "4500.00", compareAtPrice: "5500.00", sku: "HD-COT-XS-CH", options: { Size: "XS", Color: "Charcoal" } },
            { id: "v1-s-charcoal", price: "4500.00", compareAtPrice: "5500.00", sku: "HD-COT-S-CH", options: { Size: "S", Color: "Charcoal" } },
            { id: "v1-m-charcoal", price: "4500.00", compareAtPrice: "5500.00", sku: "HD-COT-M-CH", options: { Size: "M", Color: "Charcoal" } },
            { id: "v1-l-charcoal", price: "4700.00", compareAtPrice: "5800.00", sku: "HD-COT-L-CH", options: { Size: "L", Color: "Charcoal" } },
            { id: "v1-s-sage", price: "4500.00", compareAtPrice: "5500.00", sku: "HD-COT-S-SG", options: { Size: "S", Color: "Sage" } },
            { id: "v1-m-sage", price: "4500.00", compareAtPrice: "5500.00", sku: "HD-COT-M-SG", options: { Size: "M", Color: "Sage" } },
            { id: "v1-s-sand", price: "4500.00", compareAtPrice: "5500.00", sku: "HD-COT-S-SD", options: { Size: "S", Color: "Sand" } }
        ]
    },
    {
        id: "prod-2",
        handle: "slim-fit-canvas-chino",
        title: "Slim Fit Canasdasdasdasdvas Chino",
        description: "Hardwearing cotton canvas woven with a touch of stretch for day-long comfort. Straight, slim leg silhouette with clean chino detailing, slash side pockets, and double-welt back pockets.",
        price: "3200.00",
        compareAtPrice: "4200.00",
        image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800",
        images: [
            "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800"
        ],
        badgeText: "Premium Fit",
        options: [
            { name: "Size", values: ["30", "32", "34"] },
            { name: "Color", values: ["Tan", "Navy"] }
        ],
        variants: [
            { id: "v2-30-tan", price: "3200.00", compareAtPrice: "4200.00", sku: "CH-CNV-30-TN", options: { Size: "30", Color: "Tan" } },
            { id: "v2-32-tan", price: "3200.00", compareAtPrice: "4200.00", sku: "CH-CNV-32-TN", options: { Size: "32", Color: "Tan" } },
            { id: "v2-34-tan", price: "3300.00", compareAtPrice: "4400.00", sku: "CH-CNV-34-TN", options: { Size: "34", Color: "Tan" } }
        ]
    },
    {
        id: "prod-3",
        handle: "classic-double-breasted-asdasdasdasdasdtrenchcoat",
        title: "Classic Doubsasdasdasdasdle-Breasted Trenchcoat",
        description: "A refined classic engineered with weather-resistant organic cotton. Features a double-breasted closure, adjustable belt, storm flap, and a rear vent. Made to be layered over knitwear or worn alone as a statement outerwear piece.",
        price: "24900.00",
        compareAtPrice: "32000.00",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
        images: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800"
        ],
        badgeText: "Eco-Conscious / Traceable",
        options: [
            { name: "Size", values: ["XS", "S", "M", "L"] }
        ],
        variants: [
            { id: "v3-xs", price: "24900.00", compareAtPrice: "32000.00", sku: "TC-DB-XS", options: { Size: "XS" } },
            { id: "v3-s", price: "24900.00", compareAtPrice: "32000.00", sku: "TC-DB-S", options: { Size: "S" } },
            { id: "v3-m", price: "24900.00", compareAtPrice: "32000.00", sku: "TC-DB-M", options: { Size: "M" } },
            { id: "v3-l", price: "25900.00", compareAtPrice: "34000.00", sku: "TC-DB-L", options: { Size: "L" } }
        ]
    }
];

export function getProductByHandle(handle: string): Product | undefined {
    // If exact handle matches, return it, or try case-insensitive and slug-friendly normalization
    const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9-]/g, "");
    return MOCK_PRODUCTS.find(p => p.handle.toLowerCase() === cleanHandle || p.handle === handle);
}
