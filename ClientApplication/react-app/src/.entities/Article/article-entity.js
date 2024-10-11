import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { ArticleJson } from '../../.constants/MainConstants';

class Article {
    constructor() {
        this.#createEmptyArticle();
    }

    static createArticleFromParams(title, categoryTitle, coverImage = null, paragraphIDs = [], id = null) {
        const article = new Article();
        article.#createArticleFromParams(title, categoryTitle, coverImage, paragraphIDs, id);
        return article;
    }

    static createEmptyArticle() {
        return new Article();
    }

    static createArticleFromCopy(article) {
        const newArticle = new Article();
        newArticle.#copyArticle(article);
        return newArticle;
    }

    #createArticleFromParams(title, categoryTitle, coverImage = null, paragraphIDs = [], id = null) {
        // Validate title
        if (typeof title !== "string" ||
            title.length < ValidationConstants.MinTitleLength ||
            title.length > ValidationConstants.MaxTitleLength) {
            throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        }
        if (!ValidationPatternConstants.TitlePattern.test(title)) {
            throw new Error("Title does not match the required pattern.");
        }

        // Validate category title
        if (typeof categoryTitle !== "string" ||
            !ValidationPatternConstants.ArticleCategoryPattern.test(categoryTitle)) {
            throw new Error("Category title must be a string and match the required pattern.");
        }

        // Validate cover image (if provided)
        if (coverImage && typeof coverImage !== "string") {
            throw new Error("Cover image must be a string.");
        }

        // Validate paragraph IDs (if provided)
        if (paragraphIDs && !Array.isArray(paragraphIDs)) {
            throw new Error("Paragraph IDs must be an array.");
        }

        // Validate ID (if provided) id must be a number
        if (id && typeof id !== "number") {
            throw new Error("ID must be a number.");
        }

        // Assign properties
        this._title = title;
        this._categoryTitle = categoryTitle;
        this._coverImage = coverImage;
        this._paragraphIDs = paragraphIDs; // Initialize paragraphIDs as an empty array
        this._id = id;
    }

    #createEmptyArticle() {
        this._title = "";
        this._categoryTitle = "";
        this._coverImage = "";
        this._paragraphIDs = [];
        this._id = null;
    }

    #copyArticle(article) {
        if (article.title === undefined) {
            throw new Error("Title is required.");
        }

        if (!article.categoryTitle === undefined) {
            throw new Error("Category title is required.");
        }

        this._title = article.title;
        this._categoryTitle = article.categoryTitle;
        if (article.coverImage) {
            this._coverImage = article.coverImage;
        } else {
            this._coverImage = "";
        }
        if (article.paragraphIDs) {
            this._paragraphIDs = article.paragraphIDs;
        } else {
            this._paragraphIDs = [];
        }
        if (article.id) {
            this._id = article.id;
        } else {
            this._id = null;
        }

    }


    // Method to check if a field exists
    hasField(field) {
        return Object.prototype.hasOwnProperty.call(this, `_${field}`);
    }

    // Getters and setters with validation
    get title() {
        return this._title;
    }
    set title(value) {
        // if (typeof value !== "string" || 
        //     value.length < ValidationConstants.MinTitleLength || 
        //     value.length > ValidationConstants.MaxTitleLength) {
        //     throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        // }
        // if (!ValidationPatternConstants.TitlePattern.test(value)) {
        //     throw new Error("Title does not match the required pattern.");
        // }
        this._title = value;
    }
    get varTitleName() {
        return "title"
    }

    get categoryTitle() {
        return this._categoryTitle;
    }
    set categoryTitle(value) {
        // if (typeof value !== "string" || 
        //     !ValidationPatternConstants.ArticleCategoryPattern.test(value)) {
        //     throw new Error("Category title must be a string and match the required pattern.");
        // }
        this._categoryTitle = value;
    }
    get varCategoryTitleName() {
        return "categoryTitle"
    }

    get coverImage() {
        return this._coverImage;
    }
    set coverImage(value) {
        // if (value && typeof value !== "string") {
        // throw new Error("Cover image must be a string.");
        // }
        this._coverImage = value;
    }
    get varCoverImageName() {
        return "coverImage"
    }

    get paragraphIDs() {
        return this._paragraphIDs;
    }
    set paragraphIDs(value) {
        // if (!Array.isArray(value)) {
        // throw new Error("Paragraph IDs must be an array.");
        // }
        this._paragraphIDs = value;
    }


    get id() {
        return this._id;
    }

    // Setter for the entire article based on data object
    /**
     * @deprecated This method is deprecated and will be removed in future versions.
     * @param {*} data 
     */
    fromJson(data) {
        console.log(data)
        this._title = data[ArticleJson.title];
        this._categoryTitle = data[ArticleJson.categoryTitle];
        this._id = data[ArticleJson.id];
        if (data[ArticleJson.coverImage]) {
            this._coverImage = data[ArticleJson.coverImage];
        }
        if (data[ArticleJson.paragraphIds]) {
            this._paragraphIDs = data[ArticleJson.paragraphIds];
        }
    }

    /**
     * @deprecated This method is deprecated and will be removed in future versions.
     * @returns 
     */
    toJson() {
        const json = {};

        if (this._title) {
            json[ArticleJson.title] = this._title;
        }

        if (this._categoryTitle) {
            json[ArticleJson.categoryTitle] = this._categoryTitle;
        }

        if (this._coverImage) {
            json[ArticleJson.coverImage] = this._coverImage;
        }

        if (this._id) {
            json[ArticleJson.id] = this._id;
        }

        if (this._paragraphIDs) {
            json[ArticleJson.paragraphIds] = this._paragraphIDs;
        }

        return json;
    }


}

export default Article;
