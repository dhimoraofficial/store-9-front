export type RequestHttpMethod = "POST" | "PUT" | "GET" | "DELETE" | "UPDATE"
export type RequestHeadersMap = Record<string, string>

export type ResponseType = "json" | "blob"
export type RequestOptions = { responseType?: "json" } | { responseType: "blob" }
export type RequestPayloads = {
    [key: string | number]:
    string | number | boolean | undefined | Date | null |
    string[] | number | boolean | undefined | Date | null |
    // ------------------------------------ //
    RequestPayloads // the parameters can have nested children
}

export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }
export type JsonPayload = Record<string, unknown> | unknown[]

export type requestResponse = {
    error?: string | undefined | boolean,
    message?: string | undefined,
    type?: string | undefined,
    [key: string]: any
}

export interface parseErrorParams {
    error: string | boolean | undefined
    type?: string | undefined
    message?: string
    [key: string]: string | undefined | boolean
}

export interface useAppAPIParams {
    accessToken?: string | undefined
}

export type ApplicationAPIResponse = (
    path: string,
    payload?: RequestPayloads | FormData,
    isFileUpload?: boolean,
    extraHeaders?: RequestHeadersMap,
    exact_path?: boolean
) => Promise<requestResponse>;