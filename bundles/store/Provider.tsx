"use client";

import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { setTenantInfo } from "./editorSlice";

export function EditorStoreProvider({
    children,
    tenantInfo
}: {
    children: ReactNode;
    tenantInfo?: {
        domain: string;
        slug: string;
        store: string;
        tenant: string;
    } | null;
}) {
    useEffect(() => {
        if (tenantInfo) {
            store.dispatch(setTenantInfo(tenantInfo));
        }
    }, [tenantInfo]);

    return <Provider store={store}>{children}</Provider>;
}
