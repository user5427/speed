// 
import { FetchHelper } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ParagraphService = {

    postParagraph: async function (paragraph) {
        const requestOptions = FetchHelper.generateRequestOptions("POST", paragraph);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putParagraph: async function (paragraph) {
        const requestOptions = FetchHelper.generateRequestOptions("PUT", paragraph);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraph.id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getParagraph: async function (id) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getParagraphsByTitle: async function (search) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/search?Search=${search}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    deleteParagraph: async function (id) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(paragraphId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelper.generateImageRequestOptions(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraphId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {paragraphId} paragraphId 
     * @returns url to image
     */
    getImage: async function(paragraphId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraphId}/img`;
        return FetchHelper.getImage(apiUrl).then(res => {return res});
    },

    deleteImage: async function(paragraphId) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraphId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }

}

export default ParagraphService;