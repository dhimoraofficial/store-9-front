// ╔══════════════════════════════════════════════════╗
// ║  MARKETING ACTIONS                               ║
// ║  Newsletter subscription, email capture          ║
// ╚══════════════════════════════════════════════════╝


/**
 * Subscribe an email address to the newsletter.
 * 
 * @param email - Email address to subscribe
 * 
 * Schema usage:
 * ```
 * action: {
 *     type: "subscribeEmail",
 *     prop: { email: "$context.email_input" }
 * }
 * ```
 */
export async function ACT_subscribeEmail(params: {
    email: string
}) {
    if (!params.email || !params.email.includes("@")) {
        console.warn("[MARKETING] Invalid email address:", params.email)
        return
    }

    console.log(`[MARKETING] Subscribing email: ${params.email}`)

    // TODO: Replace with real API call
    // await fetch(`${apiSlug}/newsletter/subscribe`, {
    //     method: "POST",
    //     body: JSON.stringify({ email: params.email })
    // })
}
