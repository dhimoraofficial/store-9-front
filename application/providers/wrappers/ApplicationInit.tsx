"use client"

import SplashScreen from "@/application/widgets/splash_screen"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function ApplicationInit() {
    const session = useSession()

    function handelIsEventOn(event: BeforeUnloadEvent) {
        if (window.onButtonEvent) {
            event.preventDefault()
            event.returnValue = "";
            return
        }
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handelIsEventOn)

        return () => {
            window.removeEventListener("beforeunload", handelIsEventOn)
        }
    }, [session.status])

    return (session.status === "loading" && <SplashScreen />)
}