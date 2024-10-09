class QuestionPage {
    constructor(questionList = [], questionCount = 0) {
        // Check if questionList is an object (JSON data) or an array
        if (typeof questionList === 'object' && !Array.isArray(questionList)) {
            // Initialize from JSON data
            this._questionList = questionList.questions || [];
            this._questionCount = questionList.count || 0;
        } else {
            // Initialize from individual parameters
            this._questionList = questionList;
            this._questionCount = questionCount;
        }
    }

    // Getter for questionList
    get questionList() {
        return this._questionList;
    }

    // Getter for questionCount
    get questionCount() {
        return this._questionCount;
    }

    // Setter for questionPage (accepts { list, count })
    set questionPage({ list, count }) {
        if (Array.isArray(list) && typeof count === 'number') {
            this._questionList = list;
            this._questionCount = count;
        } else {
            throw new Error("Invalid data for questionPage. List must be an array and count must be a number.");
        }
    }

    // Setter for questionPage from JSON data (accepts data object with questions and count)
    set fromJson(data) {
        if (data && Array.isArray(data.questions) && typeof data.count === 'number') {
            this._questionList = data.questions;
            this._questionCount = data.count;
        } else {
            throw new Error("Invalid data format. Must contain questions (array) and count (number).");
        }
    }
}

export default QuestionPage;
