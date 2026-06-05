// "use client"

// import { CartHeart, CartItem, CartItems } from "./type"
// import { Dispatch, SetStateAction } from "react"
// import { requestResponse } from "@/application/providers/api/type"
// import { useApplication } from "@/application/providers/wrappers/Application"


// export async function normalizeCartData(cart: CartHeart) {
//     const cartItems = Object.values(cart.items).map(_x => ({
//         id: _x.id,
//         discount: _x.discount,
//         quantity: _x.quantity,
//         delivery: _x.delivery,
//         tax: _x.tax,
//         total: _x.total,
//         unit_price: _x.unit_price,
//         variant: _x.variant,
//         product: _x.product,
//     }))

//     return {
//         ...cart,
//         items: cartItems
//     }
// }

// export function parseCartCheckOutError(cartData: CartHeart, setCartModel: Dispatch<SetStateAction<CartHeart>>) {
//     setCartModel(prev => {
//         prev = { ...prev }

//         for (let _da in prev.items) {
//             let _next_data = cartData?.items?.[_da]

//             // check if the message is from global level function, meaning the error is likely not from update,
//             //  its from inactive product, quantity, variant mismatch
//             if (_next_data?.error && !_next_data?.errors?.length && !_next_data.available && (_next_data as unknown as requestResponse).message) {
//                 prev.items[_da]["errors"] = [{
//                     field: "not-available",
//                     message: (_next_data as unknown as requestResponse).message as string
//                 }]

//                 prev.items[_da]["error"] = _next_data.error
//             }

//             // if the issue is like, out of stock, delivery price change than update the fields with desired
//             // value given by server along with errors
//             else if (_next_data?.error && _next_data?.errors?.length) {
//                 prev.items[_da]["update"] = {
//                     _available: Boolean(_next_data.available),
//                     _delivery: Number(_next_data.delivery),
//                     _discount: Number(_next_data.discount),
//                     _quantity: Number(_next_data.quantity),
//                     _tax: Number(_next_data.tax),
//                     _total: Number(_next_data.total),
//                     _unit_price: Number(_next_data.unit_price),
//                 }

//                 prev.items[_da]["errors"] = _next_data.errors
//                 prev.items[_da]["error"] = _next_data.error
//             }
//         }

//         return prev
//     })

// }

// export default function useCart() {
//     const {
//         auth, cartAction: {
//             asyncCart,
//             setCart,
//             cart
//         }
//     } = useApplication()

//     // application toaster
//     const AppToast = useAppToast()

//     function emptyItemUpdate(item?: Partial<CartItem>) {
//         return {
//             _quantity: Number(item?.quantity || 0),
//             _delivery: Number(item?.delivery || 0),
//             _unit_price: Number(item?.unit_price || 0),
//             _discount: Number(item?.discount || 0),
//             _total: Number(item?.total || 0),
//             _tax: Number(item?.tax || 0),
//             _available: Boolean(item?.available),
//         }
//     }

//     function normalizeCartItem(item: CartItem): CartItem {
//         return {
//             ...item,
//             delivery: Number(item?.delivery || 0),
//             discount: Number(item?.discount || 0),
//             quantity: Number(item?.quantity || 0),
//             tax: Number(item?.tax || 0),
//             total: Number(item?.total || 0),
//             unit_price: Number(item?.unit_price || 0),
//             available: Boolean(item?.available),
//             update: item?.update || emptyItemUpdate(item),
//             errors: Array.isArray(item?.errors) ? item.errors : [],
//             error: Boolean(item?.error),
//         }
//     }

//     async function checkItemIntoCart({ cartID, variantID, responseType = "bool" }: {
//         cartID?: string,
//         variantID?: string,
//         responseType?: "bool" | "object",
//     }): Promise<CartItem | boolean> {
//         // defining the value to return for fallback tooo!!!!
//         let cartItems = (await asyncCart()).items
//         let return_Data: CartItem | undefined

//         if (cartID) {
//             return_Data = cartItems?.[cartID]
//         }

//         if (variantID) {
//             return_Data = Object.values(cartItems || {}).find(_x => (_x.variant === variantID))
//         }

//         if (responseType === "bool") {
//             return !!return_Data
//         }

