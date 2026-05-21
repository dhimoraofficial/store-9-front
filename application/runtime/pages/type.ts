import { ComponentSchema } from "../builder/type"

export type ApplicationRouteNotFound = {
    code?: 301 | 302
    to?: string
    from?: string
}

// these are the definitions of types that will be rendered on dhimora store front,
// product, category, Dynamic Page (DP), collection should have a link between layoutID and Route
// the not_found, Single Page (SP), will directly define how the page should render
// redirect will have its target and destination at route config no need of layout 
export type ApplicationRouteTypes = "redirect" | "not_found" | "product" | "category" | "SP" | "collection" | "DP"

// the definition of how routes should be in production environ
export type ApplicationRoutes = ApplicationRouteNotFound & {
    // defines how the route should look like
    route?: string

    // Type of the route
    type: ApplicationRouteTypes

    // the layout or its layout id, here if the page id DP like products
    // then simply set the id to its type name which will act as ID for 
    // layout definition
    layout?: string | ApplicationRouteTypes | ApplicationLayoutComponent
}


export type ApplicationLayoutComponent = ComponentSchema[]

export type ApplicationLayout = {
    id: "not_found" | string
    _c: ApplicationLayoutComponent
}