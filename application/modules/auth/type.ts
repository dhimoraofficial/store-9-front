import { DefaultSession, Profile as NextAuthProfile } from "next-auth"

export type createAndLoginAccountParams = {
    email: string,
    password: string,
    APP: {
        tenant: string,
        store: string,
    }
}

export type googleAccountLoginParams = {
    sub: string | undefined,
    scope: string | undefined,
    token: string | undefined,
    email: string | undefined,
    email_verified: boolean | undefined | null | string | Date,
    user_name: string | undefined,
    image: string | undefined,
    provider: {
        name: string | undefined,
        type: string | undefined
    },
    APP: {
        tenant: string | undefined,
        store: string | undefined
    }
}

export interface tenantAndStoreFromCookieParams {
    tenant: string,
    store: string,
}

export interface credentialAuthorizeParams extends Record<string, any> {
    email?: string,
    password?: string,
    createAccount?: boolean | "true" | "false",
}

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            provider?: string;
            access_token?: string;
        } & DefaultSession["user"]
        access_token?: string; // optional top-level
    }

    interface User {
        id?: string;
        provider?: string;
        emailVerified?: string;
        access_token?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        provider?: string;
        access_token?: string;
    }
}

export interface Profile extends NextAuthProfile {
    picture?: string;
    provider?: string;
}

export interface UserCreationResponse {
    id: string,
    email: string,
    phone_number: string,
    name: string,
    image: string,
    provider: "email" | "google",
    meta: {
        created: string,
        last_login: string
    },
    access_token: string
}