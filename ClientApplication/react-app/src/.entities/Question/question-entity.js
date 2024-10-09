
/**
 * 
 */
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Question {
    constructor() {
        this.#createEmptyQuestion();
    }

    static createQuestionFromParams(title, text, paragraphId, answerChoices = [], correctAnswerIndex = 0) {
        const question = new Question();
        question.#createQuestionFromParams(title, text, paragraphId, answerChoices, correctAnswerIndex);
        return question;
    }

    static createEmptyQuestion() {
        return new Question();
    }

    static createQuestionFromCopy(question) {
        const newQuestion = new Question();
        newQuestion.#copyQuestion(question);
        return newQuestion;
    }

    #createQuestionFromParams(title, text, paragraphId, answerChoices = [], correctAnswerIndex = 0) {
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
        this._answerChoices = answerChoices;
        this._correctAnswerIndex = correctAnswerIndex;
        this._id = null;
    }

    #createEmptyQuestion() {
        this._title = "";
        this._text = "";
        this._paragraphId = "";
        this._answerChoices = [];
        this._correctAnswerIndex = 0;
        this._id = null;
    }

    #copyQuestion(question) {
        if (question.title === undefined) {
            throw new Error("Title is required.");
        }

        if (question.text === undefined) {
            throw new Error("Text is required.");
        }

        if (question.paragraphId === undefined) {
            throw new Error("Paragraph ID is required.");
        }

        this._title = question.title;
        this._text = question.text;
        this._paragraphId = question.paragraphId;
        if (question.answerChoices) {
            this._answerChoices = question.answerChoices;
        } else {
            this._answerChoices = [];
        }
        if (question.correctAnswerIndex) {
            this._correctAnswerIndex = question.correctAnswerIndex;
        } else {
            this._correctAnswerIndex = 0;
        }
        if (question.id) {
            this._id = question.id;
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

    get text() {
        return this._text;
    }
    set text(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTextLength ||
        //     value.length > ValidationConstants.MaxTextLength) {
        //     throw new Error(`Text must be a string between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        // }
        this._text = value;
    }
    get varTextName() {
        return "text"
    }

    get paragraphId() {
        return this._paragraphId;
    }
    set paragraphId(value) {
        // if (typeof value === "undefined" || value === null) {
        //     throw new Error("Paragraph ID is required.");
        // }
        this._paragraphId = value;
    }
    get varParagraphIdName() {
        return "paragraphId"
    }

    get answerChoices() {
        return this._answerChoices;
    }
    set answerChoices(value) {
        if (value && Array.isArray(value)) {
            this._answerChoices = value;
        }
    }
    get varAnswerChoicesName() {
        return "answerChoices"
    }

    get correctAnswerIndex() {
        return this._correctAnswerIndex;
    }

    set correctAnswerIndex(value) {
        // if (typeof value !== "number" || value < 0 || value >= this._answerChoices.length) {
        //     throw new Error(`Correct answer index must be a number between 0 and ${this._answerChoices.length - 1}.`);
        // }
        this._correctAnswerIndex = value;
    }
    get varCorrectAnswerIndexName() {
        return "correctAnswerIndex"
    }


    get id() {
        return this._id;
    }

    // Setter for the entire question based on a data object
    set fromJson(data) {
        this._title = data.title;
        this._text = data.text;
        this._paragraphId = data.paragraphId;
        this._id = data.id;
        if (data.answerChoices && Array.isArray(data.answerChoices)) {
            this._answerChoices = data.answerChoices;
        }
        this._correctAnswerIndex = data.correctAnswerIndex;
    }

    get toJson() {
        const json = {
            title: this._title,
            text: this._text,
            paragraphId: this._paragraphId,
            answerChoices: this._answerChoices,
            correctAnswerIndex: this._correctAnswerIndex
        };

        if (this._id) {
            json.id = this._id;
        }

        return json;
    }
}

export default Question;
