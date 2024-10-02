// 

const ArticleService = {
    getArticles: function(page) {
        return fetch(process.env.REACT_APP_API_URL + "Articles?PageNumber=" + page + "&PageSize=" + process.env.REACT_APP_PAGING_SIZE)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(res => {
                if (res.count > 0) {
                    return {
                        count: res.count,
                        articles: res.articles
                    }
                }
                return [];
            }).catch(err => alert("Error getting data"));
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

        return fetch(apiUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(res => {
                return {
                    article: res
                }
            }).catch(err => alert("Error saving data"));
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

        return fetch(apiUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(res => {
                return {
                    article: res
                }
            }).catch(err => alert("Error saving data"));
    },

    checkIfArticleIdExists: function(articleId) {
        return fetch(process.env.REACT_APP_API_URL + `Articles/${articleId}`)
            .then(res => {
                if (res.ok) {
                    return true;
                }
                return false;
            }).catch(err => alert("Error getting data"));
    }

}

export default ArticleService;