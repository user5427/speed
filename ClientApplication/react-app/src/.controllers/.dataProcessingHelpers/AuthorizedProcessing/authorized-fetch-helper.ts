import { sendError, sendOk } from "../status-helper";
import API from './API'; // Your configured axios instance with interceptors
import { sendAPIError } from "./auth-status-helper";

export const fetchEntity = async (apiUrl: string, requestOptions) => {
    let type = "get";

    if (requestOptions) {
        if (requestOptions.method === "PUT") {
            type = "update";
        } else if (requestOptions.method === "DELETE") {
            type = "delete";
        } else if (requestOptions.method === "POST") {
            type = "create";
        }
    }

    try {
        const axiosConfig = {
            url: apiUrl,
            method: requestOptions?.method || 'GET',
            headers: requestOptions?.headers || {}, // Merge headers from requestOptions
            data: requestOptions?.body || undefined // Axios uses `data` for request body
        };

        // Axios request using the interceptor-configured instance
        const response = await API(axiosConfig);
        if (response.status === 200) {
            return {
                ...response.data,
                ...sendOk()
            };
        }

        throw new Error(`Failed to ${type} entity. Status code: ${response.status}. Error message: ${response.data}`);
    } catch (error) {
        return sendAPIError(error, type);
    }
};

/**
 *  Fetches an image from the API
 * @param apiUrl 
 * @returns 
 */
export const getImage = async (apiUrl: string) => {
    try {
        const headers = {
            'Accept': 'image/*'  // Accept any image format
        }

        const axiosConfig = {
            url: apiUrl,
            method: 'GET',
            headers: headers,
            data: undefined,
        };

        const response = await API(axiosConfig);

        const blob = await response.data.blob();

        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        return sendAPIError(error);
    }
};

interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    body?: any;
};

export const generateImageRequestOptions = (body: FormData): RequestOptions => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    };

    return {
        method: 'POST',
        headers: headers,
        body: body
    };
};

export const generateRequestOptions = (method: string, body?: any): RequestOptions => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    return {
        method: method,
        headers: headers,
        ...(body && { body: body }) // Add body only if it exists
    };
};


