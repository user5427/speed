import { QuestionPageJson } from "../../.constants/MainConstants";

class QuestionPage {
    constructor(questionList = [], questionCount = 0) {
        this.#createEmptyQuestionPage();
    }

    static createQuestionPageFromParams(questionList = [], questionCount = 0) {
        const questionPage = new QuestionPage();
        questionPage.#createQuestionPageFromParams(questionList, questionCount);
        return questionPage;
    }

    #createEmptyQuestionPage() {
        this._questionList = [];
        this._questionCount = 0;
    }

    #createQuestionPageFromParams(questionList = [], questionCount = 0) {
        this._questionList = questionList;
        this._questionCount = questionCount;
    }

    // Getter for questionList
    get questionList() {
        return this._questionList;
    }

    // Getter for questionCount
    get questionCount() {
        return this._questionCount;
    }

    // Setter for questionPage from JSON data (accepts data object with questions and count)
    /**
     * @deprecated This method is deprecated and will be removed in future versions.
     * @param {*} data 
     */
    fromJson(data) {
        if (data && Array.isArray(data[QuestionPageJson.questions]) && typeof data[QuestionPageJson.count] === 'number') {
            this._questionList = data[QuestionPageJson.questions];
            this._questionCount = data[QuestionPageJson.count];
        } else {
            throw new Error("Invalid data format. Must contain questions (array) and count (number).");
        }
    }
}

export default QuestionPage;
