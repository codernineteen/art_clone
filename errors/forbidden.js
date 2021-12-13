const CustomErrors = require('./customError');
const { StatusCodes } = require('http-status-codes');

class Forbidden extends CustomErrors{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = Forbidden;