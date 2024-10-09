
const ArticlePage = {
    articleList: [],
    articleCount: 0,
    get articleList() {
        return this.articleList;
    },
    get articleCount() {
        return this.articleCount;
    },
    set articlePage({list, count}) {
        this.articleList = list;
        this.articleCount = count;
    },
    set articlePage(data){ // based on json data
        this.articleList = data.articles; 
        this.articleCount = data.count;
    }
}

export default ArticlePage;