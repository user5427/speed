// 
import { FetchHelper } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const QuestionService = {

    postQuestion: async function (question) {
        const requestOptions = FetchHelper.generateRequestOptions("POST", question);
        const apiUrl = process.env.REACT_APP_API_URL + `Questions`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putQuestion: async function (question) {
        const requestOptions = FetchHelper.generateRequestOptions("PUT", question);
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${question.id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getQuestion: async function (id) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getQuestionsByTitle: async function (search) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/search?Search=${search}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    deleteQuestion: async function (id) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(questionId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelper.generateImageRequestOptions(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questionId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {questionId} questionId 
     * @returns url to image
     */
    getImage: async function(questionId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questionId}/img`;
        return FetchHelper.getImage(apiUrl).then(res => {return res});
    },

    deleteImage: async function(questionId) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questionId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }

}

export default QuestionService;