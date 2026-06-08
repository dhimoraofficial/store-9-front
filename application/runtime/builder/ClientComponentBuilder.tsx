"use client"

import { Suspense } from "react";
import { ApplciationActions } from "../actions";
import { ApplicationActionEvents, ComponentAction, ComponentActionPayload } from "../actions/type";
import { ComponentAllSchemaSettingsMap } from "../dynamic-components";
import { getParsedSettings } from "../dynamic-components/base";
import { ComponentSchemaSettings } from "../dynamic-components/core";
import { ComponentSchema } from "./type";

function getNestedData(fields: string[], thisData: any): string {
    thisData = thisData?.[fields?.[0]]
    if (!thisData) return ""

    if (typeof thisData === "object") {
        return getNestedData(fields?.splice(1, (fields?.length - 1)), thisData)
    }

    return thisData
}

function parseActionPayload(payloads: ComponentActionPayload, runtimeStateData: any): Record<string, any> {
    let newPayload = { ...payloads }

    Object.entries(payloads).map(([payloadKEY, payloadVALUE], _index) => {
        if (!payloadVALUE?.includes("$context.")) return

        let cleanedPayload = payloadVALUE?.replaceAll("$context.", "").split(".")

        newPayload[payloadKEY] = getNestedData(cleanedPayload, runtimeStateData)
    })

    return newPayload
}

function returnComponentAction(actions: ComponentAction | ComponentAction[], runtimeStateData: any): Record<ApplicationActionEvents, Function> {
    // temporary hold the events
    let events: Record<ApplicationActionEvents, Function> = {} as any

    // if the action have the length meaning its multiple actions
    // - if its multiple actions leave
    // - if its single action than convert to map
    actions = (actions as any[])?.length ? actions : [actions as ComponentAction] as ComponentAction[]

    for (let _act of actions as any[]) {
        let action: ComponentAction = _act

        let currentEventAction = ApplciationActions?.[action?.type]
        if (!currentEventAction && typeof (currentEventAction as any)?.callable === "function") continue

        // for the fucntion it generates all the payloads and convert to props
        events[currentEventAction?.event] = (() => currentEventAction?.callable({
            ...parseActionPayload(
                action?.prop,
                runtimeStateData
            )
        }))
    }

    // return the final events to run on browser
    return events as Record<ApplicationActionEvents, Function>
}


import { interpolateSchema } from "./evaluator";
import SplashScreen from "@/bundles/widgets/splash_screen";

function ComponentBuilderContent({ schema, context }: { schema: ComponentSchema; context?: any }) {
    if (!schema) return null;

    const Component = (ComponentAllSchemaSettingsMap?.[schema.type] as any)?.component
    if (!Component) {
        return null
    }

    const compoennetActions = returnComponentAction(
        // passing whats the action to check
        (schema?.action as ComponentAction | ComponentAction[]),

        // here pass the exact context data
        context || { product_id: "its-drk-here" }
    ) || {}

    const resolvedSettings = context
        ? interpolateSchema(schema.settings, context)
        : schema.settings;

    // this mapper function automatically sets the required action like onClick={() => handleAddToCart(x, y)}
    const finalSettings = {
        ...(resolvedSettings || {}),

        // this mapper function automatically sets the required action like onClick={() => handleAddToCart(x, y)}
        ...compoennetActions
    } as ComponentSchemaSettings

    const acceptsChildren = (ComponentAllSchemaSettingsMap?.[schema.type] as any)?.acceptsChildren !== false;

    if (!acceptsChildren) {
        return <Component
            // set the settings directly to the components, 
            // this will pass all the config values into the style, settings format 
            {...getParsedSettings(schema.type as any, finalSettings)}
        />;
    }

    return <Component
        // set the settings directly to the components, 
        // this will pass all the config values into the style, settings format 
        {...getParsedSettings(schema.type as any, finalSettings)}
    >
        {schema?.children?.map((child, index) => (
            <ComponentBuilderContent key={child.id || index} schema={child} context={context} />
        ))}
    </Component>;
}

export default function ClientComponentBuilderContent({ schema, context }: { schema: ComponentSchema; context?: any }) {
    return <Suspense fallback={<SplashScreen />}>
        <ComponentBuilderContent schema={schema} context={context} />
    </Suspense>
}