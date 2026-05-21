// Cart
import { ACT_addToCart, ACT_removeFromCart, ACT_updateCartQty, ACT_clearCart } from "./cart";

// Wishlist
import { ACT_addToWishlist, ACT_removeFromWishlist } from "./wishlist";

// Checkout
import { ACT_checkoutCart, ACT_applyCoupon, ACT_removeCoupon } from "./checkout";

// Auth
import { ACT_signIn, ACT_signOut, ACT_signUp } from "./auth";

// Product
import { ACT_quickView, ACT_shareProduct, ACT_writeReview, ACT_selectVariant } from "./product";

// UI / Navigation
import { ACT_navigateTo, ACT_openSearch, ACT_toggleCart, ACT_toggleMenu } from "./navigation";

// Marketing
import { ACT_subscribeEmail } from "./marketing";

// Types
import { ApplicationActionPayload, ComponentActionTypes } from "./type";


export const ApplciationActions: Record<ComponentActionTypes, ApplicationActionPayload> = {

    // ── Cart ──────────────────────────────────
    addToCart: {
        callable: ACT_addToCart,
        event: "onClick"
    },
    removeFromCart: {
        callable: ACT_removeFromCart,
        event: "onClick"
    },
    updateCartQty: {
        callable: ACT_updateCartQty,
        event: "onClick"
    },
    clearCart: {
        callable: ACT_clearCart,
        event: "onClick"
    },

    // ── Wishlist ──────────────────────────────
    addToWishlist: {
        callable: ACT_addToWishlist,
        event: "onClick"
    },
    removeFromWishlist: {
        callable: ACT_removeFromWishlist,
        event: "onClick"
    },

    // ── Checkout ──────────────────────────────
    checkoutCart: {
        callable: ACT_checkoutCart,
        event: "onClick"
    },
    applyCoupon: {
        callable: ACT_applyCoupon,
        event: "onSubmit"
    },
    removeCoupon: {
        callable: ACT_removeCoupon,
        event: "onClick"
    },

    // ── Auth ──────────────────────────────────
    signIn: {
        callable: ACT_signIn,
        event: "onClick"
    },
    signOut: {
        callable: ACT_signOut,
        event: "onClick"
    },
    signUp: {
        callable: ACT_signUp,
        event: "onClick"
    },

    // ── Product ──────────────────────────────
    quickView: {
        callable: ACT_quickView,
        event: "onClick"
    },
    shareProduct: {
        callable: ACT_shareProduct,
        event: "onClick"
    },
    writeReview: {
        callable: ACT_writeReview,
        event: "onClick"
    },
    selectVariant: {
        callable: ACT_selectVariant,
        event: "onClick"
    },

    // ── UI / Navigation ──────────────────────
    navigateTo: {
        callable: ACT_navigateTo,
        event: "onClick"
    },
    openSearch: {
        callable: ACT_openSearch,
        event: "onClick"
    },
    toggleCart: {
        callable: ACT_toggleCart,
        event: "onClick"
    },
    toggleMenu: {
        callable: ACT_toggleMenu,
        event: "onClick"
    },

    // ── Marketing ────────────────────────────
    subscribeEmail: {
        callable: ACT_subscribeEmail,
        event: "onSubmit"
    },
}