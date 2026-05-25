// this all component customization should be rendered on layout editor for performing
// CRUD operation for a componenet 
// admin shoudl be able to select options from here, the keys act as category and value as settings,
// also, setting is applied based on type of the selected compoennt, if its box than return only the 

import { ComponentBoxSchemaSettingsMap } from "./Box";
import { ComponentGlobalSchemaSettingsMap, ComponentGlobalSchemaSettingsMapType } from "./core";
import { BaseTypes } from "./type";

// common and box value, and admin will edit that options and save that into schema for rendering
export const ComponentAllSchemaSettingsMap: Record<string, ComponentGlobalSchemaSettingsMapType> = {
    common: ComponentGlobalSchemaSettingsMap,
    box: ComponentBoxSchemaSettingsMap
}
