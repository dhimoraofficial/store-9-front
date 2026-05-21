// ╔══════════════════════════════════════════════════╗
// ║  PRODUCT ACTIONS                                 ║
// ║  Quick view, share, review, variant selection    ║
// ╚══════════════════════════════════════════════════╝


/**
 * Open a quick-view modal/drawer for a product.
 * 
 * @param pid - Product ID to preview
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "quickView",
 *     prop: { pid: "$context.product_id" }
 * }
 * ```
 */
export async function ACT_quickView(params: {
    pid: string
}) {
    console.log(`[PRODUCT] Opening quick-view for product ${params.pid}`)

    // TODO: Replace with real logic
    // 1. Fetch product data from API
    // 2. Open modal/drawer with product details
    // const product = await fetch(`${apiSlug}/products/${params.pid}`).then(r => r.json())
    // openModal("quick-view", { product })
}


/**
 * Share a product via native share API or copy link.
 * 
 * @param pid  - Product ID
 * @param name - Product name (for share text)
 * @param url  - Product URL to share
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "shareProduct",
 *     prop: {
 *         pid: "$context.product_id",
 *         name: "$context.product_name",
 *         url: "$context.product_url"
 *     }
 * }
 * ```
 */
export async function ACT_shareProduct(params: {
    pid: string
    name?: string
    url?: string
}) {
    const shareUrl = params.url || `${window.location.origin}/product/${params.pid}`
    const shareText = params.name || "Check out this product!"

    console.log(`[PRODUCT] Sharing product ${params.pid}: ${shareUrl}`)

    // Use native share if available, otherwise copy to clipboard
    if (navigator.share) {
        await navigator.share({
            title: shareText,
            url: shareUrl,
        })
    } else {
        await navigator.clipboard.writeText(shareUrl)
        console.log("[PRODUCT] Link copied to clipboard")
        // TODO: Show toast notification
    }
}


/**
 * Open the review form for a product.
 * 
 * @param pid - Product ID to review
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "writeReview",
 *     prop: { pid: "$context.product_id" }
 * }
 * ```
 */
export async function ACT_writeReview(params: {
    pid: string
}) {
    console.log(`[PRODUCT] Opening review form for product ${params.pid}`)

    // TODO: Replace with real logic
    // 1. Check if user is authenticated
    // 2. Check if user has purchased this product
    // 3. Open review modal/form
}


/**
 * Select a product variant (size, color, etc.).
 * Updates the runtime context so other actions (addToCart) use the selected variant.
 * 
 * @param pid       - Product ID
 * @param variantId - Variant ID being selected
 * @param label     - Human-readable variant label (e.g., "Red / XL")
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "selectVariant",
 *     prop: {
 *         pid: "$context.product_id",
 *         variantId: "$context.variant_id",
 *         label: "$context.variant_label"
 *     }
 * }
 * ```
 */
export async function ACT_selectVariant(params: {
    pid: string
    variantId: string
    label?: string
}) {
    console.log(`[PRODUCT] Selected variant "${params.label || params.variantId}" for product ${params.pid}`)

    // TODO: Replace with real logic
    // 1. Update runtime state: context.selected_variant = params.variantId
    // 2. Update price display based on variant
    // 3. Update stock availability
}
