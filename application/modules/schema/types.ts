export type SchemaName = string;

export type SchemaFieldMap = Record<string, string>;

export type SchemaData = {
    name: SchemaName;
    fields: Record<string, unknown>;
};

export type SchemaResponse = {
    data: SchemaData;
    source: 'remote' | 'fallback';
};

export type SchemaBuilderProps<TComponent extends React.ComponentType<any>> = {
    schema: {
        name?: string,
        description?: string,
        schemaID: string
    }
    extract_entities?: boolean
    validation?: boolean
    fields: Partial<React.ComponentProps<TComponent>> | Record<string, any>
    schemaData?: any
    defaultParameter?: Partial<React.ComponentProps<TComponent>>
    component: TComponent
}

export type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never

export type ENTITY_NAME = "product" | "blog" | "category"
