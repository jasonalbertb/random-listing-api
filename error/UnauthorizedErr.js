const {CustomError} = require("./CustomError");
const {StatusCodes} = require("http-status-codes");

class UnauthorizedErr extends CustomError {
    constructor (message) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}

module.exports = {
    UnauthorizedErr
}