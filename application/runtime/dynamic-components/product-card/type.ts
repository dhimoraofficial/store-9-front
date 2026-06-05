import { CSSProperties } from "react"

export interface AppProductCard {
    img_src?: string
    img_alt?: string
    id?: string
    title_name?: string
    shortDesc?: string
    currency?: string
    price?: string | number
    default_vid?: string
    discountPrice?: string | number
    ratings?: number
    stock?: number
    style?: CSSProperties
    cardInitialWidth?: number
    averageRating?: number
    highlights?: string[] | Record<string, string>
    badges?: string[] | string
    cardData?: AppProductCard | null | undefined
    className?: string
}