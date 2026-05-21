// ╔══════════════════════════════════════════════╗
// ║  CHECKOUT ACTIONS                            ║
// ║  Cart → Checkout flow, coupons               ║
// ╚══════════════════════════════════════════════╝


/**
 * Initiate the checkout flow from the current cart.
 * Navigates the user to the checkout page.
 * 
 * Schema usage:
 * ```
 * action: { type: "checkoutCart", prop: {} }
 * ```
 */
export async function ACT_checkoutCart() {
    console.log("[CHECKOUT] Initiating checkout flow")

    // TODO: Replace with real logic
    // 1. Validate cart is not empty
    // 2. Create a checkout session via API
    // 3. Navigate to /checkout/:session_id
    // window.location.href = "/checkout"
}


/**
 * Apply a discount/promo coupon code to the cart.
 * 
 * @param code - The coupon code string
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "applyCoupon",
 *     prop: { code: "$context.coupon_input" }
 * }
 * ```
 */
export async function ACT_applyCoupon(params: {
    code: string
}) {
    console.log(`[CHECKOUT] Applying coupon: ${params.code}`)

    // TODO: Replace with real API call
    // const res = await fetch(`${apiSlug}/cart/coupons`, {
    //     method: "POST",
    //     body: JSON.stringify({ code: params.code })
    // })
    // if (!res.ok) toast.error("Invalid coupon code")
}


/**
 * Remove an applied coupon from the cart.
 * 
 * @param code - The coupon code to remove
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "removeCoupon",
 *     prop: { code: "$context.applied_coupon" }
 * }
 * ```
 */
export async function ACT_removeCoupon(params: {
    code: string
}) {
    console.log(`[CHECKOUT] Removing coupon: ${params.code}`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/cart/coupons/${params.code}`, { method: "DELETE" })
}
