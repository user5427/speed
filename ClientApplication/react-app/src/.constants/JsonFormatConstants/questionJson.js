//

const QuestionJson = {
    getTitle: () => {
        return "title";
    },
    getParagraphId: () => {
        return "paragraphId";
    },
    getId: () => {
        return "id";
    },
    getQuestionText: () => {
        return "questionText";
    },
    getAnswerChoiCes: () => {
        return "answerChoices";
    },
    getCorrectAnswerIndex: () => {
        return "correctAnswerIndex";
    }
};

const QuestionPageJson = {
    getQuestions: () => {
        return "questions";
    },
    getCount: () => {
        return "count";
    }
};

export { QuestionJson, QuestionPageJson };