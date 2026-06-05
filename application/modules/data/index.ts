import { AppProductCard } from "@/application/runtime/dynamic-components/product-card/type"

export function parse_array_filter_response_to_app_product_data(response: any[]): AppProductCard[] {
    return response?.map(_x_data => {
        let product_price = _x_data?.product_priceV2 || _x_data?.product_price
        if (_x_data?.discounted_price == product_price) {
            _x_data.discounted_price = null
        }

        return {
            title_name: _x_data?.title,
            img_alt: _x_data?.primary_image?.alt,
            img_src: _x_data?.primary_image?.src,
            id: _x_data?.slug,
            price: product_price,
            discountPrice: _x_data?.discounted_price,
            badges: _x_data?.badges,
            default_vid: _x_data?.default_vid
        }
    })
}