// 
import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ArticleService = {
    getArticles: async function(page: Number) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },
    
    postArticle: async function(article) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    putArticle: async function(article) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("PUT", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${article.id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
       
    },

    getArticle: async function(articleId: Number) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    getArticleByTitle: async function(title: String) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/search?Search=${title}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    deleteArticle: async function(articleId: Number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(articleId: any, file: string | Blob) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelperAxios.generateImageRequestOptionsAxios(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {articleId} articleId 
     * @returns url to image
     */
    getImage: async function(articleId: Number) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelperAxios.getImageAxios(apiUrl).then(res => {return res});
    },

    deleteImage: async function(articleId: Number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }



}

export default ArticleService;