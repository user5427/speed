// 
import { fetchEntity, generateRequestOptions } from "../../.helpers/fetch-helper";

const ArticleService = {
    getArticles: function(page) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        return fetchEntity(apiUrl).then(res => {return res});
    },
    
    postArticle: function(article) {
        const requestOptions = generateRequestOptions("POST", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles`;
        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putArticle: function(article) {
        const requestOptions = generateRequestOptions("PUT", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${article.id}`;
        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
       
    },

    checkIfArticleIdExists: function(articleId) { // FIXME: This function is not working as expected
        apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return fetchEntity(apiUrl).then(res => {return res});
    }

}

export default ArticleService;