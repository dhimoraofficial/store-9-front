// ─── Cart ───
// addToCart        → adds a product (with variant/qty) to the cart
// removeFromCart   → removes a line item from the cart
// updateCartQty   → changes quantity of an existing cart line
// clearCart        → empties the entire cart

// ─── Wishlist ───
// addToWishlist      → saves a product to the user's wishlist
// removeFromWishlist → removes a product from the wishlist

// ─── Checkout ───
// checkoutCart     → initiates checkout flow from the current cart
// applyCoupon     → applies a discount/promo code
// removeCoupon    → removes an applied coupon

// ─── Auth ───
// signIn          → triggers the sign-in flow
// signOut         → logs the user out
// signUp          → triggers the sign-up flow

// ─── Product ───
// quickView       → opens a product quick-view modal
// shareProduct    → triggers native share / copy link
// writeReview     → opens the review form for a product
// selectVariant   → selects a product variant (size, color, etc.)

// ─── UI / Navigation ───
// navigateTo      → programmatic client-side navigation
// openSearch      → opens the search overlay/modal
// toggleCart      → opens/closes the cart drawer/sidebar
// toggleMenu      → opens/closes the mobile menu

// ─── Marketing ───
// subscribeEmail  → subscribes an email to the newsletter

export type ComponentActionTypes =
    // Cart
    | "addToCart"
    | "removeFromCart"
    | "updateCartQty"
    | "clearCart"

    // Wishlist
    | "addToWishlist"
    | "removeFromWishlist"

    // Checkout
    | "checkoutCart"
    | "applyCoupon"
    | "removeCoupon"

    // Auth
    | "signIn"
    | "signOut"
    | "signUp"

    // Product
    | "quickView"
    | "shareProduct"
    | "writeReview"
    | "selectVariant"

    // UI / Navigation
    | "navigateTo"
    | "openSearch"
    | "toggleCart"
    | "toggleMenu"

    // Marketing
    | "subscribeEmail"


export type ComponentActionPayload = Record<string, string>

export interface ComponentAction {
    type: ComponentActionTypes
    prop: ComponentActionPayload
}

export type ApplicationActionEvents = "onClick" | "onSubmit" | "onChange"

export interface ApplicationActionPayload {
    callable: Function
    event: ApplicationActionEvents
}