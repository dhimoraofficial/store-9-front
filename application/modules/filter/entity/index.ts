import { ApplicationEntityTypes, FilterEntityProductList } from "./type";
import { requestResponse } from "@/application/providers/api/type";
import { APP_API } from "@/application/providers/api";


export async function getItemFromEntity(entity_name: string, option: {
    start?: number,
    end?: number,
    tenant?: string,
    store?: string,
    entity_type?: ApplicationEntityTypes
    rawResponse?: boolean
} = {}): Promise<requestResponse | FilterEntityProductList[]> {
    // convert the application category into array iterate each and every items
    // check for entity name and extract the id of category
    // convert str to searchable 
    option.entity_type = option.entity_type || "category"

    let response = await APP_API.GET(`/v1/${option.tenant}/${option.store}/filter/${option?.entity_type}?${option?.entity_type}=${entity_name}&`
        + `fields=${ApplicationResponseFields?.join("|")}&start=${option?.start || 0}`
        + `&end=${option?.end || 50}`)


    if (option?.rawResponse) {
        return response
    }

    return (response as any)?.result as FilterEntityProductList[]
}

export const ApplicationResponseFields: string[] = ["title", "product_price", "discounted_price", "product_priceV2", "primary_image", "slug", "badges", "default_vid"]