import { fetchEntity, generateRequestOptions } from "./fetch-helper";
import { sendError, sendOk, isOK, isError, getErrorMessage } from "./status-helper";

const ErrorHandler = {
    isOK,
    isError,
    getErrorMessage
}

export { generateRequestOptions as requestOptions, fetchEntity, sendError, sendOk, ErrorHandler };