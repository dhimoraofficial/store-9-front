export type WishlistProductMetadata = {
    title: string;
    short_desc: string;
    primary_image: string;
    price: number;
    variant_id: string;
    product_id: string;
    variant_name: string;
    stock_total: number;
};

export type WishlistRecord = {
    id: string;
    metadata: WishlistProductMetadata;
    added_at: number;
    updated_at: number;
};

export type WishlistStore = Record<string, WishlistRecord>;

export type AddToWishListParams = {
    productID?: string | number | null;
    metadata?: Partial<WishlistProductMetadata>;
};

export type UpdateWishlistMetadataParams = {
    productID?: string | number | null;
    metadata?: Partial<WishlistProductMetadata>;
};
