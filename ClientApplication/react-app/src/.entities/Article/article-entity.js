import { ValidationConstants, ValidationPatternConstants } from '../../constants/MainConstants';

class Article {
    constructor(title, categoryTitle, coverImage = "", paragraphIDs = []) {
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
    }

    // Getters and setters with validation
    get title() {
        return this._title;
    }
    set title(value) {
        if (typeof value !== "string" || 
            value.length < ValidationConstants.MinTitleLength || 
            value.length > ValidationConstants.MaxTitleLength) {
            throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        }
        if (!ValidationPatternConstants.TitlePattern.test(value)) {
            throw new Error("Title does not match the required pattern.");
        }
        this._title = value;
    }

    get categoryTitle() {
        return this._categoryTitle;
    }
    set categoryTitle(value) {
        if (typeof value !== "string" || 
            !ValidationPatternConstants.ArticleCategoryPattern.test(value)) {
            throw new Error("Category title must be a string and match the required pattern.");
        }
        this._categoryTitle = value;
    }

    get coverImage() {
        return this._coverImage;
    }
    set coverImage(value) {
        if (value && typeof value !== "string") {
            throw new Error("Cover image must be a string.");
        }
        this._coverImage = value;
    }

    get paragraphIDs() {
        return this._paragraphIDs;
    }
    set paragraphIDs(value) {
        if (!Array.isArray(value)) {
            throw new Error("Paragraph IDs must be an array.");
        }
        this._paragraphIDs = value;
    }

    // Setter for the entire article based on data object
    set article(data) {
        this.title = data.title;
        this.categoryTitle = data.categoryTitle;
        if (data.coverImage) {
            this.coverImage = data.coverImage;
        }
        if (data.paragraphIDs) {
            this.paragraphIDs = data.paragraphIDs;
        }
    }
}

export default Article;
