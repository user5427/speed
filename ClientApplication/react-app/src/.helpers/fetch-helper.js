// fetch-helper.js
import { sendError, sendOk } from "./status-helper";

export const fetchEntity = async (apiUrl, requestOptions) => {
    let type = "get";
    if (requestOptions){
        if (requestOptions.method === "PUT") {
            type = "update";
        } else if (requestOptions.method === "DELETE") {
            type = "delete";
        } else if (requestOptions.method === "POST") {
            type = "create";
        }
    }
    

    try {
        let res;
        if (requestOptions){
            res = await fetch(apiUrl, requestOptions);
        } else {
            res = await fetch(apiUrl);
        }
        if (res.ok) {
            let data = await res.json();
            return {
                ...data,
                ...sendOk()
            }
        }
        throw new Error(`Failed to ${type} entity. Status code: ${res.status}`);
    } catch (err) {
        return sendError(err);
    }
};