const ParagraphErrors = {
    type: "paragraph",

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

const ParagraphPageErrors = {
    type: "paragraph page",

    GetError(){
        `Could not get ${this.type}`;
    },

    SearchError(){
        `Could not search ${this.type}`;
    }
}

export { ParagraphErrors, ParagraphPageErrors };