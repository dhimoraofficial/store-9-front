"use client"

import { SessionProvider } from "next-auth/react"
import { createContext, ReactNode, useContext } from "react"
import ApplicationInit from "./ApplicationInit"

type ApplicationContextValue = {

}

const ApplicationContext = createContext<ApplicationContextValue>({

})

export default function Application({ children }: {
    children: ReactNode,
}) {
    return <>
        <SessionProvider refetchInterval={300} refetchOnWindowFocus={false} refetchWhenOffline={false}>
            <ApplicationContext.Provider value={{}}>
                {children}

                <ApplicationInit />
            </ApplicationContext.Provider>
        </SessionProvider>
    </>
}

export const useApplication = () => useContext(ApplicationContext)