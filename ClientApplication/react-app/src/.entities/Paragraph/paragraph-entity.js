/**
 * Represents a Paragraph entity.
 * 
 * @class Paragraph
 * @classdesc This class is used to create and manage Paragraph entities with validation.
 * 
 * @param {string|object} title - The title of the paragraph or an object to initialize from another paragraph.
 * @param {string} [text] - The text content of the paragraph.
 * @param {string} [articleId] - The ID of the article to which the paragraph belongs.
 * @param {Array<string>} [questionIDs=[]] - An array of question IDs associated with the paragraph.
 * 
 * @throws {Error} If the title, text, or articleId are invalid or missing.
 * 
 * @property {string} _title - The title of the paragraph.
 * @property {string} _text - The text content of the paragraph.
 * @property {string} _articleId - The ID of the article to which the paragraph belongs.
 * @property {Array<string>} _questionIDs - An array of question IDs associated with the paragraph.
 * @property {string|null} _id - The unique identifier of the paragraph.
 * 
 * @method set fromOtherParagraph - Initializes the paragraph from another paragraph object.
 * @param {object} paragraph - The paragraph object to initialize from.
 * 
 * @method hasField - Checks if the paragraph has a specific field.
 * @param {string} field - The field to check.
 * @returns {boolean} True if the field exists, false otherwise.
 * 
 * @method get title - Gets the title of the paragraph.
 * @returns {string} The title of the paragraph.
 * 
 * @method set title - Sets the title of the paragraph.
 * @param {string} value - The new title of the paragraph.
 * 
 * @method get varTitleName - Gets the variable name for the title.
 * @returns {string} The variable name for the title.
 * 
 * @method get text - Gets the text content of the paragraph.
 * @returns {string} The text content of the paragraph.
 * 
 * @method set text - Sets the text content of the paragraph.
 * @param {string} value - The new text content of the paragraph.
 * 
 * @method get varTextName - Gets the variable name for the text.
 * @returns {string} The variable name for the text.
 * 
 * @method get articleId - Gets the article ID of the paragraph.
 * @returns {string} The article ID of the paragraph.
 * 
 * @method set articleId - Sets the article ID of the paragraph.
 * @param {string} value - The new article ID of the paragraph.
 * 
 * @method get varArticleIdName - Gets the variable name for the article ID.
 * @returns {string} The variable name for the article ID.
 * 
 * @method get questionIDs - Gets the question IDs associated with the paragraph.
 * @returns {Array<string>} The question IDs associated with the paragraph.
 * 
 * @method set questionIDs - Sets the question IDs associated with the paragraph.
 * @param {Array<string>} value - The new question IDs associated with the paragraph.
 * 
 * @method get id - Gets the unique identifier of the paragraph.
 * @returns {string|null} The unique identifier of the paragraph.
 * 
 * @method set fromJson - Updates the paragraph based on given data.
 * @param {object} data - The data to update the paragraph with.
 * 
 * @method get toJson - Converts the paragraph to a JSON object.
 * @returns {object} The JSON representation of the paragraph.
 */
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
