import { APP } from "@/app"
import { APP_API } from "@/application/providers/api"
import { requestResponse } from "@/application/providers/api/type"
import { ApplicationResponseFields } from "../filter/entity"
import { TextSearchResponse } from "./type"

export default function useSearch() {
    async function getTextSearchResponse(query: string, start: number = 0, end: number = 50): Promise<TextSearchResponse | requestResponse> {
        let response = await APP_API.GET<TextSearchResponse>(`/v2/${APP.tenant}/${APP.store}/search?query=${query}&start=${start}&end=${end}&fields=${ApplicationResponseFields?.join("|")}`)
        return response
    }

    async function getCategoryFilterEntity(category: string, start: number = 0, end: number = 50): Promise<TextSearchResponse | requestResponse> {
        let URL = `/v1/${APP.tenant}/${APP.store}/filter/category?category=${category}&start=${start}&end=${end}&fields=${ApplicationResponseFields?.join("|")}`
        let response = await APP_API.GET<TextSearchResponse>(URL)
        return response
    }

    return {
        getTextSearchResponse,
        getCategoryFilterEntity
    }
};