//         return (return_Data || {}) as CartItem
//     }

//     function revalidateCart(items: CartItems, previousCart?: CartHeart): CartHeart {
//         const nextItems: CartItems = {}

//         let subtotal = 0
//         let discount = 0
//         let tax = 0
//         let total = 0

//         Object.values(items || {}).forEach((item) => {
//             const quantity = Math.max(0, Number(item.quantity || 0))
//             if (!item?.id || !item?.variant || quantity < 0) return

//             item = normalizeCartItem(item)

//             const unit_price = Math.max(0, Number(item.unit_price || 0))
//             const itemDiscount = Math.max(0, Number(item.discount || 0))
//             const itemTax = Math.max(0, Number(item.tax || 0))
//             const itemSubtotal = unit_price * quantity
//             const itemTotal = Math.max(0, itemSubtotal - itemDiscount + itemTax)

//             nextItems[item.id] = {
//                 ...item,
//                 quantity,
//                 unit_price,
//                 //////////////////////
//                 discount: itemDiscount,
//                 tax: itemTax,
//                 total: itemTotal,
//                 product: item?.product,
//             }

//             subtotal += itemSubtotal
//             discount += itemDiscount
//             tax += itemTax
//             total += itemTotal
//         })

//         const prev = (previousCart || cart || {} as CartHeart)
//         return {
//             ...prev,
//             items: nextItems,
//             created: prev.created,
//             expires: prev.expires,
//             type: prev.type,
//             subtotal,
//             discount,
//             tax,
//             currency: "NPR",
//             token: auth.session_id,
//             user: auth.id,
//             total,
//             delivery: Number(previousCart?.delivery || cart?.delivery || 0),
//         } as CartHeart
//     }

//     async function checkItemStatus(cartItem: CartItem): Promise<CartItem | boolean> {
//         const { metadata, ...cartItemEXMeta } = cartItem

//         let response: (CartItem | requestResponse) = await API.POST(`/v1/${APP.tenant}/${APP.store}/cart/item/${cartItem.variant}/status`, cartItemEXMeta as unknown as RequestPayloads)
//         if (response?.error) {
//             AppToast.error(response?.message || "Can't raise stock quantity likely lack of stock.")
//             return false
//         }

//         return {
//             available: Boolean(response?.available),
//             discount: Number(response?.discount),
//             id: cartItem?.id,
//             metadata: cartItem.metadata,
//             quantity: Number(response?.quantity),
//             tax: Number(response?.tax),
//             total: Number(response?.total),
//             unit_price: Number(response?.unit_price),
//             delivery: Number(response?.delivery),
//             variant: cartItem?.variant,
//         } as CartItem
//     }


//     async function addToCart({ variantID, productID, variant_price, quantity, title, short_desc, variant_name, primary_image }: {
//         variantID: string,
//         productID: string,
//         quantity: number,
//         variant_price: number,
//         title: string,
//         short_desc: string,
//         variant_name: string,
//         primary_image: string
//     }) {
//         let similar_Cart = await checkItemIntoCart({ variantID: variantID, responseType: "object" }) as CartItem
//         similar_Cart = {
//             available: similar_Cart?.available || false,
//             id: similar_Cart.id || generateUUID(),
//             delivery: Number(similar_Cart?.delivery || 0),
//             discount: similar_Cart?.discount || 0,
//             metadata: {
//                 primary_image,
//                 short_desc,
//                 title,
//                 variant_name
//             },
//             quantity: (quantity + (similar_Cart?.quantity || 0)) || 1,
//             tax: similar_Cart.tax || 0,
//             total: (similar_Cart.total || 0) + (variant_price * quantity),
//             unit_price: variant_price,
//             variant: variantID,
//             product: productID,
//         }

//         let response_status = await checkItemStatus(similar_Cart) as CartItem
//         if (!response_status?.quantity) {
//             AppToast?.error("Not enough quantity to add into cart!!!")
//             return
//         }

//         setCart(prev => {
//             const nextItems = {
//                 ...(prev.items || {}),
//                 [similar_Cart.id]: {
//                     ...similar_Cart,
//                     ...response_status as CartItem
//                 }
//             }

//             return revalidateCart(nextItems, prev)
//         })

//         return true
//     }

