import { ComponentAction } from "../actions/type"
import { BaseTypes } from "../renders/type"

export type ComponentSchema = {
    id: string
    type: BaseTypes
    settings?: Record<string, any>
    action?: ComponentAction | ComponentAction[]
    label?: string | null
    children?: ComponentSchema[]
}
