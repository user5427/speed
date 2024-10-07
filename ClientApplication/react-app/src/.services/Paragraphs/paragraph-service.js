// 
import ErrorHandler from "../defaultErrorMessage";

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

        return fetch(apiUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Failed to save paragraph. Status code: ${res.status}`);
            }).
            then(res => {
                return {
                    paragraph: res
                }
            })
            .catch(err => {
                return ErrorHandler.sendError(res);
            });
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

        return fetch(apiUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Failed to update paragraph. Status code: ${res.status}`);
            }).
            then(res => {
                return {
                    paragraph: res
                }
            })
            .catch(err => {
                return ErrorHandler.sendError(res);
            });
    }

}

export default ParagraphService;