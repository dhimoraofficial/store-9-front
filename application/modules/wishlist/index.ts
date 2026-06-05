'use client';

import useAppOption from '@/application/providers/option';
import { useMemo } from 'react';
import {
    AddToWishListParams,
    UpdateWishlistMetadataParams,
    WishlistProductMetadata,
    WishlistRecord,
    WishlistStore,
} from './type';

export type {
    AddToWishListParams,
    UpdateWishlistMetadataParams,
    WishlistProductMetadata,
    WishlistRecord,
    WishlistStore
} from './type';

function normalizeProductID(id?: string | number | null): string | null {
    if (id === undefined || id === null) return null;
    const normalized = String(id).trim();
    return normalized || null;
}

function normalizeMetadata(metadata?: Partial<WishlistProductMetadata>): WishlistProductMetadata {
    return {
        title: String(metadata?.title || ''),
        short_desc: String(metadata?.short_desc || ''),
        primary_image: String(metadata?.primary_image || ''),
        price: Number(metadata?.price || 0),
        variant_id: String(metadata?.variant_id || ''),
        product_id: String(metadata?.product_id || ''),
        variant_name: String(metadata?.variant_name || ''),
        stock_total: Number(metadata?.stock_total || 0),
    };
}

function normalizeLegacyStore(raw: unknown): WishlistStore {
    if (!raw) return {};

    if (Array.isArray(raw)) {
        const now = Date.now();
        return raw.reduce<WishlistStore>((acc, pid) => {
            const id = normalizeProductID(pid);
            if (!id) return acc;
            acc[id] = {
                id,
                metadata: normalizeMetadata(),
                added_at: now,
                updated_at: now,
            };
            return acc;
        }, {});
    }

    if (typeof raw === 'object') {
        const entries = Object.entries(raw as Record<string, any>);
        return entries.reduce<WishlistStore>((acc, [key, value]) => {
            const id = normalizeProductID(value?.id || key);
            if (!id) return acc;
            const addedAt = Number(value?.added_at || Date.now());
            const updatedAt = Number(value?.updated_at || addedAt);
            acc[id] = {
                id,
                metadata: normalizeMetadata(value?.metadata),
                added_at: addedAt,
                updated_at: updatedAt,
            };
            return acc;
        }, {});
    }

    return {};
}

export default function useToggleWishList(productID?: string | number | null) {
    const [wishListCache, setWishListCache, asyncWishListCache] = useAppOption<WishlistStore | string[]>('__drk_wishlist', {}, {
        useL1Memory: true,
    });

    const normalizedSyncStore = useMemo(() => normalizeLegacyStore(wishListCache), [wishListCache]);

    async function getWishlistStore(): Promise<WishlistStore> {
        const response = await asyncWishListCache();
        return normalizeLegacyStore(response);
    }

    async function getWishListProducts(): Promise<string[]> {
        const store = await getWishlistStore();
        return Object.keys(store);
    }

    async function getAllWishList(): Promise<WishlistRecord[]> {
        const store = await getWishlistStore();
        return Object.values(store).sort((a, b) => b.updated_at - a.updated_at);
    }

    async function updateMetadata({
                                      productID: targetID,
                                      metadata
                                  }: UpdateWishlistMetadataParams = {}): Promise<WishlistRecord | null> {
        const currentProductID = normalizeProductID(targetID ?? productID);
        if (!currentProductID) return null;

        let updatedRecord: WishlistRecord | null = null;

        await setWishListCache((prev) => {
            const prevStore = normalizeLegacyStore(prev);
            const now = Date.now();
            const existing = prevStore[currentProductID];
            const normalizedMeta = normalizeMetadata(metadata);

            updatedRecord = {
                id: currentProductID,
                metadata: {
                    ...(existing?.metadata || normalizeMetadata()),
                    ...normalizedMeta,
                },
                added_at: existing?.added_at || now,
                updated_at: now,
            };

            return {
                ...prevStore,
                [currentProductID]: updatedRecord,
            };
        });

        return updatedRecord;
    }

    async function addToWishList({productID: targetID, metadata}: AddToWishListParams = {}): Promise<string[]> {
        await updateMetadata({productID: targetID, metadata});
        return await getWishListProducts();
    }

    async function deleteProductFromWishList(targetID?: string | number | null): Promise<boolean> {
        const currentProductID = normalizeProductID(targetID ?? productID);
        if (!currentProductID) return true;

        await setWishListCache((prev) => {
            const prevStore = normalizeLegacyStore(prev);
            const nextStore = {...prevStore};
            delete nextStore[currentProductID];
            return nextStore;
        });

        return true;
    }

    async function clearWishList(): Promise<void> {
        await setWishListCache({});
    }

    const currentProductID = normalizeProductID(productID);
    const toggleWishList = currentProductID ? Boolean(normalizedSyncStore[currentProductID]) : false;

    return {
        addToWishList,
        updateMetadata,
        deleteProductFromWishList,
        clearWishList,
        getWishListProducts,
        getAllWishList,
        toggleWishList,
        wishListCache,
    };
}
