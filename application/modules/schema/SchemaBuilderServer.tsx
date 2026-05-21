import { getSchemaData, handleGetDictData } from "./function"
import { PropsOf, SchemaBuilderProps } from "./types"

// This is a generic React Server Component that dynamically renders
// any passed-in component using data fetched from a schema/CMS.
export default async function SchemaBuilderServer<TComponent extends React.ComponentType<any>>({
    // Generic constraint: any valid React component
    schema,
    fields,
    defaultParameter,
    extract_entities,
    schemaData,
    component: Component, // Rename to capitalized variable so JSX treats it as a component
}: SchemaBuilderProps<TComponent>) {
    if (!schemaData) {
        if (!schema?.schemaID) {
            throw new Error("LookUP: No schema id was passed, Either pass or remove the SchemaBuilder")
        }

        // Fetch raw schema data from the backend (CMS or API).
        // This runs on the server, so async/await is allowed and expected.
        // `schema.schemaID` uniquely identifies the schema.
        // `schemaFields` limits the fetch to only required fields.

        schemaData = await getSchemaData({
            schema_name_id: schema.schemaID,
            schemaFields: Object.values(fields),
        })
    }

    // Transform raw schema data into component props.
    // `fields` defines a mapping between component prop names
    // and schema paths (e.g., "ctaText" -> "pri_btn.text").
    // This function must be awaited because it is async.

    // Converts mapping into [propKey, schemaPath] pairs
    const data = (await handleGetDictData(schemaData, Object.entries(fields), (!!schema?.schemaID && extract_entities!))) as PropsOf<TComponent>


    // Type assertion is required because mapping is dynamic at runtime,
    // but we guarantee the result matches the component’s props.

    // Render the component with resolved props.
    // `Component` must be capitalized or JSX will treat it as an HTML tag.
    // At this point, `data` is a plain object, safe to pass to Client Components.
    return <Component {...({ ...data, ...(defaultParameter || {}) } as React.ComponentProps<TComponent>)} />
}
