import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

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
        if (coverImage !== null && typeof coverImage !== "string") {
            throw new Error("Cover image must be a string.");
        }

        // Validate paragraph IDs (if provided)
        if (paragraphIDs && !Array.isArray(paragraphIDs)) {
            throw new Error("Paragraph IDs must be an array.");
        }

        // Validate ID (if provided) id must be a number
        if (id !== null && typeof id !== "number") {
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
        this._coverImage = null;
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
    static varTitleName() {
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
    static varCategoryTitleName() {
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
    static varCoverImageName() {
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
}

export default Article;