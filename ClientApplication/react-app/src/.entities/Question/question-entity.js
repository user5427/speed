import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { QuestionJson } from '../../.constants/MainConstants';

class Question {
    constructor() {
        this.#createEmptyQuestion();
    }

    static createQuestionFromParams(title, text, paragraphId, answerChoices = [], correctAnswerIndex = 0, id = null) {
        const question = new Question();
        question.#createQuestionFromParams(title, text, paragraphId, answerChoices, correctAnswerIndex, id);
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

    #createQuestionFromParams(title, text, paragraphId, answerChoices = [], correctAnswerIndex = 0, id = null) {
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

        // Validate answer choices
        if (answerChoices && !Array.isArray(answerChoices)) {
            throw new Error("Answer choices must be an array.");
        }

        // Validate correct answer index
        if (typeof correctAnswerIndex !== "number" || correctAnswerIndex < 0 || correctAnswerIndex >= answerChoices.length) {
            throw new Error(`Correct answer index must be a number between 0 and ${answerChoices.length - 1}.`);
        }

        // Validate ID (if provided) id must be a number
        if (id !== null && typeof id !== "number") {
            throw new Error("ID must be a number.");
        }

        // Assign properties
        this._title = title;
        this._text = text;
        this._paragraphId = paragraphId;
        this._answerChoices = answerChoices;
        this._correctAnswerIndex = correctAnswerIndex;
        this._id = id;
    }

    #createEmptyQuestion() {
        this._title = "";
        this._text = "";
        this._paragraphId = null;
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
}

export default Question;
