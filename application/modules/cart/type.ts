export type CartMetaData = {
    title: string
    short_desc: string
    primary_image: string
    variant_name: string
}

export type CartFieldError = {
    field: string
    message: string
}

export type CartItemUpdateSnapshot = {
    _quantity: number
    _delivery: number
    _unit_price: number
    _discount: number
    _total: number
    _tax: number
    _available: boolean
}

export type CartItem = {
    variant: string,
    product: string,
    quantity: number,
    delivery: number,
    unit_price: number,
    discount: number,
    total: number,
    tax: number,
    available: boolean,
    id: string
    metadata: CartMetaData,
    update?: CartItemUpdateSnapshot,
    errors?: CartFieldError[]
    error?: boolean
}

export type CartItems = Record<string, CartItem>

export type CartHeart = {
    id: string,
    user: string,
    token?: string | null,
    status: "active" | "converted" | "abandoned" | "expired",
    currency: "NPR",
    subtotal: number,
    discount: number,
    tax: number,
    total: number,
    delivery: number,
    created: string,
    expires: string,
    updated: string,
    items: CartItems,
    type: "CART_CREATED" | "REVIEW_REQUIRED" | "ORDER_CRATED",
}

export type CartCheckoutItemServerResponse = {
    available?: boolean
    error?: boolean
    message?: string
    errors?: CartFieldError[]
    quantity?: number | string
    delivery?: number | string
    unit_price?: number | string
    discount?: number | string
    total?: number | string
    tax?: number | string
}

export type CartCheckoutServerResponse = {
    type?: "SUCCESS" | "REVIEW_REQUIRED" | string
    message?: string
    subtotal?: number | string
    discount?: number | string
    tax?: number | string
    total?: number | string
    delivery?: number | string
    created?: string
    items?: Record<string, CartCheckoutItemServerResponse>
    [key: string]: unknown
}
