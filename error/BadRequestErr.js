const {CustomError} = require("./CustomError");
const {StatusCodes} = require("http-status-codes");


class BadRequestErr extends CustomError {
    constructor (message){
        super(message, StatusCodes.BAD_REQUEST)
    }
}

module.exports = {
    BadRequestErr
}