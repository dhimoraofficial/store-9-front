// ╔══════════════════════════════════════════════╗
// ║  CART ACTIONS                                ║
// ║  Manages cart state: add, remove, update qty ║
// ╚══════════════════════════════════════════════╝


/**
 * Add a product to the cart.
 * 
 * @param pid       - Product ID to add
 * @param variantId - (optional) Specific variant (size/color combo)
 * @param qty       - (optional) Quantity to add, defaults to 1
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "addToCart",
 *     prop: {
 *         pid: "$context.product_id",
 *         variantId: "$context.selected_variant",
 *         qty: "1"
 *     }
 * }
 * ```
 */
export async function ACT_addToCart(params: {
    pid: string
    variantId?: string
    qty?: string
}) {
    const quantity = parseInt(params.qty || "1", 10)

    console.log(`[CART] Adding product ${params.pid} (variant: ${params.variantId || "default"}) × ${quantity}`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/cart/items`, {
    //     method: "POST",
    //     body: JSON.stringify({ product_id: params.pid, variant_id: params.variantId, quantity })
    // })
}


/**
 * Remove a line item from the cart.
 * 
 * @param pid       - Product ID to remove
 * @param variantId - (optional) Specific variant to remove
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "removeFromCart",
 *     prop: { pid: "$context.product_id" }
 * }
 * ```
 */
export async function ACT_removeFromCart(params: {
    pid: string
    variantId?: string
}) {
    console.log(`[CART] Removing product ${params.pid} (variant: ${params.variantId || "all"})`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/cart/items/${params.pid}`, { method: "DELETE" })
}


/**
 * Update the quantity of an existing cart line item.
 * 
 * @param pid       - Product ID in the cart
 * @param variantId - (optional) Specific variant
 * @param qty       - New quantity (set to "0" to remove)
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "updateCartQty",
 *     prop: {
 *         pid: "$context.product_id",
 *         qty: "$context.new_quantity"
 *     }
 * }
 * ```
 */
export async function ACT_updateCartQty(params: {
    pid: string
    variantId?: string
    qty: string
}) {
    const quantity = parseInt(params.qty, 10)

    if (quantity <= 0) {
        console.log(`[CART] Quantity is 0, removing product ${params.pid}`)
        return ACT_removeFromCart({ pid: params.pid, variantId: params.variantId })
    }

    console.log(`[CART] Updating product ${params.pid} quantity → ${quantity}`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/cart/items/${params.pid}`, {
    //     method: "PATCH",
    //     body: JSON.stringify({ quantity })
    // })
}


/**
 * Clear the entire cart.
 * 
 * Schema usage:
 * ```
 * action: { type: "clearCart", prop: {} }
 * ```
 */
export async function ACT_clearCart() {
    console.log("[CART] Clearing entire cart")

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/cart`, { method: "DELETE" })
}