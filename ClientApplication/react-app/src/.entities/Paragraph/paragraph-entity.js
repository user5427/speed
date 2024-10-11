import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { ParagraphJson } from '../../.constants/MainConstants';

class Paragraph {
    constructor() {
        this.#createEmptyParagraph();
    }

    static createArticleFromParams(title, text, articleId, questionIDs = []) {
        const paragraph = new Paragraph();
        paragraph.#createParagraphFromParams(title, text, articleId, questionIDs);
        return paragraph;
    }

    static createEmptyParagraph() {
        return new Paragraph();
    }

    static createParagraphFromCopy(paragraph) {
        const newParagraph = new Paragraph();
        newParagraph.#copyParagraph(paragraph);
        return newParagraph;
    }

    #createParagraphFromParams(title, text, articleId, questionIDs = []) {
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
    }

    #createEmptyParagraph() {
        this._title = "";
        this._text = "";
        this._articleId = "";
        this._questionIDs = [];
        this._id = null;
    }

    #copyParagraph(paragraph) {
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
    fromJson(data) {
        this._title = data[ParagraphJson.title];
        this._text = data[ParagraphJson.text];
        this._articleId = data[ParagraphJson.articleId];
        this._id = data[ParagraphJson.id];
        if (data[ParagraphJson.questionIds]) {
            this._questionIDs = data[ParagraphJson.questionIds];
        }
    }

    toJson() {
        const json = {};

        if (this._title) {
            json[ParagraphJson.title] = this._title;
        }

        if (this._text) {
            json[ParagraphJson.text] = this._text;
        }

        if (this._articleId) {
            json[ParagraphJson.articleId] = this._articleId;
        }

        if (this._id) {
            json[ParagraphJson.id] = this._id;
        }

        if (this._questionIDs) {
            json[ParagraphJson.questionIds] = this._questionIDs;
        }

        return json;
    }
}

export default Paragraph;
