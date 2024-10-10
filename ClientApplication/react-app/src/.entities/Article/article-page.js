class ArticlePage {
    constructor() {
        this.#createEmptyArticlePage();
    }

    #createEmptyArticlePage() {
        this._articleList = [];
        this._articleCount = 0;
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
    fromJson(data) {
        if (data && Array.isArray(data.articles) && typeof data.count === 'number') {
            this._articleList = data.articles;
            this._articleCount = data.count;
        } else {
            throw new Error("Invalid data format. Must contain articles (array) and count (number).");
        }
    }
}

export default ArticlePage;
