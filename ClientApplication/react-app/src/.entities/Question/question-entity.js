import { ValidationConstants, ValidationPatternConstants } from '../../constants/MainConstants';

class Question {
    constructor(title, text, paragraphId) {
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
            throw new Error(`Text must be a string between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        }

        // Validate paragraphId
        if (typeof paragraphId === "undefined" || paragraphId === null) {
            throw new Error("Paragraph ID is required.");
        }

        // Assign properties
        this._title = title;
        this._text = text;
        this._paragraphId = paragraphId;
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

    get text() {
        return this._text;
    }
    set text(value) {
        if (typeof value !== "string" || 
            value.length < ValidationConstants.MinTextLength || 
            value.length > ValidationConstants.MaxTextLength) {
            throw new Error(`Text must be a string between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        }
        this._text = value;
    }

    get paragraphId() {
        return this._paragraphId;
    }
    set paragraphId(value) {
        if (typeof value === "undefined" || value === null) {
            throw new Error("Paragraph ID is required.");
        }
        this._paragraphId = value;
    }

    // Setter for the entire question based on a data object
    set question(data) {
        this.title = data.title;
        this.text = data.text;
        this.paragraphId = data.paragraphId;
    }
}

export default Question;
