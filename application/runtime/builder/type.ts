import { ComponentAction } from "../actions/type"
import { BaseTypes } from "../dynamic-components"
import { ComponentSchemaSettings } from "./settings"

export type ComponentSchema = {
    id: string
    type: BaseTypes
    settings?: ComponentSchemaSettings
    action?: ComponentAction | ComponentAction[]
    label?: string | null
    children?: ComponentSchema[]
}
