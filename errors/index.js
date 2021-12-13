const BadRequest = require('./badRequest');
const Forbidden = require('./forbidden');
const NotFound = require('./notFound');
const Unauthorized = require('./unauthorized');
const CustomError = require('./customError');

module.exports = {
    CustomError,
    Unauthorized,
    NotFound,
    BadRequest,
    Forbidden
  };