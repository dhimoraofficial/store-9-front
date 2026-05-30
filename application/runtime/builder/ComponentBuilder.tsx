import { Suspense } from "react";
import ClientComponentBuilderContent from "./ClientComponentBuilder";
import { ComponentSchema } from "./type";
import { AppComponents } from "../dynamic-components";
import { getParsedSettings } from "../dynamic-components/base";
import { ComponentSchemaSettings } from "../dynamic-components/core";
import { interpolateSchema } from "./evaluator";

async function ComponentBuilderContent({ schema, context }: { schema: ComponentSchema; context?: any }) {
    if (!schema) return null;

    const Component = AppComponents?.[schema.type]
    if (!Component) {
        return null
    }

    if (schema?.action) {
        return <ClientComponentBuilderContent schema={schema} context={context} />
    }

    const resolvedSettings = context
        ? interpolateSchema(schema.settings, context)
        : schema.settings;

    return <Component
        // set the settings directly yto the comopennts, 
        // this will pass all the config values into the style, settings formate 
        {...getParsedSettings(schema.type, resolvedSettings as ComponentSchemaSettings)}
    >
        {schema?.children?.map((child, index) => (
            <ComponentBuilder key={child.id || index} schema={child} context={context} />
        ))}
    </Component>
}

export default async function ComponentBuilder({ schema, context }: { schema: ComponentSchema | ComponentSchema[]; context?: any }) {
    return (
        (schema as ComponentSchema[])?.length ?

            // map the schema
            (schema as ComponentSchema[]).map((_schema, index) => <ComponentBuilderContent key={index} schema={_schema} context={context} />) :

            // render the single schema
            <ComponentBuilderContent schema={schema as ComponentSchema} context={context} />
    )
}