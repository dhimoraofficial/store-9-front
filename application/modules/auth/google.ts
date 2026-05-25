import { APP_API } from "@/application/providers/api";
import { googleAccountLoginParams } from "./type";

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
    let response = APP_API.POST(`/v1/${tenant}/${store}/auth/google/register`, {
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
    });

    return response;
}