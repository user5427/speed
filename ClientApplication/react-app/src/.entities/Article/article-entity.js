import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Article {
    constructor(title, categoryTitle, coverImage = "", paragraphIDs = []) {
        if (typeof title === "object" && categoryTitle === undefined) {
            this.fromOtherArticle = title;
        } else if (title !== undefined && categoryTitle !== undefined) {

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

            // Assign properties
            this._title = title;
            this._categoryTitle = categoryTitle;
            this._coverImage = coverImage;
            this._paragraphIDs = paragraphIDs; // Initialize paragraphIDs as an empty array
            this._id = null;
        } else if (title === undefined && categoryTitle === undefined) {
            this._title = "";
            this._categoryTitle = "";
            this._coverImage = "";
            this._paragraphIDs = [];
            this._id = null;
        } else {
            throw new Error("Unknown intentions.");
        }
    }

    set fromOtherArticle(article) {
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
        if (article.id){
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
    set fromJson(data) {
        console.log(data)
        this._title = data.title;
        this._categoryTitle = data.categoryTitle;
        this._id = data.id;
        if (data.coverImage) {
            this._coverImage = data.coverImage;
        }
        if (data.paragraphIds) {
            this._paragraphIDs = data.paragraphIds;
        }
    }

    get toJson() {
        const json = {
            title: this._title,
            categoryTitle: this._categoryTitle
        };

        if (this._coverImage) {
            json.coverImage = this._coverImage;
        }

        if (this._id) {
            json.id = this._id;
        }

        return json;
    }


}

export default Article;
