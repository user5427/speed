const ArticleErrors = {
    type: "article",

    PostError(){
        return `Could not post ${this.type}`;
    },

    GetError(){
        return `Could not get ${this.type}`;
    },

    PutError(){
        return `Could not put ${this.type}`;
    },

    DeleteError(){
        return `Could not delete ${this.type}`;
    }
}

const ArticlePageErrors = {
    type: "article page",

    GetError(){
        return `Could not get ${this.type}`;
    },

    SearchError(){
        return `Could not search ${this.type}`;
    }

}

export { ArticleErrors, ArticlePageErrors };