import { APP } from "@/app";
import { loginGoogleAccount } from "@/bundles/callable/auth/google";
import { tenantAndStoreFromCookieParams } from "../types/auth";


async function getStoreAndTenantID(): Promise<tenantAndStoreFromCookieParams> {
    return APP
    //
    // const forcedTenant = process.env.NEXT_PUBLIC_APP_TENANT || process.env.APP_TENANT;
    // const forcedStore = process.env.NEXT_PUBLIC_APP_STORE || process.env.APP_STORE;
    //
    // // Explicit env-based override takes highest priority for local/dev debugging.
    // if (forcedTenant && forcedStore) {
    //     return {
    //         tenant: forcedTenant,
    //         store: forcedStore,
    //     };
    // }
    //
    // const cookieStore = await cookies();
    // const cookieValue = cookieStore.get(appConfigCookieName)?.value;
    //
    // if (cookieValue) {
    //     try {
    //         const parsed = JSON.parse(decodeURIComponent(cookieValue));
    //         if (parsed?.tenant && parsed?.store) {
    //             return {
    //                 tenant: parsed.tenant,
    //                 store: parsed.store,
    //             };
    //         }
    //     } catch { }
    // }
    //
    // const headersStore = await headers();
    // const hostFromHeader = (
    //     headersStore.get("x-forwarded-host") ||
    //     headersStore.get("host") ||
    //     applicationHost ||
    //     ""
    // )
    //     .replace(/^www\./, "")
    //     .replace(/:\d+$/, "")
    
    //     .toLowerCase();
    //
    // const isFromAppDashboard = hostFromHeader.match(new RegExp(`^([a-z0-9-_]+)\\.admin\\.dhimora\\.com$`))?.[1] || false;
    // const isForDashboard = !isFromAppDashboard && hostFromHeader.includes(".admin.");
    // const isFromApp = !isForDashboard && !isFromAppDashboard && hostFromHeader.match(new RegExp(`^([a-z0-9-_]+)\\.dhimora\\.com$`))?.[1] || false;
    //
    // let tenantLookupValue: string = hostFromHeader;
    // let lookupType = "store_domain";
    //
    // if (isFromAppDashboard) {
    //     tenantLookupValue = isFromAppDashboard;
    //     lookupType = "store_slug";
    // } else if (isForDashboard) {
    //     tenantLookupValue = hostFromHeader.replaceAll("admin.", "");
    //     lookupType = "store_domain";
    // } else if (isFromApp) {
    //     tenantLookupValue = isFromApp;
    //     lookupType = "store_slug";
    // }
    //
    // try {
    //     const response = await fetch(`${apiSlug}/v1/store/lookup`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             lookup: lookupType,
    //             tenant: tenantLookupValue,
    //         }),
    //     });
    //
    //     const data = await response.json();
    //
    //     if (data?.tenant && data?.store) {
    //         return {
    //             tenant: data.tenant,
    //             store: data.store,
    //         };
    //     }
    // } catch { }
    //
    // // try {
    // //     return JSON.parse(decodeURIComponent(value));
    // // } catch {
    // //     return { tenant: "", store: "" };
    // // }
    //
    // return {
    //     tenant: APP.tenant,
    //     store: APP.store,
    // };
}

export {
    getStoreAndTenantID, loginGoogleAccount
};

