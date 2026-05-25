import { ComponentAction } from "../actions/type"
import { BaseTypes } from "../dynamic-components"
import { ComponentSchemaSettings } from "../dynamic-components/core"

export type ComponentSchema = {
    id: string
    type: BaseTypes
    settings?: ComponentSchemaSettings
    action?: ComponentAction | ComponentAction[]
    label?: string | null
    children?: ComponentSchema[]
}
