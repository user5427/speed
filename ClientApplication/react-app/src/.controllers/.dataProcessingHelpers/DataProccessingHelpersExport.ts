import { fetchEntity, fetchEntityNoReturn, generateRequestOptions, generateImageRequestOptions, downloadImage, getImage } from "./UnauthorizedProcessing/fetch-helper";
import { isOK, isError, getErrorMessage } from "./UnauthorizedProcessing/status-helper";

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
    getImage,
    fetchEntityNoReturn
}

import { fetchEntityAxios, generateImageRequestOptionsAxios, generateRequestOptionsAxios, getImageAxios } from "./AuthorizedProcessing/authorized-fetch-helper";

const FetchHelperAxios = {
    fetchEntityAxios,
    generateRequestOptionsAxios,
    generateImageRequestOptionsAxios,
    getImageAxios
}

export { FetchHelperAxios };

export { FetchHelper, StatusHelper };