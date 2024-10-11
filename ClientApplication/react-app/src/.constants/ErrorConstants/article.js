const ArticleErrors = {
    type: "article",

    PostError(){
        `Could not post ${this.type}`;
    },

    GetError(){
        `Could not get ${this.type}`;
    },

    PutError(){
        `Could not put ${this.type}`;
    },

    DeleteError(){
        `Could not delete ${this.type}`;
    }
}

const ArticlePageErrors = {
    type: "article page",

    GetError(){
        `Could not get ${this.type}`;
    },

    SearchError(){
        `Could not search ${this.type}`;
    }

}

export { ArticleErrors, ArticlePageErrors };