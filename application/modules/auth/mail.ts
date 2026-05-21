import useAppAPI from "@/bundles/Hooks/useAppAPI";
import {createAndLoginAccountParams, UserCreationResponse} from "@/bundles/callable/types/auth";

const API = useAppAPI({})


export async function loginWithEmailAccount({email, password, APP: {tenant, store}}: createAndLoginAccountParams) {
    if (!email || !password) {
        return null;
    }

    let response = await API.POST(`/v1/${tenant}/${store}/auth/mail/login`, {
        email,
        password,
        provider: {
            name: "email",
            type: "pass"
        },
    })

    return response as UserCreationResponse
}


export async function createAccountWithEmail({email, password, APP: {tenant, store}}: createAndLoginAccountParams) {
    let response = await API.POST(`/v1/${tenant}/${store}/auth/mail/register`, {
        email,
        password,
        provider: {
            name: "email",
            type: "pass"
        },
    })

    return response as UserCreationResponse
}