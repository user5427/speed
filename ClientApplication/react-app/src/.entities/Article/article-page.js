import { ArticlePageJson } from "../../.constants/MainConstants";

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
        if (data && Array.isArray(data[ArticlePageJson.articles]) && typeof data[ArticlePageJson.count] === 'number') {
            this._articleList = data[ArticlePageJson.articles];
            this._articleCount = data[ArticlePageJson.count];
        } else {
            throw new Error("Invalid data format. Must contain articles (array) and count (number).");
        }
    }
}

export default ArticlePage;
