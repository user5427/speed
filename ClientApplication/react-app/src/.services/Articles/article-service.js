// 
import { fetchEntity } from "../../.helpers/fetch-helper";

const ArticleService = {
    getArticles: function(page) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        return fetchEntity(apiUrl).then(res => {return res});
    },
    
    postArticle: function(article) {
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',  // Correct header for receiving JSON response
                'Content-Type': 'application/json',  // Correct header for sending JSON data
            },
            body: JSON.stringify(article)
        };

        const apiUrl = process.env.REACT_APP_API_URL + `Articles`;
        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putArticle: function(article) {
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',  // Correct header for receiving JSON response
                'Content-Type': 'application/json',  // Correct header for sending JSON data
            },
            body: JSON.stringify(article)
        };

        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${article.id}`;
        return fetchEntity(apiUrl, requestOptions).then(res => {return res});
       
    },

    checkIfArticleIdExists: function(articleId) { // FIXME: This function is not working as expected
        apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return fetchEntity(apiUrl).then(res => {return res});
    }

}

export default ArticleService;