//     async function updateCartQuantity(cartID: string, quantity: -1 | 1) {
//         if (!cartID || !quantity) return

//         let cartItem = await checkItemIntoCart({ cartID: cartID, responseType: "object" }) as CartItem

//         // hard coded check, use some safe way!!!
//         if (!cartItem?.id) {
//             AppToast.error("No such cart item in cart inventory.")
//             return
//         }

//         // this logic works, but not accurately, think of replacing it, i have less time won't focus here.
//         if (cartItem?.quantity && quantity === -1) {
//             cartItem.quantity -= 1
//         }

//         // this logic works, but not accurately, think of replacing it, i have less time won't focus here.
//         if (cartItem?.quantity && quantity === 1) {
//             cartItem.quantity += 1
//         }

//         let response_checkItem = await checkItemStatus(cartItem as CartItem) as CartItem
//         if (!response_checkItem?.quantity) return

//         setCart(prev => {
//             const existing = prev?.items?.[cartID]
//             if (!existing) return prev

//             return revalidateCart({
//                 ...prev.items,
//                 [existing?.id]: {
//                     ...existing,
//                     ...response_checkItem
//                 }
//             }, prev)
//         })

//     }

//     async function removeFromCart(cartID: string) {
//         if (!cartID) return

//         setCart(prev => {
//             if (!prev?.items?.[cartID]) return prev

//             const nextItems = { ...(prev?.items || {}) }
//             delete nextItems[cartID]

//             return revalidateCart(nextItems, prev)
//         })

//     }

//     function acceptCartItemUpdate(cartID: string) {
//         if (!cartID) return

//         setCart(prev => {
//             const existing = prev?.items?.[cartID]
//             if (!existing) return prev

//             const nextItem: CartItem = {
//                 ...existing,
//                 available: Boolean(existing.update!._available),
//                 delivery: Number(existing.update!._delivery),
//                 discount: Number(existing.update!._discount),
//                 quantity: Number(existing.update!._quantity),
//                 tax: Number(existing.update!._tax),
//                 total: Number(existing.update!._total),
//                 unit_price: Number(existing.update!._unit_price),
//                 errors: [],
//                 error: false,
//             }

//             nextItem.update = emptyItemUpdate(nextItem)

//             return revalidateCart({
//                 ...(prev.items || {}),
//                 [cartID]: nextItem,
//             }, {
//                 ...prev,
//             })
//         })
//     }

//     async function cartCheckOut() {
//         // if their is no cart data than just return
//         if (!cart) return

//         // server doesn't care about the metadata it is only interested in plain fields
//         let normalizeData = await normalizeCartData(cart) as unknown as RequestPayloads
//         let response = await API.POST(`/v1/${APP.tenant}/${APP.store}/cart/checkout`, normalizeData, false)

//         // this makes sure if their is any change needed than in quantity price or x
//         // than this will do it for you
//         if (response?.type === "REVIEW_REQUIRED") {
//             parseCartCheckOutError(response as CartHeart, setCart)
//             return response
//         }

//         // this line makes sure their is no invalid data
//         // getting spread over the cart data
//         else if (response?.error) {
//             return response
//         }

//         // if everything is okay than just spread the data 
//         setCart(previous => {
//             let local_response = (response as CartHeart)
//             previous = { ...(previous as CartHeart) }

//             // setting the type given by server to cart 
//             previous.type = local_response?.type!
//             previous.expires = local_response?.expires!

//             return previous
//         })

//         // return the response
//         return response
//     }

//     function checkItemInCart(variantID: string) {
//         return Object.values(cart.items || {})?.find(_x => _x.variant === variantID)
//     }

//     return {
//         // primary
//         addToCart,
//         checkItemIntoCart,

//         // this will re-render each component if found any changes
//         cart,
//         cartItems: cart.items || {},

//         // updaters, 
//         updateCartQuantity,
//         removeFromCart,

//         // counts total items in cart
//         cartItemsCount: Object.values(cart.items || {}).reduce(
//             (total, item) => total + item.quantity, 0
//         ),

//         // checkout
//         cartCheckOut,

//         // review actions
//         acceptCartItemUpdate,

//         // check items into cart
//         checkItemInCart
//     }
// };