const ParagraphErrors = {
    type: "paragraph",

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

const ParagraphPageErrors = {
    type: "paragraph page",

    GetError(){
        return `Could not get ${this.type}`;
    },

    SearchError(){
        return `Could not search ${this.type}`;
    }
}

export { ParagraphErrors, ParagraphPageErrors };