import { fetchEntity, generateRequestOptions } from "./fetch-helper";
import { sendError, sendOk, isOK, isError, getErrorMessage } from "./status-helper";

const ErrorHandler = {
    isOK,
    isError,
    getErrorMessage
}

const FetchHelper = {
    fetchEntity,
    generateRequestOptions
}

export { FetchHelper, ErrorHandler as StatusHelper };