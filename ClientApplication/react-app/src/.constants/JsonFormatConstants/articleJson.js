
const ArticleJson = {
    getTitle: () => {
        return "title";
    },
    getCategory: () => {
        return "categoryTitle";
    },
    getId: () => {
        return "id";
    },
    getParagraphs: () => {
        return "paragraphIds";
    }
};

const ArticlePageJson = {
    getArticles: () => {
        return "articles";
    },
    getCount: () => {
        return "count";
    }
};

export { ArticleJson, ArticlePageJson };