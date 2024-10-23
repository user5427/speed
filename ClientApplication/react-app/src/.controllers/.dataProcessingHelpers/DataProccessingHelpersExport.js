import { fetchEntity, generateRequestOptions, generateImageRequestOptions, downloadImage, getImage } from "./fetch-helper";
import { isOK, isError, getErrorMessage } from "./status-helper";

const StatusHelper = {
    isOK,
    isError,
    getErrorMessage
}

const FetchHelper = {
    fetchEntity,
    generateRequestOptions,
    generateImageRequestOptions,
    downloadImage,
    getImage
}

export { FetchHelper, StatusHelper };