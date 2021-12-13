const {verifyToken} = require('../utils/jwt');
const CustomError = require('../errors');

const authentication = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token) {
        throw new CustomError.Unauthorized('Token is not existed')
    }
    try {
        const {userId, name, role} = verifyToken({token});
        req.user = {userId, name, role};
        next();
    } catch (error) {
        throw new CustomError.Unauthorized('token is invalid')
    }
}

const authorizePermission = (...roles) => {
    return function (req, res, next) {
        if(!roles.includes(req.user.role)) {
            throw new CustomError.Forbidden('Access denied to this route');
        }
        next();
    }
}

module.exports = {authentication, authorizePermission}