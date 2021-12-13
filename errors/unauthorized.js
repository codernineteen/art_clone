const CustomErrors = require('./customError');
const { StatusCodes } = require('http-status-codes');

class UNAUTHORIZED extends CustomErrors{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UNAUTHORIZED;