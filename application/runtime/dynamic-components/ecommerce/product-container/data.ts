import { parse_array_filter_response_to_app_product_data } from "@/application/modules/data";
import { getItemFromEntity } from "@/application/modules/filter/entity";
import { FilterEntityProductList } from "@/application/modules/filter/entity/type";
import { AppProductCard } from "../../product-card/type";

export async function getProductsForContainer(entity_name: string, option: {
    start?: number,
    tenant?: string,
    store?: string,
    end?: number,
    rawResponse?: boolean
} = {}): Promise<AppProductCard[]> {
    let responseData: AppProductCard[] = []

    if (entity_name === "featured") {
        responseData = parse_array_filter_response_to_app_product_data((await getItemFromEntity(entity_name, {
            start: option?.start,
            end: option?.end,
            tenant: option?.tenant,
            store: option?.store,
            entity_type: "featured",
            rawResponse: option?.rawResponse
        }) as FilterEntityProductList[]))
    }
    else if (entity_name.startsWith("category:")) {
        const categoryName = entity_name.replace("category:", "");
        responseData = parse_array_filter_response_to_app_product_data((await getItemFromEntity(categoryName, {
            start: option?.start,
            end: option?.end,
            tenant: option?.tenant,
            store: option?.store,
            entity_type: "category",
            rawResponse: option?.rawResponse
        }) as FilterEntityProductList[]))
    }

    return (responseData as AppProductCard[])
}