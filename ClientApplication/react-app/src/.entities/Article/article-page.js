class ArticlePage {
    constructor(articleList = [], articleCount = 0) {
        // Check if the first parameter is an object (JSON data) or separate values
        if (typeof articleList === 'object' && !Array.isArray(articleList)) {
            // Initialize from JSON data
            this._articleList = articleList.articles || []; 
            this._articleCount = articleList.count || 0;
        } else {
            // Initialize from individual parameters
            this._articleList = articleList;
            this._articleCount = articleCount;
        }
    }

    // Getter for articleList
    get articleList() {
        return this._articleList;
    }

    // Getter for articleCount
    get articleCount() {
        return this._articleCount;
    }

    // Setter for articlePage from JSON data (accepts data object with articles and count)
    set fromJson(data) {
        if (data && Array.isArray(data.articles) && typeof data.count === 'number') {
            this._articleList = data.articles;
            this._articleCount = data.count;
        } else {
            throw new Error("Invalid data format. Must contain articles (array) and count (number).");
        }
    }
}

export default ArticlePage;
