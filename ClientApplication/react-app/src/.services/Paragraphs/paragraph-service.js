// 
import { fetchEntity } from "../../.helpers/fetch-helper";
const ParagraphService = {

    postParagraph: function (paragraph) {
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paragraph)
        };

        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs`;

        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putParagraph: function (paragraph) {
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paragraph)
        };

        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraph.id}`;

        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }

}

export default ParagraphService;