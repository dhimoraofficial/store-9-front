import { APP } from "@/app";
import { loginGoogleAccount } from "./google";
import { tenantAndStoreFromCookieParams } from "./type";

async function getStoreAndTenantID(): Promise<tenantAndStoreFromCookieParams> {
    return APP;
}

export {
    getStoreAndTenantID, loginGoogleAccount
};
