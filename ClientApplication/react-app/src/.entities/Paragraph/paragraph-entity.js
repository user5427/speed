import { ValidationConstants, ValidationPatternConstants } from '../../constants/MainConstants';

class Paragraph {
    constructor(title, text, articleId, questionIDs = []) {
        // Validate title
        if (typeof title !== "string" || 
            title.length < ValidationConstants.MinTitleLength || 
            title.length > ValidationConstants.MaxTitleLength) {
            throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        }
        if (!ValidationPatternConstants.TitlePattern.test(title)) {
            throw new Error("Title does not match the required pattern.");
        }

        // Validate text
        if (typeof text !== "string" || 
            text.length < ValidationConstants.MinTextLength || 
            text.length > ValidationConstants.MaxTextLength) {
            throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        }

        // Validate articleId
        if (typeof articleId !== "string") {
            throw new Error("Article ID must be a string.");
        }

        // Assign properties
        this._title = title;
        this._text = text;
        this._articleId = articleId;
        this._questionIDs = questionIDs; // Initialize questionIDs
    }

    // Getters and setters
    get title() {
        return this._title;
    }
    set title(value) {
        if (typeof value !== "string" || 
            value.length < ValidationConstants.MinTitleLength || 
            value.length > ValidationConstants.MaxTitleLength) {
            throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        }
        this._title = value;
    }

    get text() {
        return this._text;
    }
    set text(value) {
        if (typeof value !== "string" || 
            value.length < ValidationConstants.MinTextLength || 
            value.length > ValidationConstants.MaxTextLength) {
            throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        }
        this._text = value;
    }

    get articleId() {
        return this._articleId;
    }
    set articleId(value) {
        if (typeof value !== "string") {
            throw new Error("Article ID must be a string.");
        }
        this._articleId = value;
    }

    get questionIDs() {
        return this._questionIDs;
    }
    set questionIDs(value) {
        if (!Array.isArray(value)) {
            throw new Error("Question IDs must be an array.");
        }
        this._questionIDs = value;
    }

    // Setter to update the paragraph based on given data
    set paragraph(data) {
        this.title = data.title;
        this.text = data.text;
        this.articleId = data.articleId;
        // You can uncomment this if `questionIDs` should be updated too.
        // this.questionIDs = data.questionIDs;
    }
}

export default Paragraph;
