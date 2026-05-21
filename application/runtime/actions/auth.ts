// ╔══════════════════════════════════════════════╗
// ║  AUTH ACTIONS                                ║
// ║  Sign in, sign out, sign up flows            ║
// ╚══════════════════════════════════════════════╝


/**
 * Trigger the sign-in flow.
 * 
 * @param redirect - (optional) URL to redirect after sign-in
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "signIn",
 *     prop: { redirect: "/account" }
 * }
 * ```
 */
export async function ACT_signIn(params: {
    redirect?: string
}) {
    console.log(`[AUTH] Opening sign-in (redirect → ${params.redirect || "/"})`)

    // TODO: Replace with real auth flow
    // import { signIn } from "next-auth/react"
    // signIn(undefined, { callbackUrl: params.redirect || "/" })
}


/**
 * Log the user out and optionally redirect.
 * 
 * @param redirect - (optional) URL to redirect after sign-out
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "signOut",
 *     prop: { redirect: "/" }
 * }
 * ```
 */
export async function ACT_signOut(params: {
    redirect?: string
}) {
    console.log(`[AUTH] Signing out (redirect → ${params.redirect || "/"})`)

    // TODO: Replace with real auth flow
    // import { signOut } from "next-auth/react"
    // signOut({ callbackUrl: params.redirect || "/" })
}


/**
 * Trigger the sign-up flow.
 * 
 * @param redirect - (optional) URL to redirect after sign-up
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "signUp",
 *     prop: { redirect: "/account" }
 * }
 * ```
 */
export async function ACT_signUp(params: {
    redirect?: string
}) {
    console.log(`[AUTH] Opening sign-up (redirect → ${params.redirect || "/"})`)

    // TODO: Replace with real auth flow
    // window.location.href = `/auth/signup?redirect=${params.redirect || "/"}`
}
