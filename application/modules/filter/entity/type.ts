export interface FilterEntityProductItem {
    badges: string[]
    categories: string[]
    id: string
    is_best_seller: boolean
    primary_category: string
    product_price: number
    product_priceV2 : number
    product_stock: number
    primary_image: {
        src?: string
        alt?: string
    }
    short_desc?: string
    slug: string
    highlights?: string[]
    discounted_price?: number | string
    default_vid?:  string
    title: string
    currency: string
}

export type FilterEntityProductList = FilterEntityProductItem[]


export type ApplicationEntityTypes = "featured" | "category"