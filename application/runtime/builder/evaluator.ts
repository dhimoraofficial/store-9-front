/**
 * Resolves a dotted path (e.g. "product.title") against a context object.
 */
export function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Traverses a component schema's settings or values and interpolates strings matching ${context.path}
 */
export function interpolateSchema(schema: any, context: any): any {
    if (typeof schema === "string") {
        return schema.replace(/\${context\.(.+?)}/g, (_, path) => {
            const val = getNestedValue(context, path);
            return val !== undefined && val !== null ? String(val) : "";
        });
    }
    
    if (Array.isArray(schema)) {
        return schema.map(item => interpolateSchema(item, context));
    }
    
    if (schema !== null && typeof schema === "object") {
        const result: any = {};
        for (const key in schema) {
            result[key] = interpolateSchema(schema[key], context);
        }
        return result;
    }
    
    return schema;
}
