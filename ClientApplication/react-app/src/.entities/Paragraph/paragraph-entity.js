import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Paragraph {
    constructor(title, text, articleId, questionIDs = []) {
        if (typeof title === "object" && text === undefined && articleId === undefined) {
            this.fromOtherParagraph = title;
        } else if (title !== undefined && text !== undefined && articleId !== undefined) {
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
            this._id = null;
        } else if (title === undefined && text === undefined && articleId === undefined) {
            this._title = "";
            this._text = "";
            this._articleId = "";
            this._questionIDs = [];
            this._id = null;
        } else {
            throw new Error("Unknown intentions.");
        }
    }

    set fromOtherParagraph(paragraph) {
        if (paragraph.title === undefined) {
            throw new Error("Title is required.");
        }

        if (paragraph.text === undefined) {
            throw new Error("Text is required.");
        }

        if (paragraph.articleId === undefined) {
            throw new Error("Article ID is required.");
        }

        this._title = paragraph.title;
        this._text = paragraph.text;
        this._articleId = paragraph.articleId;
        if (paragraph.questionIDs) {
            this._questionIDs = paragraph.questionIDs;
        } else {
            this._questionIDs = [];
        }
        if (paragraph.id) {
            this._id = paragraph.id;
        } else {
            this._id = null;
        }
    }

    hasField(field) {
        return Object.prototype.hasOwnProperty.call(this, `_${field}`);
    }


    // Getters and setters
    get title() {
        return this._title;
    }
    set title(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTitleLength ||
        //     value.length > ValidationConstants.MaxTitleLength) {
        //     throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        // }
        this._title = value;
    }
    get varTitleName() {
        return "title"
    }

    get text() {
        return this._text;
    }
    set text(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTextLength ||
        //     value.length > ValidationConstants.MaxTextLength) {
        //     throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        // }
        this._text = value;
    }
    get varTextName() {
        return "text"
    }

    get articleId() {
        return this._articleId;
    }
    set articleId(value) {
        // if (typeof value !== "string") {
        //     throw new Error("Article ID must be a string.");
        // }
        this._articleId = value;
    }
    get varArticleIdName() {
        return "articleId"
    }

    get questionIDs() {
        return this._questionIDs;
    }
    set questionIDs(value) {
        // if (!Array.isArray(value)) {
        //     throw new Error("Question IDs must be an array.");
        // }
        this._questionIDs = value;
    }

    get id() {
        return this._id;
    }

    // Setter to update the paragraph based on given data
    set fromJson(data) {
        this._title = data.title;
        this._text = data.text;
        this._articleId = data.articleId;
        this._id = data.id;
        if (data.questionIDs) {
            this._questionIDs = data.questionIDs;
        }
    }

    get toJson() {
        const json = {
            title: this._title,
            text: this._text,
            articleId: this._articleId
        };

        if (this._id) {
            json.id = this._id;
        }
        
        return json;
    }
}

export default Paragraph;
