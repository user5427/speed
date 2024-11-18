import { sendError, sendOk } from "./status-helper";
import API from './API'; // Your configured axios instance with interceptors

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

        return {
            ...response.data,
            ...sendOk()
        };
    } catch (error) {
        // Handle axios error
        const errorMessage = error.response?.data?.title || 
                             error.response?.data?.detail || 
                             "Unknown error";

        throw new Error(`Failed to ${type} entity. Status code: ${error.response?.status || "N/A"}. Error message: ${errorMessage}`);
    }
};

interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    body?: any;
}

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
