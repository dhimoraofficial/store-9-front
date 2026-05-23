"use client";

import { useRouter } from "next/navigation";
import AInput from "../Input";

export default function ASearchQuery(props: any) {
    const router = useRouter()

    return <AInput
        {...props}
        onKeyDown={event => {
            if (event.key !== "Enter") return;

            const query = (event.currentTarget as HTMLInputElement).value?.trim();
            console.log(query);
            if (query) {
                router.push(`/search?query=${encodeURIComponent(query)}`);
            }
        }}
    />
}
