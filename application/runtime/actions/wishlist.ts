// ╔══════════════════════════════════════════════╗
// ║  WISHLIST ACTIONS                            ║
// ║  Save & remove products from user's wishlist ║
// ╚══════════════════════════════════════════════╝


/**
 * Add a product to the user's wishlist.
 * 
 * @param pid - Product ID to save
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "addToWishlist",
 *     prop: { pid: "$context.product_id" }
 * }
 * ```
 */
export async function ACT_addToWishlist(params: {
    pid: string
}) {
    console.log(`[WISHLIST] Adding product ${params.pid}`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/wishlist/items`, {
    //     method: "POST",
    //     body: JSON.stringify({ product_id: params.pid })
    // })
}


/**
 * Remove a product from the user's wishlist.
 * 
 * @param pid - Product ID to remove
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "removeFromWishlist",
 *     prop: { pid: "$context.product_id" }
 * }
 * ```
 */
export async function ACT_removeFromWishlist(params: {
    pid: string
}) {
    console.log(`[WISHLIST] Removing product ${params.pid}`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/wishlist/items/${params.pid}`, { method: "DELETE" })
}
