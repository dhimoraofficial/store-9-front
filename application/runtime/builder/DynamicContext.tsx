"use client";

import React, { createContext, useContext, useState } from "react";

interface DynamicContextValue {
    context: any;
    setContext: React.Dispatch<React.SetStateAction<any>>;
}

const DynamicContext = createContext<DynamicContextValue | null>(null);

export function DynamicContextProvider({ initialValue, children }: { initialValue: any; children: React.ReactNode }) {
    const [context, setContext] = useState(initialValue);
    return (
        <DynamicContext.Provider value={{ context, setContext }}>
            {children}
        </DynamicContext.Provider>
    );
}

export function useDynamicContext() {
    return useContext(DynamicContext);
}
