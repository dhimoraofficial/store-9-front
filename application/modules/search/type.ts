import { requestResponse } from "@/application/providers/api/type"

export interface SearchResultItem {
    description: string | null
    id: string
    product_price: number
    title: string
    [key: string]: unknown
}

export interface TextSearchResponse extends requestResponse {
    filters: Record<string, string[]>
    results: Array<SearchResultItem>
    count: number
    total: number
    range: {
        start: number | string
        end: number | string
    }
}
