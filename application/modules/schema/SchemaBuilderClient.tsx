// "use client";

// import React, { useEffect, useState } from "react";
// import { getSchemaData, handleGetDictData } from "./function";
// import { PropsOf, SchemaBuilderProps } from "./types";

// /**
//  * Client-side variant of the Schema Builder.
//  *
//  * Mirrors the behavior of SchemaBuilderServer, but runs fully on the client:
//  *   1. Fetches schema data using `getSchemaData`.
//  *   2. Maps that data to component props via `handleGetDictData` and `fields`.
//  *   3. Renders the passed-in React component with the resolved props.
//  *
//  * This is useful when you need schema-driven rendering in a Client Component,
//  * for example inside interactive UI or when using client-side routing/state.
//  */
// export default function SchemaBuilderClient<TComponent extends React.ComponentType<any>>({
//     schema,
//     fields,
//     defaultParameter,
//     extract_entities,
//     component: Component,
// }: SchemaBuilderProps<TComponent>) {
//     const [data, setData] = useState<PropsOf<TComponent> | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         if (!schema?.schemaID) {
//             setLoading(false);
//             return;
//         }

//         let cancelled = false;

//         async function load() {
//             setLoading(true);

//             const schemaData = await getSchemaData({
//                 schema_name_id: schema.schemaID,
//                 schemaFields: Object.values(fields),
//             });

//             const mapped = (await handleGetDictData(schemaData, Object.entries(fields), !!extract_entities)) as PropsOf<TComponent>;

//             if (!cancelled) {
//                 setData(mapped);
//             }

//             setLoading(false);
//         }

//         load();

//         return () => {
//             cancelled = true;
//         };
//     }, [schema?.schemaID, JSON.stringify(fields), extract_entities]);

//     if (loading || !data) {
//         return null;
//     }

//     return <Component {...({ ...data, ...(defaultParameter || {}) } as React.ComponentProps<TComponent>)} />
// }
