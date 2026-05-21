"use client";

import { ReadonlyURLSearchParams, useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export interface AppSearchParamsType {

}

export default function useAppSearchParams(): [ReadonlyURLSearchParams, (query_value: Record<string, string | number | null>, options?: AppSearchParamsType) => void] {
    const router = useRouter()
    const slug = usePathname()
    const searchParams = useSearchParams()

    function handleChangeSearchParams(query_value: Record<string, string | number | null>, options?: AppSearchParamsType) {
        let existingParams = new URLSearchParams(searchParams.toString())
        
        for (let _c in query_value) {
            existingParams.set(_c, query_value?.[_c] as string)
        }

        router.push(`${slug}?${existingParams.toString()}`)
        return true
    }

    return [searchParams, handleChangeSearchParams]
};