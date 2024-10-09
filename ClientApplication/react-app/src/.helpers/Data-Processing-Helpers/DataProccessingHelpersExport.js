import { fetchEntity, generateRequestOptions } from "./../Data-Processing-Helpers/fetch-helper";
import { sendError, sendOk, isOK, isError, getErrorMessage } from "./../Data-Processing-Helpers/status-helper";

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