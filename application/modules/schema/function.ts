import { ENTITY_NAME, SchemaName } from "./types";
import { APP } from "@/app";
import { APP_API } from "@/application/providers/api";
import { requestResponse } from "@/application/providers/api/type";

/**
 * Fetch schema configuration for a given schema name.
 *
 * Example: product listing, filters, etc. are all defined as "schemas" on the backend.
 * This function builds the right URL and optionally limits which schema fields
 * are returned via the `fields` query parameter.
 *
 * @param schema_name_id  - Logical name/id of the schema to fetch.
 * @param schemaFields    - Optional list of fields to include (server side projection).
 * @returns               - `response.schemas` on success, or the raw error response.
 */
export async function getSchemaData({ schema_name_id, schemaFields }: {
    schema_name_id: SchemaName,
    schemaFields?: string[],
}): Promise<requestResponse | any> {
    // Base URL for the schema, namespaced by tenant and store.
    let URL = `/v1/${APP.tenant}/${APP.store}/schema/${schema_name_id}`

    // If specific fields are requested, append them as a pipe-separated list.
    const fields = (schemaFields || []).join("|")
    if (fields && (schemaFields || []).length) {
        URL += `?fields=${encodeURIComponent(fields)}`
    }

    // Perform the HTTP GET and normalize the success case to always return an object.
    const response = await APP_API.GET(URL)
    if (!response.error) {
        return response?.schemas || {}
    }

    // In case of error, let the caller handle the error shape.
    return response
}

/**
 * Fetch a single entity instance for a given schema entity.
 *
 * This is typically used when a schema field references another entity
 * (for example, a product referencing a category entity).
 *
 * @param entity_name   - Name of the entity (e.g. "category", "brand").
 * @param entity_itemID - Primary key / id of the entity instance to fetch.
 * @param fields        - List of fields to fetch for that entity.
 */
export async function getEntityData(entity_name: string, entity_itemID: string, fields: string[]) {
    const url = `/v1/${APP.tenant}/${APP.store}/schema/entity/${entity_name}/${entity_itemID}?fields=${encodeURIComponent(fields?.join("|"))}`
    const response = await APP_API.GET(url)
    return response
}

/**
 * Resolve an array of entity references in parallel.
 *
 * `entities` is expected to be an array of small descriptor objects coming from the schema,
 * each with at least: `{ name, for, field }` where:
 *   - `name`  -> entity name (schema entity)
 *   - `for`   -> id of the entity instance
 *   - `field` -> fields to select for that entity
 *
 * All API calls are fired at once using Promise.all to minimize latency.
 */
export async function getMultipleEntityData(entities: {
    name: ENTITY_NAME,
    for: string,
    field: string[]
}[], fields?: string[]) {
    const promises = entities.map(_ent => {
        return getEntityData(_ent?.name, _ent?.for, (fields || _ent?.field))
    });

    // Wait until all entity fetches complete and return them as an array.
    return await Promise.all(promises);
}

/**
 * Safely resolve a nested value from an object using a dot-separated key path.
 *
 * Examples:
 *   key = "a.b.c" will read `data["a"]["b"]["c"]` step by step.
 *
 * If `extract_entity` is true and the resolved value is an array, the array is
 * treated as a list of entity reference descriptors and `getMultipleEntityData`
 * is used to fetch their full data from the server.
 *
 * @param data           - Source object we are reading from.
 * @param key            - Dot-notation string describing the path inside `data`.
 * @param extract_entity - Whether to treat an encountered array as entity refs.
 */
async function getKeyValue(data: {}, key: string, extract_entity: boolean) {
    let return_data: any = data;
    const key_map = key?.split(".")

    for (const _k of key_map) {
        // Walk down the object tree; bail out early if a segment is missing.
        return_data = return_data?.[_k] as string
        if (!return_data) {
            return null
        }

        // If we reach an array and `extract_entity` is enabled, fetch all
        // referenced entities in parallel and return that result instead
        // of the raw reference array.
        if (Array.isArray(return_data) && extract_entity) {
            return await getMultipleEntityData(return_data)
        }
    }

    // Final primitive/object value after following the key path.
    return return_data
}

/**
 * Build a plain dictionary object from `_data` based on a field mapping.
 *
 * `fields` is an array of tuples: [outputKey, path], where:
 *   - `outputKey` -> key name in the returned dictionary
 *   - `path`      -> dot-separated path to read from `_data`
 *
 * If `extract_entity` is true, any array found along a path will be interpreted
 * as a list of entity references and expanded via `getMultipleEntityData`.
 *
 * Example `fields`:
 *   [
 *     ["title", "schema.meta.title"],
 *     ["categories", "schema.categories"],
 *   ]
 *
 * @returns An object shaped according to `fields`, with resolved values.
 */
export async function handleGetDictData(_data: {}, fields: [string, string][], extract_entity: boolean) {
    const return_Data: Record<string, unknown> = {}

    for (const _x_field of fields) {
        const [outputKey, path] = _x_field
        return_Data[outputKey] = await getKeyValue(_data, path, extract_entity)
    }

    return return_Data
}