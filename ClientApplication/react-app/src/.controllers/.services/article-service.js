// 
import { FetchHelper } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ArticleService = {
    getArticles: async function(page) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        return FetchHelper.fetchEntity(apiUrl).then(res => {return res});
    },
    
    postArticle: async function(article) {
        const requestOptions = FetchHelper.generateRequestOptions("POST", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putArticle: async function(article) {
        const requestOptions = FetchHelper.generateRequestOptions("PUT", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${article.id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
       
    },

    getArticle: async function(articleId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return FetchHelper.fetchEntity(apiUrl).then(res => {return res});
    },

    getArticleByTitle: async function(title) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/search?Search=${title}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        return FetchHelper.fetchEntity(apiUrl).then(res => {return res});
    },

    deleteArticle: async function(articleId) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(articleId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelper.generateImageRequestOptions(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {articleId} articleId 
     * @returns url to image
     */
    getImage: async function(articleId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelper.getImage(apiUrl).then(res => {return res});
    },

    deleteImage: async function(articleId) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }



}

export default ArticleService;