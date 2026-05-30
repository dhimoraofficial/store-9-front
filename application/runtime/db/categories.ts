export interface Category {
    id: string;
    handle: string;
    name: string;
    description: string;
    image?: string;
}

export const MOCK_CATEGORIES: Category[] = [
    {
        id: "cat-women",
        handle: "women",
        name: "Women's Collection",
        description: "Curated premium fashion, elegant coordinates, and high-quality outerwear for women.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
    },
    {
        id: "cat-men",
        handle: "men",
        name: "Men's Collection",
        description: "Sharp tailoring, organic cotton leisurewear, and rugged essentials designed to last.",
        image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800"
    },
    {
        id: "cat-accessories",
        handle: "accessories",
        name: "Premium Accessories",
        description: "Handcrafted leather accessories, timepieces, and minimal styling accents.",
        image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=800"
    }
];

export function getCategoryByHandle(handle: string): Category | undefined {
    const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9-]/g, "");
    return MOCK_CATEGORIES.find(c => c.handle.toLowerCase() === cleanHandle || c.handle === handle);
}
