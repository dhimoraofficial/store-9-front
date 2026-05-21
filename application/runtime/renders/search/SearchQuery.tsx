"use client";

import { useRouter } from "next/navigation";
import AInput from "../Input";

export default function ASearchQuery(props: any) {
    const router = useRouter()

    console.log("asdasd");


    return <AInput
        {...props}
        onKeyDown={event => {
            if (event.key === "enter") return

            let query = event?.target?.value?.strip()
            console.log(query);
            if (query) {
                router?.push(`/search?query=${decodeURIComponent(query)}`)
            }
        }}
    />
}
