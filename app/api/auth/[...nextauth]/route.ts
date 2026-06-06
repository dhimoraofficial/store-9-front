import { errorLoginPage, servingProduction, signinURL } from "@/app";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const AuthHandler = NextAuth({
    // All Cookies
    cookies: {
        sessionToken: {
            name: "__drk__session_token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                secure: servingProduction,
                path: "/",
            }
        },
        callbackUrl: {
            name: `__drk__callback_url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: servingProduction
            }
        },
        csrfToken: {
            name: `__drk__csrf_token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: servingProduction
            }
        },
        pkceCodeVerifier: {
            name: `__drk_pkce_code_verifier`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: servingProduction,
                maxAge: 900
            }
        },
        state: {
            name: `__drk_state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: servingProduction,
                maxAge: 900
            },
        },
        nonce: {
            name: `__drk_nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: servingProduction,
            },
        },
    },

    // Defining Providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "openid email profile",
                },
            }
        }),
    ],

    // Callbacks
    callbacks: {
        async jwt({token, user, account, profile}) {
            if (user) {
                token.id = user.id;
                token.email = user.email || profile?.email;
                token.name = user.name || profile?.name;
                token.picture = user.image;
                token.provider = user.provider;
                token.access_token = user.access_token;
            }

            return token;
        },

        async session({session, token}) {
            if (!session.user) {
                session.user = {}
            }

            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.image = token.picture;
            session.user.provider = token.provider;
            session.user.access_token = token.access_token;

            // expose access_token at the root level so it is available in client session hooks
            session.access_token = token.access_token;

            return session;
        }
    },

    // Defining how long should the session should exist
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },

    jwt: {
        secret: process.env.JWT_SECRET || "this-is-great-jwt-secret",
    },

    //
    secret: process.env.NEXTAUTH_SECRET || "this-is-t-p-jwt-secret",

    // Custom pages for extra customization
    pages: {
        signIn: signinURL,
        error: errorLoginPage,
    }
})


export { AuthHandler as GET, AuthHandler as POST };
