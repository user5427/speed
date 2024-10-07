import { fetchEntity } from "./fetch-helper";
import { sendError, sendOk, isOK, isError, getErrorMessage } from "./status-helper";

const ErrorHandler = {
    isOK,
    isError,
    getErrorMessage
}

export { fetchEntity, sendError, sendOk, ErrorHandler };