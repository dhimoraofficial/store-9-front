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

    // its layout id, here for the layout we need a seperate collection layouts 
    // which will link via the ApplicationRoutes.layout === ApplicationLayout.id
    // for any page like /home i want a doc in layout collection, linked to the 
    // route and route linked to layout via id,
    layout?: string
}


export type ApplicationLayoutComponent = ComponentSchema[]

export type ApplicationLayoutType = "global" | "custom"
export type ApplicationLayoutFor = "navbar" | "footer" | "main" | "announcement"

// if the ApplicationRoutes.layout is string than the document of layout should look like this
// and the type:- if the compoennt created is a part of these Omit<ApplicationLayoutType, "main">
// directly store this doc holding that config/schema edite, on the alyout collection
// if its DP ie product page, id will be priduct and type will be main
// if its SP ie home page, ApplicationRoutes.layout will direclty hold the layout config
// if its just a compoennt like whatsAppButton floating inside all the compoentns than simply:- type: global and id: compeont name or ID
export type ApplicationLayout = {
    // the id for given layout, it can be either the store navbar layout, footer block or somehting global
    // or even the main store product lay
    _id: string
    for: ApplicationLayoutFor
    type: ApplicationLayoutType
    _c: ApplicationLayoutComponent
}