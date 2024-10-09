const QuestionPage = {
    questionList: [],
    questionCount: 0,
    get questionList() {
        return this.questionList;
    },
    get questionCount() {
        return this.questionCount;
    },
    set questionPage({list, count}) {
        this.questionList = list;
        this.questionCount = count;
    },
    set questionPage(data){ // based on json data
        this.questionList = data.questions; 
        this.questionCount = data.count;
    },
    set questionPage(data){ // based on json data
        this.questionList = data.questions; 
        this.questionCount = data.count;
    }
}

export default QuestionPage;