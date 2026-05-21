// ╔══════════════════════════════════════════════════╗
// ║  UI / NAVIGATION ACTIONS                         ║
// ║  Client-side nav, search overlay, drawers        ║
// ╚══════════════════════════════════════════════════╝


/**
 * Programmatic client-side navigation.
 * 
 * @param to - Target URL/path
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "navigateTo",
 *     prop: { to: "/category/laptops" }
 * }
 * ```
 */
export async function ACT_navigateTo(params: {
    to: string
}) {
    console.log(`[NAV] Navigating to ${params.to}`)

    // TODO: Replace with Next.js router
    // import { useRouter } from "next/navigation"  → needs to be called from hook context
    // For now, direct navigation
    window.location.href = params.to
}


/**
 * Open the search overlay/modal.
 * 
 * Schema usage:
 * ```
 * action: { type: "openSearch", prop: {} }
 * ```
 */
export async function ACT_openSearch() {
    console.log("[UI] Opening search overlay")

    // TODO: Replace with real logic
    // dispatch event or update global state to show search modal
    // window.dispatchEvent(new CustomEvent("app:search:open"))
}


/**
 * Toggle the cart drawer/sidebar open or closed.
 * 
 * Schema usage:
 * ```
 * action: { type: "toggleCart", prop: {} }
 * ```
 */
export async function ACT_toggleCart() {
    console.log("[UI] Toggling cart drawer")

    // TODO: Replace with real logic
    // window.dispatchEvent(new CustomEvent("app:cart:toggle"))
}


/**
 * Toggle the mobile navigation menu.
 * 
 * Schema usage:
 * ```
 * action: { type: "toggleMenu", prop: {} }
 * ```
 */
export async function ACT_toggleMenu() {
    console.log("[UI] Toggling mobile menu")

    // TODO: Replace with real logic
    // window.dispatchEvent(new CustomEvent("app:menu:toggle"))
}
