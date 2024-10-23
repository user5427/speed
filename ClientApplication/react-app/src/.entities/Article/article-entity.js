import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Article {
    constructor() {
        this.#createEmptyArticle();
    }

    static createArticleFromParams(title, categoryTitle, paragraphIDs = [], id = null, imageFileName = null) {
        const article = new Article();
        article.#createArticleFromParams(title, categoryTitle, paragraphIDs, id, imageFileName);
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

    #createArticleFromParams(title, categoryTitle, paragraphIDs = [], id = null, imageFileName = null) {
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
        this._paragraphIDs = paragraphIDs; // Initialize paragraphIDs as an empty array
        this._id = id;
        this._imageFileName = imageFileName;
    }

    #createEmptyArticle() {
        this._title = "";
        this._categoryTitle = "";
        this._paragraphIDs = [];
        this._id = null;
        this._imageFileName = null;
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
        if (article.imageFileName) {
            this._imageFileName = question.imageFileName
        } else {
            this._imageFileName = null;
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

    get paragraphIDs() {
        return this._paragraphIDs;
    }
    set paragraphIDs(value) {
        // if (!Array.isArray(value)) {
        // throw new Error("Paragraph IDs must be an array.");
        // }
        this._paragraphIDs = value;
    }

    get imageFileName() {
        return this._imageFileName;
    }

    set imageFileName(value) {
        this._imageFileName = value;
    }

    resetImageFileName(){
        this._imageFileName = null;
    }


    get id() {
        return this._id;
    }
}

export default Article;
