import useAppAPI from "@/bundles/Hooks/useAppAPI"
import {googleAccountLoginParams} from "@/bundles/callable/types/auth"

const API = useAppAPI({})

export async function loginGoogleAccount({
                                             sub,
                                             scope,
                                             token,
                                             email,
                                             email_verified,
                                             user_name,
                                             image,
                                             provider: {
                                                 name,
                                                 type
                                             },
                                             APP: {
                                                 tenant,
                                                 store
                                             }
                                         }: googleAccountLoginParams
) {
    let response = API.POST(`/v1/${tenant}/${store}/auth/google/register`, {
        email,
        email_verified,
        name: user_name,
        photo: image,
        provider: {
            name,
            type
        },
        sub,
        scope,
        token
    })

    return response
}