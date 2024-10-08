// 
import { FetchHelper } from "../../.helpers/MainHelpers";
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
    }

}

export default ParagraphService;