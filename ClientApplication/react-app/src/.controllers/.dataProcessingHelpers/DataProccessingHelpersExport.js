import { fetchEntity, generateRequestOptions } from "./fetch-helper";
import { isOK, isError, getErrorMessage } from "./status-helper";

const StatusHelper = {
    isOK,
    isError,
    getErrorMessage
}

const FetchHelper = {
    fetchEntity,
    generateRequestOptions
}

export { FetchHelper, StatusHelper };