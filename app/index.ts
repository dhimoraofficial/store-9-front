export const servingProduction = (process.env.NODE_ENV === "production")

// export const apiSlug = (servingProduction ? "https://apis.dhimora.com" : "http://localhost:2000")
export const apiSlug = "https://apis.dhimora.com"


export const signinURL = `/auth/signin`
export const signupURL = `/auth/signup`

export const errorLoginPage = `/auth/callback/error`
export const ForgotPassword = `/auth/action/password/reset`

export const TAC = `/legal/terms-and-condition`
export const PP = `/legal/privacy-policy`
export const AboutUs = `/about`

export const accountSection = "/account"

export const appConfigCookieName = "__drk__app_config"

export const AppSlugs = {
    product: "/product",
    checkout: "/checkout",
}
