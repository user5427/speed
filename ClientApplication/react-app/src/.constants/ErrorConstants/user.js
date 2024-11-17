const UserErrors = {
    type: "user",

    PostError(){
        return `Could not post ${this.type}`;
    },

    LoginError(){
        return `Could not login ${this.type}`;
    }
}

export { UserErrors };