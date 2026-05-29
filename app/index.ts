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

// APP_TENANT=0699db58-88a6-7c09-a6be-ba48d80a54fe
// APP_STORE=0699db76-e293-7d12-9545-205ba8a7884c

const LOCAL_TENANT = "069bacae-67ac-7c54-ab11-a0f05589030d"
const LOCAL_STORE = "069bacc9-c656-7350-a1da-b120c0a2f42a"

// don't touch this, changing this can cause silent application failure, 
// if you want change then change the variable above

export const APP = {
    tenant: (servingProduction ? "06999c2f-d339-70e6-b712-66ffd12247f4" : LOCAL_TENANT),
    store: (servingProduction ? "06999c34-59e4-76dd-9847-344f8723498a" : LOCAL_STORE),
}

export const appConfigCookieName = "__drk__app_config"

export const AppSlugs = {
    product: "/product",
    checkout: "/checkout",
}
