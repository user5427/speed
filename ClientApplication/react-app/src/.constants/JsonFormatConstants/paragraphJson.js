//

const ParagraphJson = {
    getTitle: () => {
        return "title";
    },
    getArticleId: () => {
        return "articleId";
    },
    getId: () => {
        return "id";
    },
    getText: () => {
        return "text";
    },
    getNextParagraphId: () => {
        return "nextParagraphId";
    },
    getQuestionIds: () => {
        return "questionIds";
    }
};

const ParagraphPageJson = {
    getParagraphs: () => {
        return "paragraphs";
    },
    getCount: () => {
        return "count";
    }
};

export { ParagraphJson, ParagraphPageJson };