
const ErrorHandler = {

    sendError: function (err) {
        return {
            error: {
                message: err.message,
                status: err.status
            }
        }
    }
}

export default ErrorHandler;