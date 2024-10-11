import { QuestionPageJson } from "../../.constants/MainConstants";

class QuestionPage {
    constructor(questionList = [], questionCount = 0) {
        this.#createEmptyQuestionPage();
    }

    #createEmptyQuestionPage() {
        this._questionList = [];
        this._questionCount = 0;
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
