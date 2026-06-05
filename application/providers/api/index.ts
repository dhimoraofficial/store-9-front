import { apiSlug } from "@/app";
import {
    RequestHeadersMap,
    RequestHttpMethod,
    RequestOptions,
    RequestPayloads,
    requestResponse
} from "@/application/providers/api/type";

const buildUrl = (path: string, exactPath: boolean): string => {
    if (exactPath) return path
    return `${apiSlug}${path}`
}

const withAuth = (headers: RequestHeadersMap = {}, accessToken: string | null = null): RequestHeadersMap => {
    if (!accessToken) return headers

    return {
        Authorization: `Bearer ${accessToken}`,
        ...headers,
    }
}

const withJson = (headers: RequestHeadersMap = {}): RequestHeadersMap => ({
    "Content-Type": "application/json",
    ...headers,
})

/**
 * Performs an HTTP request and returns a normalized response.
 *
 * Responsibilities:
 * - Builds final request URL
 * - Executes fetch
 * - Handles network failures
 * - Parses blob or JSON response
 * - Normalizes API-level errors
 *
 * @param path API endpoint path (relative or absolute)
 * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param headers Request headers map
 * @param bodyOptions Fetch options such as body, credentials, mode
 * @param exactPath Whether path is already absolute
 * @param options Response configuration (default: JSON)
 *
 * @returns requestResponse
 */
async function request(
    path: string,
    method: RequestHttpMethod,
    headers: RequestHeadersMap,
    bodyOptions: object | undefined = {},
    exactPath: boolean = false,
    options: RequestOptions = { responseType: "json" }
): Promise<requestResponse | Blob> {


    /**
    Will store the fetch Response object.
    Declared outside try so it can be accessed later.
    */
    let res;

    // Build final request URL.
    // Centralizing URL logic allows base URL changes in one place.
    let URL = buildUrl(path, exactPath)

    try {
        // Perform the HTTP request.
        // Only network-level failures will throw:
        // - No internet
        // - DNS failure
        // - CORS rejection
        // - Browser blocked request
        res = await fetch(URL, {
            method,
            headers,
            ...bodyOptions,
            cache: "default"
        })
    } catch (e: any) {
        console.log(URL);
        
        throw e
        // If execution reaches here, fetch itself failed.
        // No HTTP status exists because request never completed.
        return {
            error: true,
            type: "FETCH_ERROR",
            message: e?.message ?? "Network error",
        };
    }

    try {
        // If caller expects a file/blob response,
        // attempt to read raw binary stream.
        if (options.responseType === "blob") {
            return await res.blob()
        }
    } catch {
        // Blob reading failed.
        // Possible reasons:
        // - Corrupt stream
        // - Server closed connection mid-transfer
        // - Browser internal failure
        return {
            error: true,
            type: "INVALID_BLOB",
        }
    }

    // Variable to store parsed JSON body.
    let response;

    try {
        /**
        Attempt to parse response body as JSON.
        This can fail even when HTTP status is 200.
        Example:
        - Server returns HTML error page
        - Empty body
        - Malformed JSON
        */

        response = await res.json()
    } catch {
        // Parsing failed, meaning body is not valid JSON.
        // At this point we *did* receive a response,
        // but its format is incorrect.
        return {
            error: true,
            type: "INVALID_JSON",
        }
    }

    // If API returned a structured error object,
    // normalize it into internal exception format.
    if (response?.error) {
        // response = errorParser.parseException(response)
    }

    // Successful execution path:
    // - Fetch succeeded
    // - Body parsed successfully
    // - No API-level error detected
    return response
}


async function POST<T = requestResponse>(
    path: string,
    payload: RequestPayloads | FormData,
    isFileUpload: boolean = false,
    extraHeaders: RequestHeadersMap = {},
    accessToken?: string,
    exact_path: boolean = false
): Promise<requestResponse | T> {
    // Code //
    const headers = isFileUpload ? extraHeaders : withJson(withAuth(extraHeaders, accessToken));
    const body = isFileUpload ? payload : JSON.stringify(payload);
    return await request(path, "POST", headers, { body }, exact_path);
}

async function UPLOAD(
    path: string,
    metadata: Record<string, string>,
    files: File,
    extraHeaders: RequestHeadersMap = {},
    accessToken?: string,
): Promise<requestResponse> {
    // Code //
    const formData = new FormData();

    if (metadata) {
        formData.append("form", JSON.stringify(metadata)); // include metadata as JSON string
    }

    if (files) {
        if (Array.isArray(files)) {
            files.forEach((file) => formData.append("file", file)); // multi-file upload
        } else {
            formData.append("file", files); // single file upload
        }
    }

    return await POST(path, formData, true, extraHeaders, accessToken);
}

async function GET<T = requestResponse>(
    path: string,
    extraHeaders: RequestHeadersMap = {},
    accessToken?: string,
    exact_path: boolean = false
): Promise<requestResponse | T> {
    // Code //
    const headers = withAuth(extraHeaders, accessToken);
    return await request(path, "GET", headers, {}, exact_path);
}

async function DOWNLOAD(
    path: string,
    expectedType: boolean | string = false,
    extraHeaders: RequestHeadersMap = {},
    exactPath: boolean,
): Promise<Blob | ArrayBuffer | string | null | boolean> {
    // Code //
    const blob = await request(
        path,
        "GET",
        extraHeaders,
        {},
        exactPath,
        { responseType: "blob" }
    );

    if (expectedType && blob?.type !== expectedType) {
        return false; // mime mismatch
    }

    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // data URL
        reader.onerror = reject;
        reader.readAsDataURL(blob as Blob);
    });
}

async function PUT<T = requestResponse>(
    path: string,
    payload: RequestPayloads | FormData,
    isFileUpload: boolean = false,
    extraHeaders: RequestHeadersMap = {},
    exact_path: boolean = false,
    accessToken?: string
): Promise<requestResponse | T> {
    // Code //
    const headers = isFileUpload ? extraHeaders : withJson(withAuth(extraHeaders, accessToken));
    const body = isFileUpload ? payload : JSON.stringify(payload);
    return await request(path, "PUT", headers, { body }, exact_path);
}

async function DELETE<T = requestResponse>(path: string,
    payload: RequestPayloads | FormData = {},
    isFileUpload: boolean = false,
    extraHeaders: RequestHeadersMap = {},
    accessToken?: string
): Promise<requestResponse | T> {
    // Code //
    const headers = isFileUpload ? extraHeaders : withJson(withAuth(extraHeaders, accessToken));
    const body = isFileUpload ? payload : JSON.stringify(payload);
    return await request(path, "DELETE", headers, { body });
}


export const APP_API = {
    DELETE,
    POST,
    UPLOAD,
    GET,
    PUT,
    DOWNLOAD,
}