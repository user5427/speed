const UserErrors = {
    type: "user",

    PostError(){
        return `Could not post ${this.type}`;
    },

    LoginError(){
        return `Could not login ${this.type}`;
    },

    RegisterErrorAlreadyLoggedIn(){
        return `Could not register ${this.type} because user is already logged in`;
    },

    LogginErrorAlreadyLoggedIn(){
        return `Could not login ${this.type} because user is already logged in`;
    },
}

export { UserErrors };