import { Suspense } from "react";
import { AppComponents } from "../renders";
import ClientComponentBuilderContent from "./ClientComponentBuilder";
import { ComponentSchema } from "./type";

async function ComponentBuilderContent({ schema }: { schema: ComponentSchema }) {
    if (!schema) return null;

    const Component = AppComponents?.[schema.type]
    if (!Component) {
        return null
    }

    if (schema?.action) {
        return <ClientComponentBuilderContent schema={schema} />
    }

    return <Component {...schema.settings} content={schema.label} value={schema.label}>
        {schema?.children?.map((child, index) => (
            <ComponentBuilder key={child.id || index} schema={child} />
        ))}
    </Component>
}

export default async function ComponentBuilder({ schema }: { schema: ComponentSchema | ComponentSchema[] }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* checks whether the schema is type of array or single dict */}
            {(schema as ComponentSchema[])?.length ?

                // map the schema
                (schema as ComponentSchema[]).map((_schema, index) => <ComponentBuilderContent key={index} schema={_schema} />) :

                // render the single schema
                <ComponentBuilderContent schema={schema as ComponentSchema} />
            }
        </Suspense>
    );
}