// 
import { fetchEntity, generateRequestOptions } from "../../.helpers/fetch-helper";
const ParagraphService = {

    postParagraph: function (paragraph) {
        const requestOptions = generateRequestOptions("POST", paragraph);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs`;
        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putParagraph: function (paragraph) {
        const requestOptions = generateRequestOptions("PUT", paragraph);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraph.id}`;
        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }

}

export default ParagraphService;